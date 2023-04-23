import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { pxToDp } from "@/utils/system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "@/styles/pages/homepage/styles";
import useInitScreen from "@/hooks/useInitScreen";

const Messages: FunctionComponent = (props) => {

  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '消息列表',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  return (
      <View style={[styles.container,{paddingTop:pxToDp(50)+useSafeAreaInsets().top}]}>

    </View>
  );
};
export default Messages;


