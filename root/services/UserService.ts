import { CoinGeckoRrquest, CommonRequest, HashRequest, IDBITRequest } from "@/request/index";
import { gd, getProvider, getRateByToken, getTokenAbi, getTokenContract } from "@/utils/pglobal";
import pstorage from "@/utils/pstorage";
import { log, sleep, toast } from "@/utils/system";
import { ethers } from "ethers";
import { Alert } from "react-native";
import IMServiceManager from "../utils/IMServiceManager";
import Axios, { AxiosRequestConfig, Method } from "axios";
import constants from "../constants";
import { has } from "lodash";
import { UserService } from ".";
import { t } from "i18next";
import { emailCodeParams, loginEmailParams, RegisterEmailParams } from "./types";
/**
 * 获取用户信息
 */
export const syncUserDetailInfo = async (imUserInfo:any,ids: Array<string>, walletName: string) => {
  const thirdUserInfo = await getThirdStatusApi(ids);
  const followCount = await getFollowCount(ids[0]);
  const beFollowCount = await getbeFollowCount(ids[0]);
  const introduce = await UserService.getUserProfile(ids[0])
  let userInfo = Object.assign(imUserInfo, thirdUserInfo?.data[0]);
  userInfo.followCount = followCount;
  userInfo.beFollowCount = beFollowCount;
  userInfo.walletName = walletName;
  userInfo.introduce = introduce;
  return userInfo;
};
/**
 * 获取用户信息
 */
export const getUserInfo = async (ids: Array<string>, walletName: string) => {
  const imUserInfo = await IMServiceManager.getInstance().getSelfUserInfo();
  const thirdUserInfo = await getThirdStatusApi(ids);
  const followCount = await getFollowCount(ids[0]);
  const beFollowCount = await getbeFollowCount(ids[0]);
  const introduce = await UserService.getUserProfile(ids[0])
  let userInfo = Object.assign(imUserInfo, thirdUserInfo?.data[0]);
  userInfo.followCount = followCount;
  userInfo.beFollowCount = beFollowCount;
  userInfo.walletName = walletName;
  userInfo.introduce = introduce;
  return userInfo;
};
/**
 * 获取非当前登陆IM，用户信息
 */
export const getOtherUserInfo = async (
  ids: Array<string>,
  walletName: string
) => {
  const imUserInfo = await IMServiceManager.getInstance().getUsersInfo(ids);
  const thirdUserInfo = await getThirdStatusApi(ids);
  const followCount = await getFollowCount(ids[0]);
  const beFollowCount = await getbeFollowCount(ids[0]);
  const introduce = await UserService.getUserProfile(ids[0]);
  let userInfo = Object.assign(
    imUserInfo[0]?.publicInfo,
    thirdUserInfo?.data[0]
  );
  userInfo.followCount = followCount;
  userInfo.beFollowCount = beFollowCount;
  userInfo.walletName = walletName;
  userInfo.introduce = introduce;
  return userInfo;
};
/**
 * 获取用户绑定的第三方信息信息
 * @param userIDList
 */
export const getFollowCount = async (userId: string) => {
  //true我追随的，false追随我的
  const followInfo =
    await IMServiceManager.getInstance().getFollowFriendApplicationList({
      toUserID: userId,
      selectFans: true,
    });
  return JSON.parse(followInfo?.data).length;
};
export const getbeFollowCount = async (userId: string) => {
  //true我追随的，false追随我的
  const beFollowInfo =
    await IMServiceManager.getInstance().getFollowFriendApplicationList({
      toUserID: userId,
      selectFans: false,
    });
  return JSON.parse(beFollowInfo?.data).length;
};
/**
 * 获取用户绑定的第三方信息信息
 * @param userIDList
 */
const getThirdStatusApi = (userIDList: string[], token?: string) => {
  return IDBITRequest.post(
    "/user/get_third_status",
    { userIDList, operationID: Date.now() + "" },
    true
  );
};

/**
 * 绑定域名
 * @param ensDomain
 */
export const bindEnsDomainApi = async (userID: string, ensDomain: string) => {
  const resp = await IDBITRequest.post(
    "/user/bind_ens_domain",
    { userID, ensDomain, operationID: Date.now() + "" },
    true
  );
  return resp;
};

/**
 * 获取验证码
 * @param userInfo
 */
export const sendSmsApi = async (
  phoneNumber: string,
  email = "",
  usedFor = 3,
  areaCode = "86"
) => {
  const resp = await IDBITRequest.post(
    "/user/sendSms",
    { phoneNumber, email, usedFor, areaCode, operationID: Date.now() + "" },
    true
  );
  return resp;
};
/**
 * updateTelephoneInfo
 * @param userInfo
 */
