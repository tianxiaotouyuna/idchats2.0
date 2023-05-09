import styles from './styles';
import React, { FunctionComponent } from 'react'
import { View, Text, StyleProp, ViewStyle, Alert } from 'react-native'
import { log, pxToDp, pxToSp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';
import BaseCard from '../BaseCard/BaseCard';
import { Navigate } from '@/utils/index';
import { UIELEMENTS } from '@/constants/index';
import IDBitBtn from '../IDBitBtn/IDBitBtn';
import { t } from 'i18next';
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>
  data: any
  onPress?: () => {}
}

const GameCard: FunctionComponent<ExGoodsCardProps> = (props) => {

  const { data, style, onPress } = props;

  const play = () => {
    Navigate.navigate('AppMainPage', { data: data });
  }
  const render_card = () => {
    return (
      <Ripple
        pointerEvents={'box-none'}
      >
        <BaseCard style={[styles.container]}>
          <FastImage
            style={[styles.image]}
            resizeMode="cover"
            source={{ uri: data?.image }}
          />
          <View style={{ marginHorizontal: pxToDp(18), width: 120 }}>
            <Text style={{ fontSize: pxToSp(24), color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontWeight: 'bold', marginTop: pxToDp(16), marginBottom: pxToDp(20) }} ellipsizeMode='middle' numberOfLines={1}>{data?.name}</Text>
            <Text style={{ fontSize: pxToSp(24), color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR, fontWeight: 'bold', marginTop: pxToDp(16), marginBottom: pxToDp(20) }} ellipsizeMode='middle' numberOfLines={2}>{data?.descrip}</Text>
          </View>
          <IDBitBtn text={t('application.begin')} containerStyle={{ borderRadius: pxToDp(12), height: pxToDp(56), width: pxToDp(130), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }} onPress={play}></IDBitBtn>
        </BaseCard>
      </Ripple>
    )
  }
  return (
    render_card()
  )
}
export default GameCard
