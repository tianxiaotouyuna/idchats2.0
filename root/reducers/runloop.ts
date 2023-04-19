import { ReduxToken } from "../constants";
import { cloneDeep } from "lodash";
import { AnyAction } from "redux";
import { Alert } from "react-native";

const initState = {
  needReloadAssetsList:false,//只刷新聊天列表
};
export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ReduxToken.NEEDRELOADASSETSLIST: {
      return cloneDeep({ ...state, needReloadAssetsList:!state.needReloadAssetsList });
    }
    default: {
      return state;
    }
  }
  
};