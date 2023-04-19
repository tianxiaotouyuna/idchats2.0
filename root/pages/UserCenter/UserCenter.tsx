import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { pxToDp } from "@/utils/system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import styles from "@/styles/pages/homepage/styles";
import useInitScreen from "@/hooks/useInitScreen";

const UserCenter: FunctionComponent = (props) => {

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
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
      <View style={[styles.container,{paddingTop:pxToDp(50)+useSafeAreaInsets().top}]}>

    </View>
  );
};
export default UserCenter;


