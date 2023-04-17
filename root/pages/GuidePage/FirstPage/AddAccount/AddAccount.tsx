import React, { FunctionComponent, useEffect } from "react";
import { View } from "react-native";
import styles from "@/styles/pages/guide/AddAccount/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import NtfButton from "@/components/NtfButton/NtfButton";
import { UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate } from "@/utils/index";
import { ethers } from "ethers";
import { t } from "i18next";

const AddAccount: FunctionComponent = (props) => {
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle:t('guidePage.addAccount'),
      headerTintColor:'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
    const pushInsert=()=>{
          Navigate.navigate('InsertWallet')
    }
    const pushCreate=()=>{
          const entropy = ethers.utils.randomBytes(16);//生成随机字符串
          const mnemonicTemp = ethers.utils.entropyToMnemonic(entropy);//根据字符串生成助记词
          Navigate.navigate('CreateWallet', { mnemonic: mnemonicTemp })
    }
  return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("@/resources/idbt/image_2.png")} ></Image>
        <View style={styles.bottomWrap}>
          <NtfButton text={t('guidePage.import')} onPress={()=>pushInsert()} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} width={pxToDp(540)} heigh={pxToDp(104)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>
          <NtfButton text={t('guidePage.create1')} onPress={()=>pushCreate()} backgroundColor={'#FFFFFF'} borderRadius={pxToDp(16)} font={pxToSp(36)} width={pxToDp(540)} heigh={pxToDp(104)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>
        </View>
      </View>
  );
};
export default AddAccount;