export const updateTelephoneInfoApi = async (
  code: string,
  phoneNumber: string,
  email = "",
  areaCode = "86",
  updateSecret?: string
) => {
  const resp = await IDBITRequest.post(
    "/user/updateTelephoneInfo",
    {
      areaCode,
      code,
      email,
      phoneNumber,
      operationID: Date.now() + "",
      updateSecret,
    },
    true
  );
  return resp;
};
/**
 * delThirdPlatformApi
 * @param platformName: "twitter" | "phone" | "dnsmain" | " ensdomain" | "facebook" | 'faceURL'
 */
export const delThirdPlatformApi = async (
  platformName:
    | "twitter"
    | "phone"
    | "dnsDomain"
    | "ensDomain"
    | "facebook"
    | "faceURL"
) => {
  const resp = await IDBITRequest.post(
    "/user/delThirdPlatform",
    { platformName, operationID: Date.now() + "" },
    true
  );
  return resp;
};
/**
 * 查询NFT
 */
export const getNfts = async (data: any) => {
  const { address } = data.params;
  const { chainId } = data.params;
  let chains;
  // constants.isReleaseEnvironment
  //   ? `ethereum,optimism,polygon,arbitrum,ethereum-goerli,bsc,bsc-testnet`
  //   : `ethereum,optimism,polygon,arbitrum,bsc`;
  if (constants.isReleaseEnvironment == true) {
    if (chainId == 1) {//以太坊
      chains = 'ethereum'
    }
    else if (chainId == 137) {
      chains = 'polygon'
    }
    else if (chainId == 56) {
      chains = 'bsc'
    }
  }
  else {
    if (chainId == 1) {//以太坊
      chains = 'ethereum-goerli'
    }
    else if (chainId == 137) {
      chains = 'polygon-mumbai'
    }
    else if (chainId == 56) {
      chains = 'bsc-testnet'
    }
  }
  const res = await HashRequest.get("/v0/nfts/owners", {
    chains: chains,
    wallet_addresses: address,
    limit: 50,
  });
  var new_res = new Array();
  let rowCount = 0;
  if (res.nfts.length % 2) {
    rowCount = parseInt(res?.nfts.length / 2) + 1;
  } else rowCount = res?.nfts.length / 2;
  for (var i = 0; i < rowCount; i++) {
    var sub_arr = new Array();
    for (var j = 0; j < 2; j++) {
      if (i * 2 + j < res.nfts.length) {
        var new_dic = res?.nfts[i * 2 + j];
        sub_arr.push(new_dic);
      } else {
        sub_arr.push("zhanwei");
      }
    }
    new_res.push(sub_arr);
  }
  res.nfts = new_res;
  // console.log('11111111111111========='+JSON.stringify(res))
  return { list: res?.nfts };
};
/**
 * updateUserInfo
 * @param userInfo
 */
export const updateUserInfoApi = async (userInfo: any) => {
  const resp = await IDBITRequest.post(
    "/user/update_user_info",
    { ...userInfo, operationID: Date.now() + "" },
    true
  );
  return resp;
};

export const getGasFee = async () => {
  let big_gas = await gd.public_provider.getGasPrice();
  const gas = ethers.utils.formatEther(big_gas);
  return gas;
};
/**
 * 获取单个代币余额
 */
export const getMainTokenWithChainId = async (
  wallet_address: string,
  chainId: number,
) => {
  let balance = 0.00;

  const thisGd = {
    public_provider: null as any,
  }
  thisGd.public_provider= getProvider(chainId)
  let big_balance = await thisGd.public_provider.getBalance(wallet_address);
  balance = ethers.utils.formatEther(big_balance);
  return (parseFloat(balance).toFixed(5) || 0.00).toString() +(chainId==1?' ETH':chainId==56?' BNB':' MATIC');
}
/**
 * 获取单个代币余额
 */
