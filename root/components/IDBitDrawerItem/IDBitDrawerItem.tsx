import React, { FunctionComponent, ReactNode, useState } from "react";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, Alert, ImageBackground, TouchableHighlight, ImageRequireSource } from "react-native";
import styles from "./styles";
import { pxToDp, pxToSp } from "@/utils/system";
import IDBitBtn from "../IDBitBtn/IDBitBtn";
import { Navigate } from "@/utils/index";
import PressableSlop from "../PressableSlop/PressableSlop";
import CommunityPop, { CommunityPopStyle } from "../CommunityPop/CommunityPop";
import Modal from "react-native-modal";
type ItemProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (isOpen: boolean) => {};
  imageSource?: ImageRequireSource;
  data?: any
};

const IDBitDrawerItem: FunctionComponent<ItemProps> = (props) => {
  const { style, data ,imageSource} = props;
  const pushToNext = () => {
    Navigate.navigate(data?.className)
  }
  return (
    <TouchableHighlight onPress={pushToNext}>
      <View
        style={[styles.contranier, style]}
      >
        <Image
          style={{ width: pxToDp(28), height: pxToDp(28), marginLeft: pxToDp(4) }}
          source={imageSource}
          resizeMode={'stretch'}
        />
        <Text style={{ marginLeft: pxToDp(10), color: '#F1F4F8', fontSize: pxToSp(30) }}>{data?.text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default IDBitDrawerItem;