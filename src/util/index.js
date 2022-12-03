import { BigNumber } from "ethers";
import { ACTIVE_CHAIN, IPFS_BASE_URL } from "../constants";

export function addMinutes(numOfMinutes, date = new Date()) {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
}

export const abbreviate = s => s ? `${s.substr(0, 6)}**` : ''

export const xdcAddress = s => {
  if (!s) {
    return ""
  }
  return s.startsWith('0x') ? s.replace('0x', 'xdc') : s;
}


export const formatDate = (d) => {
    if (!(d instanceof Date)) {
        d = new Date(d)
    }
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}



export const ipfsUrl = (cid, fileName) => {
    // let url = `https://ipfs.io/ipfs/${cid}`;
    let url = `${IPFS_BASE_URL}/${cid}`
    if (fileName) {
      return `${url}/${fileName}`;
    }
    return url;
  };

export const freightUrl = (cid) => `${window.location.origin}/i/${cid}`;
export const qrUrl = (cid) => `${window.location.origin}/qr/${cid}`;

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getExplorerUrl = (hash, useTx) =>
  `${ACTIVE_CHAIN.url}${useTx ? "tx/" : "address/"}${hash}`;

export const createJsonFile = (signload, fileName) => {
  const st = JSON.stringify(signload);
  const blob = new Blob([st], { type: "application/json" });
  const fileData = new File([blob], fileName);
  return fileData;
};

export const col = (k, render) => ({
  title: capitalize(k).replaceAll('_', ' '),
  dataIndex: k,
  key: k,
  render,
});

export const humanError = message => {
  if (message.indexOf('404') !== -1) {
    message = 'Parcel not found. Do you have the correct url? Otherwise, try creating a new parcel.'
  } else if (message.indexOf('network changed') !== -1) {
    message = 'Network changed since page loaded, please refresh.'
  }
  return message
}


export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}