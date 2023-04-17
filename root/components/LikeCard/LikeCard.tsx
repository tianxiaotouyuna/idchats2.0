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
import { IMService, UserService } from '@/services/index';
import IDBitSepecter from '../IDBitSepecter/IDBitSepecter';
import IMServiceManager from '@/utils/IMServiceManager';
import { t } from 'i18next';
export enum CardStyle {
  CHAT_STYLE = 0, //聊天
  NOT_CHAT_STYLE = 1, //个人中心
}
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>
  data: any
  onPress?: () => {}
  cardStyle?: CardStyle//0:我关注的，1：关注我的
}

const LikeCard: FunctionComponent<ExGoodsCardProps> = (props) => {


  const { style, data, onPress = () => { }, cardStyle = 0 } = props;
  const [isShow, setisShow] = useState(false);
  const [isLike, setisLike] = useState(true);
  const { imIns, sendReduxAction, needReloadContact ,imUserInfo} = useRedux();
  const [isError, setIsError] = React.useState(false)
  const onError = () => setIsError(true)

  const followUser = async () => {
    const resp = imIns && await imIns.getAllConversationList()
    sendReduxAction(ReduxToken.NEEDRELOADCONTACT, { chatList: JSON.parse(resp?.data) })
  }
  const changeLikeStatus = async () => {
    setisShow(true)
   const resp= await UserService.changeLikeStatus(data?.userID,!isLike)
   if(resp?.errCode==0) {
    sendReduxAction(ReduxToken.NEEDRELOADCONTACT, { 'needReloadContact': !needReloadContact })
    const followCount = await UserService.getFollowCount(IMServiceManager.getInstance().getUserID());
    const beFollowCount = await UserService.getbeFollowCount(IMServiceManager.getInstance().getUserID());
    imUserInfo.followCount = followCount;
    imUserInfo.beFollowCount = beFollowCount;
    sendReduxAction(ReduxToken.REFRESH_IMUserInfo, { imUserInfo: imUserInfo })
    setTimeout(() => {
      setisShow(false)
    }, 3.0);
    setisLike(!isLike)
   }
  }
  const pushToChatDetail = () => {
    Navigate.navigate('ChatDetail', { chatData: data ,imUserInfo:imUserInfo });
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
  const renderNotChatStyle = () => (
    <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
      rippleContainerBorderRadius={10}
      pointerEvents={'box-none'}
      onPress={() => pushToChatDetail()}
    >
      <View style={[styles.container,
        , style, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingHorizontal:0 , paddingVertical:pxToDp(30)}]}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <FastImage 
                source={{ uri: data?.faceURL }}
            // defaultSource={require('@/resources/idbt/moren.png')}
            style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: pxToDp(100), height: pxToDp(100), borderRadius: pxToDp(10) }} resizeMode='cover'/>
          <View style={{ height: pxToDp(100), flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%', flex: 1 }}>
              <View style={{justifyContent:'space-between',height:'100%',marginLeft:pxToDp(20)}}>
                <Text style={{ width: pxToDp(200), color: '#fff' }} ellipsizeMode={'middle'} numberOfLines={1}>{data?.nickname}</Text>
                <Text style={{ width: pxToDp(350), color: '#ABABAB',fontSize:pxToSp(24)}} ellipsizeMode={'middle'} numberOfLines={1}>{data?.userProfile || t('my.noneProduce')}</Text>
              </View>
              {isLike ? <Pressable style={{ width: pxToDp(156), height: pxToDp(68), borderColor: 'rgba(255,255,255,0.4)', borderWidth: .5, borderRadius: pxToDp(68), alignItems: 'center', justifyContent: 'center' }} onPress={ changeLikeStatus }>
                <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: pxToSp(24) }}>{t('my.following')}</Text>
              </Pressable> :
             <Pressable style={{width:pxToDp(156),height:pxToDp(68), backgroundColor: '#D5F713', borderRadius: pxToDp(68),alignItems:'center',justifyContent:'center'}} onPress={changeLikeStatus }>
              <Text style={{ color: '#0F141E', fontSize: pxToSp(24) ,fontWeight:'600'}}>{t('my.follow')}</Text>
            </Pressable>
            }
            </View>
         </View>
        </View>
      </View>
      <IDBitSepecter></IDBitSepecter>
      <Loading text="" isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
    </Ripple>
  )
  return (
    renderNotChatStyle()
  )
}
export default LikeCard
