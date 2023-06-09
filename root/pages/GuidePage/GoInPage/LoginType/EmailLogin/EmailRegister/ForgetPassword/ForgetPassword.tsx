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
const ForgetPassword: FunctionComponent = (props) => {
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: false,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  
  return (
      <View style={[styles.container,{paddingBottom:pxToDp(238),paddingTop:pxToDp(238)}]}>
        <Image style={styles.image} source={require("@/resources/idbt/image_1.png")} ></Image>
        <View style={styles.bottomWrap}>
          <Text style={styles.text1}>{t('guidePage.welcome')}</Text>
          <Text style={styles.text2}>{t('guidePage.web3')}</Text>
          <NtfButton text={t('guidePage.goon')} onPress={() => Navigate.navigate('EmailLogin')} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} width={pxToDp(472)} heigh={pxToDp(104)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>
          {/* <NtfButton text={t('guidePage.goon')} onPress={() => Navigate.navigate('SetPassword')} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} width={pxToDp(472)} heigh={pxToDp(104)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton> */}
        </View>
      </View>
  );
};
export default ForgetPassword;


