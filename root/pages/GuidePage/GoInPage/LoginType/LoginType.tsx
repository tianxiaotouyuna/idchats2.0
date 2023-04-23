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
import LoginTypeCard from "@/components/LoginTypeCard/LoginTypeCard";
const LoginType: FunctionComponent = (props) => {
    const types=[{ image: require('@/resources/second/icon_email.png'), text: '邮箱登录', chainId: 1 },
    { image: require('@/resources/second/icon_imtoken.png'), text: 'imToken 登入', chainId: 1 },
    { image: require('@/resources/second/icon_tokenpocket.png'), text: 'TokenPocket 登入', chainId: 1 }]
   
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '登录方式',
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
  const onPressCard=(index:number)=>{
    if(index==0)Navigate.navigate('EmailLogin');
  }
  return (
      <View style={[styles.container,{paddingBottom:pxToDp(238),paddingTop:pxToDp(238)}]}>
        <Image style={{backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,height:pxToDp(442),width:'100%'}}></Image>
      <View style={{width:'100%'}}>
      {
          types?.map((item, index) => {
              return <LoginTypeCard key={index+'asd'} data={item} style={{ marginBottom: pxToDp(24) }} onPress={(index:number)=>onPressCard(index)} index={index}></LoginTypeCard>
          })
      }
      </View>
      </View>
  );
};
export default LoginType;


