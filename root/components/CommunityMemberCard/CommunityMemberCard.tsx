import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { log, pxToDp, pxToSp } from "@/utils/system";
import { t } from "i18next";
export enum CardStyle {
  NOT_ONLINE_STYLE = 0, //不在线
  ONLINE_STYLE = 1, //在线
}
type cardProps = {
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  data?: any;
  cardStyle?: CardStyle;
};
const CommunityMemberCard: FunctionComponent<cardProps> = (props) => {
  const { data, cardStyle, onPress, containerStyle, contentStyle } =
    props;
  const [borderRadius, setborderRadius] = useState(1000);
  const [isError, setIsError] = React.useState(false)
  const onError = () => setIsError(true)
  const isClick = () => {
    onPress && onPress()
  }
  useEffect(() => {
  }, [])
  const renderOnline = () => (
    <View
      style={[styles.containerStyle, containerStyle]}
    >

      <Ripple
        rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
        onPress={isClick}
        style={[styles.contentStyle, contentStyle, { paddingBottom: pxToDp(24) }]}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ height: pxToDp(90), alignItems: 'center' }}>
            <FastImage style={{
              backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
              width: pxToDp(90),
              height: pxToDp(90),
              borderRadius: pxToDp(12),
            }}
            source={{ uri: data?.faceURL } }
              // defaultSource={require('@/resources/idbt/moren.png')}
              resizeMode='cover'/>
            <View style={styles.dotStyle}></View>

          </View>
          <View style={{ flex:1,height: pxToDp(90), justifyContent: 'space-between', marginLeft: pxToDp(20) }}>
            <Text style={{ width: pxToDp(270), fontSize: pxToSp(28), color: '#fff', }} numberOfLines={1} ellipsizeMode={'middle'}>{data?.ex ? (JSON.parse(data.ex)?.ensDomain?JSON.parse(data.ex)?.ensDomain: (data.nickname || data.userID))
            :(data.nickname || data.userID)}</Text>
            <Text style={{ width:200, fontSize: pxToSp(28), color: '#fff', }} numberOfLines={1} ellipsizeMode={'middle'}>{data?.userProfile}</Text>
          </View>
        </View>
      </Ripple>
    </View>
  )
  const renderNotOnline = () => (
    <View
      style={[styles.containerStyle, containerStyle, { opacity: 0.54 }]}
    >

      <Ripple
        rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
        onPress={isClick}
        style={[styles.contentStyle, contentStyle, { paddingBottom: pxToDp(24) }]}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ height: pxToDp(90) }}>
            <FastImage style={{
              backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
              width: pxToDp(90),
              height: pxToDp(90),
              borderRadius: pxToDp(12),
              paddingVertical: pxToDp(22),
              paddingHorizontal: pxToDp(32),
            }}
              source={{ uri: data?.header }}
              // defaultSource={require('@/resources/idbt/moren.png')}
              resizeMode='cover' />
            <View style={styles.dotStyle2}></View>

          </View>
          <View style={{ flex:1,height: pxToDp(90), justifyContent: 'space-between', marginLeft: pxToDp(20) }}>
            <Text style={{ width: pxToDp(270), fontSize: pxToSp(28), color: '#fff', }} numberOfLines={1} ellipsizeMode={'middle'}>{data?.ex ? (JSON.parse(data.ex)?.ensDomain?JSON.parse(data.ex)?.ensDomain: (data.nickname || data.userID))
            :(data.nickname || data.userID)}</Text>
            <Text style={{ width: 200, fontSize: pxToSp(28), color: '#fff', }} numberOfLines={1} ellipsizeMode={'middle'}>{data?.userProfile}</Text>
          </View>
        </View>
      </Ripple>
    </View>
  )
  const renderTitle = () => {
    return (
      <Text
        style={data == '创建者（1）' ? {
          color: '#D2D2D2',
          fontSize: pxToSp(26),
          marginVertical: pxToDp(30)
        } : {
          color: '#D2D2D2',
          fontSize: pxToSp(26),
          marginBottom: pxToDp(30)
        }}>
        {data == '创建者（1）' ? (t('community.creator') + '（1） ') : (t('community.community8') + '（' + data + '）')}
      </Text>
    );
  };
  return (
    typeof data === 'string' ? renderTitle() : (cardStyle == CardStyle.ONLINE_STYLE ? renderOnline() : renderNotOnline())
  );
};

export default CommunityMemberCard;
