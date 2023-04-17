import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Clipboard, View } from "react-native";
import styles from "@/styles/pages/guide/insert_wallet/styles";
import { isIOS, pxToDp, pxToSp, readFile, toast } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import NtfButton from "@/components/NtfButton/NtfButton";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate, Storage } from "@/utils/index";
import DropDownTab from "@/components/DropDownTab/DropDownTab";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { ethers, utils, Wallet } from "ethers";
import Loading from "@/components/LoadingSnipper/Loading";
import { isPrivateKey } from "@/utils/regular";
import NFTAlert from "@/components/NFTAlert/NFTAlert";
import useRedux from "@/hooks/useRedux";
import { IMService, StorageService, UserService } from "@/services/index";
import storage from "@/utils/pstorage";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import PressableSlop from "@/components/PressableSlop/PressableSlop";

import DocumentPicker, {
  isInProgress,
} from 'react-native-document-picker'
import { useRoute } from "@react-navigation/native";
import { setProvider } from "@/utils/pglobal";
import IMServiceManager from "@/utils/IMServiceManager";
import { t } from "i18next";
const InsertWallet: FunctionComponent = (props) => {
  const [key, setkey] = useState('');
  const [type, settype] = useState(0);
  const pushChainId: number = useRoute().params?.pushChainId ?? 0;

  const [showSniper, setshowSniper] = useState(false);
  const [showIMSniper, setshowIMSniper] = useState(false);
  const [isShowAlert, setisShowAlert] = useState(false);
  const { sendReduxAction, walletPwd, chainId } = useRedux();
  const [password, setpassword] = useState();
  const [result, setResult] = useState({ fileCopyUri: '' });
  const reduxParams = useRedux();
  const { imUserInfo } = useRedux();
  const [isShowDelete, setisShowDelete] = useState(false);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: t('guidePage.addAccount'),
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });

  const checkInfo = () => {
    setshowSniper(true)
    setTimeout(() => {
      doNext()
    }, 300);
  }


  const doNext = () => {
    if (type == 0) {//记词导入
      if (key.length == 0) {
        setshowSniper(false)
        toast(t('guidePage.pleaseRecovery'))
      }
      else {
        insertWallet()
      }
    }
    else if (type == 1) {//私钥导入
      if (isPrivateKey(key) == false) {
        setshowSniper(false)
        toast(t('guidePage.pleaseRightPrivate'))
      }
      else {
        setTimeout(() => {
          insertWallet_sercery()

        }, 500);
      }
    }
    else {//keystore导入
      if (!password) {
        setshowSniper(false)
        toast(t('guidePage.pleasePwd'))
      }
      else if (!result) {
        setshowSniper(false)
        toast(t('guidePage.file'))
      }
      else {
        insert_keystore()
      }
    }
  }

  const insertWallet = async () => {
    // let e_wallet = ethers.Wallet.fromMnemonic(key);//根据助记词生成钱包
    // setshowSniper(false)
    // const derivationPath = "m/44'/60'/0'/0";
    // var hdNode = ethers.utils.HDNode.fromMnemonic(key);
    // var childNode = hdNode.derivePath(derivationPath + '/' + 3);

    // var e_wallet = new ethers.Wallet(childNode.privateKey);
    // console.log('qqqqqqqqqqqqqqqqqqq钱包导入成功，\n 地址：' + e_wallet.address + '\n 私钥：' + e_wallet.privateKey)
    // const combination = /* some combination, hash or something between username and password */;
    let e_wallet;
    try {
      var hdNode = ethers.utils.HDNode.fromMnemonic(key);
      e_wallet = new Wallet(hdNode.privateKey);
    } catch (error: any) {
      setshowSniper(false)
      toast(t('guidePage.insertError') + JSON.stringify(error?.message))
      return
    }
    if (e_wallet != null) {
      let options = {};
      options.scrypt = { N: 64, r: 8, p: 1 };
      let jsonRet = await e_wallet.encrypt(walletPwd, options);


      var has = await storage.new_wallet(e_wallet.address.toLowerCase(), jsonRet, e_wallet.address.slice(-6), walletPwd, e_wallet.privateKey, e_wallet.mnemonic?.phrase, pushChainId ? pushChainId : chainId);
      if (has == true) {
        setshowSniper(false)
        setisShowAlert(true)
        return
      }
      console.log('钱包导入成功，\n 地址：' + e_wallet.address.toLowerCase() + '\n 私钥：' + e_wallet.privateKey)

      sendReduxAction(ReduxToken.REFRESH_WALLET, { wallet: has })

      sendReduxAction(ReduxToken.SELECTWALLET, { selectWallet: has })
      if (pushChainId) {//重置最新chainId
        setProvider(pushChainId)
        sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: pushChainId })
        await Storage.save(CacheKeys.CHAINID, pushChainId)
        let commonData = IMServiceManager.getInstance();
        commonData.setChainId(pushChainId);
      }
      await Storage.save(CacheKeys.SELECTWALLET, has)
      if (imUserInfo) {
        await IMService.changeLoginAccount(reduxParams, has)
        setshowSniper(false)
        toast(t('guidePage.insertSucces'))
        setTimeout(() => {
          Navigate.navigate('Tab')
          setTimeout(() => {
            sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
          }, 500);
        }, 500);
      }
      else {
        setshowSniper(false)
        Navigate.navigate('Tab')
        await StorageService.login_im(reduxParams, false)
      }
    }
  }

  const insertWallet_sercery = async () => {
    let e_wallet
    try {
      e_wallet = new ethers.Wallet(key);//根据密钥生成钱包
    } catch (error: any) {
      setshowSniper(false)
      toast(t('guidePage.insertError') + JSON.stringify(error?.message))
      return
    }
    if (e_wallet != null) {
      let options = {};
      options.scrypt = { N: 64, r: 8, p: 1 };
      let jsonRet = await e_wallet.encrypt(walletPwd, options);

      var has = await storage.new_wallet(e_wallet.address.toLowerCase(), jsonRet, e_wallet.address.slice(-6), walletPwd, e_wallet.privateKey, e_wallet.mnemonic?.phrase, pushChainId ? pushChainId : chainId);
      if (has == true) {
        setshowSniper(false)
        setisShowAlert(true)
        return
      }
      console.log('钱包创建成功，\n 地址：' + has.address + '\n ChainId：' + has.chainId + '\n 私钥：' + has.privateKey + '\n 助记词' + JSON.stringify(has.mnemonic?.phrase))
      sendReduxAction(ReduxToken.REFRESH_WALLET, { wallet: has })
      sendReduxAction(ReduxToken.SELECTWALLET, { selectWallet: has })
      if (pushChainId) {//重置最新chainId
        setProvider(pushChainId)
        sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: pushChainId })
        await Storage.save(CacheKeys.CHAINID, pushChainId)
        let commonData = IMServiceManager.getInstance();
        commonData.setChainId(pushChainId);
      }
      await Storage.save(CacheKeys.SELECTWALLET, has)
      if (imUserInfo) {
        await IMService.changeLoginAccount(reduxParams, has)
        setshowSniper(false)
        toast(t('guidePage.insertSucces'))
        setTimeout(() => {
          Navigate.navigate('Tab')
          setTimeout(() => {
            sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
          }, 500);
        }, 500);
      }
      else {
        setshowSniper(false)
        Navigate.navigate('Tab')
        await StorageService.login_im(reduxParams, false)
      }

    }
  }

  const insert_keystore = async () => {
    const k_string = await readFile(result.fileCopyUri)
    console.log('aaa===\n', k_string)

    let e_wallet
    try {

      const derivationPath = "m/44'/60'/0'/0";
      var hdNode = ethers.utils.HDNode.fromMnemonic(k_string);
      var childNode = hdNode.derivePath(derivationPath + '/' + 3);

      e_wallet = new ethers.Wallet(childNode.privateKey);
    } catch (error: any) {
      setshowSniper(false)
      toast(t('guidePage.insertError') + JSON.stringify(error?.message))
      return
    }
    if (e_wallet != null) {
      // console.log('钱包导入成功，\n 地址：' + e_wallet.address + '\n 私钥：' + e_wallet.privateKey)
      let options = {} as any;
      options.scrypt = { N: 64, r: 8, p: 1 };
      let jsonRet = await e_wallet.encrypt(walletPwd, options);
      var has = await storage.new_wallet(e_wallet.address.toLowerCase(), jsonRet, e_wallet.address.slice(-6), walletPwd, e_wallet.privateKey, e_wallet.mnemonic?.phrase, pushChainId ? pushChainId : chainId);
      if (has == true) {
        setshowSniper(false)
        setisShowAlert(true)
        return
      }
      console.log('钱包创建成功，\n 地址：' + e_wallet?.address + '\n 私钥：' + e_wallet.privateKey + '\n 助记词' + JSON.stringify(e_wallet.mnemonic?.phrase))


      sendReduxAction(ReduxToken.REFRESH_WALLET, { wallet: has })
      sendReduxAction(ReduxToken.SELECTWALLET, { selectWallet: has })
      if (pushChainId) {//重置最新chainId
        setProvider(pushChainId)
        sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: pushChainId })
        await Storage.save(CacheKeys.CHAINID, pushChainId)
        let commonData = IMServiceManager.getInstance();
        commonData.setChainId(pushChainId);
      }
      await Storage.save(CacheKeys.SELECTWALLET, has)
      if (imUserInfo) {
        await IMService.changeLoginAccount(reduxParams, has)
        setshowSniper(false)
        toast(t('guidePage.insertSucces'))
        setTimeout(() => {
          Navigate.navigate('Tab')
          setTimeout(() => {
            sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
          }, 500);
        }, 500);
      }
      else {
        setshowSniper(false)
        Navigate.navigate('Tab')
        await StorageService.login_im(reduxParams, false)
      }
    }
  }
  const renderNoKeyStore = () => {
    return (
      <View>
        <Text style={styles.text2}>{type == 1 ? t('guidePage.paste2') : t('guidePage.paste1')}</Text>
        <View style={styles.contentBg}>
          <TextInput
            style={[styles.textInput, isIOS ? { height: pxToDp(300), marginTop: pxToDp(22) } : {}]}
            blurOnSubmit
            returnKeyType='done'
            cursorColor={'white'}
            placeholder={type == 0 ? t('guidePage.pastePhrase') : (type == 1 ? t('guidePage.pastePrivate') : '')}
            placeholderTextColor={'#5C616C'}
            multiline
            onChangeText={text => setkey(text)}
            value={key}
          />
        </View>
      </View>
    )
  }

  const selectFromLocal = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        allowMultiSelection: false
      })
      setResult(pickerResult)
    } catch (e) {
      handleError(e)
    }
  }
  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  }
  const renderKeystore = () => {
    return (
      <View>
        <Text style={styles.text2_keystore}>{t('guidePage.upload')}</Text>
        <PressableSlop onPress={() => { selectFromLocal() }}>
          <IDBitTabBg style={styles.selectFile} >
            <Text style={{ fontSize: pxToSp(32), color: 'white' }}>{result?.name ?? t('guidePage.file')}</Text>
            <Image
              style={styles.right}
              source={require("@/resources/idbt/icon_tiaozhuan.png")}
            />
          </IDBitTabBg>
        </PressableSlop>
        <IDBitTabBg style={styles.insertPwd} >
          <TextInput placeholderTextColor={'#5C616C'} placeholder={t('guidePage.keypasscode')} onChangeText={text => setpassword(text)} style={{ color: 'white', width: '100%' }}
            value={password}></TextInput>
        </IDBitTabBg>
      </View>
    )
  }
  const copyAdress = async (value: string) => {
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    toast(t('guidePage.copyScuess'))
    console.log('复制的内容', str)
  }
  const renderTest = () => {
    return (
      <View>
        <PressableSlop onPress={() => copyAdress('0x909b5a67b2109deeae0441680cbcd82dfacc2c9a25d92e3d3d9dbf3dba6a607f')}>
          <View style={{ flexDirection: 'row', marginTop: pxToDp(32), height: pxToDp(60), alignItems: 'center' }}>
            <Text style={styles.copy_text}>测试号1密钥 点击复制:</Text>
            <Image
              style={styles.copy}
              source={require("@/resources/idbt/copy.png")}
            />
          </View>
        </PressableSlop>
        <PressableSlop onPress={() => copyAdress('0x7e995745335b73729bfc360652f51455ea3656334e4d2c2c7b55e44259c3909f')}>
          <View style={{ flexDirection: 'row', marginTop: pxToDp(32), height: pxToDp(60), alignItems: 'center' }}>
            <Text style={styles.copy_text}>测试号2密钥 点击复制:</Text>
            <Image
              style={styles.copy}
              source={require("@/resources/idbt/copy.png")}
            />
            {/* chainid:5 */}
          </View>
        </PressableSlop>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={{ color: 'black' }}>
        {t('guidePage.imported').split("，").map((x, ind) =>
          <Text style={[styles.tips, { color: ind == 0 ? '#ABABAB' : UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2 }]} key={x + ind}>
            {x + "，"}
          </Text>)
        }
      </Text>
      <Text style={styles.text1}>{t('guidePage.methods')}</Text>
      <DropDownTab selectItem={(value: string, index: number) => {
        if (index == 0) settype(0)
        else if (index == 1) settype(1)
        else settype(2)
      }} />
      {type == 2 ? renderKeystore() : renderNoKeyStore()}
      {renderTest()}
      <NtfButton text={t('guidePage.start')} onPress={() => checkInfo()} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} width={pxToDp(686)} heigh={pxToDp(96)} style={styles.btn} textColor={'#0D0E10'}></NtfButton>
      <Loading isShow={showSniper} onTimeOut={() => setshowSniper(false)} text={t('guidePage.inserting')}></Loading>

      <NFTAlert isVisible={isShowAlert} content={t('guidePage.isIn')} onSurePress={() => setisShowAlert(false)}></NFTAlert>
    </ScrollView>
  );
};
export default InsertWallet;


