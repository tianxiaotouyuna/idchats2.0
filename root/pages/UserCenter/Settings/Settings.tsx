import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import styles from "@/styles/pages/guide_page/styles";
import { pxToDp } from "@/utils/system";
import { Image } from "react-native-animatable";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate, P_Storage } from "@/utils/index";
import CellCard from "@/components/CellCard/CellCard";
import Modal from "react-native-modal";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import IDbitPop, { PopStyle } from "@/components/IDbitPop/IDbitPop";
import { UserService } from "@/services/index";
import useRedux from "@/hooks/useRedux";
const Settings: FunctionComponent = (props) => {
  const [showPop, setShowPop] = useState(false);
  const [showPop_currcy, setshowPop_currcy] = useState(false);
  const {sendReduxAction } = useRedux();
  const types = [{ image: require('@/resources/second/icon_emailguanli.png'), text: '邮箱管理', chainId: 1 },
  { image: require('@/resources/second/icon_yuyan.png'), text: '语言', chainId: 1 },
  { image: require('@/resources/second/icon_huobi.png'), text: '货币单位', chainId: 1 },
  { image: require('@/resources/second/icon_gengxin.png'), text: '检查更新', chainId: 1 }]

  const data_launge = [{ image: require('@/resources/second/icon_emailguanli.png'), text: '繁體', chainId: 1 },
  { image: require('@/resources/second/icon_yuyan.png'), text: 'English', chainId: 1 },
  { image: require('@/resources/second/icon_huobi.png'), text: '日本語', chainId: 1 },
  { image: require('@/resources/second/icon_gengxin.png'), text: 'Português', chainId: 1 }]
  const data_currcy = [{ image: require('@/resources/second/icon_emailguanli.png'), text: '人民币（CNY）', chainId: 1 },
  { image: require('@/resources/second/icon_yuyan.png'), text: '美元（USD）', chainId: 1 }]
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '设置',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const onPressCard = (index: number) => {
    if (index == 0) Navigate.navigate('EmailLogin');
    else if (index == 1) { setShowPop(true); }
    else if (index == 2) { setshowPop_currcy(true) }
  }

  const logout = async () => {

    await P_Storage.clear_wallets()
    await UserService.logout()
    sendReduxAction(ReduxToken.REFRESH_WALLET, { wallet: null })
    Navigate.navigate('GoInPage');
  }
  return (
    <View style={[styles.container, { paddingBottom: pxToDp(238), paddingTop: pxToDp(238) }]}>
      <View style={{ width: '100%' }}>
        {
          types?.map((item, index) => {
            return <CellCard key={index + 'asd'} data={item} style={{ marginBottom: pxToDp(24) }} onPress={(index: number) => onPressCard(index)} index={index}></CellCard>
          })
        }
      </View>

      <Modal isVisible={showPop} style={[styles.bottomModal]}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={500}
        animationInTiming={800}
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
      >
        <IDbitPop data={data_launge} popStyle={PopStyle.LAUNGE_STYLE} onPress={(index, laungueName) => setShowPop(false)} selectIndex={0} />
      </Modal>

      <Modal isVisible={showPop_currcy} style={[styles.bottomModal]}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={500}
        animationInTiming={800}
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
      >
        <IDbitPop data={data_currcy} popStyle={1} onPress={(index, laungueName) => setshowPop_currcy(false)} selectIndex={0} />
      </Modal>

      <IDBitBtn text={'登出'} contentStyle={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginTop: pxToDp(180), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }} onPress={logout}></IDBitBtn>
    </View>
  );
};
export default Settings;


