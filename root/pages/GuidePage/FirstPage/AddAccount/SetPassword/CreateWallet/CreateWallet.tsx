import React, { FunctionComponent } from "react";
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
import { t } from "i18next";

const CreateWallet: FunctionComponent = (props) => {
  const mnemonic: any = useRoute().params?.mnemonic;
  const pushChainId: any = useRoute().params?.pushChainId ;
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
  const goNext = () => {
    Navigate.navigate('MnemonicVerify', { mnemonic: mnemonic, randomMnemonic: randSort2(mnemonic.split(' ')) ,pushChainId:pushChainId})
  }
  const copyAdress = async (value: string) => {
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    toast(t('guidePage.copyScuess'))
    console.log('复制的内容', str)
  }
  return (
    <ScrollView style={styles.container}>
      <CreateSegement />
      <Text style={styles.text1}>{t('guidePage.your')}</Text>
      <Text style={styles.text2}>{t('guidePage.restore')}</Text>
      <MnemonicGirdle style={{ width: '100%' }} paddingHorizontal={pxToDp(32)} selfMargin={pxToDp(10)} rowCount={4} columnCount={3} data={mnemonic.split(' ')}></MnemonicGirdle>
      <NtfButton text={t('guidePage.goon')} onPress={() => goNext()} backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} borderRadius={pxToDp(16)} font={pxToSp(36)} heigh={pxToDp(104)} width={pxToDp(686)} style={styles.beginBtn} textColor={'#0D0E10'}></NtfButton>
      <PressableSlop onPress={() => copyAdress(mnemonic)}>
        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: 'row' ,marginTop:pxToDp(32),marginBottom:pxToDp(300)}}>
          <Text style={styles.copy_text}>{t('guidePage.copyPhrase')}</Text>
          <Image
            style={styles.copy}
            source={require("@/resources/idbt/copy.png")}
          />
        </View>
      </PressableSlop>
    </ScrollView>
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
export default CreateWallet;


