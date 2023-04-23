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
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import EyeBtn from "@/components/EyeBtn/EyeBtn";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { DEFAULT_HEADER_COLOR_ACTIVE2 } from "@/constants/ui-elements";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
const EmailLogin: FunctionComponent = (props) => {
 
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '邮箱登录',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  const goNext = () => {

  }
  return (
    <View style={[styles.container, { paddingBottom: pxToDp(238), paddingTop: pxToDp(238) }]}>
      <Image style={styles.image}></Image>
      <View style={styles.bottomWrap}>
        <View style={{ marginBottom: pxToDp(136) , width: '100%'}}>
          <IDBitTabBg style={{ width: '100%', height: pxToDp(112), alignItems: 'center', justifyContent: 'center', borderRadius: pxToDp(32) }}>
            <TextInput style={{ height: pxToDp(88), width: '100%', color: '#fff', marginLeft: pxToDp(32), borderRadius: pxToDp(32) }} placeholder="邮箱" placeholderTextColor={'#7082A0'}></TextInput>
          </IDBitTabBg>
          <IDBitTabBg style={{ width: '100%', height: pxToDp(112), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: pxToDp(24), borderRadius: pxToDp(32) }}>
            <TextInput style={{ height: pxToDp(88), width: '80%', color: '#fff', borderRadius: pxToDp(32) }} placeholder="密码" placeholderTextColor={'#7082A0'}></TextInput>
            <EyeBtn style={{ width: pxToDp(48), height: pxToDp(48) }}></EyeBtn>
          </IDBitTabBg>
        </View>
        <IDBitBtn text={'登录'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginBottom: pxToDp(30)}} onPress={goNext}></IDBitBtn>
        <IDBitBtn text={'邮箱更换'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginBottom: pxToDp(136)}} onPress={()=>Navigate.navigate('ChangeEmail')}></IDBitBtn>
        <PressableSlop onPress={()=>Navigate.navigate('EmailRegister')}>
        <Text style={{ color: '#ABB7CB', fontSize: pxToSp(24) }}>还没有账号，去注册</Text>
        </PressableSlop>
      </View>
    </View>
  );
};
export default EmailLogin;


