import { LockType } from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/CreateIDO";
import { GroupItem } from "@/services/open_im_sdk/types";

export interface ProjectType extends LockType {
    userAmount: string;
    sum: string;
    index: string;
    id: number;
    projectText: string;
    data: LockType;
    num: string;
    address: string;
    msg: string;
    baseInfo: string;
    groupid: string;
    chainid: string;
    person: string;
  }
type Params = {
    onTxSuccess?: (type: string) => void;
    onTxError?: (type: string) => void;
    pool?: string;
    idoList?: ProjectType[];
    setIdoList?: (list: any) => void;
    groupID?: string;
    currentGroup?: GroupItem;
  };
export default function useIDOs(params: Params,data:any) {
  const createIdo=()=>{

  }
  return {
    createIdo,
  };
}


