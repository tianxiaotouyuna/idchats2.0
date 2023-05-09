import { log } from "@/utils/system";
import constants, { ReduxToken } from "../constants";
import { CommonRequest, HashRequest, IDBITRequest } from "../request";
import IMServiceManager from "@/utils/IMServiceManager";
import { messageTypes, tipsTypes } from "@/utils/open_im_sdk/constants/messageContentType";
import { EmailCodeParams, RegisterEmailParams, communityParam } from "@/utils/types";
import { t } from "i18next";
import { Alert } from "react-native";
import { UserService } from ".";
/**
 * 查询NFT
 */
export const getNfts = async (data: any) => {
  const { address, chainId } = data;
  let chains;
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

  return res?.nfts;
};
/**
 * 查询NFT
 */
export const getNfts_gDataList = async (data: any) => {
  const params = data?.params
  const { address, chainId } = params;
  let chains;
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
  return {list:res?.nfts};
};
/**
 * 获取所有网络
 */
export const getNetworks = async () => {
  const networks = [{ image: require('@/resources/second/eth.png'), text: 'Ethereum', chainId: 1 },
  { image: require('@/resources/second/btc.png'), text: 'Binance Smart', chainId: 1 },
  { image: require('@/resources/second/btc.png'), text: 'Polygon', chainId: 1 }];
  return networks
}

/**
 * 获取社区列表
 * @param ensDomain
 */
export const getCommunityList = async (data: any) => {
  // const { reduxParams, imUserInfo } = data.params
  // const grouplist = await IMServiceManager.getInstance().getJoinedGroupList();
  // const arr = JSON.parse(grouplist?.data)
  // let newRes = [];
  // for (let index = 0; index < arr.length; index++) {
  //   let newDic= {} as communityParam;
  //   const element = arr[index];
  //   const conversationData = await getUnreadCount(element?.groupID);
  //   newDic = element;
  //   newDic.faceURL = handleFixIpfs(element.faceURL);
  //   newDic.isJoinEd = true;
  //   newDic.conversationData = conversationData;
  //   let latestMsg = JSON.parse(conversationData.latestMsg);
  //   if (latestMsg.content.indexOf('aiHtml') != -1) latestMsg.content = ''
  //   if (latestMsg.contentType == tipsTypes.MEMBERENTER) {
  //     latestMsg.content = latestMsg.sendID + t('community.join') + t('community.community2')
  //     if (latestMsg.sendID == imUserInfo?.userID) latestMsg.content = t('community.welecome') + ' ' + latestMsg.senderNickname;
  //   }
  //   else if (latestMsg.contentType == tipsTypes.MEMBERQUIT) {
  //     latestMsg.content = latestMsg.sendID + t('community.withdraw2') + t('community.community2')
  //   }
  //   else if (latestMsg.contentType == tipsTypes.GROUPCHANNELINFOADD) {
  //     const info = JSON.parse(JSON.parse(latestMsg?.content)?.jsonDetail).groupChannelInfoTip;
  //     latestMsg.content = t('community.publish2') + info?.channelName
  //   }
  //   else if (latestMsg.contentType == tipsTypes.GROUPCREATED) {
  //     latestMsg.content = t('community.welcome') + ' ' + conversationData.showName
  //   }
  //   else if (latestMsg.contentType == messageTypes.TEXTMESSAGE || latestMsg.contentType == messageTypes.PICTUREMESSAGE) {
  //     if (latestMsg.channelID == '1' && latestMsg.content != '') {
  //       latestMsg.content = t('community.publish') + ' ' + latestMsg.content
  //     }
  //   }
  //   else if (latestMsg.contentType == tipsTypes.GROUPINFOUPDATED) {
  //     latestMsg.content = t('community.update')
  //   }
  //   newDic.conversationData.latestMsg = latestMsg;
  //   newRes.push(newDic)
  // }
  // log(newRes, 'newRes')
  // const { sendReduxAction } = reduxParams;
  // sendReduxAction(ReduxToken.SET_COMMUNITIES, { communities: newRes });
  // return { list: newRes }
  return { list: [] }
};
// qq123466
/**
 * 获取NonceCode
 */
export const getNonceCode = async (publicAddress: string) => {
  const resp = await IDBITRequest.post("/v1/api/noncecode", { publicAddress: publicAddress.toLowerCase(), operationID: Date.now() + "" });
  return resp?.data?.nonce;
};
/**
 * 获取授权token
 */
export const getLoginToken = async (publicAddress: string, signature: string) => {
  const resp = await IDBITRequest.post("/v1/api/login", { publicAddress: publicAddress.toLowerCase(), signature, operationID: Date.now() + "", platform: 5 });
  
  return resp?.data;
};

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
export const getEmailCode = async (data: EmailCodeParams) => {
  Alert.alert(JSON.stringify(data))
  const resp = await CommonRequest.post(constants.BASE_HOST_V3+ '/graph/getEmailCode', JSON.stringify((data)));
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
 * 退出登录
 */
export const logout = async () => {
  const resp =await IMServiceManager.getInstance().logout()
  return resp?.data;
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
const getThirdStatusApi = (userIDList: string[], token?: string) => {
  return IDBITRequest.post(
    "/user/get_third_status",
    { userIDList, operationID: Date.now() + "" },
    true
  );
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
