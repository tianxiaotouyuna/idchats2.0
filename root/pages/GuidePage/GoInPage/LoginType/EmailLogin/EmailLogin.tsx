import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { checkEmail, pxToDp, pxToSp, toast } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate, P_Storage, Storage, System } from "@/utils/index";
import { t } from "i18next";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import EyeBtn from "@/components/EyeBtn/EyeBtn";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { StorageService, UserService } from "@/services/index";
import styles from "@/styles/pages/guide_page/email_login/email_login";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CacheKeys, ReduxToken } from "@/constants/index";
import { setProvider } from "@/utils/pglobal";
import { ethers, Wallet } from "ethers";
import useRedux from "@/hooks/useRedux";
import Loading from "@/components/LoadingSnipper/Loading";
const EmailLogin: FunctionComponent = (props) => {
  const [account, setaccount] = useState('');
  const [password, setpassword] = useState('');
  const [isShow, setisShow] = useState(false);
  const { sendReduxAction } = useRedux();
  const reduxParams = useRedux();
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: t('guidePage.emailLogin'),
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });

  const goNext = async () => {
        if (account.length == 0) {
      setTimeout(() => {
        toast(t('guidePage.please1'))
      }, 300);
      return;
    }
    else if (checkEmail(account) == false) {
      setTimeout(() => {
        setisShow(false)
        toast(t('guidePage.please12'))
      }, 300);
      return;
    }
    else if (password.length < 8) {
      setTimeout(() => {
        setisShow(false)
        toast(t('guidePage.please2'))
      }, 300);
      return;
    }
    setisShow(true);6525
    const resp = await UserService.loginEmail({
      emailAddress: account,
      password: password,
    })
    setisShow(false)
    if (resp?.errCode == 0) {
      goNext2()
    }
    else {
      toast(resp?.errMsg)
    }
    console.log(resp
      , 'loginEmail');

  }
  const goNext2 = async () => {
    var newArr = new Array()
    const entropy = ethers.utils.randomBytes(16);//生成随机字符串
    const mnemonic = ethers.utils.entropyToMnemonic(entropy);//根据字符串生成助记词
    // const e_wallet = ethers.Wallet.fromMnemonic(mnemonic);//根据助记词生成钱包
    var hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const e_wallet = new Wallet(hdNode.privateKey);


    let options = {};
    options.scrypt = { N: 64, r: 8, p: 1 };
    let jsonRet = await e_wallet.encrypt(password, options);
    const new_wallet = await P_Storage.new_wallet(e_wallet.address.toLowerCase(), jsonRet, e_wallet.address.slice(-6), password, e_wallet.privateKey, mnemonic, 1);

    console.log('password\n 密码：' + password + '\n 地址：' + e_wallet?.address + '\n 私钥：' + e_wallet.privateKey + '\n 助记词' + JSON.stringify(e_wallet) + '\n 助记词2' + JSON.stringify(mnemonic))

    sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: 1 })
    await Storage.save(CacheKeys.SELECTWALLET, new_wallet)

    await Storage.save(CacheKeys.CHAINID, 1)
    setProvider(1)
    const wallets = await P_Storage.wallets()
    sendReduxAction(ReduxToken.REFRESH_WALLET, { wallet: wallets[wallets.length - 1] })
    await Storage.save(CacheKeys.WALLETPWD, password)
    sendReduxAction(ReduxToken.REFRESH_WALLETPWD, { walletPwd: password })
    setisShow(false)
    setTimeout(async () => {
      Navigate.navigate('HomePage')
      await StorageService.login_im(reduxParams, false,new_wallet)
    }, 1000);

  }
  return (
    <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom + pxToDp(80), paddingTop: pxToDp(238) }]}>
      <Image style={styles.image} source={require("@/resources/idbt/guidepage/logo.png")} ></Image>
      <View style={styles.bottomWrap}>
        <View style={{ marginBottom: pxToDp(136), width: '100%' }}>
          <IDBitTabBg style={{ width: '100%', height: pxToDp(112), alignItems: 'center', justifyContent: 'center', borderRadius: pxToDp(32) }}>
            <TextInput style={{ height: pxToDp(88), width: '100%', color: '#fff', marginLeft: pxToDp(32), borderRadius: pxToDp(32) }} placeholder={t('guidePage.mailbox')} placeholderTextColor={'#7082A0'}
              value={account}
              onChangeText={text => setaccount(text)}
              returnKeyType={'done'}
              keyboardType={'email-address'}></TextInput>
          </IDBitTabBg>
          <IDBitTabBg style={{ width: '100%', height: pxToDp(112), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: pxToDp(24), borderRadius: pxToDp(32) }}>
            <TextInput style={{ height: pxToDp(88), width: '80%', color: '#fff', borderRadius: pxToDp(32) }} placeholder={t('guidePage.password')} placeholderTextColor={'#7082A0'}
              value={password}
              onChangeText={text => setpassword(text)}
              returnKeyType={'done'}
              secureTextEntry={secureTextEntry} ></TextInput>
            <EyeBtn style={{ width: pxToDp(48), height: pxToDp(48) }} onPress={() => setsecureTextEntry(secureTextEntry ? false : true)}></EyeBtn>
          </IDBitTabBg>
          <View style={{ width: '100%', flexDirection: 'row-reverse' }}>
            <PressableSlop onPress={() => Navigate.navigate('EmailForget', { pushTitle: t('guidePage.forget1') })}>
              <Text style={styles.textPwd2}>{t('guidePage.forget')}</Text>
            </PressableSlop>
          </View>
        </View>
        <IDBitBtn text={t('guidePage.login')} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginBottom: pxToDp(130) }} onPress={goNext}></IDBitBtn>
        {/* <IDBitBtn text={'邮箱更换'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginBottom: pxToDp(30) }} onPress={() => Navigate.navigate('ChangeEmail')}></IDBitBtn>
        <IDBitBtn text={'修改密码'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginBottom: pxToDp(136) }} onPress={() => Navigate.navigate('ChangePassword')}></IDBitBtn> */}
        <PressableSlop onPress={() => Navigate.navigate('EmailRegister')}>
          <Text style={{ color: '#ABB7CB', fontSize: pxToSp(24) }}>{t('guidePage.noAccount')}</Text>
        </PressableSlop>
      </View>
      <Loading isShow={isShow} onTimeOut={() => setisShow(false)} text={''}></Loading>
    </View>
  );
};
export default EmailLogin;


