import { System } from "@/utils/index";
import { Alert, ImageRequireSource } from "react-native";
import RNFS from "react-native-fs";
import Toast from "react-native-root-toast";
import { PermissionsAndroid, Platform } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { toast } from "@/utils/system";
import { CoinGeckoRrquest, CommonRequest, IDBITRequest } from "../request";
import axios from "axios";
import constants, { ReduxToken } from "../constants";
import IMServiceManager from "@/utils/IMServiceManager";
import { t } from "i18next";
import { coins, CoinType } from "@/constants/config/coins";
interface CoinItem extends CoinType {
  icon: any;
}
export const saveToCameraRoll = async (url: string) => {
  try {
    // 请求存储权限
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    // 获取存储路径
    const dirs = System.isIOS
      ? RNFS.LibraryDirectoryPath
      : RNFS.ExternalDirectoryPath;
    // 设置文件名
    const fileName = "share_" + `${new Date().getTime()}` + ".png";
    const downloadPath = dirs + "/" + fileName;
    // 下载图片
    await RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadPath,
      background: true,
    }).promise;
    // 保存图片到相册
    const a = await CameraRoll.getAlbums({ assetType: "Photos" });
    console.log("downloadPath========" + JSON.stringify(downloadPath));
    try {
      await CameraRoll.save(downloadPath);
    } catch (e) {
      Alert.alert("error:" + JSON.stringify(e));
    }
    // 删除下载的图片
    await RNFS.unlink(downloadPath);
    toast(t('common.saveSucess'));
    return Promise.resolve();
  } catch (error) {
    toast(t('common.saveFailed'));
    return Promise.reject({ message: t('common.saveFailed') });
  }

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  }
};

/**
 * 获取最新版本
 */
export const getVersionCode = async (appPlatform: string) => {
  const resp = await CoinGeckoRrquest.get(
    constants.BASE_HOST_V3 + "/graph/appversion/" + appPlatform
  );
  console.log('getVersionCode====' + JSON.stringify(resp))
  return resp?.data;
};

/**
 * 获取所有代币数据
 */
export const getTokensInfo = async (vs_currency: string) => {
  const resp = await CoinGeckoRrquest.get(
    constants.BASE_HOST_V3 + "/graph/coin?vs_currency=" +
    vs_currency +
    "&order=market_cap_desc"
  );
  return resp;
};
/**
 * 获取当前钱包，代币数据
 */
