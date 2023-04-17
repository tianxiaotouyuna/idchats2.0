import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle } from "react-native";
import styles from "./ntf-button";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { t } from "i18next";
type butonProps = {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  width?: number;
  heigh?: number;
  onPress?: () => void;
  children?: ReactNode;
  imageSource?: ImageURISource;
  text?: string;
  textColor?: string;
  font?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: string;
  loadingUse?: boolean;
  status?: string;
  highlt?: boolean
};

const NtfButton: FunctionComponent<butonProps> = (props) => {
  const { contentStyle,highlt = true, width, imgStyle, heigh, onPress, font, style, imageSource, text,textStyle, textColor = UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE, borderRadius = 1000, borderColor = UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE, backgroundColor = 'white', loadingUse = false, status = t('common.confirm')} =
    props;
  const [isloading, setisloading] = useState(false);

  const isClick = () => {
    loadingUse ? setisloading(true) : null
    onPress()
  }
  return (
    <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
      onPress={isClick}
      style={[
        styles.base,
        style,
        width == 10000 ? { } : {width: width, height: heigh }, {
          borderRadius: borderRadius, borderColor: borderColor, backgroundColor: backgroundColor
        },
      ]}
      rippleContainerBorderRadius={borderRadius}
    >
      {/* <View style={[{ flexDirection: "row",alignItems:"center" },loadingUse&&isloading?{justifyContent:'space-between',width:'100%',marginHorizontal:pxToDp(40)}:{ flexDirection: "row",alignItems:"center" }]}> */}
      <View style={[{ flexDirection: "row", alignItems: "center", },  width == 10000 ? {}:{width: '100%', justifyContent: "center"},contentStyle]}>
        {imageSource ? <Image
          style={[styles.btn_icon, imgStyle]}
          source={imageSource}
          resizeMode={'stretch'}
        /> : null}
        {text ? <Text style={[styles.btn_text, { fontSize: font, color: textColor },textStyle]}>{text}</Text> : null}
        {/* {loadingUse && isloading ?
          <Text style={[styles.btn_text, { fontSize: font, color: textColor }]}>交易进行中</Text>
          :
          <Text style={[styles.btn_text, { fontSize: font, color: textColor }]}>{text}</Text>
        }
        {loadingUse && isloading ?
          <Spinner style={styles.spinner} isVisible={true} size={pxToDp(30)} type={'Wave'} color={'white'} />
          : null} */}
      </View>
    </Ripple>
  );
};

export default NtfButton;
