import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, Alert, ImageRequireSource } from "react-native";
import styles from "./styles";
import { pxToDp, pxToSp } from "@/utils/system";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { UIELEMENTS } from "@/constants/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import CheckBox from "@react-native-community/checkbox";
import { COLORS } from "@/utils/Miscellaneous";
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  imageSource?: ImageRequireSource;
  text?: String;
};

const RemoveSegment: FunctionComponent<butonProps> = (props) => {
  const { containerStyle, imageSource, text } = props;
  const [toggleCheckBox, settoggleCheckBox] = useState(0);
  const removeThis = () => {

  }
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between" }}>
        <Text style={{ color: '#969696', fontSize: pxToSp(28) }}>Twitter</Text>
        <PressableSlop onPress={removeThis}>
          <Text style={{ color: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR, fontSize: pxToSp(28) }}>移除链接</Text>
        </PressableSlop>
      </View>

      <IDBitTabBg style={{ paddingHorizontal: pxToDp(34), paddingVertical: pxToDp(22),marginTop:pxToDp(10), borderRadius: pxToDp(12) }}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <Image
            style={[styles.imgStyle]}
            source={imageSource}
            resizeMode={'stretch'}
          />
          <Text style={[styles.textStyle]}>{text}</Text>
        </View>
      </IDBitTabBg>
      <View style={{ flexDirection: 'row',alignItems:'center',marginTop:pxToDp(20) }}>
        <CheckBox
        style={{width:pxToDp(40),height:pxToDp(40)}}
          disabled={false}
          value={toggleCheckBox}
          onTintColor={COLORS.clear}
          tintColor={UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR}
          onCheckColor={'#000'}
          onFillColor={UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR}
          tintColors={{true:UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR,false:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR}}
          onValueChange={(newValue: number) => settoggleCheckBox(newValue)}
          onAnimationType={'bounce'}
          offAnimationType={'bounce'}
          boxType={'square'}
        />
        <Text style={{ color: "#969696", fontSize: pxToDp(28) ,marginLeft:pxToDp(16)}}>在IDChats 上显示 Facebook</Text>
      </View>
    </View>
  );
};

export default RemoveSegment;