export const getTokenFee = async (
  wallet_address: string,
  token_address: string,
  token_name: string,
  token_abi: any
) => {
  try {
    let balance = 0.00;
    //eth self
    console.log("dAddress:===========" + JSON.stringify(wallet_address));
    if (token_name == "ETH" || token_name == "MATIC" || token_name == "BNB") {
      let big_balance = await gd.public_provider.getBalance(wallet_address);
      balance = ethers.utils.formatEther(big_balance);
      return parseFloat(balance).toFixed(5) || 0.0;
    } else {
      try {
        let contract = new ethers.Contract(
          token_address,
          token_abi,
          gd.public_provider
        );
        if (contract != null) {
          console.log("contract:成功： \n" + JSON.stringify(token_address));
          let asset_big_balance = await contract.balanceOf(wallet_address);
          balance = ethers.utils.formatEther(asset_big_balance);
        } else {
          balance = -1;
        }
        return parseFloat(balance).toFixed(5) || 0.0;
      } catch (e) {
        console.log("contract链接:error" + e);
        return parseFloat(balance).toFixed(5) || 0.0;
      }
    }
  } catch (e) {
    console.log("getDaibi_amount:error" + e);
    return parseFloat(balance).toFixed(5) || 0.0;
  } //get balance
};

export const transferNftContract = async (
  zhuzhaoAdress: string, //目标地址
  wallet_address: any,
  pwd: string,
  toAdress: string,
  tokenId: string,
  zhuzhaoAdress_abi: any,
  assetsId: string,
  showLoading: Function,
  chainId: number
) => {
  //第一步,连代币合约,省略
  const prov = gd.public_provider;
  let wallet;
  try {
    const local_wallet = await pstorage.wallet(wallet_address);
    wallet = await ethers.Wallet.fromEncryptedJson(local_wallet.keyStore, pwd);
    showLoading();
  } catch (e) {
    Alert.alert(t('my.pwdError'))
    console.log("wallet=====" + e);
    return;
  }
  let connect_wallet = wallet.connect(prov);
  console.log("=========================\n" + JSON.stringify(wallet_address));
  await transferToken(
    wallet_address,
    zhuzhaoAdress,
    toAdress,
    connect_wallet,
    tokenId,
    zhuzhaoAdress_abi,
    assetsId,
    chainId
  );
};

const transferToken = async (
  fromAddress: string,
  zhuzhaoAdress: string,
  toAdress: string,
  connect_wallet: any,
  tokenId: string,
  zhuzhaoAdress_abi: any,
  assetsId: string,
  chainId: number
) => {
  try {
    let zhuzhao_token = new ethers.Contract(
      zhuzhaoAdress,
      zhuzhaoAdress_abi,
      connect_wallet
    );
    if (zhuzhao_token) {
      console.log(
        "nft铸造合约,链接成功 \n 合约信息:" + JSON.stringify(zhuzhao_token)
      );
      try {
        console.log("toAdress \n :" + JSON.stringify(toAdress));
        // Alert.alert("tokenId:" + JSON.stringify(tokenId));
        let reslut;
        // if (chainId == 1) {
        reslut = await zhuzhao_token.transferFrom(
          fromAddress,
          toAdress,
          tokenId
        );
        // }
        // else {
        //   // Alert.alert(JSON.stringify(chainId))
        // console.log("zhuzhao_token=========================\n" + JSON.stringify(zhuzhao_token));

        //   reslut = await zhuzhao_token.transferOwn(
        //     fromAddress,
        //     toAdress,
        //     tokenId
        //   );
        // }

        // Alert.alert("转移nft成功:" + JSON.stringify(toAdress));
        // console.log("转移nft成功 \n", JSON.stringify(ok));
        // toast('转移nft成功')
        // setTimeout(() => {
        //   Navigate.navigate("Tab");
        // }, 1000);
      } catch (e) {
        console.log("eeeeeeee=========================\n" + JSON.stringify(zhuzhao_token));
        Alert.alert("转移nft error:" + e);
      }
    }
  } catch (e) {
    Alert.alert(" 合约链接错误:" + e);
  }
};

/**
 * 根据id数组,获取代币详情列表
 */
export const getTokenListByCoinNames = async (coinNames: any, address: any) => {
  // path?: any, params: any
  let price = 0;
  let newArr = new Array();
  let item = {
    amount: 0.00,
    name: '',
    price: 0.00
  }
  for (var i = 0; i < coinNames.length; i++) {
    item.coinName = coinNames[i];
    let amount;
    try {
      amount = await getTokenFee(
        address,
        getTokenContract(),
        item?.coinName,
        getTokenAbi()
      );
    } catch (e) {
      console.log("amount:error===========" + JSON.stringify(newArr));
    }
    const rate = await getRateByToken(item?.coinName);
    price = amount * rate || 0.0;
    console.log("newArr===========" + JSON.stringify(amount));
    item.amount = amount;
    item.price = parseFloat(price).toFixed(5) || 0.0;
    newArr.push(item);
  }

  // res.allPrice = price || 0.00;
  // res.data = newArr;

  return newArr;
};
/**
 * 获取当前钱包，所有代币详情列表
 */
