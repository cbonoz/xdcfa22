import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ACTIVE_CHAIN, APP_NAME, CHAIN_OPTIONS, WEB3_PROJECT_ID } from './constants';

import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum';

const chains = [ACTIVE_CHAIN]

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: WEB3_PROJECT_ID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
// https://web3modal.com/hooks


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <WagmiConfig client={wagmiClient}>
        <App />
        </WagmiConfig>
        <Web3Modal
        projectId={WEB3_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
