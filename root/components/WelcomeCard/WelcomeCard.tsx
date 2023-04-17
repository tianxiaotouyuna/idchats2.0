import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import IDBitTabBg from "../IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import { pxToDp, pxToSp } from "@/utils/system";
import { t } from "i18next";
import IDBitBtn from "../IDBitBtn/IDBitBtn";
import CommunityPop, { CommunityPopStyle } from "../CommunityPop/CommunityPop";
import Modal from "react-native-modal";
type cardProps = {
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  data: any;
};

const WelcomeCard: FunctionComponent<cardProps> = (props) => {
  const [showPop, setshowPop] = useState(false);
  const { data, containerStyle, contentStyle } =
    props;
    const pressShare=()=>{
      
    }
  return (
    <Ripple pointerEvents={'auto'}>
      <IDBitTabBg style={{ borderRadius: pxToDp(18), padding: UIELEMENTS.PADDING_HORIZONTAL, alignItems: 'center', marginTop: UIELEMENTS.PADDING_TOP }}>
        <Text style={{ color: '#fff', fontSize: pxToSp(30) }}
          ellipsizeMode={'middle'}
          numberOfLines={3}>{t('community.welcome')} {data?.groupName}</Text>
        <Image style={{ marginVertical: pxToDp(16), marginTop: pxToDp(16), width: pxToDp(364), height: pxToDp(208) }} resizeMode={'stretch'} source={require('@/resources/idbt/community/welcome.png')} ></Image>
        <IDBitTabBg style={{ backgroundColor: '#212731', paddingVertical: pxToDp(10), borderRadius: pxToDp(8), paddingHorizontal: pxToDp(16), alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0 }}>
          <Text style={{ color: '#fff', fontSize: pxToSp(26), width: 240 }} numberOfLines={2} ellipsizeMode={'middle'}>{data?.introduction}{data?.introduction}{data?.introduction}{data?.introduction}</Text>
          <IDBitBtn textStyle={{ fontWeight: '500' }} containerStyle={{ height: pxToDp(56), paddingHorizontal: pxToDp(10), paddingVertical: pxToDp(4) }} text={t('community.share')} fullWidth={false} onPress={()=>setshowPop(true)}></IDBitBtn>
        </IDBitTabBg>
      </IDBitTabBg>

      <Modal isVisible={showPop} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
        >  
        <CommunityPop onPressShare={pressShare} cancle_press={() => setshowPop(false)} communityPopStyle={CommunityPopStyle.SHARE_STYLE} />
      </Modal>
    </Ripple>
  );
};

export default WelcomeCard;
