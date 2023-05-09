import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

import { pxToDp, pxToSp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import Loading from "@/components/LoadingSnipper/Loading";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "@/styles/pages/homepage/EditInfo/edit_Info";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import FastImage from "react-native-fast-image";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDbitTagInput from "@/components/IDbitTagInput/IDbitTagInput";
import Modal from "react-native-modal";
import HeaderListPop from "@/components/HeaderListPop/HeaderListPop";
import PressableSlop, { TouchType } from "@/components/PressableSlop/PressableSlop";

const EditInfo: FunctionComponent = (props) => {
  const headerHeight = useHeaderHeight();
  const [headerShow, setheaderShow] = useState(false);
  const { laungueCode } = useRedux();
  const [isShow, setisShow] = useState(false);
  // 拿到i18n
  const { i18n, t } = useTranslation();
  const [website, setwebsite] = useState('');

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
      headerTitle: '编辑资料',
    })
  }, [laungueCode])

  return (
    <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight + UIELEMENTS.PADDING_TOP, paddingBottom: useSafeAreaInsets().bottom }]}>
      <PressableSlop touchType={TouchType.HIGHLIGHT_STYLE} onPress={() => setheaderShow(true
      )}>
        <IDBitTabBg style={styles.cell_container}>
          <Text style={styles.cell_text}>NFT头像</Text>
          <FastImage
            style={styles.atavar}
            resizeMode="cover"
            source={{ uri: 'item?.faceURL ' }}
          />
        </IDBitTabBg>
      </PressableSlop>
      <IDBitTabBg style={[styles.cell_container, styles.padding_style2]}>
        <Text style={styles.cell_text}>域名</Text>
        <Text style={[styles.cell_text, styles.sub_text_color]}>asd</Text>
      </IDBitTabBg>
      <IDBitTabBg style={[styles.cell_container, styles.padding_style2]}>
        <Text style={styles.cell_text}>推特</Text>
        <IDBitBtn text="关联" containerStyle={styles.btn_container}></IDBitBtn>
      </IDBitTabBg>
      <IDBitTabBg style={[styles.cell_container, styles.padding_style2]}>
        <Text style={styles.cell_text}>官网</Text>

        <TextInput
          style={{ height: 40, width: '80%' }}
          onChangeText={text => setwebsite(text)}
          value={website}
          placeholderTextColor='#AAAAAA'
          placeholder={'输入官网链接'}
          secureTextEntry={true}
          returnKeyType={'done'}
          multiline={false}
        />
      </IDBitTabBg>
      <IDbitTagInput style={styles.tagInput}></IDbitTagInput>
      <IDBitBtn text="保存" containerStyle={styles.saveBtn}></IDBitBtn>
      <Modal
        isVisible={headerShow}
        style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={300}
      >
        <HeaderListPop
          // selectItemPress={()=>setisShow(true)}
          closePress={() => setheaderShow(false)}
          style={{ paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }}
        ></HeaderListPop>
      </Modal>
    </View>
  );
};
export default EditInfo;


