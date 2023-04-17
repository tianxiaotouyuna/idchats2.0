import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import storage from '@/utils/pstorage'
import Toast from "react-native-root-toast";
import Loading from "@/components/LoadingSnipper/Loading";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import Ripple from "react-native-material-ripple";
import { Storage, System } from "@/utils/index";
import { useNavigation } from "@react-navigation/native";
import { CommonService } from "@/services/index";
import IMServiceManager from "@/utils/IMServiceManager";

const CurrencyUnit: FunctionComponent = (props) => {
  const { t, i18n } = useTranslation();
  const headerHeight = useHeaderHeight();
  const [isShow, setisShow] = useState(false);
  const [thisUnitCode, setthisUnitCode] = useState(0);
  const { sendReduxAction, unitCode } = useRedux();

  useEffect(() => {
    setthisUnitCode(unitCode)
  }, []);

  const submit = async (id: number) => {
    setisShow(true)
    sendReduxAction(ReduxToken.CHANGE_UNIT, { unitCode: id })
    setthisUnitCode(id)
    sendReduxAction(ReduxToken.CHANGE_UNIT, { unitCode: id })
    await Storage.save(CacheKeys.UNITCODE, id)

    await getTokensInfo();
    sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
    setTimeout(() => {
      setisShow(false)/*  */
    }, 500);
  }
  const getTokensInfo = async () => {
    const res = await CommonService.getTokensInfo(thisUnitCode ? "cny" : 'usd');
    sendReduxAction(ReduxToken.GET_TOKENS_INFO, { tokensInfo: res });
    let commonData = IMServiceManager.getInstance();
    commonData.setRateBase(res);
  };

  useInitScreen({
    navigationOptions: {
      headerTitle: t('my.currencyUnit'),
      headerTransparent: true,
      headerShown: true,
      headerTintColor: 'white'
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  return (
    <View style={[styles.container, { paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
      <ListCell style={{ width: '100%' }} text={t('my.chineseYuan')} rightImgSource={require('@/resources/idbt/my/selected.png')} ishowSelect={thisUnitCode == 0} onPress={() => submit(0)}></ListCell>
      <ListCell style={{ width: '100%' }} text={t('my.dollorUSD')} rightImgSource={require('@/resources/idbt/my/selected.png')} ishowSelect={thisUnitCode == 1} onPress={() => submit(1)}></ListCell>
      <Loading text={''} isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
    </View>
  );
};
export default CurrencyUnit;


