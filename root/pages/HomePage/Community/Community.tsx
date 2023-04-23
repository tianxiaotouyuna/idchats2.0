import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { pxToDp } from "@/utils/system";
import styles from "@/styles/pages/homepage/styles";
import useInitScreen from "@/hooks/useInitScreen";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import GDataList from "@/components/GDataList";
import { UserService } from "@/services/index";
import CommunityListCard from "@/components/CommunityListCard/CommunityListCard";
import { Navigate } from "@/utils/index";
import useRedux from "@/hooks/useRedux";

const Community: FunctionComponent = (props) => {

  const reduxParams=useRedux();
  const gRef = useRef<GDataList>(null);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '空间列表',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const renderItem = ({ item, index }: any) => {
    return (
      <CommunityListCard data={item} onPress={()=>Navigate.navigate('GroupChatPage',{chatData:item})}></CommunityListCard>
    );
  };
  return (
    <View style={[styles.container, { paddingBottom:0}]}>
      <IDBITSearch
        style={{
          height: pxToDp(76),
        }} 
        searchStyle={SearchStyle.SEARCH_MY_COMMUNITY_STYLE}
      />
        <GDataList
          refreshControlColor={"#fff"}
          style={{marginTop:pxToDp(40)}}
          requestMethod={UserService.getCommunityList}
          requestParams={{ path: '', params: { reduxParams: reduxParams} }}
          defaultPageSize={100000}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: pxToDp(20) }}></View>
          )}
        ref={gRef}
        />
    </View>
  );
};
export default Community;


