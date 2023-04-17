import { pxToDp } from "@/utils/system";
import React, { FunctionComponent } from "react";
import { View, Image, Text, StyleProp, ViewStyle, Clipboard } from "react-native";
import RemoveSegment from "./RemoveSegment/RemoveSegment";
import styles from "./styles";
type OutPorps = {
  style?: StyleProp<ViewStyle>
  data?: any
}
const Bottom: FunctionComponent<OutPorps> = (props) => {
  return (
  <View>
    <RemoveSegment text={'IDChats'} imageSource={require('@/resources/idbt/twitter.png')} containerStyle={[styles.segment,{marginTop:pxToDp(60)}]}/>
    <RemoveSegment text={'IDChats'} imageSource={require('@/resources/idbt/facebook.png')} containerStyle={[styles.segment,{marginTop:pxToDp(60)}]}/>
  </View>
  );
};
export default Bottom;


