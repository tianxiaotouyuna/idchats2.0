import { pxToDp } from "@/utils/system";
import React, { FunctionComponent, useState } from "react";
import { View, Text, Pressable, Image, Alert, ImageBackground } from "react-native";
import Modal from "react-native-modal";
import { UIELEMENTS } from "@/constants/index";
import PressableSlop from "../PressableSlop/PressableSlop";
import IDBitBtn from "../IDBitBtn/IDBitBtn";
import { t } from "i18next";
export enum AlertStyle {
  SINGLE_STYLE = 0, //退出登录
  DOUBLE_STYLE = 1, //退出登录
  TRANSFER_STYLE = 2, //转账弹框
  UPDATE_STYLE = 3, //升级弹框
}
type BannerProps = {
  title?: string;
  content?: string;
  sureText?: string;
  cancleText?: string;
  isVisible?: boolean;
  alertStyle?: AlertStyle;
  onSurePress?: () => void;
  onCanclePress?: () => void;
  dataList?: any;
};

const NFTAlert: FunctionComponent<BannerProps> = (props) => {
  const {
    alertStyle = 0,
    title = "",
    content = "内容",
    sureText = "知道了",
    cancleText = "取消",
    isVisible = false,
    onSurePress = () => [],
    onCanclePress = () => [],
    dataList = []
  } = props;
  const renderDoubleAction = () => (
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
          height: pxToDp(280),
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={
            title.length ? { flex: 1 } : { flex: 1, justifyContent: "center" }
          }
        >
          {title.length ? (
            <View
              style={{
                height: pxToDp(60),
                backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{title}</Text>
            </View>
          ) : null}
          <Text style={{ color: "#000000", fontSize: pxToDp(30), marginHorizontal: pxToDp(10) }}>
            {content}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#F0F0F0",
            height: pxToDp(2),
            width: "100%",
          }}
        />
        <View style={{ width: "100%", flexDirection: 'row' }}>
          <View
            style={{
              height: pxToDp(80),
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: pxToDp(32),
            }}
          >
            <Pressable
              onPress={() => onSurePress()}
              style={{
                flexDirection: "row",
                width: "50%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: pxToDp(34),
                    color: UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE,
                  }}
                >
                  {sureText}
                </Text>
              </View>
            </Pressable>

            <View
              style={{
                backgroundColor: "#F0F0F0",
                height: "100%",
                width: pxToDp(2),
              }}
            />

            <Pressable
              onPress={() => onCanclePress()}
              style={{
                flexDirection: "row",
                width: "50%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: pxToDp(34),
                    color: UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE,
                  }}
                >
                  {cancleText}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

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
          height: pxToDp(280),
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={
            title.length ? { flex: 1 } : { flex: 1, justifyContent: "center" }
          }
        >
          {title.length ? (
            <View
              style={{
                height: pxToDp(60),
                backgroundColor: "red",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{title}</Text>
            </View>
          ) : null}
          <Text style={{ color: "#000000", fontSize: pxToDp(28) }}>
            {content}
          </Text>
        </View>
        <Pressable style={{ width: "100%" }} onPress={() => onSurePress()}>
          <View
            style={{
              backgroundColor: "#F0F0F0",
              height: pxToDp(2),
              width: "100%",
            }}
          />
          <View
            style={{
              height: pxToDp(80),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: pxToDp(34),
                color: UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE,
              }}
            >
              {sureText}
            </Text>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
  const renderTransfer = () => (
    <Modal
      isVisible={isVisible}
      style={{ alignItems: "center" }}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={300}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View style={{ alignItems: 'center' }}>
        <ImageBackground style={{ width: pxToDp(470), height: pxToDp(288), alignItems: "center" }} source={require('@/resources/idbt/my/transfer/tSuccesful.png')} >
          <Text
            style={{
              fontSize: pxToDp(32),
              color: '#000000',
              fontWeight: 'bold',
              marginTop: pxToDp(180)
            }}
          >
            转账成功
          </Text>
        </ImageBackground>
        <PressableSlop style={{ width: "100%" }} onPress={() => onCanclePress()}>
          <Image style={{ width: pxToDp(48), height: pxToDp(48), marginTop: pxToDp(22) }} source={require('@/resources/idbt/my/transfer/cancle.png')} />
        </PressableSlop>
      </View>
    </Modal>
  )

  const renderUpdate = () => (
    <Modal
      isVisible={isVisible}
      style={{ alignItems: "center" }}
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={300}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View style={{ alignItems: 'center', borderRadius: pxToDp(24), overflow: 'hidden', width: '100%'}}>
        <View style={{ alignItems: 'flex-start', backgroundColor: 'white', borderRadius: pxToDp(24), overflow: 'hidden', paddingHorizontal: pxToDp(36), paddingTop: pxToDp(26),paddingBottom: pxToDp(36), width: '85%' }}>
          <Text
            style={{
              fontSize: pxToDp(32),
              color: '#000000',
              fontWeight: 'bold',
              alignSelf: 'center'
            }}
          >
            {t('my.updateTips')}
          </Text>
          <Text
            style={{
              fontSize: pxToDp(26),
              color: '#000000',
              fontWeight: 'bold',
              marginTop: pxToDp(10),
              marginBottom: pxToDp(10)
            }}
          >
            {t('my.updateContent')}
          </Text>
          <View>
            {dataList?.map((item: any, index: number) => {
              return <Text
                style={{
                  fontSize: pxToDp(26),
                  color: '#727272',
                }}
                key={item+index}
              >
                {index+1}：{item}
              </Text>
            })}
          </View>
          <IDBitBtn containerStyle={{ width: pxToDp(190), height: pxToDp(60) ,marginTop:pxToDp(50)}} textStyle={{ color: '#D5F713' }} contentStyle={{ backgroundColor: '#000000'}} text={t('my.updateNow')} onPress={onSurePress}></IDBitBtn>
        </View>
        <PressableSlop style={{ width: "100%",alignItems:'center' }} onPress={() => onCanclePress()}>
          <Image style={{ width: pxToDp(48), height: pxToDp(48), marginTop: pxToDp(22) }} source={require('@/resources/idbt/my/transfer/cancle.png')} />
        </PressableSlop>
      </View>
    </Modal>
  )

  return alertStyle == AlertStyle.SINGLE_STYLE
    ? renderSingleAction()
    : (alertStyle == AlertStyle.DOUBLE_STYLE ? renderDoubleAction() : alertStyle == AlertStyle.TRANSFER_STYLE ? renderTransfer() : renderUpdate());
};

export default NFTAlert;
