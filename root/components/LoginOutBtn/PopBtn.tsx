import React, { FunctionComponent, ReactNode, useState } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  Image,
} from "react-native";
import styles from "./pop-btn";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp } from "@/utils/system";
export enum CardStyle {
  LOGINOUT_STYLE = 1, //退出登录
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  cardStyle?: CardStyle;
  sure_press?: () => void;
  cancle_press?: () => void;
};

const PopBtn: FunctionComponent<PopProps> = (props) => {
  const { style, cardStyle, sure_press, cancle_press } = props;

  
  const renderLoginOut=()=>{
    return(

    <View style={[styles.modalContent, style]}>
      <View style={{flex:1,justifyContent:"space-between",alignItems:"center"}}>
      <Text style={styles.text}>是否退出钱包？</Text>
      <View style={{width:'100%', flexDirection: "row" ,justifyContent:"space-between"}}>
        <NtfButton text="取消" width={pxToDp(310)} heigh={pxToDp(84)}  borderRadius={pxToDp(12)} textColor='#383838' borderColor='#979797' onPress={cancle_press}>
          {" "}
        </NtfButton>
        <NtfButton text="退出" width={pxToDp(310)} heigh={pxToDp(84)} textColor='white'  borderRadius={pxToDp(12)} backgroundColor='#3352DB' borderColor='#3352DB' onPress={sure_press} >
          {" "}
        </NtfButton>
      </View>
      </View>
    </View>
  )
    }
  return (
    renderLoginOut()
  );
};

export default PopBtn;
