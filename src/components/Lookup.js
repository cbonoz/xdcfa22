import { Button, Result, Spin } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { ACTIVE_CHAIN, EXAMPLE_FORM } from '../constants'
import { recordParcelEvent } from '../contract/freightContract'
import { getExplorerUrl, humanError, ipfsUrl } from '../util'
import { getLocation } from '../util/location'
import { getMetadata } from '../util/stor'
import { FileDrop } from './FileDrop/FileDrop'

export default function Lookup({ walletLoading, connect, address, provider }) {

  const [error, setError] = useState()
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)
  const [parcel, setParcel] = useState()
  const [location, setLocation] = useState()
  const [data, setData] = useState({ ...EXAMPLE_FORM })

  const params = useParams()
  const { itemId } = params

  async function findLocation() {
    try {
      const loc = await getLocation()
      setLocation(loc)
    } catch (e) {
      console.error(e)
    }
  }

  useState(() => {
    findLocation()
  }, [])

  async function recordUpdate() {
    // TODO: add error check for preset location if user denied permission or location not retrievable.
    setLoading(true)
    const { contract, contractUrl } = parcel || {}
    try {

      const res = await recordParcelEvent(provider.getSigner(), contract, data.notes, location?.latitude, location?.longitude)
      res['contractUrl'] = contractUrl
      console.log('udpate result', res)
      setResult(res)
    } catch (e) {
      console.error('Error recording update', e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function getParcelInfo() {
    setError(undefined)
    setLoading(true)
    try {
      const res = await getMetadata(ipfsUrl(itemId))
      setParcel(res?.data || {})
    } catch (e) {
      console.error('error fetching record', e)
      let { message } = e
      setError(humanError(message))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getParcelInfo()
  }, [itemId])

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  if (loading) {
    return <Spin size="large" className='boxed' />
  }

  if (error) {
    return <div className='error-text boxed'>
      {error}
    </div>
  }

  const isReady = !loading && address && provider;

  return (
    <div className='boxed'>
      {!result && <div>
        {parcel && <div>
          <h5 className='success-text'>Found Parcel</h5>
          <h2>{parcel.title}</h2>
          {parcel.notes && <p>{parcel.notes}</p>}
        </div>}
        {/* {location && JSON.stringify(location)} */}
        {parcel?.files && <span>
          <h3>Original Image(s):</h3>
          {parcel.files.map(({ path }, i) => {
            return <img key={i} src={ipfsUrl(itemId, path)} className='upload-image' />
          })}
        </span>}
        <br />
        {parcel?.contractUrl && <a href={parcel.contractUrl} target="_blank">Contract URL</a>}
        <h3 className="vertical-margin">Upload new image of parcel (Optional):</h3>
        <FileDrop
          files={data.files}
          setFiles={(files) => updateData("files", files)}
        />

        <TextArea
          aria-label="Notes"
          onChange={(e) => updateData("notes", e.target.value)}
          placeholder="Add any additional coments or updates"
          prefix="Notes: "
          value={data.notes}
        />

        <br />
        <br />
        {isReady && <Button type="primary" size="large" loading={loading} onClick={recordUpdate}>
          Submit update
        </Button>}

        {!address && <span className="web3-button">
          <Button onClick={connect} disabled={loading} loading={walletLoading}>Connect Wallet</Button>
        </span>}
      </div>}
      {result && <Result status="success" title="Event recorded!"
        subTitle={<span>TX: <a target="_blank" href={getExplorerUrl(result.hash, true)}>{result.hash}</a></span>}
        extra={[
          <Button type="primary" key="console" onClick={() => {
            window.open(result.contractUrl, "_blank")
          }}>
            View updated contract
          </Button>,
        ]} />}

    </div>
  )
}