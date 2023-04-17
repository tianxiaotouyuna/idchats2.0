import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import styles from "@/styles/pages/guide/insert_wallet/set_password/styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import NtfButton from "@/components/NtfButton/NtfButton";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate, Storage, System } from "@/utils/index";
import { StorageService } from "@/services/index";
import Loading from "@/components/LoadingSnipper/Loading";
import storage from "@/utils/pstorage";
import { useRoute } from "@react-navigation/native";
import NFTAlert from "@/components/NFTAlert/NFTAlert";
import useRedux from "@/hooks/useRedux";
import { ethers } from "ethers";
import { t } from "i18next";

const SetPassword: FunctionComponent = (props) => {
  const data: any = useRoute().params?.data ?? {};
  const [password, setpassword] = useState();
  const [password2, setpassword2] = useState();
  const [isShow, setisShow] = useState(false);
  const { sendReduxAction } = useRedux();
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const checkPwd = () => {
    if (password == undefined) {
      setTimeout(() => {
        setisShow(false)
        toast(t('guidePage.pleasePwd'))
      }, 300);
    }
    else if (password.length < 8) {
      setTimeout(() => {
        setisShow(false)
        toast(t('guidePage.eightPwd'))
      }, 300);
    }
    else if (password != password2) {
      setTimeout(() => {
        setisShow(false)
        toast(t('guidePage.notEqual'))
      }, 300);
    }
    else {
    setisShow(true)
    setTimeout(async () => {
        setisShow(false)
        await Storage.save(CacheKeys.WALLETPWD, password)
        sendReduxAction(ReduxToken.REFRESH_WALLETPWD, { walletPwd: password })
          Navigate.navigate('AddAccount')
   
      }, 300);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.bottomWrap}>
        <Text style={styles.text1}>{t('guidePage.first')}</Text>
        <Text style={styles.text1}>{t('guidePage.protect')}</Text>
        <Text style={styles.text2}>{t('guidePage.unable')}</Text>
        <Text style={styles.textPwd}>{t('guidePage.pwd')}</Text>
        <View style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, flexDirection: 'row', width: '100%', height: pxToDp(104), marginTop: pxToDp(24), borderRadius: pxToDp(16), paddingRight: pxToDp(40), marginTop: pxToDp(24), borderColor: 'rgba(56, 56, 56, 0.3)', borderWidth: pxToDp(2) }}>
          <TextInput placeholderTextColor={'#5C616C'} returnKeyType={'done'} placeholder={t('guidePage.pleasePwd')} onChangeText={text => setpassword(text)} style={{ color: 'white', width: '100%', height: '100%', marginLeft: pxToDp(32) }}
            value={password}></TextInput>
        </View>
        <Text style={styles.textPwd}>{t('guidePage.confirmPwd')}</Text>
        <View style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, flexDirection: 'row', width: '100%', marginTop: pxToDp(24), height: pxToDp(104), borderRadius: pxToDp(16), paddingRight: pxToDp(40), marginTop: pxToDp(24), borderColor: 'rgba(56, 56, 56, 0.3)', borderWidth: pxToDp(2) }}>
          <TextInput placeholderTextColor={'#5C616C'}returnKeyType={'done'} placeholder={t('guidePage.pleasePwd2')} onChangeText={text => setpassword2(text)} style={{ color: 'white', width: '100%', height: '100%', marginLeft: pxToDp(32) }}
            value={password2}></TextInput>
        </View>
      </View>
      <NtfButton text={t('guidePage.goon')} onPress={() => checkPwd()} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} heigh={pxToDp(104)} width={pxToDp(686)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>

      <Loading isShow={isShow} onTimeOut={() => setisShow(false)} text={''}></Loading>
    </View>
  );
};
export default SetPassword;


