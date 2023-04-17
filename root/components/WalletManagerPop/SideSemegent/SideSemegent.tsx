import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "../styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { pxToDp, pxToSp } from "@/utils/system";
import { screenHeight } from "@/utils/Dimensions";
import PressableSlop from "../../PressableSlop/PressableSlop";
import SideItem from "./SideItem";
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
    onPress?: (index:number) => void;
    canclePress?: () => void;
  surePress?: () => void;
  imageSource?: ImageRequireSource;
  text?: string;
  data?: any;
};

const SideSemegent: FunctionComponent<butonProps> = (props) => {
  const { canclePress, onPress, surePress, data, textStyle, containerStyle } =
    props;
  const [selectID, setselectID] = useState(0);
  const managerData = [
    require("@/resources/idbt/my/eth.png"),
    require("@/resources/idbt/my/bnb.png"),
    require("@/resources/idbt/my/MATIC.png"),
  ]
  const managerData_sel = [
    require("@/resources/idbt/my/eth_sel.png"),
    require("@/resources/idbt/my/bnb_sel.png"),
    require("@/resources/idbt/my/MATIC2.png"),
  ]
  const selectItem = (index:number) => {
        setselectID(index)
    onPress && onPress(index)
  }
  return (
    <View
      style={[{backgroundColor: '#181E29'},
        containerStyle]}
    >
      {
        managerData.map((uri, index) => {
          return <SideItem key={uri+index} thisIndex={index} isSelected={selectID==index?true:false} imageSource={uri}  imageSource_sel={managerData_sel[index]} onPress={(index:number)=>selectItem(index)}/>
        })
      }
    </View>
  );
};

export default SideSemegent;
