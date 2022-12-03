import { BigNumber, ethers } from "ethers";
import { FREIGHT_CONTRACT } from "./metadata";

// const getSigner = async () => {
//     await window.ethereum.enable();
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     return signer;
// };

const getSigner = async () => {
  let signer;
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  return signer;
};

// https://dapp-world.com/smartbook/how-to-use-ethers-with-xdc-k5Hn
export async function deployContract(title, notes) {

  //   https://dev.to/yosi/deploy-a-smart-contract-with-ethersjs-28no

  // Create an instance of a Contract Factory
  const signer = await getSigner();
  const factory = new ethers.ContractFactory(
    FREIGHT_CONTRACT.abi,
    FREIGHT_CONTRACT.bytecode,
    signer
  );

  // const validatedAddress = ethers.utils.getAddress(signerAddress);

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await factory.deploy(title, notes)//, { value: BigNumber.from('100000000000000000') })//, validatedAddress);
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

export const recordParcelEvent = async (contractAddress, notes, lat, lng) => {
  if (!contractAddress) {
    throw Error('No contract address provided')
  }

  const signer = await getSigner();
  const freightContract = new ethers.Contract(
    contractAddress,
    FREIGHT_CONTRACT.abi,
    signer
  );
  const result = await freightContract.recordParcelEvent(notes, lat, lng, {
    gasLimit: 250000
});
  return result;
};


export const markContractCompleted = async (contractAddress) => {
  if (!contractAddress) {
    throw Error('No contract address provided')
  }
  
  const signer = await getSigner();
  const freightContract = new ethers.Contract(
    contractAddress,
    FREIGHT_CONTRACT.abi,
    signer
  );
  const result = await freightContract.markCompleted();
  return result;
}
