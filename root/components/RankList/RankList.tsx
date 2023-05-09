import styles from './styles';
import React, { FunctionComponent } from 'react'
import { View, Text, StyleProp, ViewStyle, Image } from 'react-native'
import { pxToDp, pxToSp } from '@/utils/system';
import { UIELEMENTS } from '@/constants/index';
import FastImage from 'react-native-fast-image';
import IDBitTabBg from '../IDBitTabBg/IDBitTabBg';
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>
  titles: any
  data: any
  myData: any
  onPress?: () => {}
}

const RankList: FunctionComponent<ExGoodsCardProps> = (props) => {

  const { data, style, onPress, titles, myData } = props;

  const render_card = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: pxToDp(60) }}>
          {titles?.map((item: string, index: number) => {
            let width = '25%';
            if (index == 0) width = '20%';
            else if (index == 1) width = '30%';
            return (
              <View style={{ alignItems: 'center', width: width }} key={index + 'container'}>
                <Text key={index + 'rank'} style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(30) }}>{item}</Text>
              </View>
            )
          })}
        </View>
        <View>
          {data?.map((item: string, index: number) => {
            return (
              <View style={{ flexDirection: 'row', backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, marginTop: pxToDp(18), alignItems: 'center', justifyContent: 'space-between', borderRadius: pxToDp(14) }}>
                <View style={{ alignItems: 'center', width: '20%' }} key={index + 'container'}>
                  <Image style={{ width: pxToDp(63), height: pxToDp(63) }} source={item?.rank}></Image>
                </View>
                <View key={index + 'address'} style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(128), marginTop: pxToDp(14), width: '30%' }} key={index + 'asd1'}>
                  <FastImage style={{ backgroundColor: 'red', width: pxToDp(58), height: pxToDp(58), borderRadius: pxToDp(58) }} resizeMode='cover' source={{ uri: data?.img }} />
                  <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(22), flex:1, marginLeft: pxToDp(6) }}
                    ellipsizeMode={'middle'}
                    numberOfLines={1}>{item?.address}</Text>
                </View>
                <View key={index + 'asd2'} style={{ height: pxToDp(128), justifyContent: 'center', alignItems: 'center', marginTop: pxToDp(14), width: '25%' }}>
                  <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(30) }}>{item?.score}</Text>
                </View>
                <View key={index + 'asd3'} style={{ height: pxToDp(128), justifyContent: 'center', alignItems: 'center', marginTop: pxToDp(14), width: '25%' }}>
                  <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(30) }}>{item?.award}</Text>
                </View>
              </View>
            )
          }
          )}
          <IDBitTabBg style={{ marginTop: pxToDp(18), paddingVertical: pxToDp(6), justifyContent: 'center', alignItems: 'center', borderRadius: pxToDp(8) }}>
            <Text style={{ fontSize: pxToSp(22), color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>我的排名</Text>
          </IDBitTabBg>
          <View style={{ flexDirection: 'row', backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, marginTop: pxToDp(18), alignItems: 'center', justifyContent: 'space-between', borderRadius: pxToDp(14) }}>
            <View style={{ alignItems: 'center', width: '20%'}}>
              <Text style={{ color: '#E39B41', fontSize: pxToDp(38) }}>100+</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(128), marginTop: pxToDp(14), width: '30%'}}>
              <FastImage style={{ backgroundColor: 'red',width: pxToDp(58), height: pxToDp(58), borderRadius: pxToDp(58) }} resizeMode='cover' source={{ uri: data?.img }} />
              <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(22),flex:1, marginLeft: pxToDp(6) }}
                ellipsizeMode={'middle'}
                numberOfLines={1}>{myData?.address}</Text>
            </View>
            <View style={{ height: pxToDp(128), justifyContent: 'center',  marginTop: pxToDp(14), width: '25%',alignItems:'center' }}>
              <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(30) }}>{myData?.score}</Text>
            </View>
            <View style={{ height: pxToDp(128), justifyContent: 'center', marginTop: pxToDp(14), width: '25%',alignItems:'center' }}>
              <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(30) }}>{myData?.award}</Text>
            </View>
          </View>

        </View>
      </View>
    )
  }
  return (
    render_card()
  )
}
export default RankList
