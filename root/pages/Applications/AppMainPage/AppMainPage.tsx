import React, { FunctionComponent } from "react";
import { View } from "react-native";
import styles from "@/styles/pages/guide_page/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { Text } from "react-native-animatable";
import useInitScreen from "@/hooks/useInitScreen";
import { t } from "i18next";
import { useRoute } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { UIELEMENTS } from "@/constants/index";
import RankList from "@/components/RankList/RankList";
const AppMainPage: FunctionComponent = (props) => {
  const data: any = useRoute().params?.data ?? {};
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: data?.name,
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const play = () => {

  }
  return (
    <View style={[styles.container, { paddingBottom: pxToDp(238), paddingTop: pxToDp(238) }]}>
      <FastImage
        style={[styles.image]}
        resizeMode="cover"
        source={{ uri: data?.image }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: pxToDp(24) }}>
        <IDBitBtn text={t('application.begin')} containerStyle={{ alignSelf: 'center', borderRadius: pxToDp(12), height: pxToDp(82), width: pxToDp(260), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }} onPress={play}></IDBitBtn>
        <Text style={{ position: 'absolute', right: 0, color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(28) }}>排行榜</Text>
      </View>
      <RankList titles={[t('application.rank'), t('application.address'), t('application.score'), t('application.award')]} data={[{ rank: require('@/resources/second/rank1.png'), address: '0x30303303030300', score: 100003, award: '20000' },
      { rank: require('@/resources/second/rank2.png'), address: '0x30303303030300', score: 100003, award: '20000' },
      { rank: require('@/resources/second/rank3.png'), address: '0x30303303030300', score: 100003, award: '20000' },]} myData={{ rank: require('@/resources/second/rank1.png'), address: '0x30303303030300', score: 100003, award: '20000' }}/>
    </View>
  );
};
export default AppMainPage;


