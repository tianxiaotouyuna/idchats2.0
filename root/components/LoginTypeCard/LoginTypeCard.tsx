import React, { FunctionComponent, useEffect, useState } from 'react'
import { View, Text, StyleProp, ViewStyle, Image } from 'react-native'
import {  pxToDp, pxToSp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import BaseCard from '../BaseCard/BaseCard';
import styles from './styles';
type CardProps = {
  style?: StyleProp<ViewStyle>
  data: any
  onPress?: (index:number) => void;
  index?: number
  selectIndex?: number
}

const LoginTypeCard: FunctionComponent<CardProps> = (props) => {

  const { data, style, onPress,index ,selectIndex} = props;
  const [isSelected, setisSelected] = useState(false);
  useEffect(() => {
    if(selectIndex==index)setisSelected(true)
    else setisSelected(false)
  }, [])
  
  const render_card = () => {
    return (
      <BaseCard style={[styles.container, style]}>
        <Ripple onPress={()=>onPress(index)}>
          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%', height: '100%', paddingHorizontal: pxToDp(32) }}>
            <Image
            style={[styles.image_right,]}
            resizeMode="cover"
            source={data.image}
          />
            <Text style={{ fontSize: pxToSp(30), color: '#F1F4F8', fontWeight: 'bold' }}>{data?.text}</Text>
            {isSelected?<Image
              style={[styles.image_right]}
              resizeMode="cover"
              source={require('@/resources/second/icon_tiaozhuan.png')}
            />:<View style={styles.image_right_holder}/>}
          </View>
        </Ripple>
      </BaseCard>
    )
  }
  return (
    render_card()
  )
}
export default LoginTypeCard
