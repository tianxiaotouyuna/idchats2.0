//jeffyan
import { BEP20ABI, ERC20ABI } from "@/constants/contractAbi-keys";
import "@ethersproject/shims"
import { ethers, getDefaultProvider, providers } from "ethers";
import { Alert } from "react-native";
import { getRelativeCoords } from "react-native-reanimated";
import constants, { CONSTRACTKEYS } from "../constants";
import IMServiceManager from "./IMServiceManager";
import { BscscanProvider } from "@ethers-ancillary/bsc";

//  const provider= new providers.InfuraProvider(ethers.providers.getNetwork("ropsten"),"11a4f41ed7074cb6bb93a88d3fc421b0")
//homestead(Mainnet),ropsten,rinkeby,goerli,kovan
// const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"); //BNB
// const provider = new ethers.providers.JsonRpcProvider("http://192.168.1.105:8545")//local
//  const provider= new providers.InfuraProvider(ethers.providers.getNetwork("arbitrum-goerli"),"11a4f41ed7074cb6bb93a88d3fc421b0")
let provider;
try {
  // new ethers.providers.AlchemyProvider( [ network = "homestead" , [ '-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV' ] ] )
  // provider = new providers.AlchemyProvider(ethers.providers.getNetwork("goerli"), "-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV")
  // provider = new AlchemyProvider("goerli");
  // provider = new AlchemyProvider("homestead", apiKey);
  // 
}
catch (e) {

}

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
      // gd.public_provider =new BscscanProvider('');
      return new ethers.providers.JsonRpcProvider("https://bsc.getblock.io/testnet/?api_key=973e0a97-183f-4fef-a726-e6fc90b26ebc"); //BNB
// gd.public_provider =new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s3.binance.org:8545', {name:'binance',chainId: 97 })
      //  new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"); //BNB
    }
  }
}

export const gd = {
  chainName: '私有链',
  public_provider: null as any,
  daiAbi: [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "bytes32" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "stop",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "guy", type: "address" },
        { name: "wad", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "owner_", type: "address" }],
      name: "setOwner",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "src", type: "address" },
        { name: "dst", type: "address" },
        { name: "wad", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "dst", type: "address" },
        { name: "wad", type: "uint128" },
      ],
      name: "push",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "name_", type: "bytes32" }],
      name: "setName",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "wad", type: "uint128" }],
      name: "mint",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "src", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "stopped",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "authority_", type: "address" }],
      name: "setAuthority",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "src", type: "address" },
        { name: "wad", type: "uint128" },
      ],
      name: "pull",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "wad", type: "uint128" }],
      name: "burn",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "bytes32" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "dst", type: "address" },
        { name: "wad", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "start",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "authority",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "src", type: "address" },
        { name: "guy", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      inputs: [{ name: "symbol_", type: "bytes32" }],
      payable: false,
      type: "constructor",
    },
    {
      anonymous: true,
      inputs: [
        { indexed: true, name: "sig", type: "bytes4" },
        { indexed: true, name: "guy", type: "address" },
        { indexed: true, name: "foo", type: "bytes32" },
        { indexed: true, name: "bar", type: "bytes32" },
        { indexed: false, name: "wad", type: "uint256" },
        { indexed: false, name: "fax", type: "bytes" },
      ],
      name: "LogNote",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: "authority", type: "address" }],
      name: "LogSetAuthority",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: "owner", type: "address" }],
      name: "LogSetOwner",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "from", type: "address" },
        { indexed: true, name: "to", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "owner", type: "address" },
        { indexed: true, name: "spender", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
  ],
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

export function getTokenAbi() {
  const chainId=IMServiceManager.getInstance().getChainId()
  return ERC20ABI;
  return chainId==56?BEP20ABI:ERC20ABI;
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
      // gd.public_provider =new BscscanProvider('');
      gd.public_provider= new ethers.providers.JsonRpcProvider("https://bsc.getblock.io/testnet/?api_key=973e0a97-183f-4fef-a726-e6fc90b26ebc"); //BNB
// gd.public_provider =new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s3.binance.org:8545', {name:'binance',chainId: 97 })
      //  new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"); //BNB
    }
  }
}

export function getRateByToken(name: string) {
    const allData = IMServiceManager.getInstance().getRateBase()
      for (var i = 0; i < allData.length; i++) {
      if (allData[i].symbol.toLowerCase() == name.toLowerCase() ){
    return allData[i].current_price
    }
  }
}