export const getAddressTokensInfo = async (data: any, reduxParams?: any) => {
  {
    const params = data?.params;
    const imUserInfo = params?.imUserInfo
    const axios = require("axios");
    const apiKey = '-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV'

    // Wallet address
    // const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
    const address = imUserInfo?.userID;

    // Alchemy URL --> Replace with your API key at the end
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/` + apiKey;

    // Data for making the request to query token balances
    const data2 = JSON.stringify({
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      headers: {
        "Content-Type": "application/json",
      },
      params: [`${address}`],
      id: 42,
    });

    // config object for making a request with axios
    const config = {
      method: "post",
      url: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      data: data2,
    };
    // fetching the token balances
    let response = await axios(config);
    response = response["data"];

    // Getting balances from the response
    const balances = response["result"];

    // Remove tokens with zero balance
    const nonZeroBalances = await balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });

    console.log(`Token balances of ${address}: \n`);

    // Counter for SNo of final output
    let i = 1;
    let tokenInfoArr = [];

    // Loop through all tokens with non-zero balance
    for (let token of nonZeroBalances) {
      // Get balance of token
      let balance = token.tokenBalance;
      let tokenInfoMap = {}

      // options for making a request to get the token metadata
      const options = {
        method: "POST",
        url: baseURL,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenMetadata",
          params: [token.contractAddress],
        },
      };

      // getting the token metadata
      const metadata = await axios.request(options);

      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata["data"]["result"].decimals);
      balance = balance.toFixed(2);
      tokenInfoMap = metadata["data"]["result"];
      tokenInfoMap.balance = balance;
      tokenInfoArr.push(tokenInfoMap);
      // Print name, balance, and symbol of token
      console.log(
        `${i++}. ${JSON.stringify(metadata["data"]["result"])}: ${balance} ${metadata["data"]["result"].symbol
        }`
      );
    }
    //  imUserInfo.tokenBalances=tokenInfoArr;
    //  const { sendReduxAction } = reduxParams;
    //  sendReduxAction(ReduxToken.REFRESH_IMUserInfo, { imUserInfo: imUserInfo })
    return { list: tokenInfoArr }
  }
}
export const getAddressTokensInfo2 = async (address: string) => {
  // Replace with your Alchemy API key:
  // const apiKey = "demo";
  const apiKey = '-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV'
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
  // Replace with the wallet address you want to query:
  const tokenAddr = address;

  var data = JSON.stringify({
    jsonrpc: "2.0",
    method: "alchemy_getTokenMetadata",
    params: [`${tokenAddr}`],
    id: 42,
  });

  var config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.result, null, 2));
      return response;
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert('获取钱包代币错误：' + JSON.stringify(error))
    });
};

/**
 * 获取热门代币数据
 */
export const getAllTokensInfo_byChainId = async (data: any) => {
  const chainId = data?.params.chainId;
  const resp = await CoinGeckoRrquest.get(
    constants.BASE_HOST_V3 + "/graph/tokenlist/" + chainId
  );
  const coinInfos = resp?.data;
  let hotTokens = [];
  for (var i = 0; i < coinInfos.length; i++) {
    if (coinInfos[i].coinIsHot == 1) hotTokens.push(coinInfos[i])
  }
  // return resp;
  if (constants.isReleaseEnvironment) {
    return {
      list: [t('my.hotToken'),
      ].concat(hotTokens)
    }
  }
  else {
    return {
      list: [t('my.hotToken'),
      { "coinChainid": 1, "coinToken": "0x7c062fc77de90e15b3be172a2274b242561315fd", "coinDecimals": 18, "coinName": "aETH", "coinSymbol": "aETH", "coinType": "ERC20", "coinIsHot": 1, "coinIcon": "https://raw.githubusercontent.com/dappradar/tokens/master/ethereum/0x0000000000085d4780b73119b644ae5ecd22b376/logo.png" }
      ].concat([])
    }
  }
};
/**
 * 搜索代币数据
 */
export const getAllTokensInfo_search = async (data: any) => {
  const { chainId, text } = data.params
  if (text.length > 10) {
    const resp = await searchTokenBy_contractAddress(text, chainId)
    return { list: [resp] };
  }
  const resp = await CoinGeckoRrquest.get(
    constants.BASE_HOST_V3 + "/graph/tokenlist/" + chainId
  );
  const coinNames = resp?.data;
  let result = []
  result = compareList2(text, coinNames)
  if (result.length == 0) return { list: [] };

  if (constants.isReleaseEnvironment) {
    return { list: result ?? [] };
  }
  else {
    return {
      list: [
        { "coinChainid": 1, "coinToken": "0x7c062fc77de90e15b3be172a2274b242561315fd", "coinDecimals": 18, "coinName": "aETH", "coinSymbol": "aETH", "coinType": "ERC20", "coinIsHot": 1, "coinIcon": "https://raw.githubusercontent.com/dappradar/tokens/master/ethereum/0x0000000000085d4780b73119b644ae5ecd22b376/logo.png" }
      ].concat([])
    }
  }
};
const compareList2 = (value: string, list: any) => {
  // value:要查询的字符串
  // list:这里匹配，lis必须是个数组
  if (value) {
    let arr = [] as Array<any>
    list.forEach((el: any) => {
      if (el.coinName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        arr.push(el)
      }
    })
    return arr;
  }
}

const searchTokenBy_contractAddress = async (contractAddress: string, chainId: number) => {
  const axios = require("axios");
  const apiKey = '-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV'

  // Wallet address
  // const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

  // Alchemy URL --> Replace with your API key at the end
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/` + apiKey;

  // Data for making the request to query token balances
  const data2 = JSON.stringify({
    "id": chainId,
    "jsonrpc": "2.0",
    "method": "alchemy_getTokenMetadata",
    "params": [
      contractAddress
    ]
  });

  // config object for making a request with axios
  const config = {
    method: "post",
    url: baseURL,
    headers: {
      "Content-Type": "application/json",
      'accept': 'application/json',
    },
    data: data2,
  };
  // fetching the token balances
  let response = await axios(config);
  response = response?.data["result"];
  let newMeatDat = {};
  newMeatDat.coinChainid = chainId;
  newMeatDat.coinToken = contractAddress;
  newMeatDat.coinDecimals = response?.decimals;
  newMeatDat.coinName = response?.name;
  newMeatDat.coinSymbol = response?.symbol;
  newMeatDat.coinIcon = response?.logo;
  return newMeatDat
}
export const getCoins = async (data: any) => {

  const { chainID, text } = data.params
  const res = await CommonRequest.get(constants.BASE_HOST_V3 + '/graph/tokenlist/' + chainID)
  const remoteCoins: CoinType[] = [];
  if (res?.data?.length > 0) {
    res.data.forEach((i: any) => {
      const obj: CoinType = {
        symbol: i.coinSymbol,
        name: i.coinName,
        decimals: i.coinDecimals,
        chainID: i.coinChainid,
        isNative: false,
        noIcon: !i.coinIcon,
        icon : i.coinIcon,
        address: i.coinToken,
      };
      remoteCoins.push(obj);
    })
  };
  let list_: CoinItem[] = [];
  let concatList = [...coins, ...remoteCoins];
  concatList.map((i:CoinType) => {
    let s1 : ImageRequireSource
    if (i.chainID == chainID) {
      if(i.symbol=='BUSD')s1=require('@/resources/idbt/coins/BUSD.png')
      else if(i.symbol=='USDC')s1=require('@/resources/idbt/coins/USDC.png')
      else if(i.symbol=='USDT')s1=require('@/resources/idbt/coins/USDT.png')
      else if(i.symbol=='USDT1')s1=require('@/resources/idbt/coins/USDT1.png')
      else if(i.symbol=='USDT2')s1=require('@/resources/idbt/coins/USDT2.png')
      else if(i.symbol=='WBNB')s1=require('@/resources/idbt/coins/WBNB.png')
      else if(i.symbol=='WETH')s1=require('@/resources/idbt/coins/WETH.png')
      else s1=require('@/resources/idbt/coins/default.png')
      list_.push({ ...i, ...{ icon: s1 } });
    }
  });
  return { list: list_ }
}