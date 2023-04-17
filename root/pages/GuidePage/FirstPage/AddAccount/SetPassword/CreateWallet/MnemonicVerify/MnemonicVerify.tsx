import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import styles from "@/styles/pages/guide/AddAccount/create_wallet/mnemonic_verify/styles";
import useInitScreen from "@/hooks/useInitScreen";
import CreateSegement from "@/components/CreateSegement/CreateSegement";
import { Text } from "react-native-animatable";
import MnemonicGirdle, { MonicGridleStyle } from "@/components/MnemonicGirdle/MnemonicGirdle";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import { useRoute } from "@react-navigation/native";
import NtfButton from "@/components/NtfButton/NtfButton";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import { useRef } from "react";
import { windowWidth } from '@/utils/system';
import { isEqual } from "lodash";
import { Navigate, Storage } from "@/utils/index";
import { ethers, Wallet } from "ethers";
import useRedux from "@/hooks/useRedux";
import storage from "@/utils/pstorage";
import { IMService, StorageService } from "@/services/index";
import Loading from "@/components/LoadingSnipper/Loading";
import Toast from "react-native-root-toast";
import { setProvider } from "@/utils/pglobal";
import pstorage from "@/utils/pstorage";
import IMServiceManager from "@/utils/IMServiceManager";
import { t } from "i18next";

