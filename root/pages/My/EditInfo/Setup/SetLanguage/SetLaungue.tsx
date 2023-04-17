import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation, withTranslation } from 'react-i18next'
import Loading from "@/components/LoadingSnipper/Loading";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import Ripple from "react-native-material-ripple";
import { Storage, System } from "@/utils/index";
import { useNavigation } from "@react-navigation/native";

import hoistStatics from 'hoist-non-react-statics';
const SetLaungue: FunctionComponent = (props) => {
  const { t, i18n } = useTranslation();
  const headerHeight = useHeaderHeight();
  const [isShow, setisShow] = useState(false);
  const [thisLaungeId, setthisLaungeId] = useState(0);
  const [saving, setSaving] = useState(false);
  const { sendReduxAction, laungueCode } = useRedux();
  const changeLaunge = (id: number) => {
    setthisLaungeId(id)
  }
  useEffect(() => {
    if (saving) {
      submit()
    }
  }, [saving]);

  useEffect(() => {
    setthisLaungeId(laungueCode)
  }, []);

  const submit = async () => {
    setisShow(true)
    i18n.changeLanguage(thisLaungeId == 0 ? 'tw' : 'en');
    await Storage.save(CacheKeys.LANGUNECOD, thisLaungeId)
    sendReduxAction(ReduxToken.CHANGE_LANGUAGE, { laungueCode: thisLaungeId })
    setSaving(false)
    setTimeout(() => {
      setisShow(false)/*  */
    }, 500);
  }

  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      headerTintColor: 'white'
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('my.language'),
      headerRight: () => (
        <Ripple
          onPress={() => setSaving(true)}
          style={{ backgroundColor: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR, paddingVertical: pxToDp(6), paddingHorizontal: pxToDp(14), marginRight: pxToDp(20), borderRadius: pxToDp(12) }}
        >
          <Text style={{ marginHorizontal: pxToDp(20), fontSize: pxToDp(28), color: '#000', fontWeight: '400' }}>{t('common.save')}</Text>
        </Ripple>
      ),
    });
  }, [navigation,laungueCode]);

  return (
    <View style={[styles.container, { paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
      <ListCell style={{ width: '100%' }} text={'繁體中文'} rightImgSource={require('@/resources/idbt/my/selected.png')} ishowSelect={thisLaungeId == 0} onPress={() => changeLaunge(0)}></ListCell>
      <ListCell style={{ width: '100%' }} text={'English'} rightImgSource={require('@/resources/idbt/my/selected.png')} ishowSelect={thisLaungeId == 1} onPress={() => changeLaunge(1)}></ListCell>
      <Loading text={''} isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
    </View>
  );
};
// export default SetLaungue;

export default hoistStatics(withTranslation()(SetLaungue), SetLaungue);

