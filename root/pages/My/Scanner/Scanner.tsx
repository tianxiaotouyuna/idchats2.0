import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { pxToDp, pxToSp, windowWidth } from "@/utils/system";
import Top from "@/segments/My/New/Top/Top";
import Center from "@/segments/My/Center/Center";
import styles from "@/styles/pages/my/styles";
import { Image } from "react-native-animatable";
import Bottom from "@/segments/My/New/Bottom/Bottom"
import Modal from "react-native-modal";
import WalletManagerPop from "@/components/WalletManagerPop/WalletManagerPop";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from 'react-native-camera';
import useInitScreen from "@/hooks/useInitScreen";
import { Navigate } from "@/utils/index";
import { PADDING_TOP } from "@/constants/ui-elements";
import { UIELEMENTS } from "@/constants/index";
import { useHeaderHeight } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

const Scanner: FunctionComponent = (props) => {
  const [showWalletPop, setshowWalletPop] = useState(false);
    const {t}=useTranslation()
    useInitScreen({
    navigationOptions: {
      headerTitle: t('my.scanQRCode'),
      headerTransparent: true,
      headerShown: true,
      headerTintColor: 'white'
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const handleChangeTab = () => {

  }
  const renderOldView = () => {
    return (

      <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: 0 }]}>
        <Top style={{ marginTop: pxToDp(30) }}></Top>
        <Center style={{ marginTop: pxToDp(30) }}></Center>
      </View>
    )
  }
  const renderNav = () => (

    <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between" }}>
      <PressableSlop onPress={() => setshowWalletPop(true)}>
        <Image
          style={styles.navItem}
          source={require("@/resources/idbt/my/more.png")}
          resizeMode={'stretch'}
        />
      </PressableSlop>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.navItem}
          source={require("@/resources/idbt/my/walleta.png")}
          resizeMode={'stretch'}
        />
        <Image
          style={[styles.navItem, { marginLeft: pxToDp(24) }]}
          source={require("@/resources/idbt/my/设置.png")}
          resizeMode={'stretch'}
        />
      </View>
    </View>
  )
  const readSucces = (result: any) => {
    const resultArr = result?.data?.split(':')
    Navigate.navigate('WalletTransler', { data: { address: resultArr[resultArr.length - 1], type: 0 } })
  }
  return (
    <View style={{ paddingTop: useHeaderHeight(), flex: 1, backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR }}>
      <QRCodeScanner
        containerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        topViewStyle={{ flex: 0 }}
        bottomViewStyle={{ flex: 0 }}
        cameraStyle={{ overflow: 'hidden' }}
        onRead={readSucces}
        // showMarker={true}
        flashMode={RNCamera.Constants.FlashMode.auto}
        reactivate={true}
        reactivateTimeout={5000}
      // cameraTimeout={5}
      // cameraTimeoutView={<Text>未等式别</Text>}
      />

    </View>
  );
};
export default Scanner;



