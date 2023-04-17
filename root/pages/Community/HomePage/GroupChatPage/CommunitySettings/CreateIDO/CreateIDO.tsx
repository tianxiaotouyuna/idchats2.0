import React, { Fragment, FunctionComponent, useEffect,useState } from "react";
import { View, Image } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useHeaderHeight } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/utils/Miscellaneous";
import { t } from "i18next";

import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
const CreateIDO: FunctionComponent = (props) => {
  const [result, setresult] = useState(null);
  const [selectIndex, setselectIndex] = useState(0);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      headerTitle: t('community.create9'),
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  useEffect(() => {
    DocumentPicker.types.images

  }, [])

  return (
    <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={{ width: pxToDp(316), height: pxToDp(218) }} source={require('@/resources/idbt/community/image.png')} />
      </View>


      {
        selectIndex == 0 ?
          <Fragment>
            <IDBitBtn text={t('community.create7')} containerStyle={{ marginTop: pxToDp(84), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
              contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: pxToDp(10) }}
              imageSource={require('@/resources/idbt/community/icon_xuanzhong.png')}
              imgStyle={{ width: pxToDp(40), height: pxToDp(40), marginRight: 0 }}
              onPress={() => setselectIndex(0)}
            />

            <IDBitBtn text={t('community.create7')} containerStyle={{ backgroundColor: COLORS.clear, borderWidth: pxToDp(1), borderColor: '#D5F713', marginTop: pxToDp(40), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
              contentStyle={{ backgroundColor: COLORS.clear, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: pxToDp(10) }}
              imageSource={require('@/resources/idbt/community/icon_weixuan.png')}
              imgStyle={{ width: pxToDp(40), height: pxToDp(40), marginRight: 0 }}
              textStyle={{ color: '#D5F713' }}
              onPress={() => setselectIndex(1)}
            />
          </Fragment> :
          <Fragment>

            <IDBitBtn text={t('community.create7')} containerStyle={{ backgroundColor: COLORS.clear, borderWidth: pxToDp(1), borderColor: '#D5F713', marginTop: pxToDp(84), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
              contentStyle={{ backgroundColor: COLORS.clear, flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: pxToDp(10) }}
              imageSource={require('@/resources/idbt/community/icon_weixuan.png')}
              imgStyle={{ width: pxToDp(40), height: pxToDp(40), marginRight: 0 }}
              textStyle={{ color: '#D5F713' }}
              onPress={() => setselectIndex(0)}
            />
            <IDBitBtn text={t('community.create7')} containerStyle={{ marginTop: pxToDp(40), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
              contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between', paddingHorizontal: pxToDp(10) }}
              imageSource={require('@/resources/idbt/community/icon_xuanzhong.png')}
              imgStyle={{ width: pxToDp(40), height: pxToDp(40), marginRight: 0 }}
              onPress={() => setselectIndex(1)}
            />

          </Fragment>
      }
      <IDBitBtn text={t('community.create4')}
        containerStyle={{ position: 'absolute', bottom: useSafeAreaInsets().bottom + pxToDp(60), marginTop: pxToDp(40), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
        onPress={() => { Navigate.navigate('CreateIDO2') }}
      />
    </View>
  );
};
export default CreateIDO;


