import React, { FunctionComponent, ReactNode, useState } from "react";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, Alert } from "react-native";
import styles from "./styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import PressableSlop from "../PressableSlop/PressableSlop";
import IDBitTabBg from "../IDBitTabBg/IDBitTabBg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { UIELEMENTS } from "@/constants/index";
import { useTranslation } from "react-i18next";
import WhatsAppTextInput from "react-native-whatsapp-textinput"
export enum EYEStyle {
  BLACKSTYLE = 1, //退出登录
  WHITESTYLE = 2, //退出登录
}
type butonProps = {
  style?: StyleProp<ViewStyle>;
  RLonPress?: (messages_: any) => void;
  eyeStyle?: EYEStyle;
  user?: any;
  placeHodler?: string;
  enable?: boolean;
  onPress: Function
};

const MessageSendBtn: FunctionComponent<butonProps> = (props) => {
  const [msg, setMsg] = useState('');
  const { i18n, t } = useTranslation();
  const { onPress, user, style, placeHodler, enable = true } =
    props;
  const sendMsg = () => {
    if (msg) {
      onPress({
        _id: 1,
        text: msg,
        createdAt: new Date(),
        user: user
      })
      setMsg(null)
    }
    else toast(i18n.t('home.enter'))

  }
  const renderView = () => (
    <WhatsAppTextInput
      containerStyle={[{ backgroundColor: '#272B34', paddingHorizontal: pxToDp(16)}, style]}
      textInputStyle={[{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, paddingHorizontal: pxToDp(16), borderRadius: pxToDp(16) }]}
      placeholderText={placeHodler || i18n.t('home.enter')}
      placeholderTextColor='#5C616C'
      messageTextColor={'#fff'}
      cursorColor={'#fff'}
      editable={enable}
      multiline={true}
      returnKeyType={'done'}
      textAlignVertical={'center'}
      messageText={msg}
      
      // sendButtonBgColor={UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR}
      sendButtonImage={require('@/resources/idbt/icon_fasong.png')}
      // sendButtonDisableColor={UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR}
      // sendButtonEnableColor={UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR}
      validateButton={() => {
      }}

      onPressButton={() => {
        enable && sendMsg();
      }}
      onChange={(text: string) => setMsg(text)}
    />
  )
  return (renderView())
  return (
    <View style={[{ backgroundColor: '#272B34', height: 43 + useSafeAreaInsets().bottom, flexDirection: 'row', paddingHorizontal: pxToDp(32) }, style]}>
      <View style={{ flexDirection: 'row', width: '100%', height: 43, justifyContent: "space-between", alignItems: 'center' }}>
        <View style={{ justifyContent: "center", borderRadius: pxToDp(16), height: 38, backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: '86%', paddingLeft: pxToDp(32) }}>
          {enable ? <TextInput placeholderTextColor={'#5C616C'} textAlignVertical={'center'} cursorColor={'#fff'} returnKeyType={'done'} placeholder={placeHodler || i18n.t('home.enter')} onChangeText={text => setMsg(text)} style={{ width: '100%', height: 38, color: '#fff', fontSize: pxToSp(28) }}
            value={msg}></TextInput>
            :
            <Text numberOfLines={1} ellipsizeMode={'middle'} style={{ width: '100%', alignSelf: 'center', color: '#5C616C', fontSize: pxToSp(28) }}
            >{placeHodler || i18n.t('home.enter')} </Text>
          }
        </View>
        <PressableSlop onPress={() => {
          // enable==false?toast(t('community.you2')):
          enable && sendMsg()
        }}>
          <Image style={{ width: pxToDp(60), height: pxToDp(60) }} source={require('@/resources/idbt/icon_fasong.png')} />
        </PressableSlop>
      </View>
    </View>


  );
};

export default MessageSendBtn;
