import React, { FunctionComponent, useEffect, useState } from "react";
import { View} from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import Loading from "@/components/LoadingSnipper/Loading";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import { Navigate } from "@/utils/index";
import { useNavigation } from "@react-navigation/native";

const EditInfo: FunctionComponent = (props) => {
  const headerHeight = useHeaderHeight();
  const { laungueCode } = useRedux();
  const [isShow, setisShow] = useState(false);
  // 拿到i18n
  const { i18n, t } = useTranslation();

  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const navigation = useNavigation();
  useEffect(() => {
      navigation.setOptions({
          headerTitle: i18n.t('my.setting'),
    })
  }, [laungueCode])

  return (
    <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
      <ListCell style={{ width: '100%' }} text={i18n.t('my.walletsManagement')} imageSource={require('@/resources/return_4.png')} onPress={() => Navigate.navigate('WalletManger')}></ListCell>
      <ListCell style={{ width: '100%' }} text={i18n.t('my.aboutUs')} imageSource={require('@/resources/return_4.png')} pushRouteName={'AboutUs'}></ListCell>
      <ListCell style={{ width: '100%' }} text={i18n.t('guidePage.mailbox1')} imageSource={require('@/resources/return_4.png')} pushRouteName={'MailboxSettings'}></ListCell>
      <ListCell style={{ width: '100%' }} text={i18n.t('my.systemSettings')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Setup'}></ListCell>
      <Loading text={t('constants:wait')} isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>

    </View>
  );
};
export default EditInfo;


