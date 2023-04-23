export type CoinElem = {
    coinChainid: string;
    coinToken: string;
    coinDecimals: number;
    coinName: string;
    coinSymbol: number;
    coinIcon: number;
  };
  export type fileFormData = {
    coinChainid: string;
    coinToken: string;
    coinDecimals: number;
    coinName: string;
    coinSymbol: number;
    coinIcon: number;
  };
  export type CreateCommunityApiType = {
    notification: string;
    introduction: string;
    faceURL: string;
    ownerUserID: string;
  };
  
  export type CreateCommunityChannelApiType = {
    channelName: string;
    groupID: string;
    ownerUserID: string;
    opInfo: string;
    channelID?: string;
    channelType?: number;
  };
  
  export type GetCommunityChannelListApiType = {
    channelName: string;
    groupID: string;
    ownerUserID: string;
  };
  
  export type GetHotCommunityType = {
    operationID: string;
  };
  
  
  export type GetUserJoinedGroupListParams = {
    fromUserID: string;
  };
  export type LoginEmailParams = {
    emailAddress: string;
    emailPassword: string;
};
export type EmailCodeParams = {
  emailAddress: string;
};
export type RegisterEmailParams = {
  emailAddress: string;
  password: string;
  code:string

}
export type ModifyCommunityParam= {
  faceURL: string;
  groupID: string;
  groupName: string;
  introduction: string;
  notification?: string;
};
export type communityParam= {
  faceURL: string;
  isJoinEd: boolean;
  conversationData: any;
};