import React, { FunctionComponent, useState } from "react";
import { View } from "react-native";
import styles from "@/styles/pages/guide_page/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import useInitScreen from "@/hooks/useInitScreen";
import { t } from "i18next";
import GameCard from "@/components/GameCard/GameCard";
import MultipleInpput from "@/components/MultipleInpput/MultipleInpput";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
const Notification: FunctionComponent = (props) => {
  const [content, setcontent] = useState('');
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: t('notfication.create'),
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const closePress = () => {

  }
  const renderItem = ({ item, index }: any) => {
    return <GameCard data={item} />;
  };

  const _emptyView = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: pxToDp(238), height: pxToDp(200) }}
          source={require("@/resources/idbt/my/noData_my.png")}
          resizeMode={'stretch'}
        />
        <Text style={{ color: '#ABABAB', fontSize: pxToSp(26), marginTop: pxToDp(10) }}>{t('common.nodata')}</Text>
      </View>
    )
  }
  const createNotification = () => {

  }
  return (
    <View style={[styles.container, { paddingBottom: pxToDp(238), paddingTop: pxToDp(238), justifyContent: 'space-between' }]}>
      <View>
        <MultipleInpput horderStyle={{ paddingHorizontal: pxToDp(16) }} value={content} placeHolder={t('community.enter3')} length={150} onChangeText={(text: string) => setcontent(text)}></MultipleInpput>
        <PressableSlop onPress={() => Navigate.navigate('DraftBox')}>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>草稿箱</Text>
        </PressableSlop>
        <PressableSlop onPress={() => Navigate.navigate('CreateSpace')}>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>创建空间</Text>
        </PressableSlop>
      </View>
      <IDBitBtn text={'发布'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginTop: pxToDp(180) }} onPress={createNotification}></IDBitBtn>
    </View>
  );
};
export default Notification;


