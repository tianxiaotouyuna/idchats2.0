import styles from './styles';
import React, { FunctionComponent, useEffect, useState } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable, ImageSourcePropType } from 'react-native'
import { pxToDp, pxToSp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import { ReduxToken, UIELEMENTS } from '@/constants/index';
import FastImage from 'react-native-fast-image';
import NtfButton from '../NtfButton/NtfButton';
import useRedux from '@/hooks/useRedux';
import Loading from '../LoadingSnipper/Loading';
import { Navigate } from '@/utils/index';
import Swipeout from 'react-native-swipeout';
import { COLORS } from '@/utils/Miscellaneous';
import { IMService } from '@/services/index';
export enum CardStyle {
  LOGINOUT_STYLE = 1, //退出登录
}
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>
  data: any
  onPress?: () => {}
  cardStyle?: CardStyle//0:我关注的，1：关注我的
}

const DappCared: FunctionComponent<ExGoodsCardProps> = (props) => {


  const { style, data, onPress = () => { }, cardStyle = 0 } = props;
  const [isShow, setisShow] = useState(false);
  const { imIns, sendReduxAction, needReloadContact } = useRedux();

  const pushToChatDetail = () => {
    // Navigate.navigate('ChatDetail', { chatData: data });
  }
  const setTop = async () => {
    await IMService.pinConversation(imIns, sendReduxAction, {
      conversationID: data?.conversationID,
      isPinned: true
    })
  }
  const unSetTop = async () => {
    await IMService.pinConversation(imIns, sendReduxAction, {
      conversationID: data?.conversationID,
      isPinned: false
    })

  }
  return (

    <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
      rippleContainerBorderRadius={10}
      pointerEvents={'box-none'}
      onPress={pushToChatDetail}
      style={{flexDirection: 'row', paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,alignItems: 'center', paddingVertical: pxToDp(14), width: '100%' }}
    >
      <FastImage style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: pxToDp(330), height: pxToDp(330), borderRadius: pxToDp(18) }} resizeMode='cover' source={{ uri: data?.img }} />
      <View style={{ width: '100%', justifyContent: 'space-between', marginLeft: pxToDp(24), height: pxToDp(136) }}>
        <Text style={{ width: pxToDp(200), color: '#fff' }} ellipsizeMode={'middle'} numberOfLines={1}>{data?.name}</Text>
        <Text style={{ width: pxToDp(200), color: '#fff' }} ellipsizeMode={'middle'} numberOfLines={1}>{data?.content}</Text>
        <Text style={{ width: pxToDp(200), color: '#fff' }} ellipsizeMode={'middle'} numberOfLines={1}>{data?.address}</Text>
      </View>
    </Ripple>
  )
}
export default DappCared
