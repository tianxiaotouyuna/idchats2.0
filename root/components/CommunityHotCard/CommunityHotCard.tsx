import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { pxToDp, pxToSp } from "@/utils/system";
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  data?: any;
};

const CommunityHotCard: FunctionComponent<butonProps> = (props) => {
  const { data, onPress, containerStyle, contentStyle } =
    props;
  const [borderRadius, setborderRadius] = useState(1000);
  const isClick = () => {
    onPress && onPress()
  }
  return (<View
    style={[styles.containerStyle, containerStyle]}
  >

    <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
      onPress={isClick}
      style={[styles.contentStyle, contentStyle]}
    >
      <View style={{ flexDirection: 'row' }}>
        <FastImage style={{
          backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
          width: pxToDp(180),
          height: pxToDp(180),
          borderRadius: pxToDp(12),
          paddingVertical: pxToDp(22),
          paddingHorizontal: pxToDp(32)
        }} resizeMode='cover' source={{ uri: data?.faceURL }} />
        <View style={{ height: pxToDp(180), justifyContent: 'space-between', paddingVertical: pxToDp(4), marginLeft: pxToDp(20) }}>
          <Text style={{ fontSize: pxToSp(32), color: '#fff', fontWeight: '500' ,width:200}} numberOfLines={1} ellipsizeMode={'middle'}>{data?.groupName}</Text>
          <Text style={{ fontSize: pxToSp(26), color: '#ABABAB', width: pxToDp(300) }}
            ellipsizeMode={'middle'}
            numberOfLines={1}>{data?.introduction}</Text>
          <Text style={{ fontSize: pxToSp(26), color: '#ABABAB', width: pxToDp(200) }}
            ellipsizeMode={'middle'}
            numberOfLines={1}>{data?.creatorUserID}</Text>
        </View>
      </View>
    </Ripple>
  </View>
  );
};

export default CommunityHotCard;
