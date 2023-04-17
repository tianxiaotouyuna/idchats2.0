import React, { FunctionComponent, useEffect } from "react";
import { View, Image, Text, StyleProp, ViewStyle } from "react-native";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import FastImage from "react-native-fast-image";
import { UIELEMENTS } from "@/constants/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import Ripple from "react-native-material-ripple";
import { t } from "i18next";
type OutPorps = {
  style?: StyleProp<ViewStyle>;
  data?: any;
  onFollowerClick?: () => void;
  isfollow?: boolean;
  isMy?: boolean;
  thisProfile?: string
};
const Top: FunctionComponent<OutPorps> = (props) => {
  useEffect(() => { }, []);
  const { data, onFollowerClick, isfollow, thisProfile, isMy } = props;
  const [isError, setIsError] = React.useState(false)
  const onError = () => setIsError(true)
  // toast(JSON.stringify(data?.userProfile))
  return (
    <View style={{ paddingVertical: pxToDp(30) }}>
      <View style={{ flexDirection: "row" }}>
        <FastImage
          style={{
            backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
            width: pxToDp(148),
            height: pxToDp(148),
            borderRadius: pxToDp(24),
          }}
            source={{ uri: data?.faceURL }}

          // defaultSource={require('@/resources/idbt/moren.png')}
          resizeMode="cover"
        />
        <View
          style={{
            justifyContent: "space-between",
            paddingHorizontal: pxToDp(20),
            paddingVertical: pxToDp(4),
          }}
        >
          <View style={{ width: pxToDp(11) }}>
            <Text 
              style={{ fontSize: pxToSp(32), width: pxToDp(244), color: "#fff" }}
              numberOfLines={1} ellipsizeMode={'middle'}>{data?.ex ? (JSON.parse(data.ex)?.ensDomain?JSON.parse(data.ex)?.ensDomain: (data.nickname || data.userID))
                :(data.nickname || data.userID)}</Text>
          </View>
          {
            isMy ? null :
              <Ripple onPress={onFollowerClick}>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#D5F713",
                    alignItems: "center",
                    paddingVertical: pxToDp(10),
                    paddingHorizontal: pxToDp(14),
                    borderRadius: pxToDp(16),
                  }}
                >
                  <Image
                    style={{ width: pxToDp(16), height: pxToDp(18) }}
                    source={require("@/resources/idbt/形状结合.png")}
                  ></Image>
                  <Text
                    style={{
                      fontSize: pxToSp(26),
                      color: "#0F141E",
                      marginLeft: pxToDp(4),
                    }}
                  >
                    {isfollow ? t('my.unFollow') : t('my.follow')}
                  </Text>
                </View>
              </Ripple>
          }

          {/* <Text style={{fontSize:pxToSp(32),color:'#fff'}}>取消跟随</Text> */}
        </View>
      </View>
      <Text
        style={{
          // height: pxToDp(160),
          width: "100%",
          fontSize: pxToDp(28),
          color: "#ABABAB",
          marginTop: pxToDp(18),
          marginBottom: pxToDp(30),
        }}
      >
        {thisProfile}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: pxToDp(64), height: pxToDp(64) }}
          source={require("@/resources/idbt/icon_Facebook.png")}
        ></Image>
        <Image
          style={{ width: pxToDp(64), height: pxToDp(64), marginLeft: pxToDp(24) }}
          source={require("@/resources/idbt/icon_Twitter.png")}
        ></Image>
      </View>
      <View style={{ backgroundColor: '#rgba(228, 228, 228, .09 )', height: pxToDp(.5), width: '100%', marginTop: pxToDp(52) }}></View>
    </View>
  );
};
export default Top;