export const getTokenList = async (data?: any) => {
  // path?: any, params: any
  console.log("getDaiBiList======" + JSON.stringify(data));
  const params = data?.params;
  const imUserInfo = params?.imUserInfo;
  const wallet = await pstorage.wallet(imUserInfo?.userID);
  const coinInfos = wallet.coinInfos;
  let price = 0;
  let newArr = new Array();
  for (var i = 0; i < coinInfos.length; i++) {
    let item = coinInfos[i];
    let amount;
    try {
      amount = await getTokenFee(
        wallet?.address,
        item?.coinToken,
        item?.coinName,
        getTokenAbi()
      );
    } catch (e) {
      console.log("amount:error===========" + JSON.stringify(newArr));
    }
    const rate = await getRateByToken(item?.coinName);
    price = amount * rate || 0.0;
    console.log("newArr===========" + JSON.stringify(amount));
    item.amount = amount;
    item.price = parseFloat(price).toFixed(5) || 0.0;
    newArr.push(item);
  }

  // res.allPrice = price || 0.00;
  // res.data = newArr;

  return {
    list: newArr,
  };
};
/**
 * 我关注的
 */
export const getLikes = async (data: any) => {
  //true我追随的，false追随我的
  const params = data?.params;
  const userId = params?.userId;
  const followInfo =
    await IMServiceManager.getInstance().getFollowFriendApplicationList({
      toUserID: userId,
      selectFans: true,
    });
  const resp = JSON.parse(followInfo?.data);
  return { list: resp };
};

/**
 * 关注我的
 */
export const getFollowings = async (data: any) => {
  //true我追随的，false追随我的
  const params = data?.params;
  const userId = params?.userId;
  const followInfo =
    await IMServiceManager.getInstance().getFollowFriendApplicationList({
      toUserID: userId,
      selectFans: false,
    });
  const resp = JSON.parse(followInfo?.data);

  const likeInfo =
    await IMServiceManager.getInstance().getFollowFriendApplicationList({
      toUserID: userId,
      selectFans: true,
    });
  const resp2 = JSON.parse(likeInfo?.data);
  let new_res = [];
  for (let index = 0; index < resp.length; index++) {
    const element = resp[index];
    let has = false;
    for (let index = 0; index < resp2.length; index++) {
      const element2 = resp2[index];
      if (element.userID == element2.userID) has = true;
    }
    element.isLike = has;
    new_res.push(element)
  }
  return { list: new_res };
};


export const changeLikeStatus = async (toUserID: string, islike: boolean) => {
  const resp = await IMServiceManager.getInstance().followAddFriend({
    toUserID: toUserID,
    follow: islike
  })
  return resp
}
/**
 * 编辑简介
 * @param userProfile 
 * @returns 
 */
export const updateProduce = async (userProfile: string) => {
  const resp = await IDBITRequest.post('/user/update_user_profile', { 'userProfile': userProfile, operationID: new Date().getTime().toString() }, true)
  return resp;
}
/**
 * 获取用户简介
 * @param userProfile 
 * @returns 
 */
export const getUserProfile = async (userId: string) => {
  const resp = await IDBITRequest.post('/user/get_user_profile', { operationID: new Date().getTime().toString(), userId: userId }, true)
  return resp?.data?.userProfile;
}


/**
 * 获取用户在线状态
 * @param userProfile 
 * @returns 
 */
export const getOnline = async (userIDList: string[]) =>{
  const resp = await IDBITRequest.post('/user/get_users_online_status', { operationID: new Date().getTime().toString(), userIDList: userIDList }, true)
    return resp?.data;
}
/**
 * 邮箱登录
 * @param userProfile 
 * @returns 
 */ 
export const loginEmail = async (data: any) => {
  log(data,'loginEmail')
  const resp = await CommonRequest.post(constants.BASE_HOST_V3+ '/graph/loginEmail', JSON.stringify(data))
  return resp;
}
/**
 * 邮箱注册账号
 * @param userProfile 
 * @returns 
 */ 
export const registerEmailCode = async (data: RegisterEmailParams) => {
  log(data,'CommonService.ts')
  const resp = await CommonRequest.post(constants.BASE_HOST_V3+ '/graph/registerEmailCode', JSON.stringify((data)))
  return resp;
}
/**
 * 请求邮箱验证码
 * @param userProfile 
 * @returns 
 */ 
export const getEmailCode = async (data: emailCodeParams) => {
  const resp = await CommonRequest.post(constants.BASE_HOST_V3+ '/graph/getEmailCode', JSON.stringify((data)));
  return resp;
}