enum RequestFunc {
    INITSDK="InitSDK",
    LOGIN="Login",
    LOGOUT="Logout",
    GETLOGINSTATUS="GetLoginStatus",
    GETLOGINUSER="GetLoginUser",
    GETSELFUSERINFO="GetSelfUserInfo",
    CREATETEXTMESSAGE="CreateTextMessage",
    CREATETEXTATMESSAGE="CreateTextAtMessage",
    CREATEIMAGEMESSAGEFROMBYURL="CreateImageMessageByURL",
    CREATESOUNDMESSAGEBYURL="CreateSoundMessageByURL",
    CREATEVIDEOMESSAGEBYURL="CreateVideoMessageByURL",
    CREATEFILEMESSAGEBYURL="CreateFileMessageByURL",
    CREATELOCATIONMESSAGE="CreateLocationMessage",
    CREATECUSTOMMESSAGE="CreateCustomMessage",
    CREATEMERGERMESSAGE="CreateMergerMessage",
    CREATEFORWARDMESSAGE="CreateForwardMessage",
    CREATEQUOTEMESSAGE="CreateQuoteMessage",
    CREATECARDMESSAGE="CreateCardMessage",
    SENDMESSAGE="SendMessage",
    SENDMESSAGENOTOSS="SendMessageNotOss",
    GETHISTORYMESSAGELIST="GetHistoryMessageList",
    REVOKEMESSAGE="RevokeMessage",
    DELETEMESSAGEFROMLOCALSTORAGE="DeleteMessageFromLocalStorage",
    MARKSINGLEMESSAGEHASREAD="MarkSingleMessageHasRead",
    INSERTSINGLEMESSAGETOLOCALSTORAGE="InsertSingleMessageToLocalStorage",
    INSERTGROUPMESSAGETOLOCALSTORAGE="InsertGroupMessageToLocalStorage",
    TYPINGSTATUSUPDATE="TypingStatusUpdate",
    MARKC2CMESSAGEASREAD="MarkC2CMessageAsRead",
    CLEARC2CHISTORYMESSAGE="ClearC2CHistoryMessage",
    CLEARGROUPHISTORYMESSAGE="ClearGroupHistoryMessage",
    ADDFRIEND="AddFriend",
    FOLLOWADDFRIEND="FollowAddFriend",
    UPDATEPRODUCE="UpdateUserProfile",
    GETDESIGNATEDFRIENDSINFO="GetDesignatedFriendsInfo",
    GETRECVFRIENDAPPLICATIONLIST="GetRecvFriendApplicationList",
    GETSENDFRIENDAPPLICATIONLIST="GetSendFriendApplicationList",
    GETFRIENDLIST="GetFriendList",
    SETFRIENDREMARK="SetFriendRemark",
    ADDBLACK="AddBlack",
    GETBLACKLIST="GetBlackList",
    REMOVEBLACK="RemoveBlack",
    CHECKFRIEND="CheckFriend",
    ACCEPTFRIENDAPPLICATION="AcceptFriendApplication",
    REFUSEFRIENDAPPLICATION="RefuseFriendApplication",
    DELETEFRIEND="DeleteFriend",
    GETUSERSINFO="GetUsersInfo",
    SETSELFINFO="SetSelfInfo",
    GETALLCONVERSATIONLIST="GetAllConversationList",
    GETFOLLOWFRIENDAPPLICATIONLIST="GetFollowFriendApplicationList",
    GETCONVERSATIONLISTSPLIT="GetConversationListSplit",
    GETONECONVERSATION="GetOneConversation",
    GETCONVERSATIONIDBYSESSIONTYPE="GetConversationIDBySessionType",
    GETMULTIPLECONVERSATION="GetMultipleConversation",
    DELETECONVERSATION="DeleteConversation",
    SETCONVERSATIONDRAFT="SetConversationDraft",
    PINCONVERSATION="PinConversation",
    GETTOTALUNREADMSGCOUNT="GetTotalUnreadMsgCount",
    GETCONVERSATIONRECVMESSAGEOPT="GetConversationRecvMessageOpt",
    SETCONVERSATIONRECVMESSAGEOPT="SetConversationRecvMessageOpt",
    SEARCHLOCALMESSAGES="SearchLocalMessages",
    MARKGROUPMESSAGEHASREAD="MarkGroupMessageHasRead",
    INVITEUSERTOGROUP="InviteUserToGroup",
    KICKGROUPMEMBER="KickGroupMember",
    GETGROUPMEMBERSINFO="GetGroupMembersInfo",
    GETGROUPMEMBERLIST="GetGroupMemberList",
    GETJOINEDGROUPLIST="GetJoinedGroupList",
    CREATEGROUP="CreateGroup",
    SETGROUPINFO="SetGroupInfo",
    GETGROUPSINFO="GetGroupsInfo",
    JOINGROUP="JoinGroup",
    QUITGROUP="QuitGroup",
    TRANSFERGROUPOWNER="TransferGroupOwner",
    GETSENDGROUPAPPLICATIONLIST="GetSendGroupApplicationList",
    GETRECVGROUPAPPLICATIONLIST="GetRecvGroupApplicationList",
    ACCEPTGROUPAPPLICATION="AcceptGroupApplication",
    REFUSEGROUPAPPLICATION="RefuseGroupApplication",
    MARKGROUPMESSAGEASREAD = "MarkGroupMessageAsRead"
}

