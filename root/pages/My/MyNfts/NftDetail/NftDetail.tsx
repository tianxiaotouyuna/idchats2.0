import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { pxToDp, pxToSp, windowWidth } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate } from "@/utils/index";
import { UIELEMENTS } from "@/constants/index";
import { useHeaderHeight } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import IDBitSepecter from "@/components/IDBitSepecter/IDBitSepecter";
import Ripple from "react-native-material-ripple";

const NftDetail: FunctionComponent = (props) => {
  const nftInfo: any = useRoute().params?.nftInfo ?? {};
  console.log('nftInfo======================/n' + JSON.stringify(nftInfo))
  const [showWalletPop, setshowWalletPop] = useState(false);
  const { t } = useTranslation()
  useInitScreen({
    navigationOptions: {
      headerTitle: t('my.nFTDetails'),
      headerTransparent: true,
      headerShown: true,
      headerTintColor: 'white'
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const readSucces = (result: any) => {
    const resultArr = result?.data?.split(':')
    Navigate.navigate('WalletTransler', { data: { address: resultArr[resultArr.length - 1], type: 0 } })
  }
  return (
    <View style={{ paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP, flex: 1, backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR }}>
      <Ripple>
        <FastImage style={{ width: '100%', height: pxToDp(624), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }} source={{ uri: nftInfo?.image_url }}></FastImage>
      </Ripple>
      <View style={{ paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL }}>
        <Text style={{ fontSize: pxToSp(36), color: '#fff', fontWeight: 'bold', marginVertical: pxToDp(26) }} ellipsizeMode='middle' numberOfLines={1}>{nftInfo?.name}</Text>
        <IDBitSepecter></IDBitSepecter>
        <Text style={{ fontSize: pxToSp(30), marginTop: pxToDp(36), marginBottom: pxToDp(16), color: '#fff', fontWeight: 'bold', marginVertical: pxToDp(26) }} ellipsizeMode='middle' numberOfLines={1}>交易记录</Text>
      </View>

      <IDBitBtn text={t('my.send')} containerStyle={{ bottom: useSafeAreaInsets().bottom + pxToDp(60), height: pxToDp(88), alignSelf: "center", position: 'absolute', paddingHorizontal: pxToDp(60) }} onPress={() => Navigate.navigate('NftTransfer',{data:nftInfo})}></IDBitBtn>
    </View>
  );
};
export default NftDetail;



