import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import { UIELEMENTS } from "@/constants/index";

const ExportMnemonic: FunctionComponent = (props) => {
   const { i18n} = useTranslation();
    useInitScreen({
      navigationOptions: {
        headerTransparent: true,
        headerShown: true,
              title: '导出助记词',
              headerTintColor: 'white',
      },
      statusBar: {
        backgroundColor: 'transparent',
        barStyle: 'light-content',
      },
    });
    return (
        <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
              
                <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('EXPORTPAGE.EXPORTSERCRY')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Setup'}></ListCell>
                <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('EXPORTPAGE.EXPORTkEY')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Setup'}></ListCell>
            </View>
    );
};
export default ExportMnemonic;


