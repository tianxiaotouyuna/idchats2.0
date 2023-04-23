import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import styles from "@/styles/pages/guide_page/email_register/styles";
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
import { useHeaderHeight } from "@react-navigation/elements";
import CountDownButton from 'react-native-smscode-count-down'
import EyeBtn from "@/components/EyeBtn/EyeBtn";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { DEFAULT_HEADER_COLOR_ACTIVE2 } from "@/constants/ui-elements";

const EmailRegister: FunctionComponent = (props) => {
  const [password, setpassword] = useState();
  const [password2, setpassword2] = useState();
  const [isShow, setisShow] = useState(false);
  const { sendReduxAction } = useRedux();
  const reduxParams = useRedux();
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
    const resp = await UserService.registerEmailCode({
      emailAddress: password,
      password: password2,
      code: vertity
    });
    log(resp, 'registerEmailCode')
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
    const new_wallet = await storage.new_wallet(e_wallet.address.toLowerCase(), jsonRet, e_wallet.address.slice(-6), password2, e_wallet.privateKey, mnemonic, 1);

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

      <View style={{ marginBottom: pxToDp(136), width: '100%' }}>
        <IDBitTabBg style={{ width: '100%', height: pxToDp(112), alignItems: 'center', justifyContent: 'center', borderRadius: pxToDp(32) }}>
          <TextInput style={{ height: pxToDp(88), width: '100%', color: '#fff', marginLeft: pxToDp(32), borderRadius: pxToDp(32) }} placeholder="邮箱" placeholderTextColor={'#7082A0'}></TextInput>
        </IDBitTabBg>
        <IDBitTabBg style={{ width: '100%', height: pxToDp(112), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: pxToDp(24), borderRadius: pxToDp(32), marginTop: pxToDp(24) }}>
          <TextInput style={{ height: pxToDp(88), width: '80%', color: '#fff', borderRadius: pxToDp(32) }} placeholder="密码" placeholderTextColor={'#7082A0'}></TextInput>
          <EyeBtn style={{ width: pxToDp(48), height: pxToDp(48) }}></EyeBtn>
        </IDBitTabBg>
        <IDBitTabBg style={{ width: '100%', height: pxToDp(112), alignItems: 'center', justifyContent:'space-between', borderRadius: pxToDp(32), marginTop: pxToDp(24),flexDirection:'row', }}>
          <TextInput style={{ height: pxToDp(88), color: '#fff', marginLeft: pxToDp(32), borderRadius: pxToDp(32)}} placeholder="验证码" placeholderTextColor={'#7082A0'}></TextInput>
          <CountDownButton
            style={{
              backgroundColor: DEFAULT_HEADER_COLOR_ACTIVE2,
              paddingHorizontal:pxToDp(32) ,
              paddingVertical:pxToDp(20),
              borderRadius: pxToDp(24),
              marginRight:pxToDp(16)
            }}
            textStyle={{ color: '#F1F4F8', fonSize: pxToDp(24) }}
            timerCount={60}
            timerTitle={t('guidePage.get')}
            timerActiveTitle={[t('guidePage.reacquire'), 's']}
            enable={true}
            onClick={async (shouldStartCountting: Function) => {
              if (checkEmail(password) == false) {
                toast("t('guidePage.please12')")
                return
              }
              const resp = await UserService.getEmailCode({ emailAddress: password })
              if (resp?.errCode == 0) toast(t('guidePage.send100'));
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
      </View>
      <IDBitBtn text={'注册'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginBottom: pxToDp(136) }} onPress={()=>Navigate.navigate('SetPayPassword')}></IDBitBtn>

      <Loading isShow={isShow} onTimeOut={() => setisShow(false)} text={''}></Loading>
    </View>
  );
};
export default EmailRegister;


