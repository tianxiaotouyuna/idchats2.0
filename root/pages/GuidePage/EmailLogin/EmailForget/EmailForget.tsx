import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import styles from "@/styles/pages/guide/first_page/emailLogin/styles";
import { checkEmail, checkPhone, pxToDp, pxToSp, toast } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import NtfButton from "@/components/NtfButton/NtfButton";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate, Storage, System } from "@/utils/index";
import { StorageService, UserService } from "@/services/index";
import Loading from "@/components/LoadingSnipper/Loading";
import storage from "@/utils/pstorage";
import { useRoute } from "@react-navigation/native";
import NFTAlert from "@/components/NFTAlert/NFTAlert";
import useRedux from "@/hooks/useRedux";
import { ethers } from "ethers";
import { t } from "i18next";
import { useHeaderHeight } from "@react-navigation/stack";
import CountDownButton from 'react-native-smscode-count-down'
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";

const EmailForget: FunctionComponent = (props) => {
  const pushTitle: any = useRoute().params?.pushTitle ?? {};
  const [vertity, setvertity] = useState();
    const [password, setpassword] = useState();
  const [password2, setpassword2] = useState();
  const [isShow, setisShow] = useState(false);
  const { sendReduxAction } = useRedux();
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: pushTitle,
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
        toast(t('guidePage.please4'))
      }, 300);
    }
    else if (password.length < 8) {
      setTimeout(() => {
        setisShow(false)
        toast(t('guidePage.please3'))
      }, 300);
    }
    else{
      Navigate.navigate('EmailForget2',{pushTitle:pushTitle,data:{vertity:vertity,email:password}});
    }
    // else {
    //   setisShow(true)
    //   setTimeout(async () => {
    //     setisShow(false)
    //     await Storage.save(CacheKeys.WALLETPWD, password)
    //     sendReduxAction(ReduxToken.REFRESH_WALLETPWD, { walletPwd: password })
    //     Navigate.navigate('AddAccount')

    //   }, 300);
    // }
  }

  return (
    <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
      <View style={styles.bottomWrap}>
        <Text style={styles.textPwd}>{t('guidePage.current')}</Text>
        <View style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, flexDirection: 'row', width: '100%', height: pxToDp(88), marginTop: pxToDp(110), borderRadius: pxToDp(16), paddingRight: pxToDp(40), marginTop: pxToDp(24), borderColor: 'rgba(56, 56, 56, 0.3)', borderWidth: pxToDp(2) }}>
          <TextInput placeholderTextColor={'#5C616C'} returnKeyType={'done'} placeholder={t('guidePage.enter4')} onChangeText={text => setpassword(text)} style={{ color: 'white', width: '100%', height: '100%', marginLeft: pxToDp(32) }}
            value={password}></TextInput>
        </View>
        <Text style={styles.textPwd2}>{t('guidePage.verification')}</Text>
        <IDBitTabBg style={{ height: pxToDp(88), paddingLeft: pxToDp(20), borderRadius: pxToDp(12), marginTop: pxToDp(12), flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <TextInput value={vertity} onChangeText={(text: any) => { setvertity(text) }} style={{ width: pxToDp(300), color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('guidePage.enter3')}></TextInput>

                <CountDownButton
                    style={{
                      paddingRight: pxToDp(16)
                    }}
                    textStyle={{ color: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR, fonSize: pxToDp(24)}}
                    timerCount={60}
                    timerTitle={t('guidePage.get')}
                    enable={true}
                    onClick={async (shouldStartCountting: Function) => {
                        if (checkEmail(password) == false) {
                            toast(t('guidePage.please12'))
                            return
                        }
                        const resp = await UserService.getEmailCode({ emailAddress: password });
                       if(resp?.errCode==0) toast(t('guidePage.send100'));
                       else toast(JSON.stringify(resp?.errMsg));
                        // await UserService.sendSmsApi(phoneNum)
                        //随机模拟发送验证码成功或失败
                        shouldStartCountting(true)
                    }}
                    timerEnd={() => {
                        // this.setState({
                        //     state: '倒计时结束'
                        // })
                    }} />
            </IDBitTabBg>
      </View>
      <NtfButton text={'下一步'} onPress={checkPwd} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} heigh={pxToDp(88)} width={pxToDp(686)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>
      <Loading isShow={isShow} onTimeOut={() => setisShow(false)} text={''}></Loading>
    </View>
  );
};
export default EmailForget;

