import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { pxToDp } from "@/utils/system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import useInitScreen from "@/hooks/useInitScreen";
import styles from "@/styles/pages/user_center/pay_type/card_pay/card_pay"

const CardPay: FunctionComponent = (props) => {

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
      <View style={[styles.container,{paddingTop:pxToDp(50)+useSafeAreaInsets().top}]}>
        <Text>加密支付</Text>
        <Text>银行卡</Text>
    </View>
  );
};
export default CardPay;


