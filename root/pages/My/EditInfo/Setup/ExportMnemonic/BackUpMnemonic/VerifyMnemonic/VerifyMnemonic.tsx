import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import styles from "@/styles/pages/guide/AddAccount/create_wallet/mnemonic_verify/styles";
import useInitScreen from "@/hooks/useInitScreen";
import CreateSegement from "@/components/CreateSegement/CreateSegement";
import { Text } from "react-native-animatable";
import MnemonicGirdle, { MonicGridleStyle } from "@/components/MnemonicGirdle/MnemonicGirdle";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import NtfButton from "@/components/NtfButton/NtfButton";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import { useRef } from "react";
import { windowWidth } from '@/utils/system';
import { isEqual } from "lodash";
import { Navigate } from "@/utils/index";
import { ethers, Wallet } from "ethers";
import useRedux from "@/hooks/useRedux";
import storage from "@/utils/pstorage";
import { StorageService } from "@/services/index";
import Loading from "@/components/LoadingSnipper/Loading";
import Toast from "react-native-root-toast";
import { t } from "i18next";

let selectMnemonic_ = new Array()
const VerifyMnemonic: FunctionComponent = (props) => {
  const mnemonic: any = useRoute().params?.mnemonic ?? {};
  const randomMnemonic: any = useRoute().params?.randomMnemonic ?? {};
  const [selectMnemonic, setselectMnemonic] = useState([]);
  const [deleteIndexs, setdeleteIndexs] = useState([]);
  const [needRefr, setneedRefr] = useState(false);
  const mRef = useRef(MnemonicGirdle);
  const navigation = useNavigation();
  const [showSniper, setShowSniper] = useState(false);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '验证助记词',
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
      toast('助记词验证成功！')
      setTimeout(() => {
        const popAction = StackActions.pop(2);

        navigation.dispatch(popAction);
      }, 1000);

    }
    else {
      setTimeout(() => {
        setShowSniper(false)
        if (newArr.length < 12) toast('助记词不正确，请校对')
        else toast('助记词不正确，请校对')
      }, 300);
    }

  }
  return (
    <ScrollView style={styles.container_scroll}>
      <Text style={styles.text1}>{t('guidePage.verifyMnemonic')}</Text>
      <Text style={styles.text2}>{t('guidePage.verifyMnemonic')}</Text>
      <View style={{ paddingHorizontal: pxToDp(32), paddingBottom: pxToDp(40), paddingTop: pxToDp(40 - 10), borderColor: 'rgba(255,255,255,0.3)', borderWidth: pxToDp(1), borderRadius: pxToDp(12), padding: pxToDp(20), marginBottom: pxToDp(40) }}>
        <MnemonicGirdle tabWidth={windowWidth - pxToDp(128)} needRefresh={needRefr} paddingHorizontal={pxToDp(0)} selfMargin={pxToDp(10)} rowCount={4} columnCount={3} data={selectMnemonic} monicGridleStyle={MonicGridleStyle.INPUTSTYLE} deleteHasChange={(index: number) => deleteOne(index)}></MnemonicGirdle>
      </View>
      <MnemonicGirdle ref={mRef} needRefresh={needRefr} selectMnemonic={selectMnemonic} paddingHorizontal={pxToDp(32)} selfMargin={pxToDp(10)} rowCount={4} columnCount={3} data={randomMnemonic} monicGridleStyle={MonicGridleStyle.INPUTSTYLE_TIPS} selectHasChange={(text: string) => addOne(text)}></MnemonicGirdle>
      <NtfButton text={t('guidePage.verify')} onPress={() => goNext()} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} heigh={pxToDp(104)} width={pxToDp(686)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>

      <Loading isShow={showSniper} onTimeOut={() => setShowSniper(false)} text={''}></Loading>
    </ScrollView>

  );
};
export default VerifyMnemonic;


