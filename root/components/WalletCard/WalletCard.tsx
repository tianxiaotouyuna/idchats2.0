import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert, Clipboard } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { pxToDp, toast } from "@/utils/system";
import useRedux from "@/hooks/useRedux";
import { useTranslation } from "react-i18next";
import PressableSlop from "../PressableSlop/PressableSlop";
export enum CardStyle {
  POP_STYLE = 0, //
  PAGE_STYLE = 1, //
}
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (wallet: any) => void;
  imageSource?: ImageRequireSource;
  data?: any;
  cardStyle?: CardStyle
};
// {
//     address: "0x7822d01737246a13F7979b9567E8d916f04Ea074",
//     keyStore: "{\"address\":\"7822d01737246a13f7979b9567e8d916f04ea074\",\"id\":\"738b9833-f8d8-4f7f-bd60-f7101a7eb18c\",\"version\":3,\"crypto\":{\"cipher\":\"aes-128-ctr\",\"cipherparams\":{\"iv\":\"8e52982713f9082ed0d36f7948f9179b\"},\"ciphertext\":\"edb9c7a345b5c3928beb68374a428ba81f63a7d60ef469fa84501e71238ef32f\",\"kdf\":\"scrypt\",\"kdfparams\":{\"salt\":\"ac7045bba30d9f9321b43337b8403620d30d88762d55da4aa766b2344e232c2d\",\"n\":64,\"dklen\":32,\"p\":1,\"r\":8},\"mac\":\"76672e6071a67dbb3828efb8dbadffba2e01e034cc1d0b13015c151e3817d48c\"}}",
//     name: "钱包4Ea074",
//     privateKey: "0x909b5a67b2109deeae0441680cbcd82dfacc2c9a25d92e3d3d9dbf3dba6a607f",
//   }
const WalletCard: FunctionComponent<butonProps> = (props) => {
  const { imgStyle, onPress, imageSource, cardStyle = 0, data, textStyle, containerStyle } =
    props;
  const { imUserInfo,chainId } = useRedux();
  const { t } = useTranslation();
  const copyAdress = async (value: string) => {
    Alert.alert('复制成功')
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    toast('复制成功')
    console.log('复制的内容', str)
  }
  return (
    <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
      onPress={() => onPress(data)}
      style={[styles.containerStyle, containerStyle]}
      rippleContainerBorderRadius={pxToDp(32)}
      pointerEvents={'box-none'} 
    >
      <View style={{ backgroundColor: 'white', width: '100%' }}>
        <Text style={[styles.textStyle, textStyle]}>{t('common.wallet') + '-' + data?.name}</Text>
        <View style={{ flexDirection: 'row', marginTop: pxToDp(12), alignItems: 'center' }}>
          <Text style={{ color: '#ABABAB', fontSize: pxToDp(28), width: pxToDp(188) }} numberOfLines={1} ellipsizeMode={'middle'}>{data?.address}</Text>
          <PressableSlop
            onPress={() => copyAdress(data?.address)}
          >

            <Image
              style={{ width: pxToDp(32), height: pxToDp(32) }}
              source={require("@/resources/idbt/icon_copy.png")}
              resizeMode={'stretch'}
            />
          </PressableSlop>
        </View>
        <Text style={{ fontSize: pxToDp(28), fontWeight: '400', alignSelf: 'flex-end' }}>{data?.balance}</Text>
        {data?.address.toLowerCase() == imUserInfo?.userID&&data?.chainId == chainId && cardStyle == CardStyle.POP_STYLE ? <Image
          style={{ width: pxToDp(32), height: pxToDp(32), position: "absolute", top: pxToDp(36), right: pxToDp(30) }}
          source={require("@/resources/idbt/my/ok.png")}
          resizeMode={'stretch'}
        /> : null}
      </View>
    </Ripple>
  );
};

export default WalletCard;
