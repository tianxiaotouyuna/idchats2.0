import React, { Fragment, FunctionComponent, useEffect, useMemo, useState } from "react";
import { Alert, Dimensions, Image, Platform, Switch, Text, View } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { log, pxToDp, pxToSp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import IDBITSearch from "@/components/IDBITSearch/IDBITSearch";
import GDataList from "@/components/GDataList";
import { CommunityService } from "@/services/index";
import CommunityListCard from "@/components/CommunityListCard/CommunityListCard";
import { t } from "i18next";
import { useHeaderHeight } from "@react-navigation/stack";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { useNavigation, useRoute } from "@react-navigation/native";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import CommunityAlert, { AlertStyle } from "@/components/NFTAlert/CommunityAlert/CommunityAlert";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import FastImage from "react-native-fast-image";
import MemberGridle from "@/components/MemberGridle/MemberGridle";
import Loading from "@/components/LoadingSnipper/Loading";
import CommunityPop, { CommunityPopStyle } from "@/components/CommunityPop/CommunityPop";
import Modal from "react-native-modal/dist/modal";
import * as WeChat from 'react-native-wechat';
import useRedux from "@/hooks/useRedux";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
const CommunitySettings: FunctionComponent = (props) => {
  const stackRoute = useRoute();
  const chatData: any = useRoute().params?.chatData ?? {};
  const [showAlert, setshowAlert] = useState(false);
  const [showQuit, setshowQuit] = useState(false);
  const [info, setinfo] = useState({});
  const [isShow, setisShow] = useState(false);
  const [members, setmembers] = useState(null);
  const [showPop, setshowPop] = useState(false);
  const [showInvate, setshowInvate] = useState(false);
  const [isEnabled, setisEnabled] = useState(false);
  const { sendReduxAction, needReloadCommunityList } = useRedux();
  const { imUserInfo } = useRedux();
  useInitScreen({
    navigationOptions: {
      headerTitle: chatData?.isJoinEd ? t('community.community3') : t('community.community5'),
      headerTransparent: true,
      headerShown: true,
      headerTintColor: "white",
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        chatData?.creatorUserID==imUserInfo?.userID?<Ripple
        onPress={() => Navigate.navigate('CreateCommunity', { info: {groupName:chatData?.groupName,description:chatData?.introduction,uri:chatData?.faceURL,groupID:chatData?.groupID}, })}
      >
        <PressableSlop
        >
          <Image
            style={{
              width: pxToDp(60),
              height: pxToDp(60),
              marginRight: UIELEMENTS.PADDING_HORIZONTAL,
            }}
            source={require("@/resources/idbt/community/edit2.png")}
          />
        </PressableSlop>
      </Ripple>:null
      ),
    });
  }, []);
  const getInfo = async () => {

    const resp2 = await CommunityService.getGroupAllMemberListApi(chatData?.groupID)
    // Alert.alert(JSON.stringify(resp2))
    log(resp2,'getGroupAllMemberListApi')
    setmembers(resp2)
    setisShow(false)
  }
  useEffect(() => {
    setisShow(true)
    getInfo()
  }, [])
  const quitCommunity = async () => {
    setshowQuit(false)
    setisShow(true)
    const resp = await CommunityService.quitGroup(chatData?.groupID)
    setisShow(false)
    if (resp?.errCode == 0) {
      sendReduxAction(ReduxToken.NEEDRELOAD_COMMUNITYLIST, {})
      chatData?.ownerUserID == imUserInfo.userID ? toast(t('community.dissolution')) : toast(t('community.exit'))
      setTimeout(() => {
        Navigate.navigate('Tab')
      }, 1500);
    }
    else toast(t('common.error') + ':' + resp?.errMsg)

  }
  const renderView = () => (
    <View>
      <PressableSlop
        onPress={() => Navigate.navigate('CommunityInformation', { chatData, chatData })}
      >
        <IDBitTabBg style={{ height: pxToDp(128), flexDirection: 'row', alignItems: 'center', padding: pxToDp(24), justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: pxToDp(80), height: pxToDp(80), borderRadius: pxToDp(10) }} resizeMode='cover' source={{ uri: chatData?.faceURL }} />
            <Text style={{ color: '#FFFFFF', fontSize: pxToSp(30), marginLeft: pxToDp(12) ,marginRight:pxToDp(12),flex:1}} numberOfLines={2} ellipsizeMode={'middle'}>{chatData?.groupName}</Text>
          </View>
          <Image
            style={{
              width: pxToDp(8),
              height: pxToDp(16),
              marginLeft: pxToDp(4)
            }}
            source={require("@/resources/idbt/community/rightArrow.png")}
          />
        </IDBitTabBg>
      </PressableSlop>
      <IDBitTabBg
        style={{ height: pxToDp(186), marginTop: pxToDp(32) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: pxToDp(14) }}>
          <Text style={{ color: '#FFFFFF', fontSize: pxToSp(28) }}>{t('community.community8')}</Text>
          <PressableSlop
            onPress={() => Navigate.navigate('MemberList', { chatData, chatData })}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#61666E', fontSize: pxToSp(24) }}>{t('community.view')}</Text>
            <Image
              style={{
                width: pxToDp(8),
                height: pxToDp(16),
                marginLeft: pxToDp(4)
              }}
              source={require("@/resources/idbt/community/rightArrow.png")}
            />
          </PressableSlop>
        </View>
        <MemberGridle style={{ width: '100%', flex: 1 }} items={members} paddingHorizontal={pxToDp(14)} paddingWrapper={UIELEMENTS.PADDING_HORIZONTAL} splitCount={5}></MemberGridle>
      </IDBitTabBg>
      {
        chatData.creatorUserID == imUserInfo.userID ?
          <Fragment>
            <IDBitTabBg style={{ height: pxToDp(186), marginTop: pxToDp(32), paddingHorizontal: pxToDp(20) }}>
              <ListCell leftSource={require('@/resources/idbt/community/icon_guangchangSel.png')} style={{ width: '100%' }} text={t('community.invite')} imageSource={require('@/resources/return_4.png')} onPress={() => setshowInvate(true)}></ListCell>
              <Ripple style={{ flexDirection: 'row', height: pxToDp(88), alignItems: 'center', justifyContent: 'space-between' }} pointerEvents={'box-none'} >
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ width: pxToDp(40), height: pxToDp(40) }} source={require('@/resources/idbt/community/openIdo.png')}></Image>
                  <Text style={{ fontSize: pxToDp(28), color: '#fff', width: 230 }} numberOfLines={1}>IDO</Text>
                </View>
                <Switch
                  trackColor={{ false: '#767577', true: '#fff' }}
                  thumbColor={isEnabled ? UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(isEnabled) => setisEnabled(isEnabled)}
                  value={isEnabled}
                />
              </Ripple>
            </IDBitTabBg>
            <IDBitTabBg style={{ height: pxToDp(186), marginTop: pxToDp(32), paddingHorizontal: pxToDp(20) }}>
              <ListCell leftSource={require('@/resources/idbt/community/addSub.png')} style={{ width: '100%' }} text={t('community.create1')} imageSource={require('@/resources/return_4.png')} onPress={() => Navigate.navigate('CreateSubChannel', { chatData: chatData })}></ListCell>
              <ListCell leftSource={require('@/resources/idbt/community/createIdo.png')} style={{ width: '100%' }} text={t('community.create2')} imageSource={require('@/resources/return_4.png')} onPress={() => Navigate.navigate('CreateIDO2', { chatData: chatData })}></ListCell>
            </IDBitTabBg>
          </Fragment>
          : null
      }
    </View>
  )
  const pressShare = () => {
    if (WeChat.isWXAppInstalled() == true) {
      Alert.alert(JSON.stringify(WeChat.isWXAppInstalled()))
    }
    else {
      toast('请先安装微信！')
    }
  }
  const deleteCommunity = async () => {
    setshowAlert(false)
    setisShow(true)
    const resp = await CommunityService.dismissGroupApi(chatData?.groupID,)
    setisShow(false)
    log(resp, 'aaaaaa')
    if (resp.errCode === 0) {
      toast(t('community.dissolution'))
      setTimeout(() => {
        Navigate.navigate('Tab')
        setTimeout(() => {
          sendReduxAction(ReduxToken.NEEDRELOAD_COMMUNITYLIST, {})
        }, 500);
      }, 500);
    } else {
      toast(resp.errMsg)
    }
  }
  return (
    <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
      <CommunityAlert alertStyle={AlertStyle.DELETE_NORMAL_STYLE} isVisible={showAlert} onCanclePress={() => setshowAlert(false)} onSurePress={deleteCommunity}></CommunityAlert>
      <CommunityAlert alertStyle={AlertStyle.LOGINOUT_STYLE} isVisible={showQuit} onCanclePress={() => setshowQuit(false)} onSurePress={quitCommunity}></CommunityAlert>
      <Modal isVisible={showPop} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
        statusBarTranslucent={false}
      >
        <CommunityPop onPressShare={pressShare} cancle_press={() => setshowPop(false)} communityPopStyle={CommunityPopStyle.SHARE_STYLE} />
      </Modal>
      {members ? renderView() : null}
      <Loading
        text=""
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
      ></Loading>
      {chatData?.isJoinEd ?
        chatData?.ownerUserID == imUserInfo.userID ?
          <IDBitBtn onPress={() => setshowAlert(true)} text={t('community.delete1')} containerStyle={{ position: 'absolute', bottom: pxToDp(60) + useSafeAreaInsets().bottom }}></IDBitBtn>
          :
          <IDBitBtn onPress={() => setshowQuit(true)} text={t('community.withdraw1')} containerStyle={{ position: 'absolute', bottom: pxToDp(60) + useSafeAreaInsets().bottom }}></IDBitBtn>
        : null}

      <Modal isVisible={showInvate} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
      >
        <CommunityPop onPressShare={pressShare} cancle_press={() => setshowInvate(false)} communityPopStyle={CommunityPopStyle.SHARE_STYLE} />
      </Modal>

      <Loading
        text=""
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
      ></Loading>
      {/* <IDBitBtn onPress={() => setshowPop(true)} text={'POP弹框'} containerStyle={{ position: 'absolute', bottom: pxToDp(60) + useSafeAreaInsets().bottom }}></IDBitBtn> */}
      {/* <IDBitBtn onPress={() => Navigate.navigate('CreateIDO')} text={'创建IDO'} containerStyle={{ position: 'absolute', bottom: pxToDp(60) + useSafeAreaInsets().bottom }}></IDBitBtn> */}
    </View>
  );
};
export default CommunitySettings;


