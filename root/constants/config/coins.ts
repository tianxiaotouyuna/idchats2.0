import { AddressZero } from "@ethersproject/constants/src.ts/addresses";

export type CoinType = {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  chainID: number;
  isNative?: boolean;
  noIcon?: boolean;
  totalSupply?: string;
};
export const coins: CoinType[] = [
  {
    name: "WBNB",
    symbol: "WBNB",
    decimals: 18,
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    chainID: 56,
    isNative: false,
  },
  {
    name: "USDT",
    symbol: "USDT",
    decimals: 18,
    address: "0x55d398326f99059fF775485246999027B3197955",
    chainID: 56,
  },
  {
    name: "BUSD",
    symbol: "BUSD",
    decimals: 18,
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    chainID: 56,
  },
  {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    chainID: 56,
  },
  {
    name: "WETH",
    symbol: "WETH",
    decimals: 18,
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    chainID: 1,
    isNative: false,
  },

  {
    name: "USDT",
    symbol: "USDT",
    decimals: 6,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chainID: 1,
  },

  {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainID: 1,
  },
  {
    name: "WETH",
    symbol: "WETH",
    decimals: 18,
    address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    chainID: 5,
  },
  {
    name: "USDT",
    symbol: "USDT",
    decimals: 18,
    address: "0xBBa535a0939705e95064749f70990C86334E2b29",
    chainID: 5,
  },
  {
    name: "ENFT",
    symbol: "ENFT",
    decimals: 18,
    address: "0xED3d3569ab2eC723FC2358D3f9F422bB70BdFC45",
    chainID: 5,
    noIcon: true,
  },
];

export const findCoin = (chainID:number|undefined) => {
  if(!chainID){
    return null
  }
  let coinItems: {
    [p: number]: CoinType;
  } = {};
  coins.forEach((i) => {
    coinItems[i.chainID] = i;
  });
  return coinItems[chainID];
};

