import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { t } from "i18next";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import GDataList from "@/components/GDataList";
import { CommunityService } from "@/services/index";
import { UIELEMENTS } from "@/constants/index";
import ChatListCard from "@/components/ChatListCard/ChatListCard";
import CommunityListCard from "@/components/CommunityListCard/CommunityListCard";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { COLORS } from "@/utils/Miscellaneous";
import { Navigate } from "@/utils/index";
import useRedux from "@/hooks/useRedux";

const HomePage: FunctionComponent = (props) => {
  const{needReloadCommunityList}=useRedux();
  const reduxParams=useRedux();
  const gRef = useRef<GDataList>(null);

    const renderItem = ({ item, index }: any) => {
      return (
        <CommunityListCard data={item} onPress={()=>Navigate.navigate('GroupChatPage',{chatData:item})}></CommunityListCard>
      );
    };
    useEffect(() => {
      gRef?.current?.refreshData()
    }, [ needReloadCommunityList])
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
          requestMethod={CommunityService.getCommunityList}
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
export default HomePage;


