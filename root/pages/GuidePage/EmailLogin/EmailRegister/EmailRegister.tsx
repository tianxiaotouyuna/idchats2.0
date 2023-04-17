import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import styles from "@/styles/pages/guide/first_page/emailLogin/styles";
import { checkEmail, log, pxToDp, pxToSp, toast } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import NtfButton from "@/components/NtfButton/NtfButton";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate, Storage, System } from "@/utils/index";
import { StorageService, UserService } from "@/services/index";
import Loading from "@/components/LoadingSnipper/Loading";
import storage from "@/utils/pstorage";
import useRedux from "@/hooks/useRedux";
import { t } from "i18next";
import { ethers, Wallet } from "ethers";
import { setProvider } from "@/utils/pglobal";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { useHeaderHeight } from "@react-navigation/stack";
import CountDownButton from 'react-native-smscode-count-down'

const EmailRegister: FunctionComponent = (props) => {
  const [password, setpassword] = useState();
  const [password2, setpassword2] = useState();
  const [isShow, setisShow] = useState(false);
  const { sendReduxAction } = useRedux();
  const reduxParams=useRedux();
  const [vertity, setvertity] = useState();
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
  const checkPwd = async () => {
    if (password == undefined) {
      setTimeout(() => {
        toast(t('guidePage.please1'))
      }, 300);
      return;
    }
    else if (password.length < 8) {
      setTimeout(() => {
        toast(t('guidePage.please2'))
      }, 300);
      return;
    }
    setisShow(true);
   const resp= await UserService.registerEmailCode({
      emailAddress: password,
      password: password2,
      code: vertity
    });
    log(resp,'registerEmailCode')
    // return
    if (resp?.errCode == 0) {
      setTimeout(() => {
      goNext2();
        
      }, 500);
    }
    else {
    setisShow(false);
    toast(resp?.errMsg);
    goNext2();
  }
  }
  const goNext2 = async () => {
    var newArr = new Array()

    const entropy = ethers.utils.randomBytes(16);//生成随机字符串
    const mnemonic = ethers.utils.entropyToMnemonic(entropy);//根据字符串生成助记词
    // const e_wallet = ethers.Wallet.fromMnemonic(mnemonic);//根据助记词生成钱包
    var hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const e_wallet = new Wallet(hdNode.privateKey);
    console.log('钱包创建成功，\n 地址：' + e_wallet?.address + '\n 私钥：' + e_wallet?.privateKey + '\n 助记词' + JSON.stringify(e_wallet.mnemonic?.phrase))


    let options = {};
    options.scrypt = { N: 64, r: 8, p: 1 };
    let jsonRet = await e_wallet.encrypt(password2, options);
    const new_wallet = await storage.new_wallet(e_wallet.address.toLowerCase(), jsonRet, e_wallet.address.slice(-6), password2, e_wallet.privateKey, mnemonic,1);

    console.log('钱包创建成功asddddd，\n 地址：' + e_wallet?.address + '\n 私钥：' + e_wallet.privateKey + '\n 助记词' + JSON.stringify(e_wallet) + '\n 助记词2' + JSON.stringify(mnemonic))

    sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: 1 })
    await Storage.save(CacheKeys.SELECTWALLET, new_wallet)

    await Storage.save(CacheKeys.CHAINID, 1)
    setProvider(1)
    const wallets = await storage.wallets()
    sendReduxAction(ReduxToken.REFRESH_WALLET, { wallet: wallets[wallets.length - 1] })
    await Storage.save(CacheKeys.WALLETPWD, password2)
    sendReduxAction(ReduxToken.REFRESH_WALLETPWD, { walletPwd: password2 })
    setisShow(false)
    toast(t('guidePage.registered'));
    setTimeout(async () => {
      Navigate.navigate('Tab')
      await StorageService.login_im(reduxParams, false)
    }, 1000);
  }


  return (
    <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
      <View style={styles.bottomWrap}>
        <Image style={styles.image} source={require("@/resources/idbt/guidepage/logo.png")} ></Image>
        <Text style={styles.text1}>{t('guidePage.register1')}</Text>
        <Text style={styles.textPwd}>{t('guidePage.mailbox')}</Text>
        <View style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, flexDirection: 'row', width: '100%', height: pxToDp(88), marginTop: pxToDp(110), borderRadius: pxToDp(16), paddingRight: pxToDp(40), marginTop: pxToDp(24), borderColor: 'rgba(56, 56, 56, 0.3)', borderWidth: pxToDp(2) }}>
          <TextInput placeholderTextColor={'#5C616C'} returnKeyType={'done'} placeholder={t('guidePage.enter1')} onChangeText={text => setpassword(text)} style={{ color: 'white', width: '100%', height: '100%', marginLeft: pxToDp(32) }}
            value={password}></TextInput>
        </View>
        <Text style={styles.textPwd2}>{t('guidePage.password')}</Text>
        <View style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, flexDirection: 'row', width: '100%', marginTop: pxToDp(24), height: pxToDp(88), borderRadius: pxToDp(16), paddingRight: pxToDp(40), marginTop: pxToDp(24), borderColor: 'rgba(56, 56, 56, 0.3)', borderWidth: pxToDp(2) }}>
          <TextInput placeholderTextColor={'#5C616C'} returnKeyType={'done'} placeholder={t('guidePage.enter2')} onChangeText={text => setpassword2(text)} style={{ color: 'white', width: '100%', height: '100%', marginLeft: pxToDp(32) }}
            value={password2}></TextInput>
        </View>
      </View>
      <Text style={styles.textPwd2}>{t('guidePage.verification')}</Text>
      <IDBitTabBg style={{ height: pxToDp(88), paddingLeft: pxToDp(20), borderRadius: pxToDp(12), marginTop: pxToDp(12), flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
        <TextInput value={vertity} onChangeText={(text: any) => { setvertity(text) }} style={{ width: pxToDp(300), color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('guidePage.enter3')}></TextInput>

        <CountDownButton
          style={{
            paddingRight: pxToDp(16)
          }}
          textStyle={{ color: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR, fonSize: pxToDp(24) }}
          timerCount={60}
          timerTitle={t('guidePage.get')}
          timerActiveTitle={[t('guidePage.reacquire'), 's']}
          enable={true}
          onClick={async (shouldStartCountting: Function) => {
            if (checkEmail(password) == false) {
              toast(t('guidePage.please12'))
              return
            }
            const resp = await UserService.getEmailCode({ emailAddress: password })
           if(resp?.errCode==0) toast(t('guidePage.send100'));
           else toast(JSON.stringify(resp?.errMsg))
            //随机模拟发送验证码成功或失败
            shouldStartCountting(true)
          }}
          timerEnd={() => {
            // this.setState({
            //     state: '倒计时结束'
            // })
          }} />
      </IDBitTabBg>
      <NtfButton text={t('guidePage.register')} onPress={() => checkPwd()} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} heigh={pxToDp(88)} width={pxToDp(686)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>
      <PressableSlop onPress={() => Navigate.goBack()}>
        <Text style={{ color: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR, alignSelf: 'center', marginTop: pxToDp(20) }}>
          {t('guidePage.have')}
        </Text>
      </PressableSlop>
      <Loading isShow={isShow} onTimeOut={() => setisShow(false)} text={''}></Loading>
    </View>
  );
};
export default EmailRegister;


