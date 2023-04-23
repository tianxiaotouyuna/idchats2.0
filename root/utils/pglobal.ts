//jeffyan
import { BEP20ABI, ERC20ABI } from "@/constants/contractAbi-keys";
import "@ethersproject/shims"
import { ethers,  providers } from "ethers";
import constants, { CONSTRACTKEYS } from "../constants";

let provider;

export function getProvider(chainId: number) {
  if (constants.isReleaseEnvironment) {
    if (chainId == 1) {//以太坊
      return new providers.AlchemyProvider(ethers.providers.getNetwork("homestead"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
    }
    else if(chainId==137) {//马蹄链
      return new providers.AlchemyProvider(ethers.providers.getNetwork("pplygon"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
    }
    else if(chainId==56) {//BSC
      return new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/"); //BNB
    }
  }
  else {
    if (chainId == 1) {//以太坊
      return new providers.AlchemyProvider(ethers.providers.getNetwork("goerli"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
    }
    else if(chainId==137) {//马蹄链
      return new providers.AlchemyProvider(ethers.providers.getNetwork("maticmum"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
    }
    else if(chainId==56) {//BSC
      return new ethers.providers.JsonRpcProvider("https://bsc.getblock.io/testnet/?api_key=973e0a97-183f-4fef-a726-e6fc90b26ebc"); //BNB
    }
  }
}

export const gd = {
  chainName: '私有链',
  public_provider: null as any,
  daiAbi: ERC20ABI,
  addrEllipsis: function (item: any) {
    let len_item = item.length;
    return (
      item.substring(0, 7) + "..." + item.substring(len_item - 6, len_item)
    );
  },
};



export function getTokenContract() {
  let contractAddress;
  if (constants.isReleaseEnvironment) contractAddress = CONSTRACTKEYS.Ethereum_CONTRACT;
  else contractAddress = CONSTRACTKEYS.Ethereum_CONTRACT;
  return contractAddress;
}

export function setProvider(chainId: number) {
  if (constants.isReleaseEnvironment) {
    if (chainId == 1) {//以太坊
      gd.public_provider = new providers.AlchemyProvider(ethers.providers.getNetwork("homestead"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
    }
    else if(chainId==137) {//马蹄链
      gd.public_provider = new providers.AlchemyProvider(ethers.providers.getNetwork("pplygon"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
    }
    else if(chainId==56) {//BSC
      gd.public_provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/"); //BNB
    }
  }
  else {
    if (chainId == 1) {//以太坊
      gd.public_provider = new providers.AlchemyProvider(ethers.providers.getNetwork("goerli"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
    }
    else if(chainId==137) {//马蹄链
      gd.public_provider = new providers.AlchemyProvider(ethers.providers.getNetwork("maticmum"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
    }
    else if(chainId==56) {//BSC
      gd.public_provider= new ethers.providers.JsonRpcProvider("https://bsc.getblock.io/testnet/?api_key=973e0a97-183f-4fef-a726-e6fc90b26ebc"); //BNB
    }
  }
}
