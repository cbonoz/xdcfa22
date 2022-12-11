import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, Select, Spin } from "antd";
import detectEthereumProvider from '@metamask/detect-provider';


import { Home } from "./components/Home";
import {
  QuestionCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { About } from "./components/About";
import { ACTIVE_CHAIN, APP_DESC, APP_NAME, COVALENT_KEY } from "./constants";
import Lookup from "./components/Lookup";
// import CreateFreight from "./components/CreateFreight";
import History from "./components/History";

import 'antd/dist/antd.css';
import "@ant-design/flowchart/dist/index.css";
import CreateFreight from "./components/CreateFreight";
import QrCodePage from "./components/QrCodePage";
import logo from "./assets/logo_trans.png";
import { abbreviate, xdcAddress } from "./util";

import './App.css';
import { ethers } from "ethers";

const { Header, Footer, Content } = Layout;
const { Option } = Select;

function App() {
  const navigate = useNavigate()
  const [provider, setProvider] = useState()
  const [address, setAddress] = useState()
  const [loading, setLoading] = useState(false)

  // Get the address from the metamask provider
  async function getAddress() {
    if (provider) {
      // const accounts = await provider.send("eth_requestAccounts", []);
      const accounts = await provider.listAccounts();

      // const signer = provider.getSigner(accounts[0])
      // const res = await signer.getAddress()
      setAddress(accounts[0])
    }
  }

  // Get the address when the provider changes via useEffect
  useEffect(() => {
    getAddress()
  }, [provider])

  async function connect() {
    if (address) {
      setAddress(undefined)
      return;
    }
    // this returns the provider, or null if it wasn't detected
    setLoading(true)
    try {
      const p = await detectEthereumProvider();
      if (!p) {
        console.log("Please install MetaMask!");
        alert("Please install MetaMask!");
        return;
      }

      /**********************************************************/
      /* Handle chain (network) and chainChanged (per EIP-1193) */
      /**********************************************************/
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (parseInt(chainId, 16) !== ACTIVE_CHAIN.id) {
        alert(`Please connect to ${ACTIVE_CHAIN.name} network`);
        return;
      }

      const ethersProvider = new ethers.providers.JsonRpcProvider(ACTIVE_CHAIN.rpc);
      setProvider(ethersProvider)
    } catch (e) {
      console.error(e);
      alert("Error connecting to wallet" + e);
    } finally {
      setLoading(false)
    }
  }

  // const height = window.innerHeight - 120;
  const pathname = window.location.pathname
  const isQR = pathname.indexOf('/qr/') !== -1

  const abbreviatedAddress = abbreviate(xdcAddress(address))

  return (
    <div className="App">
      <Layout>
        {!isQR && <Header>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[pathname]}
          >
            <Menu.Item key={0}>
              <img
                src={logo}
                className="header-logo pointer"
                onClick={() => navigate("/")}
              />

            </Menu.Item>
            <Menu.Item key={'/create'} onClick={() => navigate("/create")}>
              <FormOutlined /> Create Parcel
            </Menu.Item>

            {/* {COVALENT_KEY && <Menu.Item key={'/history'} onClick={() => navigate("/history")}>
              <FormOutlined /> Freight logs
            </Menu.Item>} */}
            <Menu.Item key={'/about'} onClick={() => navigate("/about")}>
              <QuestionCircleOutlined /> About
            </Menu.Item>
            <span className="heading-button">
              <Button size="large" type="primary" onClick={connect} disabled={loading} loading={loading}>{address ? `${abbreviatedAddress} (logout)` : 'Connect Wallet'}</Button>
            </span>
            {/* {balance && <span>
            &nbsp;Balance: {balance?.formatted} {balance?.symbol}
          </span>} */}


          </Menu>


        </Header>}
        <Content>
          <span className="no-print" style={{ right: 0, position: 'absolute' }}>
            &nbsp;Active Network: <b>{ACTIVE_CHAIN.name}</b>
            {address && <span>
              ,&nbsp;Logged in: <b>{abbreviatedAddress}</b>
            </span>}
            &nbsp;
          </span>
          <div className="container">

            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/carbon-map" element={<Home/>}/> */}
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/create" element={<CreateFreight provider={provider} address={address} />} />
              <Route path="/i/:itemId" element={<Lookup provider={provider} address={address} connect={connect} walletLoading={loading} />} />
              <Route path="/qr/:itemId" element={<QrCodePage />} />
              <Route path="/about" element={<About />} />

            </Routes>
          </div>
        </Content>

        <Footer>
          <hr />
          <p>
            <a href={"/"}><b>{APP_NAME}</b></a>&nbsp;
            &copy;2022.&nbsp;{APP_DESC}.<br /></p>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