let selectMnemonic_ = new Array()
const MnemonicVerify: FunctionComponent = (props) => {
  const mnemonic: any = useRoute().params?.mnemonic ?? {};
  const randomMnemonic: any = useRoute().params?.randomMnemonic ?? {};
  const pushChainId: number = useRoute().params?.pushChainId ?? 0;
  const [selectMnemonic, setselectMnemonic] = useState([]);
  const [deleteIndexs, setdeleteIndexs] = useState([]);
  const [needRefr, setneedRefr] = useState(false);
  const mRef = useRef(MnemonicGirdle);
  const { sendReduxAction, walletPwd, chainId, imUserInfo } = useRedux();
  const reduxParams = useRedux();
  const [showSniper, setShowSniper] = useState(false);
  const [showIMSniper, setShowIMSniper] = useState(false);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: 'IDChats',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });

  useEffect(() => {
    return () => {
      selectMnemonic_ = new Array()
    }
  }, [])
  const addOne = (text: string) => {
    // Alert.alert(JSON.stringify(deleteIndexs))
    if (deleteIndexs.length == 0) selectMnemonic_.push(text)
    else {
      let thisIndex = deleteIndexs[0];
      let thisIndex_atArray_index = 0;

      for (var i = 0; i < deleteIndexs.length; i++) {
        if (deleteIndexs[i] < thisIndex) {
          thisIndex = deleteIndexs[i]
          thisIndex_atArray_index = i
        }
      }
      selectMnemonic_.splice(thisIndex, 1, text);
      deleteIndexs.splice(thisIndex_atArray_index, 1);
    }
    setselectMnemonic(selectMnemonic_)
    // Alert.alert(JSON.stringify(selectMnemonic_))
    setneedRefr(!needRefr)
  }

  const deleteOne = (index: number) => {
    selectMnemonic_.splice(index, 1, '');
    deleteIndexs.push(index)
    mRef?.current.deletleOne()
    setselectMnemonic(selectMnemonic_)
    setneedRefr(!needRefr)
  }
  // flight midnight narrow merry ranch memory man rookie family benefit diary judge
  const goNext = async () => {
    setShowSniper(true)
    setTimeout(() => {
      goNext2()
    }, 300);
  }
  const goNext2 = async () => {
    var newArr = new Array()
    for (var i = 0; i < selectMnemonic.length; i++) {
      if (selectMnemonic[i] != '') newArr.push(selectMnemonic[i])
    }
    if (isEqual(selectMnemonic, mnemonic.split(' '))) {

      // const e_wallet = ethers.Wallet.fromMnemonic(mnemonic);//根据助记词生成钱包
      var hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
      const e_wallet = new Wallet(hdNode.privateKey);
      console.log('钱包创建成功，\n 地址：' + e_wallet?.address + '\n 私钥：' + e_wallet?.privateKey + '\n 助记词' + JSON.stringify(e_wallet.mnemonic?.phrase))


      let options = {};
      options.scrypt = { N: 64, r: 8, p: 1 };
      let jsonRet = await e_wallet.encrypt(walletPwd, options);
      const new_wallet = await storage.new_wallet(e_wallet.address.toLowerCase(), jsonRet, e_wallet.address.slice(-6), walletPwd, e_wallet.privateKey, mnemonic, pushChainId ? pushChainId : chainId);

      console.log('钱包创建成功asddddd，\n 地址：' + e_wallet?.address + '\n 私钥：' + e_wallet.privateKey + '\n 助记词' + JSON.stringify(e_wallet) + '\n 助记词2' + JSON.stringify(mnemonic))

      sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: chainId })
      sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: chainId })
      await Storage.save(CacheKeys.SELECTWALLET, new_wallet)

      if (pushChainId) {//重置最新chainId
        setProvider(pushChainId)
        sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: pushChainId })
        await Storage.save(CacheKeys.CHAINID, pushChainId)
        let commonData = IMServiceManager.getInstance();
        commonData.setChainId(pushChainId);
      }
      else {
        await Storage.save(CacheKeys.CHAINID, chainId)
        setProvider(chainId)
      }
      const wallets = await storage.wallets()
      sendReduxAction(ReduxToken.REFRESH_WALLET, { wallet: wallets[wallets.length - 1] })
      if (imUserInfo) {
        await IMService.changeLoginAccount(reduxParams, new_wallet)
        setShowSniper(false)
        setTimeout(() => {
          Navigate.navigate('Tab')
          setTimeout(() => {
            sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
          }, 500);
        }, 500);
      }
      else {
        setShowSniper(false)
        Navigate.navigate('Tab')
        await StorageService.login_im(reduxParams, false)
      }
    }
    else {
      setTimeout(() => {
        setShowSniper(false)
        if (newArr.length < 12) toast(t('guidePage.mnemonicError'))
        else toast(t('guidePage.mnemonicError'))
      }, 300);
    }

  }
  return (
    <ScrollView style={styles.container_scroll}>
      <CreateSegement index={2} />
      <Text style={styles.text1}>{t('guidePage.verifyMnemonic')}</Text>
      <Text style={styles.text2}>{t('guidePage.verifyMnemonic')}</Text>
      <View style={{ paddingHorizontal: pxToDp(32), paddingBottom: pxToDp(40), paddingTop: pxToDp(40 - 10), borderColor: 'rgba(255,255,255,0.3)', borderWidth: pxToDp(1), borderRadius: pxToDp(12), padding: pxToDp(20), marginBottom: pxToDp(40) }}>
        <MnemonicGirdle tabWidth={windowWidth - pxToDp(128)} needRefresh={needRefr} paddingHorizontal={pxToDp(0)} selfMargin={pxToDp(10)} rowCount={4} columnCount={3} data={selectMnemonic} monicGridleStyle={MonicGridleStyle.INPUTSTYLE} deleteHasChange={(index: number) => deleteOne(index)}></MnemonicGirdle>
      </View>
      <MnemonicGirdle ref={mRef} needRefresh={needRefr} selectMnemonic={selectMnemonic} paddingHorizontal={pxToDp(32)} selfMargin={pxToDp(10)} rowCount={4} columnCount={3} data={randomMnemonic} monicGridleStyle={MonicGridleStyle.INPUTSTYLE_TIPS} selectHasChange={(text: string) => addOne(text)}></MnemonicGirdle>
      <NtfButton text={t('guidePage.goon')} onPress={() => goNext()} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} heigh={pxToDp(104)} width={pxToDp(686)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>

      <Loading isShow={showSniper} onTimeOut={() => setShowSniper(false)}></Loading>
    </ScrollView>

  );
};
export default MnemonicVerify;


