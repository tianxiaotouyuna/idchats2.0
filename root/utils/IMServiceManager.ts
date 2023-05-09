import { handleFixIpfs, log, toast } from "@/utils/system";
import { Alert } from "react-native";
import Toast from "react-native-root-toast";
import { ReduxToken } from "../constants";
import { t } from "i18next";
import { OpenIMSDK } from "./open_im_sdk";
import { messageTypes } from "./open_im_sdk/constants/messageContentType";
import { JoinGroupParams, MarkGroupParams } from "./open_im_sdk/types";
import { IDBITRequest } from "../request";

export default class IMServiceManager {

  static myInstance = null as IMServiceManager;

  _userID = "";

  _imInstance = null as OpenIMSDK;

  _token = '';
  _chainId = 1;
  _rateBase = {};
  /**
   * @returns {IMServiceManager}
   */
  static getInstance() {
    if (IMServiceManager.myInstance == null) {
      IMServiceManager.myInstance = new IMServiceManager();
    }
    return this.myInstance;
  }
  getUserID() {
    return this._userID;
  }

  setUserID(id: any) {
    this._userID = id;
  }

  getImInstance() {
    return this._imInstance;
  }

  setImInstance(imns: any) {
    this._imInstance = imns;

  }
  setToken(token: string) {
    this._token = token;
  }
  getToken() {
    return this._token;
  }
  setChainId(chainId: number) {
    this._chainId = chainId;
  }
  getChainId() {
    return this._chainId;
  }
  setRateBase(rateBase: string) {
    this._rateBase = rateBase;
  }
  getRateBase() {
    return this._rateBase;
  }

  async getJoinedGroupList() {
    if(!this._imInstance) return
    try {
      return await this._imInstance.getJoinedGroupList()
    } catch (error) {
      Alert.alert('getJoinedGroupList错误：'+JSON.stringify(error))
    }

  }

  async getAllConversationList() {
    if(!this._imInstance) return
    try {
      return await this._imInstance.getAllConversationList()
    } catch (error) {
      Alert.alert(JSON.stringify('getAllConversationList：error'))
    }

  }
  async getSelfUserInfo() {
    const data = await this._imInstance.getSelfUserInfo();
    return JSON.parse(data?.data);
  }
  async getFollowFriendApplicationList(params: any) {
    if(!this._imInstance) return
    try {
      return await this._imInstance.getFollowFriendApplicationList(params)
    } catch (error) {
      log(error,'关注人接口：错误')
    }

  }
  async logout() {
    const data = await this._imInstance.logout();
    return JSON.parse(data?.data);
  }
  async getUsersInfo (data: string[]){
    const res = await this._imInstance.getUsersInfo(data, new Date().getTime().toString());
    return JSON.parse(res?.data);
  }
  
}
