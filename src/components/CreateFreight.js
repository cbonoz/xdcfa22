import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Steps, Result } from "antd";
import { freightUrl, ipfsUrl, getExplorerUrl, qrUrl, humanError, createFundRequest } from "../util";
import { EXAMPLE_FORM } from "../constants";
import { FileDrop } from "./FileDrop/FileDrop";
import { uploadFiles } from "../util/stor";
import { deployContract } from "../contract/freightContract";
import TextArea from "antd/lib/input/TextArea";

const { Step } = Steps;

function CreateFreight({ address, provider,activeChain }) {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const getActiveError = (data) => {
    if (!data.name) {
      return "Please provide a name for the item.";
    }

    return undefined
  };

  const errMessage = getActiveError(data);

  const create = async () => {
    setError(undefined);

    if (errMessage) {
      setError(errMessage)
      return;
    }

    if (!address) {
      setError("Please connect a valid wallet");
      return;
    }

    setLoading(true);
    const body = { ...data };

    // Format files for upload.
    const files = (body || []).files.map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // 1) deploy base contract with metadata,
      const contract = await deployContract(provider.getSigner(), data.name, data.notes)
      res["contract"] = contract.address;
      res["contractUrl"] = getExplorerUrl(activeChain, contract.address);

      // 2) Upload files/metadata to ipfs.
      const cid = await uploadFiles(
        files,
        res
      );

      // 3) return shareable url.
      res["freightUrl"] = freightUrl(cid);
      res["qrUrl"] = qrUrl(cid);
      res["hash"] = cid;

      // Result rendered after successful doc upload + contract creation.
      setResult(res);
    } catch (e) {
      console.error("error creating freight request", e);
      const message = e.reason || e.response?.message || e.message
      setError(humanError(message))
    } finally {
      setLoading(false)
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (!errMessage) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            {!result && (<div>
              <h2>Create new freight request</h2>
              <a href="#" onClick={e => {
                e.preventDefault();
                setData({ ...EXAMPLE_FORM });
              }}>Set example data</a>
              <br />

              <h3 className="vertical-margin">Freight request name:</h3>
              <Input
                placeholder="Name of the freight request"
                value={data.name}
                prefix="Name:"
                onChange={(e) => updateData("name", e.target.value)}
              />
              <br />
              <br />

              <TextArea
                aria-label="Notes"
                onChange={(e) => updateData("notes", e.target.value)}
                placeholder="Add any additional notes on the parcel"
                prefix="Notes"
                value={data.notes}
              />

              {/* TODO: add configurable amount of items */}
              <h3 className="vertical-margin">Optional: Upload image(s) of parcel</h3>
              <FileDrop
                files={data.files || []}
                setFiles={(files) => updateData("files", files)}
              />

              <Button
                type="primary"
                className="standard-button"
                onClick={create}
                disabled={loading || errMessage}
                loading={loading}
                size="large"
              >
                Create freight request!
              </Button>
              {!error && !result && loading && (
                <span>&nbsp;Note this may take a few moments.</span>
              )}
            </div>)}
            <br />
            <br />
            {error && <div className="error-text">Error: {error}</div>}
            {result && (<div>
              <Result status="success"
                title="Created freight request!" />
              <div>
                <a href={ipfsUrl(result.hash)} target="_blank">
                  View metadata
                </a>
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <p>
                  Share or append this QR code link to the physical item:
                  <br />
                  <a href={result.qrUrl} target="_blank">
                    View QR code
                  </a>
                </p>
              </div>
            </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title="Create freight record"
                description="Deploys a smart contract which will track the parcel"
              />
              <Step
                title="Use the generated QR code to track each unique parcel"
                description="Others can view and provide updates here as the parcel moves"
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateFreight.propTypes = {};

export default CreateFreight;
