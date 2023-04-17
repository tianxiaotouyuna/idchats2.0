import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { View, Pressable, Alert, NavigatorIOS, Text, Clipboard } from "react-native";
import { Image } from "react-native-animatable";
import styles from "@/styles/pages/my/wallet_cashier/styles";
import { pxToDp, toast } from "@/utils/system";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CommonService } from "@/services/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import FastImage from "react-native-fast-image";
import Loading from "@/components/LoadingSnipper/Loading";
import Ripple from "react-native-material-ripple";
import Toast from "react-native-root-toast";
import { useHeaderHeight } from "@react-navigation/stack";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { useTranslation } from "react-i18next";
import useRedux from "@/hooks/useRedux";


const WalletCashier: FunctionComponent = () => {
  const data: any = useRoute().params?.data ?? {};
  const [isShow, setisShow] = useState(false);
  const headerHeight = useHeaderHeight();
  const{chainId}=useRedux();
    const {t}=useTranslation()
    useInitScreen({
    navigationOptions: {
      headerTitle: t('my.receive'),
      headerTransparent: true,
      headerShown: true,
      headerTintColor: 'white'
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const qrcodeUrl = () => {
    var url: string = "https://www.bitcoinqrcodemaker.com/api/?style=" + 'ethereum&address=' + data?.address;
    console.log('url:\n'+url)
    return url

  }
  
  const saveImg = async (value: string) => {
    setisShow(true)
    try {
      await CommonService.saveToCameraRoll(qrcodeUrl())
      setisShow(false)
    }
    catch (e) {
      setisShow(false)
    }
  }
  const copyAdress = async (value: string) => {
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    toast('复制成功')
    console.log('复制的内容', str)
  }
  return (
    <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom, paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
      <View style={{ paddingHorizontal: pxToDp(28), alignItems: "center", backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, paddingTop: pxToDp(32), borderRadius: pxToDp(24), justifyContent: 'center' }}>
        <IDBitTabBg style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.06)', paddingVertical: pxToDp(24), width: '100%', alignItems: "center", flexDirection: 'row' }}>
          <Image
            style={{ width: pxToDp(32), height: pxToDp(32) }}
            source={require("@/resources/idbt/shoukuan/gantanhao.png")} />
          <Text style={{ color: '#999999', fontSize: pxToDp(28), marginLeft: pxToDp(4) }}>{chainId==1?t('my.receiverTips1'):(chainId==56?t('my.receiverTips2'):t('my.receiverTips3'))}</Text>
        </IDBitTabBg>
        <Fragment>
          <Image
            style={{ marginTop: pxToDp(28), width: pxToDp(332), height: pxToDp(332), backgroundColor: 'rgba(255, 255, 255, 0.06)'}}
            resizeMode={'stretch'}
            source={{ uri: qrcodeUrl()}}
          />
          <IDBitTabBg style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', marginTop: pxToDp(50), paddingVertical: pxToDp(24), width: '100%', paddingHorizontal: pxToDp(24) }}>
            <Text style={{ color: '#999999', fontSize: pxToDp(24), }}>{t('my.receiver')}</Text>
            <Text style={{ color: '#999999', fontSize: pxToDp(24), marginTop: pxToDp(12) }}>{data?.address}</Text>
          </IDBitTabBg>

        </Fragment>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between", paddingVertical: pxToDp(22) }}>

          <Ripple
            rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
            onPress={() => saveImg()}
            style={{ justifyContent: "center", width: pxToDp(312), height: pxToDp(88), borderRadius: pxToDp(8), alignItems: "center", flexDirection: 'row' }}
            rippleContainerBorderRadius={3}
          >
            <Image
              style={{ width: pxToDp(32), height: pxToDp(32) }}
              source={require("@/resources/idbt/shoukuan/save.png")} />
            <Text style={{ fontSize: pxToDp(28), color: '#fff', marginLeft: pxToDp(4) }}>{t('my.save')}</Text>
          </Ripple>


          <Ripple
            rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
            style={{ justifyContent: "center", width: pxToDp(312), height: pxToDp(88), borderRadius: pxToDp(8), alignItems: "center", flexDirection: 'row' }}
            onPress={() => copyAdress(data?.address)}
            rippleContainerBorderRadius={3}
          >
            <Image
              style={{ width: pxToDp(32), height: pxToDp(32) }}
              source={require("@/resources/idbt/shoukuan/icon_copy.png")} />
            <Text style={{ fontSize: pxToDp(28), color: '#fff', marginLeft: pxToDp(4) }}>{t('my.copy')}</Text>
          </Ripple>
        </View>
      </View>

      <Loading text={t('common.saving')} isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
    </View>
  );
};

export default WalletCashier;