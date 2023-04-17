import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, Pressable } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import storage from '@/utils/pstorage'
import Toast from "react-native-root-toast";
import Loading from "@/components/LoadingSnipper/Loading";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import FastImage from "react-native-fast-image";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import NtfButton from "@/components/NtfButton/NtfButton";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
import { UserService } from "@/services/index";
import { TextInput } from "react-native-gesture-handler";
import { DomainParser } from "@/utils/regular";
import { t } from "i18next";
const DomainSetting: FunctionComponent = (props) => {
  const { imUserInfo } = useRedux();
  const headerHeight = useHeaderHeight();
  const [result, setResult] = useState();
  const [domain, setdomain] = useState('');
  const [isShow, setisShow] = useState(false);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      title: t('my.domainSetting'),
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const bindDomainClick = async () => {
    var parser = new DomainParser(domain);
    parser.parse();//解析
    if (parser.hasError()) {//判断域名不正确
      // Alert.alert(JSON.stringify(parser.getMessage()))
      toast(t('my.domainFomartError'))
    }
    else {
      setisShow(true)
      const res = await UserService.bindEnsDomainApi(imUserInfo?.userID,domain)
      setisShow(false)
    }
  }
  const selectFromLocal = async () => {
    setisShow(true);
    setTimeout(() => {
      toast(t('my.domainNone'))
      setisShow(false)
    }, 2000);
    // try {
    //   const pickerResult = await DocumentPicker.pickSingle({
    //     presentationStyle: 'fullScreen',
    //     copyTo: 'cachesDirectory',
    //     allowMultiSelection: false
    //   })
    //   setResult(pickerResult)
    // } catch (e) {
    //   handleError(e)
    // }
  }
  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  }
  return (
    <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>

      <Text style={{ marginTop: pxToDp(54), color: '#FFFFFF', fontSize: pxToSp(28) }}>{t('my.domainSetting')}</Text>
      <IDBitTabBg style={{ paddingHorizontal: pxToDp(20), borderRadius: pxToDp(12), marginTop: pxToDp(12) }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' ,alignItems:'center'}}>
          <Text style={{ fontSize: pxToSp(28), color: '#B8B8B8', height: 40 ,textAlignVertical:"center"}}>{t('my.pleaseDomain')}</Text>
          <PressableSlop onPress={selectFromLocal}>
            <Text style={{ color: '#fff'}}>{t('my.insertDomain')}</Text>
            <View style={{ borderColor: '#fff', borderBottomWidth: pxToDp(1) ,backgroundColor:'red'}} ></View>
          </PressableSlop>
        </View>
      </IDBitTabBg>
      <Loading text="" isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
      {/* <IDBitBtn text="绑定" containerStyle={{ marginTop: pxToDp(60), borderRadius: pxToDp(12), width: pxToDp(200), height: pxToDp(84) }} onPress={bindDomainClick}></IDBitBtn> */}
    </View>
  );
};
export default DomainSetting;


