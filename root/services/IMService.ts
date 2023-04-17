import { IDBITRequest } from "@/request/index";
import { normalizeHexAddress } from "@/utils/regular";
import { log, sleep, toast } from "@/utils/system";
import { ethers } from "ethers";
import { remove } from "lodash";
import { Alert } from "react-native";
import { HomeService } from ".";
import constants, { ReduxToken } from "../constants";
import IMServiceManager from "../utils/IMServiceManager";
import { OpenIMSDK } from "./open_im_sdk";
import { messageTypes } from "./open_im_sdk/constants/messageContentType";
import { JoinGroupParams, MarkGroupParams, PinCveParams } from "./open_im_sdk/types";

/**
 * 获取授权token
 */
export const getMssage_loading = async () => {
  const resp = await IDBITRequest.post("/v66/api/loginloading", {});
  return resp?.data;
};
/**
 * 置顶、取消置顶
 */
export const pinConversation = async (imIns: OpenIMSDK, sendReduxAction: any, parmas: PinCveParams) => {
  try {
    await imIns.pinConversation(parmas)
    sendReduxAction(ReduxToken.NEEDRELOADCHATLIST, {})
  } catch (error) {
    toast('失败：' + JSON.stringify(error))
  }
};
/**
* 搜索
*/
const compareList = (value: string, list: any) => {
  // value:要查询的字符串
  // list:这里匹配，lis必须是个数组
  if (value) {
    let arr = [] as Array<any>
    list.forEach((el: any) => {
      if (el.userID.indexOf(value) >= 0) {
        arr.push(el)
      }
    })
    return arr;
  }
}
export const searchUser = async (data: any) => {
  const { imIns, wallet, text } = data.params
  const respData = await imIns.getAllConversationList()
  const list = JSON.parse(respData?.data);
  const respData2 = await imIns.getFollowFriendApplicationList({
    toUserID: wallet?.address.toLowerCase(), selectFans: true//true我追随的，false追随我的
  })
  const list2 = JSON.parse(respData2?.data);
  for (var i = 0; i < list.length; i++) {
    let isChongfu = false;
    let chongfuI_index = 0;
    for (var j = 0; j < list2.length; j++) {
      if (list[i]?.nickname == list2[j]?.showName) {
        isChongfu = true;
        chongfuI_index = j;
      }
    }
    if (isChongfu == true) list2.splice(chongfuI_index, 1)
  }
  const finalList = list.concat(list2)
  log(finalList,'finalList')
  
  const result = compareList(text.toLowerCase(), finalList)
  log(finalList,'result')
  return { list: result ?? [] };
};
/**
 * 检测是否跟谁
 */
export const checkIsFollower = async (imIns: OpenIMSDK, selfID: string, toUserID: string) => {
  try {
    const respData = await imIns.getFollowFriendApplicationList({
      toUserID: selfID,
      selectFans: true, //true我追随的，false追随我的
    });
    const list = JSON.parse(respData?.data)
    let isHave = false
    for (var i = 0; i < list.length; i++) {
      if (list[i].userID == toUserID) isHave = true;
    }
    return isHave;

  } catch (error) {
    toast('失败：' + JSON.stringify(error))
  }
};



export const getMesgHistory = async (chatData: any) => {
  return await IMServiceManager.getInstance().getHistoryMessageList(chatData);
}
export const getMesgHistory_group = async (chatData: any) => {
  return await IMServiceManager.getInstance().getHistoryMessageList_group(chatData);
}

export const readMsg = async (chatData: any, messages_id: any) => {
  return await IMServiceManager.getInstance().readMsg(chatData, messages_id);
}
export const markGroupMessageAsRead = async (data: MarkGroupParams) => {
    return await IMServiceManager.getInstance().markGroupMessageAsRead(data);
}

export const sendMsg = async (chatData: any, text: string) => {
  return await IMServiceManager.getInstance().sendsocketms(chatData, text);
}
export const sendMsg_group = async (chatData: any, text: string,channelID:any) => {
  return await IMServiceManager.getInstance().sendsocketms_group(chatData, text,channelID);
}
export const joinGroup = async (data: JoinGroupParams) => {
  return await IMServiceManager.getInstance().joinGroup(data);
  }

  export const quitGroup = async (data: string) => {
    return await IMServiceManager.getInstance().quitGroup(data);
    }
  
  export const deleteConversation = async (data: string) => {
    return await IMServiceManager.getInstance().deleteConversation(data);
    }
  
export const changeLoginAccount = async (reduxParams: any, wallet: any,) => {

  const e_wallet = new ethers.Wallet(wallet.privateKey);//根据密钥生成钱包

  const nonceCode = await HomeService.getNonceCode(e_wallet?.address.toLowerCase())
  const signMessage = await e_wallet.signMessage(nonceCode)
  const res = await HomeService.getLoginToken(e_wallet?.address.toLowerCase(), signMessage)
  const config = {
    userID: res?.userID,
    token: res?.token,
    url: constants.IM_HOST,
    platformID: 5,
    operationID: Date.now() + "",
  }
  return await IMServiceManager.getInstance().changeLoginAccount(res, config, reduxParams, wallet);
}
export const getMsgList = async (data: any) => {
  const { imUserInfo ,t} = data.params
    let respData = await IMServiceManager.getInstance().getAllConversationList();
    let list ;
// log(respData,'getAllConversationListgetAllConversationList')
if(respData==undefined||respData==null||!respData)return;
    else list = JSON.parse(respData?.data);
    const respData2 = await IMServiceManager.getInstance().getFollowFriendApplicationList({
      toUserID: IMServiceManager.getInstance().getUserID(),
      selectFans: true, //true我追随的，false追随我的
    });
    let list2;
    if(respData2==undefined||respData2==null||!respData2)list2=[];
    else list2 = JSON.parse(respData2?.data);
    let follower_pinned = new Array();
    let follower_unPinned = new Array();

    let mosheng_pinned = new Array();
    let mosheng_unPinned = new Array();
    for (var i = 0; i < list.length; i++) {
      let isFollw = false;
      for (var j = 0; j < list2.length; j++) {
        if (list[i]?.userID == list2[j]?.userID) {
          isFollw = true
        }
      }
      if(list[i]?.groupID.length==0||list[i]?.groupID==undefined){
      if (list[i]?.isPinned == true) {
        if (isFollw == true) follower_pinned.push(list[i]);
        else mosheng_pinned.push(list[i]);
      }
      else {
        if (isFollw == true) follower_unPinned.push(list[i]);
        else mosheng_unPinned.push(list[i]);

      }
      }
    }
    const map_follower = [t('home.following')]
      .concat(follower_pinned)
      .concat(follower_unPinned);
    const map_mosheng = [t('home.messageFromStrangers')]
      .concat(mosheng_pinned)
      .concat(mosheng_unPinned);
    const finalList = map_follower.concat(map_mosheng);
    return { list: finalList };
}

export const getConvasationID = async (groupID: string) => {
const res=  await IMServiceManager.getInstance().getAllConversationList();
const data=JSON.parse(res.data)
for (let index = 0; index < data.length; index++) {
  const element = data[index];
  if(element.groupID==groupID)return element;
} 
}

