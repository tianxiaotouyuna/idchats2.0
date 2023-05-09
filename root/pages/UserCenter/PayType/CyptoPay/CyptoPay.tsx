import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import { pxToDp } from "@/utils/system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import useInitScreen from "@/hooks/useInitScreen";
import styles from "@/styles/pages/user_center/pay_type/cypto_pay/cypto_pay"
import Modal from "react-native-modal";
import IDbitPop, { PopStyle } from "@/components/IDbitPop/IDbitPop";
import CellCard, { CardStyle } from "@/components/CellCard/CellCard";
const CyptoPay: FunctionComponent = (props) => {
  const [selectIndex, setselectIndex] = useState(0);
  const [showPop, setshowPop] = useState(false);
  const [selectCoin, setselectCoin] = useState({ image: require('@/resources/second/icon_emailguanli.png'), text: 'ETH', chainId: 1 });
  const data_launge = [{ image: require('@/resources/second/icon_emailguanli.png'), text: 'ETH', chainId: 1 },
  { image: require('@/resources/second/icon_yuyan.png'), text: 'BTC', chainId: 1 },
  { image: require('@/resources/second/icon_huobi.png'), text: 'USDT', chainId: 1 },
  { image: require('@/resources/second/icon_gengxin.png'), text: 'USDC', chainId: 1 }]
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: 'white',
      headerShown: false,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const handleChangeTab = () => {

  }
  return (
    <View style={[styles.container,{paddingTop:pxToDp(70)}]}>
      <CellCard cardStyle={CardStyle.BASECOIN_STYLE} data={selectCoin} onPress={() => setshowPop(true)}></CellCard>
      <View style={{ flexDirection: 'row' ,paddingVertical:pxToDp(12)}}>
        <Text style={{ color: '#fff' }}>费用</Text>
        <Text style={{ color: '#fff',marginLeft:pxToDp(12) }}>0.00641ETH</Text>
      </View>
      <Modal isVisible={showPop} style={[styles.bottomModal]}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={500}
        animationInTiming={800}
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
      >
        <IDbitPop data={data_launge} popStyle={PopStyle.BASECOIN_STYLE} onPress={(index, laungueName) => {
          setselectCoin(data_launge[index])
          setshowPop(false)
          setselectIndex(index)
        }} selectIndex={selectIndex} />
      </Modal>
    </View>
  );
};
export default CyptoPay;


