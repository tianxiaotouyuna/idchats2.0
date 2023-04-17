import React, { FunctionComponent, ReactNode, useState } from "react";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, Alert, ImageBackground } from "react-native";
import styles from "./styles";
import { pxToDp, pxToSp } from "@/utils/system";
import IDBitBtn from "../IDBitBtn/IDBitBtn";
import IDBitTabBg from "../IDBitTabBg/IDBitTabBg";
import Ripple from "react-native-material-ripple";
import IDBitProgress from "../IDBitProgress/IDBitProgress";
import { UIELEMENTS } from "@/constants/index";
import { screenWidth } from "@/utils/Dimensions";
import { Navigate } from "@/utils/index";
import LinearGradinet from 'react-native-linear-gradient';
export enum CardStyle {
  LISTSTYLE = 0, //
  DETAILSTYLE = 1, //
}
type cardProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (isOpen: boolean) => {};
  data?: any;
  cardStyle?: CardStyle
};

const IDOGoCard: FunctionComponent<cardProps> = (props) => {
  const { style, data, cardStyle = CardStyle.LISTSTYLE } = props;
  const render_detailType = () => (
    <Ripple style={{ borderRadius: pxToDp(16) }} onPress={() => Navigate.navigate('IdoDetail', { data: data })}
    pointerEvents={'box-none'} 
    >
      <IDBitTabBg
        style={[styles.image, style]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ width: pxToDp(156), height: pxToDp(156), borderRadius: pxToDp(14) }} source={require('@/resources/idbt/ido/alogo.png')}></Image>
            <View style={{flexDirection:'column',marginLeft:pxToDp(16),justifyContent:'space-between',paddingVertical:pxToDp(4)}}>
              <Text style={{ color: '#FFFFFF', fontSize: pxToSp(30) }}>{data?.round}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#FFFFFF', fontSize: pxToSp(30) }}>{data?.status}</Text>
                <Text style={{ color: '#D5F713', fontSize: pxToSp(30) }}>{data?.symbolName}</Text>
              </View>
              <Text style={{ color: '#D5F713', fontSize: pxToSp(30) }}>{data?.symbolName}</Text>
            </View>
          </View>
          <IDBitBtn onPress={()=>Navigate.navigate('Approve')} text="参与" containerStyle={{ width: pxToDp(160), height: pxToDp(56), alignSelf: 'flex-start',paddingVertical:pxToDp(4) }} textStyle={{ fontSize: pxToDp(26) }}></IDBitBtn>

        </View>
        <Text style={{ color: '#ABABAB', fontSize: pxToSp(30), paddingVertical: pxToDp(28) }}>{data?.descrition}</Text>

        <LinearGradinet
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#FBFFC6', '#D5F713']}
          style={{ width: '100%', height: pxToDp(296), padding: pxToDp(24), borderRadius: pxToDp(12) }}
        >
          <Text style={{ color: '#000000', fontSize: pxToSp(26) }}>第一轮</Text>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: '#000000', fontSize: pxToSp(24), marginTop: pxToDp(8) }}>币量</Text>
              <Text style={{ color: '#000000', fontSize: pxToSp(24), marginTop: pxToDp(4) }}>10000 BUSD</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: '#000000', fontSize: pxToSp(24), marginTop: pxToDp(8) }}>锁仓天数</Text>
              <Text style={{ color: '#000000', fontSize: pxToSp(24), marginTop: pxToDp(4) }}>12</Text>
            </View>
          </View>

          <View style={{ width: '100%', height: pxToDp(2), backgroundColor: '#0F141E', opacity: 0.06, marginTop: pxToDp(18) }}></View>
          <Text style={{ color: '#000000', fontSize: pxToSp(24), marginTop: pxToDp(8) }}>兑换进度</Text>

          <View style={{ width: '100%', height: pxToDp(8), backgroundColor: 'rgba(15.0,20.0,30.0,0.06)', marginVertical: pxToDp(8), borderRadius: 20, overflow: 'hidden' }}>
            <View style={{ backgroundColor: '#D5F713', width: screenWidth * parseFloat(data?.progress), height: pxToDp(8), opacity: 1, }}></View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#000000', fontSize: pxToSp(24), marginTop: pxToDp(8) }}>54%</Text>
            <Text style={{ color: '#000000', fontSize: pxToSp(24), marginTop: pxToDp(8) }}>93757/100000 BUSD</Text>
          </View>
        </LinearGradinet>
      </IDBitTabBg>
    </Ripple>

  )
  const render_listType = () => (
    <Ripple style={{ borderRadius: pxToDp(16) }} onPress={() => Navigate.navigate('IdoDetail', { data: data })}>
      <IDBitTabBg
        style={[styles.image, style]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Image style={{ width: pxToDp(156), height: pxToDp(156), borderRadius: pxToDp(14) }} source={require('@/resources/idbt/ido/alogo.png')}></Image>
          <View style={{ width: '100%', padding: pxToDp(26) }}>
            <Text style={{ color: '#FFFFFF', fontSize: pxToSp(30) }}>{data?.round}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#FFFFFF', fontSize: pxToSp(30) }}>{data?.status}</Text>
              <Text style={{ color: '#D5F713', fontSize: pxToSp(30) }}>{data?.symbolName}</Text>
            </View>
          </View>

        </View>
        <Text style={{ color: '#ABABAB', fontSize: pxToSp(30), paddingVertical: pxToDp(28) }}>{data?.descrition}</Text>
        <View style={{ width: '100%', height: pxToDp(1), backgroundColor: '#FFFFFF', opacity: 0.11 }}></View>
        <View style={{ paddingVertical: pxToDp(16) }}>
          <Text style={{ color: '#ABABAB', fontSize: pxToSp(24) }}>兑换比例</Text>
          <Text style={{ color: '#FFFFFF', fontSize: pxToSp(30), marginTop: pxToDp(4) }}>{data?.exchange}</Text>
        </View>
        <View style={{ paddingVertical: pxToDp(16) }}>
          <Text style={{ color: '#ABABAB', fontSize: pxToSp(24) }}>个人兑换上限</Text>
          <Text style={{ color: '#FFFFFF', fontSize: pxToSp(30), marginTop: pxToDp(4) }}>{data?.theTop}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text style={{ color: '#ABABAB', fontSize: pxToSp(24) }}>进度条</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#ABABAB', fontSize: pxToSp(24) }}>参与人数</Text>
            <Text style={{ color: '#ABABAB', fontSize: pxToSp(24) }}>{data?.participants}</Text>

          </View>
        </View>
        <View style={{ width: '100%', height: pxToDp(8), backgroundColor: 'rgba(255.0,255.0,255.0,0.11)', marginVertical: pxToDp(8), borderRadius: 20, overflow: 'hidden' }}>
          <View style={{ backgroundColor: '#D5F713', width: screenWidth * parseFloat(data?.progress), height: pxToDp(8), opacity: 1, }}></View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#FFFFFF', fontSize: pxToSp(30), marginTop: pxToDp(4) }}>{data?.participants}/{data?.theTop}</Text>
        </View>
      </IDBitTabBg>
    </Ripple>
  )
  return (
    cardStyle == CardStyle.LISTSTYLE ? render_listType() : render_detailType()
  );
};

export default IDOGoCard;