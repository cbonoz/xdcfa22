export const APP_NAME = 'Blockfreight'
export const APP_DESC = 'XDC Blockchain product tracking for any parcel'

const hostname = window.location.hostname
export const IS_LOCAL = hostname.indexOf("localhost") !== -1

export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key

export const EXAMPLE_FORM = {
    'title': 'Package 12345',
    'notes': '',
    'files': []
}
export const WEB3_PROJECT_ID = process.env.REACT_APP_WC_ID || 'ec17b7971a950170d6c5710eb878ba9b';

export const CHAIN_OPTIONS = {
  50: {
    name: "XDC Mainnet",
    network: "XDC Mainnet",
    symbol: "XDC",
    rpc: "https://rpc.xinfin.network",
    rpcUrls: {default: "https://rpc.xinfin.network"},
    url: "https://explorer.xinfin.network/",
    blockExplorers: {default: "https://explorer.xinfin.network/"},
    id: 50
  },
  51: {
    name: "XDC Testnet",
    network: "XDC Testnet",
    symbol: "TXDC",
    rpc: "https://rpc.apothem.network",
    rpcUrls: {default: "https://rpc.apothem.network"},
    url: "https://explorer.apothem.network/",
    blockExplorers: {default: "https://explorer.apothem.network/"},
    id: 51
  },
};

export const CHAIN_IDS = Object.keys(CHAIN_OPTIONS)

export const IS_MAINNET = process.env.REACT_APP_STAGE === 'prod'
export const ACTIVE_CHAIN = CHAIN_OPTIONS[IS_MAINNET ? "50" : "51"];

export const IPFS_BASE_URL = "https://ipfs.io/ipfs"
// export const IPFS_BASE_URL = "https://ipfs.moralis.io:2053/ipfs";