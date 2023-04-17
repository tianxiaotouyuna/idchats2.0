import React, { Fragment, FunctionComponent } from "react";
import { Clipboard, Image, View } from "react-native";
import styles from "@/styles/pages/guide/AddAccount/create_wallet/styles";
import useInitScreen from "@/hooks/useInitScreen";
import CreateSegement from "@/components/CreateSegement/CreateSegement";
import { Text } from "react-native-animatable";
import MnemonicGirdle from "@/components/MnemonicGirdle/MnemonicGirdle";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import { useRoute } from "@react-navigation/native";
import NtfButton from "@/components/NtfButton/NtfButton";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { ScrollView } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { t } from "i18next";

const BackUpMnemonic: FunctionComponent = (props) => {
  const mnemonic: any = useRoute().params?.mnemonic ?? {};
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '备份助记词',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const goNext = () => {
    Navigate.navigate('VerifyMnemonic', { mnemonic: mnemonic, randomMnemonic: randSort2(mnemonic.split(' ')) })
  }
  const copyAdress = async (value: string) => {
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    toast(t('guidePage.copyScuess'))
    console.log('复制的内容', str)
  }
  return (
    <View style={[styles.container, { paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL, paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP, alignItems: 'center', justifyContent: 'space-between', paddingBottom: useSafeAreaInsets().bottom + pxToDp(60) }]}>
      <View style={{width:'100%'}}>
      <IDBitTabBg style={{ paddingHorizontal: pxToDp(34), paddingVertical: pxToDp(26) ,width:'100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start',width:'100%' }}>
                <View style={{ width: pxToDp(40), height: pxToDp(40), alignItems: "center", justifyContent: 'center' }}>
                    <Image
                        style={{ width: pxToDp(32), height: pxToDp(32) }}
                        source={require("@/resources/idbt/my/gandanhao.png")}
                    />
                </View>
                <View style={{marginLeft: pxToDp(6),flex:1}}>
                <Text style={{ textAlignVertical: 'top',  color: '#FC5143', fontSize: pxToSp(28), lineHeight: pxToDp(40) }}>{t('my.moneciTipsa')}</Text>
                <Text style={{ textAlignVertical: 'top',  color: '#FC5143', fontSize: pxToSp(28), lineHeight: pxToDp(40) }}></Text>
                <Text style={{ textAlignVertical: 'top',  color: '#FC5143', fontSize: pxToSp(28), lineHeight: pxToDp(40) }}>{t('my.moneciTipsb')}</Text>
                <Text style={{ textAlignVertical: 'top', color: '#FC5143', fontSize: pxToSp(28), lineHeight: pxToDp(40) }}>{t('my.moneciTipsc')}</Text>

                </View>
            </View>
        </IDBitTabBg>
      <MnemonicGirdle style={{ width: '100%',marginTop:pxToDp(30) }} paddingHorizontal={pxToDp(32)} selfMargin={pxToDp(10)} rowCount={4} columnCount={3} data={mnemonic.split(' ')}></MnemonicGirdle>
          </View>
      <View style={{width:'100%'}}>
            <IDBitBtn text={t('my.moneciVerify')} containerStyle={{ height: pxToDp(88), alignSelf: "center", paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }} onPress={goNext}></IDBitBtn>
        <PressableSlop onPress={() => copyAdress(mnemonic)}>
          <View style={{ alignItems: "center", justifyContent: "center", flexDirection: 'row', marginTop: pxToDp(32)}}>
            <Text style={styles.copy_text}>{t('guidePage.copyPhrase')}</Text>
            <Image
              style={styles.copy}
              source={require("@/resources/idbt/copy.png")}
            />
          </View>
        </PressableSlop>
      </View>
    </View>
  );
};
function randSort2(arr: []) {
  var mixedArray = [];
  while (arr.length > 0) {
    var randomIndex = parseInt(Math.random() * arr.length);
    mixedArray.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return mixedArray;
}
export default BackUpMnemonic;


