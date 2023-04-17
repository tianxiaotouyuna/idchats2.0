import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import styles from "@/styles/pages/communication/styles";
import { pxToDp, pxToSp, toast, windowWidth } from "@/utils/system";
import { UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import IDBITTabBar from "@/components/IDBITTabBar/IDBITTabBar";
import List from "./List/List";
import Message from "./Message/Message";
import { useTranslation } from "react-i18next";
import SplashScreen from 'react-native-splash-screen'

import pstorage from "@/utils/pstorage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Communication: FunctionComponent = (props) => {
  const { i18n ,t} = useTranslation();
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
  
  useEffect(() => {
   setTimeout(() => { SplashScreen.hide(); }, 500);
    pstorage.update_wallet_balance()
  }, [])
  const handleChangeTab = () => {

  }
  return (
      <View style={[styles.container,{paddingTop:pxToDp(20)+useSafeAreaInsets().top}]}>
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
      <Message key={`${'消息'}_${1}`} tabLabel={i18n.t('home.messages')} type={1} />
       <List key={`${'列表'}_${2}`} tabLabel={i18n.t('home.list')} type={2} />
      </ScrollableTabView>
      </View>
  );
};
export default Communication;


