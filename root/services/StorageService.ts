import { gd, setProvider } from "@/utils/pglobal";
import storage from "@/utils/pstorage";
import "@ethersproject/shims"
import { ethers, providers } from "ethers";
import { log, toast } from "@/utils/system";
import constants, { CacheKeys, ReduxToken } from "../constants";
import { Storage } from "../utils";
import IMServiceManager from "../utils/IMServiceManager";
import { t } from "i18next";
import { CbEvents, OpenIMSDK } from "@/utils/open_im_sdk";
import * as UserService from "./UserService";
import { WsResponse } from "@/utils/open_im_sdk/types";
import { IDBITRequest } from "../request";

export const load_initState = async (reduxParams: any) => {
  const wallets = await storage.wallets();
  const walletPwd = await Storage.load(CacheKeys.WALLETPWD);
  const laungueCode = await Storage.load(CacheKeys.LANGUNECOD);
  const unitCode = await Storage.load(CacheKeys.UNITCODE);
  const chainId = await Storage.load(CacheKeys.CHAINID);
  const selectWallet = await Storage.load(CacheKeys.SELECTWALLET);
  const initState = {
    imIns: null as OpenIMSDK,
    chatList: null as Array<any>,
    wallet: wallets[wallets.length - 1] || null,
    walletPwd: walletPwd || null,
    isInChatDetail: false,
    unitCode: unitCode,
    laungueCode: laungueCode,
    useTokenName: 'ETH',
    chainId: chainId,
    selectWallet: selectWallet
  };
  let commonData = IMServiceManager.getInstance();
  commonData.setChainId(chainId);
  setUnit(reduxParams, unitCode);
  setProvider(chainId);
  log(wallets,'walletswallets');
  //2自动登录im
  if (wallets && wallets.length) login_im(reduxParams, true, selectWallet);
  // else toast('IM账号登录错误\n 未创建钱包')
  return { initState: initState };
};
const setUnit = (reduxParams: any, unitCode: number) => {
  const { sendReduxAction } = reduxParams;
  sendReduxAction(ReduxToken.CHANGE_UNIT, { unitCode: unitCode })
}
export const login_im = async (reduxParams: any, isAuto: boolean, selectWallet: any) => {
  const { sendReduxAction } = reduxParams;
  let wallet;
  if (selectWallet == null) {
    const wallets = await storage.wallets();
    wallet = wallets[0]
  }
  else {
    wallet = selectWallet;
  }
  // const wallet = wallets[0];
  const e_wallet = new ethers.Wallet(wallet.privateKey);//根据密钥生成钱包

  const nonceCode = await UserService.getNonceCode(e_wallet?.address.toLowerCase())
  const signMessage = await e_wallet.signMessage(nonceCode)
  const res = await UserService.getLoginToken(e_wallet?.address.toLowerCase(), signMessage)
  var imIns = new OpenIMSDK()
  const config = {
    userID: res?.userID,
    token: res?.token,
    url: constants.IM_HOST,
    platformID: 5,
    operationID: Date.now() + "",
  }
  try {
    await imIns.login(config)

    let commonData = IMServiceManager.getInstance();
    commonData.setImInstance(imIns);
    commonData.setToken(res?.token)
    commonData.setUserID(res?.userID);
    sendReduxAction(ReduxToken.INIT_IM, { imIns: imIns })
    toast(t('home.imScuess'))
  } catch (error) {
    toast(t('home.imError') + JSON.stringify(error))
  }
  sendReduxAction(ReduxToken.NEEDRELOADCHATLIST, {})
  try {
    const imUserInfo = await IMServiceManager.getInstance().getSelfUserInfo();
    sendReduxAction(ReduxToken.REFRESH_IMUserInfo, { imUserInfo: imUserInfo })
    const userDetailInfo = await UserService.syncUserDetailInfo(imUserInfo, [res?.userID], wallet?.name)
    sendReduxAction(ReduxToken.REFRESH_IMUserInfo, { imUserInfo: userDetailInfo })
  } catch (error) {

    toast(t('home.imInfoError') + JSON.stringify(error))
  }
      sendReduxAction(ReduxToken.NEEDRELOAD_COMMUNITYLIST, {})
      imIns.on(CbEvents.ONCONVERSATIONCHANGED, (data: WsResponse) => {
    const pData = JSON.parse(data?.data);
    if (pData[0].groupID.length){
    log(pData, 'ONCONVERSATIONCHANGED')
    sendReduxAction(ReduxToken.NEEDRELOAD_COMMUNITYLIST, {})
    }
    else
      sendReduxAction(ReduxToken.NEEDRELOADCHATLIST, {})
  })
}

/**
 * 获取所有钱包
 */
export const getAllWallets = async (data: any) => {
  // const resp = await storage.wallets()
  // return {list:resp};
  const path = data?.path
  const params = data?.params
  const wallets = await storage.wallets_withChainID(params?.chainId)
  return { list: wallets }
}

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