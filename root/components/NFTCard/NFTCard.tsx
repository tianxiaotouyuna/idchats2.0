import styles from './styles';
import React, { FunctionComponent} from 'react'
import { View, Text, StyleProp, ViewStyle} from 'react-native'
import { log, pxToDp, pxToSp} from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';
import BaseCard from '../BaseCard/BaseCard';
import { Navigate } from '@/utils/index';
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>
  data: any
  onPress?: () => {}
}

const NFTCard: FunctionComponent<ExGoodsCardProps> = (props) => {

  const {data,style,onPress} = props;

  const onTapEnd = () => {
    Navigate.navigate('TransferNft',{data:data});
  }
  const render_card = () => {
    return (
      <BaseCard style={[styles.container]}>
      <Ripple onPress={onTapEnd}>
        <View style={{ alignItems: "center" }}>
          <FastImage
            style={[styles.hot_image_double,]}
            resizeMode="cover"
            source={{ uri: data?.image_url }}
          />
          <Text style={{ fontSize: pxToSp(24), color: '#fff', fontWeight: 'bold', marginTop: pxToDp(16), marginBottom: pxToDp(20) }} ellipsizeMode='middle' numberOfLines={1}>{data?.name}</Text>
        </View>
    </Ripple>
      </BaseCard>
    )
  }
  return (
    render_card()
  )
}
export default NFTCard
