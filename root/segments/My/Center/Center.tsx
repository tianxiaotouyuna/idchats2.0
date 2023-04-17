import React, { FunctionComponent,  useState } from "react";
import { View,  Text, StyleProp, ViewStyle } from "react-native";
import styles from "./styles";
import { pxToDp } from "@/utils/system";
import ListCell from "./ListCell/ListCell";
import { useTranslation } from 'react-i18next'
import i18n from "@/utils/locales";
import Toast from "react-native-root-toast";
import useRedux from "@/hooks/useRedux";
import Loading from "@/components/LoadingSnipper/Loading";
import { ReduxToken } from "@/constants/index";
import { t } from "i18next";
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>
}
const Center: FunctionComponent<ExGoodsCardProps> = (props) => {
  const { style } = props;
  const { i18n } = useTranslation();
  const { imUserInfo, imIns, sendReduxAction } = useRedux();
  const [isShow, setisShow] = useState(false);
  const uuid = () => {
    return (Math.random() * 36).toString(36).slice(2) + new Date().getTime().toString();
  }
  const sendsocketms = async (text: string) => {
    setisShow(true)
    const { data } = await imIns.createTextMessage('hello');
    console.log('imUserInfo========' + JSON.stringify(imUserInfo))
    const msg = {
      recvID: imUserInfo?.userID == '0x7822d01737246a13f7979b9567e8d916f04ea074' ? '0x68557cc1498bcd8f70269f5d0b1a305b8882ede3' : '0x7822d01737246a13f7979b9567e8d916f04ea074',
      groupID: '',
      message: data,
      offlinePushInfo: {
        title: "你有一条新消息",
        desc: "",
        ex: "",
        iOSPushSound: "+1",
        iOSBadgeCount: true,
      }
    }

    try {

      const resp = await imIns.sendMessage(msg, uuid())
      setisShow(false)
    } catch (error) {
      setisShow(false)
      Toast.show(t('home.sendError') + JSON.stringify(error), { position: Toast.positions.CENTER })
    }


  }
  const follow = async () => {
    setisShow(true)
    await imIns.followAddFriend({
      toUserID: imUserInfo?.userID == '0x7822d01737246a13f7979b9567e8d916f04ea074' ? '0x68557cc1498bcd8f70269f5d0b1a305b8882ede3' : '0x7822d01737246a13f7979b9567e8d916f04ea074',
      follow: true
    })
    sendReduxAction(ReduxToken.NEEDRELOADCONTACT)
    sendReduxAction(ReduxToken.NEEDRELOADCHATLIST)
    setisShow(false)
  }
  const unFollow = async () => {
    setisShow(true)
    await imIns.followAddFriend({
      toUserID: imUserInfo?.userID == '0x7822d01737246a13f7979b9567e8d916f04ea074' ? '0x68557cc1498bcd8f70269f5d0b1a305b8882ede3' : '0x7822d01737246a13f7979b9567e8d916f04ea074',
      follow: false
    })
    sendReduxAction(ReduxToken.NEEDRELOADCONTACT)
    sendReduxAction(ReduxToken.NEEDRELOADCHATLIST)
    setisShow(false)
  }
  return (
    <View style={[styles.container, style]}>
      <Text style={{ fontWeight: 'bold', fontSize: pxToDp(30) }}>{i18n.t('my.myService')}</Text>
      <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('my.myAssets')} imageSource={require('@/resources/return_4.png')} pushRouteName={'AssetsContainer'}></ListCell>
      <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('my.bill')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Billw'}></ListCell>
      <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('my.merchant')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Merchant'}></ListCell>
      <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('my.setting')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Setup'}></ListCell>
      <ListCell style={{ width: '100%', height: pxToDp(88) }} text={'发消息给测试号'} imageSource={require('@/resources/return_4.png')} onPress={() => { sendsocketms() }}></ListCell>
      <ListCell style={{ width: '100%', height: pxToDp(88) }} text={'关注测试号'} imageSource={require('@/resources/return_4.png')} onPress={() => { follow() }}></ListCell>
      <ListCell style={{ width: '100%', height: pxToDp(88) }} text={'取关测试号'} imageSource={require('@/resources/return_4.png')} onPress={() => { unFollow() }}></ListCell>
      <Loading text="请稍后..." isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
    </View>
  );
};
export default Center;


