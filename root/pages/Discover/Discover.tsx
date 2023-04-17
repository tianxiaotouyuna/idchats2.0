import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import styles from "@/styles/pages/communication/styles";
import { pxToDp, pxToSp, windowWidth } from "@/utils/system";
import { UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import IDBITTabBar from "@/components/IDBITTabBar/IDBITTabBar";
import DappSquare from "./DappSquare/DappSquare";
import Store from "./Store/Store";

const Discover: FunctionComponent = (props) => {
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: false,
      title:'通讯'
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  

  const handleChangeTab = () => {

  }
  return (
      <View style={styles.container}>
      <ScrollableTabView
        style={styles.scroll_container}
        onChangeTab={handleChangeTab}
        renderTabBar={
        () => <IDBITTabBar 
        tabUnderlineScaleX={2.5}
        underImg={require('@/resources/idbt/tabunder.png')}
        containerWidth={windowWidth-UIELEMENTS.PADDING_HORIZONTAL*2}
        tabUnderlineWidth={pxToDp(63)}
        backgroundColor={'rgba(0,0,0,0)'} 
        hasSeparator={false} 
        activeTextColor={'#FFFFFF'} 
        inactiveTextColor={'#ABABAB'} 
        inactiveTextFont={pxToSp(36)} 
        activeTextFont={pxToSp(36)}/>}
        locked={true}
      >
      <DappSquare key={`${'DAPPs'}_${1}`} tabLabel={'DAPPs'} type={1} />
       <Store key={`${'商店'}_${2}`} tabLabel={'商店'} type={2} />
      </ScrollableTabView>
      </View>
  );
};
export default Discover;


