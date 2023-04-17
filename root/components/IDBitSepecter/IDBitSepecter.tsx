import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, Alert } from "react-native";
import styles from "./styles";
import { pxToDp } from "@/utils/system";
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
};

const IDBitSepecter: FunctionComponent<butonProps> = (props) => {
  const {containerStyle}=props;
  return (
    <View style={[styles.container,containerStyle]}></View>
  );
};

export default IDBitSepecter;