enum CbEvents {
    ONCONNECTFAILED = "OnConnectFailed",
    ONCONNECTSUCCESS = "OnConnectSuccess",
    ONCONNECTING = "OnConnecting",
    ONKICKEDOFFLINE = "OnKickedOffline",
    ONSELFINFOUPDATED = "OnSelfInfoUpdated",
    ONUSERTOKENEXPIRED = "OnUserTokenExpired",
    SENDMSGPROGRESS = "OnProgress",
    ONRECVNEWMESSAGE = "OnRecvNewMessage",
    ONRECVMESSAGEREVOKED = "OnRecvMessageRevoked",
    ONRECVC2CREADRECEIPT = "OnRecvC2CReadReceipt",
    ONCONVERSATIONCHANGED = "OnConversationChanged",
    ONNEWCONVERSATION = "OnNewConversation",
    ONSYNCSERVERFAILED = "OnSyncServerFailed",
    ONSYNCSERVERFINISH = "OnSyncServerFinish",
    ONSYNCSERVERSTART = "OnSyncServerStart",
    ONTOTALUNREADMESSAGECOUNTCHANGED = "OnTotalUnreadMessageCountChanged",
    ONBLACKADDED = "OnBlackAdded",
    ONBLACKDELETED = "OnBlackDeleted",
    ONFRIENDAPPLICATIONACCEPTED = "OnFriendApplicationAccepted",
    ONFRIENDAPPLICATIONADDED = "OnFriendApplicationAdded",
    ONFRIENDAPPLICATIONDELETED = "OnFriendApplicationDeleted",
    ONFRIENDAPPLICATIONREJECTED = "OnFriendApplicationRejected",
    ONFRIENDINFOCHANGED = "OnFriendInfoChanged",
    ONFRIENDADDED = "OnFriendAdded",
    ONFRIENDDELETED = "OnFriendDeleted",
    ONJOINEDGROUPADDED = "OnJoinedGroupAdded",
    ONJOINEDGROUPDELETED = "OnJoinedGroupDeleted",
    ONGROUPMEMBERADDED = "OnGroupMemberAdded",
    ONGROUPMEMBERDELETED = "OnGroupMemberDeleted",
    ONGROUPAPPLICATIONADDED = "OnGroupApplicationAdded",
    ONGROUPAPPLICATIONDELETED = "OnGroupApplicationDeleted",
    ONGROUPINFOCHANGED = "OnGroupInfoChanged",
    ONGROUPMEMBERINFOCHANGED = "OnGroupMemberInfoChanged",
    ONGROUPAPPLICATIONACCEPTED = "OnGroupApplicationAccepted",
    ONGROUPAPPLICATIONREJECTED = "OnGroupApplicationRejected",

}

export {
    RequestFunc,
    CbEvents
};
