

import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import {UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import { useHeaderHeight } from "@react-navigation/stack";
import Top from "@/segments/My/BindSocial/Top/Top";
import Bottom from "@/segments/My/BindSocial/Bottom/Bottom";
const BindSocial: FunctionComponent = (props) => {
  const headerHeight = useHeaderHeight();

  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      title: '社交链接',
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  return (
    <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
      <Top />
      <Bottom />
    </View>
  );
};
export default BindSocial;