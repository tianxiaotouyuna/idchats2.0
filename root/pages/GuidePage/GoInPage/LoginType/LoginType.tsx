import React, { FunctionComponent, useEffect } from "react";
import { Alert, View } from "react-native";
import styles from "@/styles/pages/guide_page/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import NtfButton from "@/components/NtfButton/NtfButton";
import { UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate, System } from "@/utils/index";
import SplashScreen from 'react-native-splash-screen'
import { t } from "i18next";
import CellCard from "@/components/CellCard/CellCard";
const LoginType: FunctionComponent = (props) => {
  const types = [{ image: require('@/resources/second/icon_email.png'), text: t('guidePage.emailLogin'), chainId: 1 },
  { image: require('@/resources/second/icon_imtoken.png'), text: 'imToken', chainId: 1 },
  { image: require('@/resources/second/icon_tokenpocket.png'), text: 'TokenPocket', chainId: 1 }]

  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: t('guidePage.loginType'),
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const onPressCard = (index: number) => {
    if (index == 0) Navigate.navigate('EmailLogin');
  }
  return (
    <View style={[styles.container, { paddingBottom: pxToDp(238), paddingTop: pxToDp(238) }]}>
      <View style={{ width: '100%' }}>
        <Text style={styles.dark_text1}>{t('guidePage.accountLogin')}</Text>
        <CellCard data={types[0]} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => onPressCard(index)} index={0}></CellCard>
        <Text style={styles.dark_text2}>{t('guidePage.accountLogin')}</Text>
        <CellCard data={types[1]} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => onPressCard(index)} index={1}></CellCard>
        <CellCard data={types[2]} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => onPressCard(index)} index={2}></CellCard>
      </View>
    </View>
  );
};
export default LoginType;


