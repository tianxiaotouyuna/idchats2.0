import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import GDataList from "@/components/GDataList";
import { CommunityService, IdoService } from "@/services/index";
import useRedux from "@/hooks/useRedux";
import IDOGoCard, { CardStyle } from "@/components/IDOGoCard/IDOGoCard";

const ParticipateIdo: FunctionComponent = (props) => {
  const{needReloadCommunityList}=useRedux();
  const reduxParams=useRedux();
  const gRef = useRef<GDataList>(null);
  useInitScreen({
    navigationOptions: {
      headerTitle: 'IDO LIST',
      headerTransparent: false,
      headerShown: true,

      headerTintColor: "white",
      headerTitleContainerStyle: { flex: 1, alignItems: 'center' }
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });

    const renderItem = ({ item, index }: any) => {
      return (
        <IDOGoCard 
        data={item}
        cardStyle={CardStyle.LISTSTYLE}
        ></IDOGoCard>
      );
    };
    useEffect(() => {
      gRef?.current?.refreshData()
    }, [ needReloadCommunityList])
    return (
    <View style={[styles.container, { paddingBottom:0}]}>
        <GDataList
          refreshControlColor={"#fff"}
          requestMethod={IdoService.getIdoHistory}
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
export default ParticipateIdo;


