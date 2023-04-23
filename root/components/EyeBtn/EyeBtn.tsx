import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, Alert, TouchableHighlight } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { ImageSource } from "react-native-vector-icons/Icon";
import { pxToDp } from "@/utils/system";
import Spinner from "react-native-spinkit";
import PressableSlop from "../PressableSlop/PressableSlop";
export enum EYEStyle {
  BLACKSTYLE = 1, //退出登录
  WHITESTYLE = 2, //退出登录
}
type butonProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (isOpen:boolean) => {};
  eyeStyle?:EYEStyleT
};

const EyeBtn: FunctionComponent<butonProps> = (props) => {
    const [isOpen, setisOpen] = useState(false);
  const { onPress=(isOpen:boolean) => {}, style,eyeStyle=EYEStyle.BLACKSTYLE} =
    props;
  const tapEye=()=>{
    setisOpen(!isOpen)
    onPress(isOpen)
  }
  return (
    <TouchableHighlight underlayColor={'transparent'} style={[{width:pxToDp(88),height:pxToDp(88),alignItems:"flex-end",justifyContent:"center"},style]} onPress={()=>tapEye()}>
    {
      eyeStyle==EYEStyle.BLACKSTYLE?<Image
      style={[styles.image]}
      source={isOpen?require("@/resources/second/icon_open.png"):require("@/resources/second/icon_open.png")}
      /> :
      <Image
          style={[styles.image]}
          source={isOpen?require("@/resources/second/icon_open.png"):require("@/resources/second/icon_open.png")}
          /> 
    }
      
    </TouchableHighlight>
       
  );
};

export default EyeBtn;
