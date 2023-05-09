import React, { FunctionComponent, useEffect, useState } from 'react'
import { View, Text, StyleProp, ViewStyle, Image, TouchableHighlight } from 'react-native'
import { pxToDp, pxToSp } from '@/utils/system';
import styles from './styles';
import CellCard, { CardStyle } from '../CellCard/CellCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export enum PopStyle {
  LAUNGE_STYLE = 0, //切换语言
  CURRCY_STYLE = 1, //切换货币
  NETWORK_STYLE = 2, //切换网络
  BASECOIN_STYLE = 3, //货币单位
  SELECT_TOKEN_STYLE = 4, //货币单位
}
type CardProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (index: number, laungueName: string) => void;
  onCanclePress?: () => void;
  selectDaibi?: (tokenInfo: any,index:number) => void;
  selectIndex?: number;
  popStyle?: PopStyle;
  data: any
}

const IDbitPop: FunctionComponent<CardProps> = (props) => {

  const { style, onPress,onCanclePress, data, selectIndex, popStyle = PopStyle.LAUNGE_STYLE,selectDaibi } = props;

  const render_card = () => {
    return (
      <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }, style]}>
        {
          data?.map((item: any, index: number) => {
            return <CellCard cardStyle={CardStyle.LAUNGE_STYLE} key={index + 'asd'} data={item} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => onPress(index, item?.text)} index={index} selectIndex={selectIndex}></CellCard>
          })
        }
      </View>
    )
  }
  const render_currcy_card = () => {
    return (
      <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }, style]}>
        {
          data?.map((item: any, index: number) => {
            return <CellCard cardStyle={CardStyle.LAUNGE_STYLE} key={index + 'asd'} data={item} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => onPress(index, item?.text)} index={index} selectIndex={selectIndex}></CellCard>
          })
        }
      </View>
    )
  }
  const render_net = () => {
    return (
      <View style={[styles.modalContent, style]}>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%', paddingHorizontal: pxToDp(12) }}>
          <Text style={{ color: '#F1F4F8', fontWeight: '500', fontSize: pxToSp(30), paddingVertical: pxToDp(40) }}>切换网络</Text>
          <TouchableHighlight onPress={onCanclePress}>
            <Image source={require("@/resources/idbt/cancle.png")} style={{ width: pxToDp(32), height: pxToDp(32) }} ></Image>
          </TouchableHighlight>
        </View>
        {
          data?.map((item: any, index: number) => {
            return <CellCard cardStyle={CardStyle.NET_STYLE} data={item} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => onPress(index)} index={index} selectIndex={selectIndex}></CellCard>
          })
        }
      </View>
    )
  }
  const render_coin = () => {
    return (
      <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }, style]}>
        {
          data?.map((item: any, index: number) => {
            return <CellCard cardStyle={CardStyle.BASECOIN_STYLE} key={index + 'asd'} data={item} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => onPress(index, item?.text)} index={index} selectIndex={selectIndex}></CellCard>
          })
        }
      </View>
    )
  }
  const render_token_cell = () => {
    return (
      <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }, style]}>
        {
          data?.map((item: any, index: number) => {
            item.text=item.coinName;
            return <CellCard cardStyle={CardStyle.BASECOIN_STYLE} key={index + 'asd'} data={item} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => selectDaibi(item,index)} index={index} selectIndex={selectIndex}></CellCard>
          })
        }
      </View>
    )
  }



  return (
    popStyle == PopStyle.LAUNGE_STYLE ? render_card() : 
    popStyle == PopStyle.CURRCY_STYLE ? render_currcy_card() : 
    popStyle == PopStyle.NETWORK_STYLE ? render_net():
    popStyle == PopStyle.BASECOIN_STYLE ? render_coin():
    render_token_cell()
  )
}
export default IDbitPop
