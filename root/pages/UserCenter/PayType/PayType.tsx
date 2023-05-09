import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

import { pxToDp, windowWidth } from "@/utils/system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import styles from "@/styles/pages/homepage/styles";
import useInitScreen from "@/hooks/useInitScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { UIELEMENTS } from "@/constants/index";
import IDBITTabBar3 from "@/components/IDBITTabBar/IDBITTabBar3";
import CardPay from "./CardPay/CardPay";
import CyptoPay from "./CyptoPay/CyptoPay";
import { t } from "i18next";
import IDBITTabBar4 from "@/components/IDBITTabBar/IDBITTabBar4";

const PayType: FunctionComponent = (props) => {

  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: 'white',
      headerShown: false,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const handleChangeTab = () => {

  }
  return (
    <View style={[styles.container, { paddingTop: pxToDp(50) + useSafeAreaInsets().top }]}>

      <ScrollableTabView
        style={styles.scroll_container}
        onChangeTab={handleChangeTab}
        renderTabBar={
          () => <IDBITTabBar4
            tabUnderlineScaleX={2.5}
            backgroundColor={'#11192F'}
            hasSeparator={false}
            activeTextColor={UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR}
            inactiveTextColor={'#7082A0'}
            inactiveTextFont={15}
            activeTextFont={15}
            containerWidth={windowWidth-40} 
            />}
        locked={true}
      >
        <CyptoPay key={`${'支付'}_${1}`} tabLabel={'加密支付'} type={1} />
        <CardPay key={`${'支付'}_${2}`} tabLabel={'银行卡'} type={1} />
      </ScrollableTabView>
    </View>
  );
};
export default PayType;


