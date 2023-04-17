import { gd, setProvider } from "@/utils/pglobal";
import storage from "@/utils/pstorage";
import "@ethersproject/shims"
import { ethers, providers } from "ethers";
import { log, toast } from "@/utils/system";
import constants, { CacheKeys, ReduxToken } from "../constants";
import { Storage } from "../utils";
import { CbEvents, OpenIMSDK } from "./open_im_sdk";
import { WsResponse } from "./open_im_sdk/types";
import { CommunityService, HomeService, UserService } from "@/services/index";
import IMServiceManager from "../utils/IMServiceManager";
import { LANGUNECOD } from "@/constants/cache-keys";
import i18n from "@/utils/locales";
import { Network } from "@ethersproject/networks";
import { t } from "i18next";
import { Alert } from "react-native";

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

  const nonceCode = await HomeService.getNonceCode(e_wallet?.address.toLowerCase())
  const signMessage = await e_wallet.signMessage(nonceCode)
  const res = await HomeService.getLoginToken(e_wallet?.address.toLowerCase(), signMessage)
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
    // sendReduxAction(ReduxToken.INIT_TOKEN, { token: res?.data?.token })
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



  //  const matic: Network = {
  //     name: 'matic',
  //     chainId: 137,
  //     _defaultProvider: (providers) => new providers.JsonRpcProvider('rpc-url')
  // }
  // gd.public_provider = ethers.getDefaultProvider(matic);
  // import those networks where ever you want to use it with getDefaultProvider
  // gd.public_provider = new providers.InfuraProvider(ethers.providers.getNetwork("arbitrum-goerli"), "11a4f41ed7074cb6bb93a88d3fc421b0")