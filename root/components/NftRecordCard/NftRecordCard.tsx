import styles from './styles';
import React, { FunctionComponent, useEffect, useState } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable, ImageSourcePropType, Alert } from 'react-native'
import { pxToDp, pxToSp, toast } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import { ReduxToken, UIELEMENTS } from '@/constants/index';
import FastImage from 'react-native-fast-image';
import useRedux from '@/hooks/useRedux';
import { IMService, UserService } from '@/services/index';
import BaseCard from '../BaseCard/BaseCard';
import { Navigate } from '@/utils/index';
import Loading from '../LoadingSnipper/Loading';
export enum CardStyle {
  SETAVATAR_STYLE = 0, //退出登录
  DETAIL_STYLE = 1, //退出登录
}
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>
  data: any
  onPress?: () => {}
  cardStyle?: CardStyle//0:我关注的，1：关注我的
  borderRadius?: number;
  dismissHandle?: () => {}
}

const NftRecordCard: FunctionComponent<ExGoodsCardProps> = (props) => {

  const { style, data, onPress = () => { }, cardStyle = 0,borderRadius=pxToDp(16),dismissHandle } = props;
const [isShow, setisShow] = useState(false);
  const { imUserInfo,sendReduxAction } = useRedux();

  const handleUpdateAvatar = async (item:any)=>{
    setisShow(true)
      const res = await UserService.updateUserInfoApi({ faceURL: item?.image_url, userID: imUserInfo.userID });
      if (res) {
      const info= await UserService.getUserInfo([imUserInfo?.userID],imUserInfo?.walletName)
    sendReduxAction(ReduxToken.REFRESH_IMUserInfo, { imUserInfo: info })
    toast("设置成功!");
        dismissHandle()
    }
    else{
      toast("错误：");
    }
};
  const renderCollectsDouble = () => {
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }]}>
        {data?.map((item: any, index: number) => (
          item_one_collections(item, index)
        ))}
      </View>
    );
  }
  const item_one_collections = (item: any, index: number) => {
    return (
      <Ripple onPress={() => {cardStyle==CardStyle.SETAVATAR_STYLE? handleUpdateAvatar(item):Navigate.navigate('NftDetail',{nftInfo:item}) }} rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}>
        <BaseCard style={[{ borderRadius: borderRadius }, { padding: 0 ,backgroundColor:UIELEMENTS.DEFAULT_Tab_COLOR,overflow:'hidden'}]}>
          <View style={{ alignItems: "center" }}>
            <FastImage
              style={[styles.hot_image_double,]}
              resizeMode="cover"
              source={{ uri: item?.image_url }}
            />
            <Text style={{ fontSize: pxToSp(24), color: '#fff', fontWeight: 'bold', marginTop: pxToDp(16), marginBottom: pxToDp(20) }} ellipsizeMode='middle' numberOfLines={1}>{item?.name}</Text>
          </View>
        </BaseCard>
        <Loading text="" isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
      </Ripple>
    )
  }
  return (
    renderCollectsDouble()
  )
}
export default NftRecordCard
