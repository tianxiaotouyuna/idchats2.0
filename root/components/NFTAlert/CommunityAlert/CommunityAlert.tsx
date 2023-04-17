import { pxToDp, pxToSp } from "@/utils/system";
import React, { FunctionComponent, useState } from "react";
import { View, Text, Pressable, Image, Alert, ImageBackground } from "react-native";
import Modal from "react-native-modal";
import { UIELEMENTS } from "@/constants/index";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { t } from "i18next";
export enum AlertStyle {
  DELETE_NORMAL_STYLE = 0, //删除
  DELETE_TIPS_STYLE = 1, //删除，有IGO的提示
  LOGINOUT_STYLE = 2, //退出社区
  CREATE_SUCCES_STYLE = 3, //创建成功
  CREATE_ERROR_STYLE = 4, //创建失败
}
type BannerProps = {
  title?: string;
  isVisible?: boolean;
  alertStyle?: AlertStyle;
  onSurePress?: Function;
  onCanclePress?: Function;
};

const CommunityAlert: FunctionComponent<BannerProps> = (props) => {
  const {
    isVisible,
    alertStyle = 0,
    title = "",
    onSurePress = () => { },
    onCanclePress = () => { }
  } = props;

  const renderSingleAction = () => (
    <Modal
      isVisible={isVisible}
      style={{ alignItems: "center" }}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={300}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: pxToDp(28),
          width: pxToDp(540),
          alignItems: "center",
          paddingHorizontal: pxToDp(28)
        }}
      >
        <View
          style={
            { marginTop: pxToDp(26), marginBottom: pxToDp(50), alignItems: 'center', width: '100%' }
          }
        >
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <Text style={{ fontSize: pxToSp(32), marginTop: 0, marginBottom: pxToDp(26), marginHorizontal: 0 }}>{t('community.delete1')}</Text>

            <PressableSlop
              style={{ width: pxToDp(40), height: pxToDp(40), position: 'absolute', right: 0 }}
              onPress={onCanclePress}>
              <Image
                style={{ width: pxToDp(40), height: pxToDp(40) }}
                source={require("@/resources/idbt/community/icon_close_999.png")}
              />
            </PressableSlop>
          </View>
          <Text style={{ color: "#61666E", fontSize: pxToDp(28) }}>
            {t('community.are1')}
          </Text>
        </View>
        <IDBitBtn text={t('community.delete2')} containerStyle={{ height: pxToDp(72), position: 'relative', marginBottom: pxToDp(48) }} contentStyle={{ height: pxToDp(72), backgroundColor: 'black' }} textStyle={{ color: '#D5F713', fontSize: pxToSp(26), fontWeight: '500' }} onPress={onSurePress}></IDBitBtn>
      </View>
    </Modal>
  );
  const renderDeleteTips = () => (
    <Modal
      isVisible={isVisible}
      style={{ alignItems: "center" }}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={300}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: pxToDp(28),
          width: pxToDp(540),
          alignItems: "center",
          paddingHorizontal: pxToDp(28)
        }}
      >
        <View
          style={
            { marginTop: pxToDp(26), marginBottom: pxToDp(50), alignItems: 'center', width: '100%' }
          }
        >
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <Text style={{ fontSize: pxToSp(32), marginTop: 0, marginBottom: pxToDp(26), marginHorizontal: 0 }}>{t('community.delete1')}</Text>

            <PressableSlop
              style={{ width: pxToDp(40), height: pxToDp(40), position: 'absolute', right: 0 }}
              onPress={onCanclePress}>
              <Image
                style={{ width: pxToDp(40), height: pxToDp(40) }}
                source={require("@/resources/idbt/community/icon_close_999.png")}
              />
            </PressableSlop>
          </View>
          <Text style={{ color: "#EB5B5A", fontSize: pxToDp(26) }}>
            {t('community.there')}
          </Text>
        </View>
        <IDBitBtn text={t('community.ok')} containerStyle={{ borderRadius:pxToDp(12),overflow:'hidden',height: pxToDp(72), position: 'relative', marginBottom: pxToDp(48) }} contentStyle={{ height: pxToDp(72), backgroundColor: 'black' }} textStyle={{ color: '#D5F713', fontSize: pxToSp(26), fontWeight: '500' }} onPress={onSurePress}></IDBitBtn>
      </View>
    </Modal>
  );
  const renderLoginOut = () => (
    <Modal
      isVisible={isVisible}
      style={{ alignItems: "center" }}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={300}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: pxToDp(28),
          width: pxToDp(540),
          alignItems: "center",
          paddingHorizontal: pxToDp(28)
        }}
      >
        <View
          style={
            { marginTop: pxToDp(26), marginBottom: pxToDp(50), alignItems: 'center', width: '100%' }
          }
        >
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <Text style={{ fontSize: pxToSp(32), marginTop: 0, marginBottom: pxToDp(26), marginHorizontal: 0 }}>{t('community.withdraw1')}</Text>

            <PressableSlop
              style={{ width: pxToDp(40), height: pxToDp(40), position: 'absolute', right: 0 }}
              onPress={onCanclePress}>
              <Image
                style={{ width: pxToDp(40), height: pxToDp(40) }}
                source={require("@/resources/idbt/community/icon_close_999.png")}
              />
            </PressableSlop>
          </View>
          <Text style={{ color: "#61666E", fontSize: pxToDp(28) }}>
            {t('community.are2')}
          </Text>
        </View>
        <IDBitBtn text={t('community.withdraw2')} containerStyle={{ borderRadius:pxToDp(12),overflow:'hidden',height: pxToDp(72), position: 'relative', marginBottom: pxToDp(48) }} contentStyle={{ height: pxToDp(72), backgroundColor: 'black' }} textStyle={{ color: '#D5F713', fontSize: pxToSp(26), fontWeight: '500' }} onPress={onSurePress}></IDBitBtn>
      </View>
    </Modal>
  );
  const renderCreateSucces = () => (
    <Modal
      isVisible={isVisible}
      style={{ alignItems: "center" }}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={300}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: pxToDp(28),
          width: pxToDp(478),
          height: pxToDp(478),
          alignItems: "center",
          paddingHorizontal: pxToDp(50),
          paddingVertical: pxToDp(60),
          justifyContent: 'space-between'
        }}
      >
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

          <Image
            style={{ width: pxToDp(212), height: pxToDp(160) }}
            source={require("@/resources/idbt/community/icon_image.png")}
          />
          <Text style={{ fontSize: pxToSp(32), marginTop: 0, marginBottom: pxToDp(26), marginHorizontal: 0 }}>{t('community.create11')}</Text>
        </View>
        <IDBitBtn text={t('community.okay')} containerStyle={{ height: pxToDp(72), position: 'relative' }} contentStyle={{ height: pxToDp(72), backgroundColor: 'black' }} textStyle={{ color: '#D5F713', fontSize: pxToSp(26), fontWeight: '500' }} onPress={onCanclePress}></IDBitBtn>
      </View>
    </Modal>
  );

  const renderCreateError = () => (
    <Modal
      isVisible={isVisible}
      style={{ alignItems: "center" }}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={300}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: pxToDp(28),
          width: pxToDp(478),
          height: pxToDp(478),
          alignItems: "center",
          paddingHorizontal: pxToDp(50),
          paddingVertical: pxToDp(60),
          justifyContent: 'space-between'
        }}
      >
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

          <Image
            style={{ width: pxToDp(212), height: pxToDp(160) }}
            source={require("@/resources/idbt/community/icon_imageError.png")}
          />
          <Text style={{ fontSize: pxToSp(32), marginTop: 0, marginBottom: pxToDp(26), marginHorizontal: 0 }}>{t('community.failed')}</Text>
        </View>
        <IDBitBtn text={t('community.okay')} containerStyle={{ height: pxToDp(72), position: 'relative' }} contentStyle={{ height: pxToDp(72), backgroundColor: 'black' }} textStyle={{ color: '#D5F713', fontSize: pxToSp(26), fontWeight: '500' }} onPress={onCanclePress}></IDBitBtn>
      </View>
    </Modal>
  );
  return alertStyle == AlertStyle.DELETE_NORMAL_STYLE
    ? renderSingleAction() : (alertStyle == AlertStyle.DELETE_TIPS_STYLE ? renderDeleteTips() : (alertStyle == AlertStyle.LOGINOUT_STYLE ? renderLoginOut() : (alertStyle == AlertStyle.CREATE_SUCCES_STYLE ? renderCreateSucces() : renderCreateError())))
};

export default CommunityAlert;
