import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { pxToDp } from "@/utils/system";
import SplashScreen from "react-native-splash-screen";
import styles from "@/styles/pages/transfer_nft/styles";
import useInitScreen from "@/hooks/useInitScreen";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { useHeaderHeight } from "@react-navigation/elements";
import { UIELEMENTS } from "@/constants/index";
import { Image } from "react-native-animatable";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";

const TransferNft: FunctionComponent = (props) => {

  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: 'NFT转账',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const goNext=()=>{

  }
  return (
    <View style={[styles.container, { paddingTop: (useHeaderHeight() + UIELEMENTS.PADDING_TOP) }]}>
      <IDBitTabBg style={{ height: pxToDp(188) }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: pxToDp(88), paddingHorizontal: pxToDp(32) }}>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>收款地址</Text>
          <Image source={require('@/resources/second/icon_dizhiben.png')} style={{ width: pxToDp(48), height: pxToDp(48) }}></Image>
        </View>
        <View style={{ width: '100%', height: pxToDp(112), alignItems: 'center', justifyContent: 'center', borderRadius: pxToDp(32), paddingHorizontal: pxToDp(32) }}>
          <TextInput style={{ height: pxToDp(88), width: '100%', color: '#fff', borderRadius: pxToDp(32) }} placeholder="輸入或長按粘貼钱包地址" placeholderTextColor={'#7082A0'}></TextInput>
        </View>
      </IDBitTabBg>
      <IDBitTabBg style={{ flexDirection: 'row', justifyContent: 'space-between', height: pxToDp(282), marginTop: pxToDp(24), borderRadius: pxToDp(32), alignItems: 'center', paddingHorizontal: pxToDp(32) }}>
        <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>发送NFT</Text>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('@/resources/second/icon_dizhiben.png')} style={{ width: pxToDp(160), height: pxToDp(160) }}></Image>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>asd</Text>
        </View>
      </IDBitTabBg>

      <IDBitTabBg style={{ flexDirection: 'row', justifyContent: 'space-between', height: pxToDp(148), marginTop: pxToDp(24), borderRadius: pxToDp(32), alignItems: 'center', paddingHorizontal: pxToDp(32) }}>
        <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>礦工費</Text>
        <View style={{ alignItems:'flex-end' }}>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>0.00136ETH ≈$0.00013</Text>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>≈3s</Text>
        </View>
      </IDBitTabBg>
        <IDBitBtn text={'登录'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginTop: pxToDp(180)}} onPress={goNext}></IDBitBtn>
    </View>
  );
};
export default TransferNft;


