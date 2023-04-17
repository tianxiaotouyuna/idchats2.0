import React, { FunctionComponent, ReactNode, useState } from "react";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, Alert, ImageBackground } from "react-native";
import styles from "./styles";
import { pxToDp, pxToSp } from "@/utils/system";
import IDBitBtn from "../IDBitBtn/IDBitBtn";
import { Navigate } from "@/utils/index";
import PressableSlop from "../PressableSlop/PressableSlop";
import CommunityPop, { CommunityPopStyle } from "../CommunityPop/CommunityPop";
import Modal from "react-native-modal";
export enum EYEStyle {
  BLACKSTYLE = 1, //
  WHITESTYLE = 2, //
}
type cardProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (isOpen: boolean) => {};
  data?: any
};

const IDOingCard: FunctionComponent<cardProps> = (props) => {
  const { style, data } = props;
  const [showPop, setshowPop] = useState(false);
  const pushCard=()=>{
    Navigate.navigate('ParticipateIdo')
  }
  const shareOn=()=>{
    setshowPop(true);
  }
  const pressShare=()=>{

  }
  return (
    <View
      style={[styles.image, style]}
    >
      <View style={{  }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Text style={{ color: '#FFFFFF' }}>7788社区</Text>
        <PressableSlop onPress={shareOn}>
        <Image style={{ width: pxToDp(30), height: pxToDp(26) }} source={require('@/resources/idbt/ido/ido_share.png')}></Image>
        </PressableSlop>
      </View>
      <View style={styles.dash}></View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%',alignItems:'center' }}>
        <Text style={{ color: '#FFFFFF' }}>当前进度10%</Text>
        <Text style={{ color: '#AAAAAA' }}>当前进度10%</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%',alignItems:'center' }}>
        <Text style={{ color: '#FFFFFF' }}>当前进度10%</Text>
        <IDBitBtn onPress={pushCard} containerStyle={{width:pxToDp(132),height:pxToDp(46)}} textStyle={{fontSize:pxToSp(24)}} text="立即参与"></IDBitBtn>
      </View>
      <Modal isVisible={showPop} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
        >  
        <CommunityPop onPressShare={pressShare} cancle_press={() => setshowPop(false)} communityPopStyle={CommunityPopStyle.SHARE_STYLE} />
      </Modal>
    </View>
  );
};

export default IDOingCard;