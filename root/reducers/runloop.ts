import { ReduxToken } from "../constants";
import { cloneDeep } from "lodash";
import { AnyAction } from "redux";
import { Alert } from "react-native";
import { FullUserItem } from "@/services/open_im_sdk/types";
import { OpenIMSDK } from "@/services/open_im_sdk";

const initState = {
  imIns: null as OpenIMSDK,
  chatList:null as Array<any>,
  wallet:null as any,
  needReloadContact:false,//只刷新联系人
  needReloadChatList:false,//只刷新聊天列表
  imUserInfo:null as FullUserItem,
    walletPwd:null as string,
  converstionType:0,//0消息列表，1:关注列表 2:聊天详情
  selectWallet:null as any,
  
  token:null as string,
  needReloadChatDetail:false,//只刷新聊天列表
  isInChatDetail:false,//在聊天页面
  laungueCode:null as number,
  unitCode:1,
  useTokenName:'ETH',
  tokensInfo:null as Array<any>,
  chainId:1,//0 ETterm, 1:Pylogy
  needReloadAssetsList:false,//只刷新聊天列表
  needReloadMyNftList:false,//只刷新聊天列表
  needReloadIntroduce:false,//只刷新聊天列表
  needReloadMyTop:false,//只刷新聊天列表
  needReloadCommunityList:false,//只刷社区列表
  communities:[] as Array<any>,//只刷社区列表
};
export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ReduxToken.INIT_IM: {
      const { imIns } = action?.payload;
      return cloneDeep({ ...state, imIns});
    }
    case ReduxToken.REFRESH_CHATLIST: {
      const { chatList } = action?.payload;
      return cloneDeep({ ...state, chatList });
    }
    case ReduxToken.REFRESH_WALLET: {
      const { wallet } = action?.payload;
      return cloneDeep({ ...state, wallet });
    }
    case ReduxToken.NEEDRELOADCONTACT: {
      return cloneDeep({ ...state, needReloadContact:!state.needReloadContact });
    }
    case ReduxToken.LOAD_INITSTATE: {
      const { initState } = action?.payload;
    return cloneDeep({...state,  ...initState });
    }
    case ReduxToken.NEEDRELOADCHATLIST: {
      return cloneDeep({ ...state, needReloadChatList:!state.needReloadChatList });
    }
    case ReduxToken.REFRESH_IMUserInfo: {
      const { imUserInfo } = action?.payload;
      return cloneDeep({ ...state, imUserInfo });
    }
    case ReduxToken.REFRESH_WALLETPWD: {
      const { walletPwd } = action?.payload;
      return cloneDeep({ ...state, walletPwd });
    }
    case ReduxToken.NEEDRELOAD_CHATDETAIL: {
      return cloneDeep({ ...state, needReloadChatDetail:!state.needReloadChatDetail });
    }
    case ReduxToken.INIT_TOKEN: {
      const { token } = action?.payload;
      return cloneDeep({ ...state, token });
    }
    case ReduxToken.CHANGE_LANGUAGE: {
      const { laungueCode } = action?.payload;
      return cloneDeep({ ...state, laungueCode });
    }
    case ReduxToken.CHANGE_UNIT: {
      const { unitCode } = action?.payload;
      return cloneDeep({ ...state, unitCode });
    }
    case ReduxToken.CHANGE_USETOKEN_NAME: {
      const { useTokenName } = action?.payload;
      return cloneDeep({ ...state, useTokenName });
    }
    case ReduxToken.GET_TOKENS_INFO: {
      const { tokensInfo } = action?.payload;
      return cloneDeep({ ...state, tokensInfo });
    }
    case ReduxToken.CHANGE_CHAIN: {
      const { chainId } = action?.payload;
      return cloneDeep({ ...state, chainId });
    }
    case ReduxToken.SELECTWALLET: {
      const { selectWallet } = action?.payload;
      return cloneDeep({ ...state, selectWallet });
    }
    case ReduxToken.NEEDRELOADASSETSLIST: {
      return cloneDeep({ ...state, needReloadAssetsList:!state.needReloadAssetsList });
    }
    case ReduxToken.NEEDRELOAD_MYNFTLIST: {
      return cloneDeep({ ...state, needReloadMyNftList:!state.needReloadMyNftList });
    }
    case ReduxToken.NEEDRELOAD_INTRODUCE: {
      return cloneDeep({ ...state, needReloadIntroduce:!state.needReloadIntroduce });
    }
    case ReduxToken.NEEDRELOAD_MYTOP: {
      return cloneDeep({ ...state, needReloadMyTop:!state.needReloadMyTop });
    }
    case ReduxToken.NEEDRELOAD_COMMUNITYLIST: {
      return cloneDeep({ ...state, needReloadCommunityList:!state.needReloadCommunityList });
    }
    case ReduxToken.SET_COMMUNITIES: {
      const { communities } = action?.payload;
      return cloneDeep({ ...state, communities });
    }
    default: {
      return state;
    }
  }
  
};