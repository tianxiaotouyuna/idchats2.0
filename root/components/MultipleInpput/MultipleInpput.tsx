import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert, TextInput } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import IDBitTabBg from "../IDBitTabBg/IDBitTabBg";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import { onChange } from "react-native-reanimated";
import { t } from "i18next";
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  horderStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onChangeText?: (text:string) => void;
  placeHolder?: string;
  length?: number;
  outText?: string;
  value?:string;
};

const MultipleInpput: FunctionComponent<butonProps> = (props) => {
  const { containerStyle,horderStyle, value,placeHolder = t('my.rightAddress'), length ,onChangeText} =
    props;
  const [introduce, setintroduce] = useState('');
  const inputtText = (text: string) => {
    if (text.length > length) {
      toast('最多只能输入' +length+ '个文字！')
      setintroduce(text.substring(0, length))
      onChangeText(text.substring(0, length))
      return
    }
    setintroduce(text)
    onChangeText(text)
  }
  return (
    <View
      style={[styles.containerStyle,containerStyle ]}>
      <IDBitTabBg style={[{ width: pxToDp(686), height: pxToDp(268), paddingHorizontal: pxToDp(30) },horderStyle]}>
        <TextInput value={value?value:introduce} onChangeText={(text: any) => { inputtText(text) }} style={{ fontSize: pxToSp(28), width: '100%', color: '#fff', textAlignVertical: 'top' ,marginTop:pxToDp(20)}} placeholderTextColor={'#5C616C'} placeholder={placeHolder}></TextInput>
        <Text style={{ color: '#5C616C', position: 'absolute', bottom: 10, right: 10 }}>{introduce.length}/{length}</Text>
      </IDBitTabBg>
    </View>
  );
};

export default MultipleInpput;
