import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { pxToDp, pxToSp } from "@/utils/system";
export enum CardStyle {
  ME_STYLE = 0, //我的社区
  OTHER_PEOPLE_STYLE = 1, //他人的社区
}
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  data?: any;
  cardStyle?: CardStyle;
  enable?:boolean
};

const CommunityListCard: FunctionComponent<butonProps> = (props) => {
  const { data, onPress, containerStyle, contentStyle, cardStyle = CardStyle.ME_STYLE,enable=true } =
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
      onPress={enable&&isClick}
      style={[styles.contentStyle, contentStyle]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row',
        // backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,width:'100%',
            borderRadius: pxToDp(12),overflow:'hidden' }}>
          <FastImage style={{
            backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
            width: pxToDp(120),
            height: pxToDp(120),
            borderRadius: pxToDp(12),
            paddingVertical: pxToDp(22),
            paddingHorizontal: pxToDp(32)
          }} resizeMode='cover' source={data?.faceURL?{ uri: data?.faceURL }:(require('@/resources/idbt/moren.png'))} />
          {cardStyle == CardStyle.OTHER_PEOPLE_STYLE ?
            <View style={{ height: pxToDp(120),justifyContent:'space-between', paddingVertical: pxToDp(4), paddingHorizontal: pxToDp(20) }}>
              <Text style={{ fontSize: pxToSp(28), color: '#fff', fontWeight: '500' , width: 200}}
                ellipsizeMode={'middle'}
                numberOfLines={1}>{data?.groupName}</Text>
              <Text style={{ fontSize: pxToSp(26), color: '#ABABAB', width: 200 }}
                ellipsizeMode={'middle'}
                numberOfLines={2}>{data?.introduction}</Text>
            </View>
            :
            <View style={{height: pxToDp(120), justifyContent: 'space-between', paddingVertical: pxToDp(4), paddingHorizontal: pxToDp(20) }}>
              <Text style={{ fontSize: pxToSp(32), color: '#fff', fontWeight: '500', width: 200  }}
                ellipsizeMode={'middle'}
                numberOfLines={1}>{data?.groupName}</Text>
              <Text style={{ fontSize: pxToSp(26), color: '#ABABAB', width: 200 }}
                ellipsizeMode={'middle'}
                numberOfLines={1}>{data?.conversationData?.latestMsg?.content}</Text>
            </View>

          }
        </View>
        {data?.conversationData?.unreadCount ? <View style={{ backgroundColor: '#D5F713', borderRadius: pxToDp(20), paddingLeft: pxToDp(18), paddingRight: pxToDp(16), paddingVertical: pxToDp(4) }}>
          <Text style={{ color: '#0F141E', fontSize: pxToSp(24) }}>{data?.conversationData.unreadCount}</Text>
        </View> : null}
      </View>
    </Ripple>
  </View>
  );
};

export default CommunityListCard;
