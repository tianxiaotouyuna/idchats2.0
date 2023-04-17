import React, { FunctionComponent, useEffect,  } from "react";
import { View } from "react-native";
import styles from "@/styles/pages/communication/styles";
import { pxToDp, pxToSp, toast, windowWidth } from "@/utils/system";
import { UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import IDBITTabBar from "@/components/IDBITTabBar/IDBITTabBar";
import { useTranslation } from "react-i18next";
import SplashScreen from 'react-native-splash-screen'

import pstorage from "@/utils/pstorage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomePage from "./HomePage/HomePage";
import HotPage from "./HotPage/HotPage";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { Navigate } from "@/utils/index";
import { COLORS } from "@/utils/Miscellaneous";

const Community: FunctionComponent = (props) => {
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
        <HomePage key={`${'HomePage'}_${1}`} tabLabel={i18n.t('common.commutie')} type={1} />
        <HotPage key={`${'HotPage'}_${2}`} tabLabel={i18n.t('community.hot')} type={2} />
      </ScrollableTabView>
      <IDBitBtn imageSource={require('@/resources/idbt/community/add.png')} containerStyle={{ width: pxToDp(108), height: pxToDp(108), position: 'absolute', right: pxToDp(40), bottom: pxToDp(62),borderRadius:pxToDp(300) }} contentStyle={{ backgroundColor: COLORS.clear }} imgStyle={{ width: pxToDp(108), height: pxToDp(108) }} onPress={() => Navigate.navigate('CreateCommunity')}></IDBitBtn>
      </View>
  );
};
export default Community;

