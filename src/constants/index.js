export const APP_NAME = 'Blockfreight'
export const APP_DESC = 'XDC Blockchain product tracking for any parcel'

const hostname = window.location.hostname
export const IS_LOCAL = hostname.indexOf("localhost") !== -1

export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key

export const EXAMPLE_FORM = {
    'name': 'Package delivery from Boston to San Francisco',
    'notes': 'This package is a delivery to our SF warehouse. It contains a new laptop and a new phone. Please be careful with it. REF #123',
    'files': []
}
export const WEB3_PROJECT_ID = process.env.REACT_APP_WC_ID || 'ec17b7971a950170d6c5710eb878ba9b';

export const CHAIN_OPTIONS = {
  50: {
    name: "XDC Mainnet",
    network: "XDC Mainnet",
    symbol: "XDC",
    rpc: "https://erpc.xinfin.network",
    rpcUrls: {default: "https://erpc.xinfin.network"},
    url: "https://explorer.xinfin.network/",
    blockExplorers: {default: "https://explorer.xinfin.network/"},
    id: 50
  },
  51: {
    name: "XDC Testnet",
    network: "XDC Testnet",
    symbol: "TXDC",
    // rpc: "https://erpc.xinfin.network",
    // rpcUrls: {default: "https://erpc.xinfin.network"},
    rpc: "https://erpc.apothem.network	",
    rpcUrls: {default: "https://erpc.apothem.network	"},
    url: "https://explorer.apothem.network/",
    blockExplorers: {default: "https://explorer.apothem.network/"},
    id: 51
  },
};

export const CHAIN_IDS = Object.keys(CHAIN_OPTIONS)

export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID || "50"
export const DEFAULT_CHAIN = CHAIN_OPTIONS[CHAIN_ID];
if (!DEFAULT_CHAIN) {
  throw new Error("Invalid chain id")
}

export const IPFS_BASE_URL = "https://ipfs.io/ipfs"
// export const IPFS_BASE_URL = "https://ipfs.moralis.io:2053/ipfs";