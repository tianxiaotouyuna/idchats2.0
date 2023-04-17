import React, { Fragment, FunctionComponent } from "react";
import { View, Image, Text, StyleProp, ViewStyle, Clipboard, Pressable, Alert } from "react-native";
import styles from "./styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import Ripple from "react-native-material-ripple";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import useRedux from "@/hooks/useRedux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
type OutPorps = {
  style?: StyleProp<ViewStyle>
  data?: any
}
const Top: FunctionComponent<OutPorps> = (props) => {
  const { style, data } = props;
  const { t } = useTranslation();
  const {imUserInfo,needReloadMyTop}=useRedux();
  return (
    <View style={style}>
    <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
      rippleContainerBorderRadius={16}
      style={[styles.container, ]} pointerEvents={'box-none'}
    >
      <View style={{ flexDirection: 'row', paddingHorizontal: pxToDp(20), width: '100%', justifyContent: "space-between", backgroundColor: '#282E38', paddingVertical: pxToDp(40), borderRadius: pxToDp(16) }}>
        <View style={{ flexDirection: 'row' }}>
          <FastImage style={{ width: pxToDp(148), height: pxToDp(148), borderRadius: pxToDp(13), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }} source={{uri:imUserInfo?.faceURL}}
          ></FastImage>
          {imUserInfo?<View style={{ marginLeft: pxToDp(24) ,height:pxToDp(148), justifyContent: "space-between",paddingVertical:pxToDp(2)}}>
            <Text style={{ fontSize: pxToSp(34), color: '#FFF', }}>{imUserInfo?.ensDomain||imUserInfo?.walletName?t('common.wallet')+'-'+imUserInfo?.walletName:''} </Text>
            <Text style={{ fontSize: pxToSp(24), color: '#ABABAB',width:pxToDp(188) }} numberOfLines={1} ellipsizeMode={'middle'}>{imUserInfo?.userID}</Text>
           {
            needReloadMyTop?
            <View style={{ flexDirection: 'row' }}>
              <PressableSlop style={{ flexDirection: 'row',alignItems:"center"  }} onPress={()=>Navigate.navigate('Likes')}>
                <Text style={{ fontSize: pxToSp(24), color: '#ABABAB' }}>{t('my.following')}:</Text>
                <Text style={{ fontSize: pxToSp(28), color: '#fff' }}>{imUserInfo?.followCount}</Text>
              </PressableSlop>
              <PressableSlop style={{ flexDirection: 'row',marginLeft: pxToDp(40),alignItems:"center"  }} onPress={()=>Navigate.navigate('Followers')}>
                <Text style={{ fontSize: pxToSp(24), color: '#ABABAB' }}>{t('my.followers')}:</Text>
                <Text style={{ fontSize: pxToSp(28), color: '#fff' }}>{imUserInfo?.beFollowCount}</Text>
              </PressableSlop>
            </View>
            :
            <View style={{ flexDirection: 'row' }}>
              <PressableSlop style={{ flexDirection: 'row',alignItems:"center"  }} onPress={()=>Navigate.navigate('Likes')}>
                <Text style={{ fontSize: pxToSp(24), color: '#ABABAB' }}>{t('my.following')}:</Text>
                <Text style={{ fontSize: pxToSp(28), color: '#fff' }}>{imUserInfo?.followCount}</Text>
              </PressableSlop>
              <PressableSlop style={{ flexDirection: 'row',marginLeft: pxToDp(40),alignItems:"center"  }} onPress={()=>Navigate.navigate('Followers')}>
                <Text style={{ fontSize: pxToSp(24), color: '#ABABAB' }}>{t('my.followers')}:</Text>
                <Text style={{ fontSize: pxToSp(28), color: '#fff' }}>{imUserInfo?.beFollowCount}</Text>
              </PressableSlop>
            </View>
           } 
          </View>:null}
        </View>
        <PressableSlop onPress={() => Navigate.navigate('WalletDetail',{data:{address:imUserInfo?.userID,type:0}} )}  style={{ flexDirection: 'row-reverse', alignItems: 'center', alignSelf: 'flex-start', marginRight: -pxToDp(20) }}>
          <Image style={{ width: pxToDp(14), height: pxToDp(24), marginLeft: pxToDp(12) }} resizeMode={'stretch'} source={require('@/resources/idbt/my/myDetail.png')} ></Image>
          <Text style={{ color: '#ABABAB', fontSize: pxToSp(26) }}>{t('my.details')}</Text>
        </PressableSlop>
      </View>
      <View style={{ flexDirection: 'row', paddingVertical: pxToDp(22), alignItems: 'center', width: '100%', justifyContent: "space-between", paddingHorizontal: pxToDp(40) }}>
        <PressableSlop onPress={() => Navigate.navigate('WalletTransler', { data: { address: '',type:0 } })} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: pxToDp(32), height: pxToDp(32) }} resizeMode={'stretch'} source={require('@/resources/idbt/my/zhuanzhang.png')} ></Image>
          <Text style={styles.sendText}>{t('my.transfer')}</Text>
        </PressableSlop>
        <PressableSlop onPress={() => Navigate.navigate('WalletCashier', { data: { address: imUserInfo?.userID } })} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: pxToDp(32), height: pxToDp(32) }} resizeMode={'stretch'} source={require('@/resources/idbt/my/shoukuan.png')} ></Image>
          <Text style={styles.sendText}>{t('my.receive')}</Text>
        </PressableSlop>
        <PressableSlop onPress={() => Navigate.navigate('Scanner', { data: { address: imUserInfo?.userID } })} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: pxToDp(32), height: pxToDp(32) }} resizeMode={'stretch'} source={require('@/resources/idbt/my/saoyisao.png')} ></Image>
          <Text style={styles.sendText}>{t('my.scanQRCode')}</Text>
        </PressableSlop>
      </View>
    </Ripple>
    </View>
  );
};
export default Top;


