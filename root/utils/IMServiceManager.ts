import { handleFixIpfs, log, toast } from "@/utils/system";
import { Alert } from "react-native";
import Toast from "react-native-root-toast";
import { UserService } from "../services";
import { ReduxToken } from "../constants";
import { OpenIMSDK } from "../services/open_im_sdk";
import { t } from "i18next";
import { messageTypes, tipsTypes } from "@/services/open_im_sdk/constants/messageContentType";
import { JoinGroupParams, MarkGroupParams } from "@/services/open_im_sdk/types";

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
  async logout() {
    this._imInstance.logout(new Date().getTime().toString())
  }
  async getHistoryMessageList(chatData: any) {
    log(chatData, 'getHistoryMessageList')

    const params = {
      userID: chatData?.userID ?? '',
      groupID: chatData?.groupID ?? '',
      count: chatData?.count,
      startClientMsgID: chatData?.startClientMsgID ,
    };
    const respData = await this._imInstance.getHistoryMessageList(params)
    const list = JSON.parse(respData?.data)
    let messages_ = new Array();
    for (let index = 0; index < list.length; index++) {
      const element = list[list.length - (index + 1)];
      if(element.contentType==messageTypes.TEXTMESSAGE||element.contentType==messageTypes.PICTUREMESSAGE||element.contentType==messageTypes.VOICEMESSAGE) {
        messages_.push({
          clientMsgID:element?.clientMsgID,
          _id: element.createTime,
          text: element.content,
          createdAt: element.createTime,
          user: {
            _id: element.sendID,
            name: element.senderNickname,
            avatar: handleFixIpfs(element.senderFaceUrl)
          },
        })
      };
    
    }
    return messages_;
  }

  async getHistoryMessageList_group(chatData: any) {

    const params = {
      groupID: chatData?.groupID ?? '',
      channelID: chatData?.channelID ?? '',
      count: chatData?.count,
      startClientMsgID: chatData?.startClientMsgID,
    };
    log(params,'getHistoryMessageList_group');
    const respData = await this._imInstance.getHistoryMessageList(params)
    const list = JSON.parse(respData?.data);
    let messages_ = new Array();
    for (let index = 0; index < list.length; index++) {
      const element = list[list.length - (index + 1)];
     
      if(element.contentType==messageTypes.TEXTMESSAGE||element.contentType==messageTypes.PICTUREMESSAGE||element.contentType==messageTypes.VOICEMESSAGE) {
        log(element.content,'lement.content')
          if(element.content.indexOf('aiHtml')==-1)  
          messages_.push({
            clientMsgID:element?.clientMsgID,
            _id: element?.createTime+index+new Date().getTime().toString(),
            text: element?.content,
            createdAt: element?.createTime,
            user: {
              _id: element?.sendID,
              name: element?.senderNickname,
              avatar: handleFixIpfs(element?.senderFaceUrl)
            },
          })
      };
    
    }
    return messages_;
  }

  async readMsg(chatData: any, messages_id: any) {
    try {
      await this._imInstance.markC2CMessageAsRead({ userID: chatData?.userID, msgIDList: messages_id })
    } catch (error) {
      log(error,'markC2CMessageAsRead')
    }

  }
  async markGroupMessageAsRead(data: MarkGroupParams) {
    try {
      await this._imInstance.markGroupMessageAsRead(data)
    } catch (error) {
      log(error,'markGroupMessageAsRead')
    }
  }
  async createTextMessage(text: any) {
    return  await this._imInstance.createTextMessage(text,new Date().getTime().toString())

  }

  async getFollowFriendApplicationList(params: any) {
    if(!this._imInstance) return
    try {
      return await this._imInstance.getFollowFriendApplicationList(params)
    } catch (error) {
      log(error,'关注人接口：错误')
    }

  }

  async followAddFriend(params: any) {
    if(!this._imInstance) return
    try {
      return await this._imInstance.followAddFriend(params)
    } catch (error) {
      Alert.alert(JSON.stringify('followAddFriend：error'))
      log(error,'followAddFriend')
    }

  }
  async updateProduce(params: any) {
    try {
      return await this._imInstance.updateProduce(params, new Date().getTime().toString())
    } catch (error) {
      Alert.alert(JSON.stringify('updateProduce：error'))
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
  uuid() {
    return (Math.random() * 36).toString(36).slice(2) + new Date().getTime().toString();
  }
  async getSelfUserInfo() {
    const data = await this._imInstance.getSelfUserInfo();
    return JSON.parse(data?.data);
  }
  async deleteConversation (conversationId: string){
    const res = await this._imInstance.deleteConversation(conversationId);
    return JSON.parse(res?.data);
  }
  async getUsersInfo (data: string[]){
    const res = await this._imInstance.getUsersInfo(data, new Date().getTime().toString());
    return JSON.parse(res?.data);
  }
  async getJoinedGroupList() {
    if(!this._imInstance) return
    try {
      return await this._imInstance.getJoinedGroupList()
    } catch (error) {
      Alert.alert('getJoinedGroupList错误：'+JSON.stringify(error))
    }

  }
  async joinGroup (data: JoinGroupParams){
    const res = await this._imInstance.joinGroup(data);
    return res;
  }
  async quitGroup (data: string){
    const res = await this._imInstance.quitGroup(data);
    return res;
  }
  async changeLoginAccount(res: any, config: any, reduxParams: any, wallet: any,) {
    const { sendReduxAction } = reduxParams;
    try {
      await this._imInstance.logout();
      var imIns = new OpenIMSDK()
      await imIns.login(config);
      this._imInstance = imIns;
      let commonData = IMServiceManager.getInstance();
      commonData.setToken(res?.token)
      commonData.setUserID(res?.userID)
      // toast('IM账号登录成功')
      const info = await UserService.getUserInfo([res?.userID], wallet?.name)
      sendReduxAction(ReduxToken.REFRESH_IMUserInfo, { imUserInfo: info })
      sendReduxAction(ReduxToken.NEEDRELOADCHATLIST, {})
      sendReduxAction(ReduxToken.NEEDRELOAD_COMMUNITYLIST, {})
      sendReduxAction(ReduxToken.NEEDRELOADCONTACT, {})
    }
    catch {
      toast(t('my.exchangeImError'))
    }

  }
  async sendsocketms(chatData: any, text: string) {
    const { data } = await this._imInstance.createTextMessage(text);
    const msg = {
      recvID: chatData?.userID,
      groupID: '',
      message: data,
      offlinePushInfo: {
        title: "你有一条新消息",
        desc: "",
        ex: "",
        iOSPushSound: "+1",
        iOSBadgeCount: true,
      }
    }

    try {
      const resp = await this._imInstance.sendMessage(msg, this.uuid())
    } catch (error) {
      Toast.show(t('home.sendError') + JSON.stringify(error), { position: Toast.positions.CENTER })
    }

    
  }
    

  async sendsocketms_group(chatData: any, text: string,channelID:any) {
    const { data } = await this._imInstance.createTextMessage(text);
    const sendOption = {
      recvID: '',
      groupID: chatData?.groupID,
      message: data,
      channelID: channelID,
      offlinePushInfo: {
        title: "你有一条新消息",
        desc: "",
        ex: "",
        iOSPushSound: "+1",
        iOSBadgeCount: true,
      }
    };
    try {
      const resp = await this._imInstance.sendMessage(sendOption, this.uuid())
      return resp;
    } catch (error) {
      return error;
      // Toast.show(t('home.sendError') + JSON.stringify(error), { position: Toast.positions.CENTER })
    }


  }
}