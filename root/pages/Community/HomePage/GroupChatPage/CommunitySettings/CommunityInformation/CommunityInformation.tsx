import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, ScrollView, Pressable } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp, readFile } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import Top from "@/segments/Discover/Dappsquare/Top/Top";
import GDataList from "@/components/GDataList";
import { CommunityService, DiscoverService } from "@/services/index";
import DappCared from "@/components/DappCared/DappCared";
import { useHeaderHeight } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import NtfButton from "@/components/NtfButton/NtfButton";
import { color } from "react-native-reanimated";
import { COLORS } from "@/utils/Miscellaneous";
import { t } from "i18next";
import Ripple from "react-native-material-ripple";

import DocumentPicker, {
  isInProgress,
} from 'react-native-document-picker'
import { UIELEMENTS } from "@/constants/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { Navigate } from "@/utils/index";
import MultipleInpput from "@/components/MultipleInpput/MultipleInpput";
import FastImage from "react-native-fast-image";
import Loading from "@/components/LoadingSnipper/Loading";
import { useRoute } from "@react-navigation/native";
const CommunityInformation: FunctionComponent = (props) => {
  const chatData: any = useRoute().params?.chatData ?? {};
  const headerHeight = useHeaderHeight();
  const [result, setresult] = useState(null);
  const [description, setdescription] = useState();
  const gRef = useRef<GDataList>();
  const [info, setinfo] = useState({});
  const [isShow, setisShow] = useState(false);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      headerTitle: t('community.community5'),
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });

  return (
    <ScrollView style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight }]}>

      <Ripple onPress={()=>{}} style={{alignItems:'center',paddingTop:pxToDp(58)}}>

          <FastImage
                style={{ width: pxToDp(128), height: pxToDp(128), borderRadius: pxToDp(10), backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR }}
                resizeMode="cover"
                source={{ uri: chatData?.faceURL }}
            />
      </Ripple>

      <View style={{ marginTop: pxToDp(28) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.community6')}</Text>
        </View>
        <IDBitTabBg style={{height: 40 , paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) ,justifyContent:"center"}}>
          <Text style={{ color:'#fff'}} >{chatData?.groupName}</Text>
        </IDBitTabBg>
      </View>

      <View style={{ marginTop: pxToDp(28) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.community7')}</Text>
        </View>
        <IDBitTabBg  style={{paddingHorizontal:pxToDp(16), width: pxToDp(686), height: pxToDp(268),paddingVertical:pxToDp(16)}}>
          <Text style={{ color:'#fff'}} >{chatData?.introduction}</Text>
        </IDBitTabBg>
      </View>
      <Loading
        text=""
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
      ></Loading>

    </ScrollView>
  );
};
export default CommunityInformation;


