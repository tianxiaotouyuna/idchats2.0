import React, { FunctionComponent, useEffect, useState } from 'react'
import { View, Text, StyleProp, ViewStyle, Image, TouchableHighlight } from 'react-native'
import { pxToDp, pxToSp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import BaseCard from '../BaseCard/BaseCard';
import styles from './styles';
export enum CardStyle {
  NORMAL_STYLE = 0, //选择登录方式
  LAUNGE_STYLE = 1, //选择登录方式
  CURRCY_STYLE = 2, //选择登录方式
  NET_STYLE = 3, //切换网络
  BASECOIN_STYLE = 4, //选择支付基币
}
type CardProps = {
  style?: StyleProp<ViewStyle>;
  cardStyle?: CardStyle;
  data: any;
  onPress?: (index: number) => void;
  index?: number;
  selectIndex?: number
}

const CellCard: FunctionComponent<CardProps> = (props) => {

  const { data, style, cardStyle = CardStyle.NORMAL_STYLE, onPress, index, selectIndex } = props;
  const [isSelected, setisSelected] = useState(false);
  useEffect(() => {
    if (selectIndex == index) setisSelected(true)
    else setisSelected(false)
  }, [])

  const onCanclePress = () => {

  }
  const render_card = () => {
    return (
      <BaseCard style={[styles.container, style]}>
        <Ripple onPress={() => onPress(index)}>
          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%', height: '100%', paddingHorizontal: pxToDp(32) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={[styles.image_right,]}
                resizeMode="cover"
                source={data.image}
              />
              <Text style={{ marginLeft: 10, fontSize: pxToSp(30), color: '#F1F4F8', fontWeight: 'bold' }}>{data?.text}</Text>
            </View>
            <Image
              style={[styles.image_right]}
              resizeMode="cover"
              source={require('@/resources/second/icon_tiaozhuan.png')}
            />
          </View>
        </Ripple>
      </BaseCard>
    )
  }

  const render_select_card = () => {
    return (
      <BaseCard style={[styles.container, style]}>
        <Ripple onPress={() => onPress(index)}>
          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%', height: '100%', paddingHorizontal: pxToDp(32) }}>
            <Text style={{ fontSize: pxToSp(30), color: '#F1F4F8', fontWeight: 'bold' }}>{data?.text}</Text>
            {isSelected ? <Image
              style={[styles.image_right]}
              resizeMode="cover"
              source={require('@/resources/second/icon_xuanzhong.png')}
            /> : <View style={styles.image_right_holder} />}
          </View>
        </Ripple>
      </BaseCard>
    )
  }

  const render_net_card = () => {
    return (
      <BaseCard style={[styles.container, style]}>
        <Ripple onPress={() => onPress(index)}>
          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%', height: '100%', paddingHorizontal: pxToDp(32) }}>
            <Image
              style={[styles.image_right,]}
              resizeMode="cover"
              source={data.image}
            />
            <Text style={{ fontSize: pxToSp(30), color: '#F1F4F8', fontWeight: 'bold' }}>{data?.text}</Text>
            {isSelected ? <Image
              style={[styles.image_right]}
              resizeMode="cover"
              source={require('@/resources/second/icon_xuanzhong.png')}
            /> : <View style={styles.image_right_holder} />}
          </View>
        </Ripple>
      </BaseCard>
    )
  }
  const render_coin = () => {
    return (
      <BaseCard style={[styles.container, { height: pxToDp(76) }, style]}>
        <Ripple onPress={() => onPress(index)}>
          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%', height: '100%', paddingHorizontal: pxToDp(32) }}>
            <Text style={{ fontSize: pxToSp(30), color: '#F1F4F8', fontWeight: 'bold' }}>{data?.text}</Text>
            {isSelected ? <Image
              style={[styles.image_right]}
              resizeMode="cover"
              source={require('@/resources/second/icon_xuanzhong.png')}
            /> : <View style={styles.image_right_holder} />}
          </View>
        </Ripple>
      </BaseCard>
    )
  }

  return (
    cardStyle == CardStyle.NORMAL_STYLE ? render_card() :
      cardStyle == CardStyle.LAUNGE_STYLE || CardStyle.CURRCY_STYLE ? render_select_card() :
        cardStyle == CardStyle.NET_STYLE ? render_net_card() :
          render_coin()
  )
}
export default CellCard
