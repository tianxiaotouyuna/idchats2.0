import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import styles from "@/styles/pages/communication/message/styles";
import { pxToDp, pxToSp, windowWidth } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import IDBITSearch from "@/components/IDBITSearch/IDBITSearch";
import GDataList from "@/components/GDataList";
import useRedux from "@/hooks/useRedux";
import ChatListCard from "@/components/ChatListCard/ChatListCard";
import { Navigate } from "@/utils/index";
import { IMService } from "@/services/index";
import { UIELEMENTS } from "@/constants/index";
import FollowerCard from "@/components/FollowerCard/FollowerCard";

const List: FunctionComponent = (props) => {
  const { imIns, needReloadChatList, wallet, needReloadContact } = useRedux();
  const gRef = useRef<GDataList>(null);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: false,
      title: '通讯'
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });

  useEffect(() => {
    gRef?.current?.refreshData()
  }, [needReloadChatList, needReloadContact])

  const handleChangeTab = () => {

  }
  const renderItem = ({ item, index }: any) => {
    return (
      <FollowerCard data={item} />
    );
  };
  const [tabsInfo] = useState([
    { name: "消息", type: 1 },
    { name: "列表", type: 2 },
  ])
  const getTotalUnreadMsgCount = async () => {
    const respData = await imIns.getTotalUnreadMsgCount({
    })
  }
  const getData = async () => {
    const respData = await imIns.getAllConversationList()
    const list = JSON.parse(respData?.data);
    const respData2 = await imIns.getFollowFriendApplicationList({
      toUserID: wallet?.address, selectFans: true//true我追随的，false追随我的
    })
    const list2 = JSON.parse(respData2?.data);
    let new_follower = new Array();
    for (var j = 0; j < list2.length; j++) {
      let haveUnreadMap = new Map();
      haveUnreadMap = list2[j];
      haveUnreadMap.unreadCount = 0;
      for (var i = 0; i < list.length; i++) {
        if (list2[j]?.userID == list[i]?.userID) {
          new_follower.push(haveUnreadMap)
          haveUnreadMap.unreadCount = list[i]?.unreadCount
          haveUnreadMap.conversationID= list[i]?.conversationID
          haveUnreadMap.isPinned= list[i]?.isPinned
        }

      }
    }
    return { list: new_follower||[] };
  }
  return (
    <View style={[styles.container, { paddingHorizontal: 0 }]}>
      <IDBITSearch style={{ height: pxToDp(76), marginHorizontal: UIELEMENTS.PADDING_HORIZONTAL }} />
      <GDataList
        style={{ marginTop: pxToDp(32) }}
        refreshControlColor={'#fff'}
        requestMethod={async () => getData()}
        requestParams={{ path: '', params: { onSell: true } }}
        defaultPageSize={20}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: pxToDp(20) }}></View>}
        ref={gRef}
      />
    </View>
  );
};
export default List;


