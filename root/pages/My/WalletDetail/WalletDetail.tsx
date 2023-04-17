import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import {
  View,
  Pressable,
  Alert,
  NavigatorIOS,
  Text,
  Clipboard,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "react-native-animatable";
import styles from "@/styles/pages/my/wallet_detail/styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { CommonService, IMService, UserService } from "@/services/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import Loading from "@/components/LoadingSnipper/Loading";
import { useHeaderHeight } from "@react-navigation/stack";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { useTranslation } from "react-i18next";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import WalletInput, { CardStyle } from "@/components/WalletInput/WalletInput";
import Modal from "react-native-modal";
import useRedux from "@/hooks/useRedux";
import storage from "@/utils/pstorage";
import { Navigate, Storage } from "@/utils/index";
import Ripple from "react-native-material-ripple";
import HeaderListPop from "@/components/HeaderListPop/HeaderListPop";
import FastImage from "react-native-fast-image";
import IMServiceManager from "@/utils/IMServiceManager";
import { setProvider } from "@/utils/pglobal";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { useKeyboardAvoiding } from "@/hooks/useIdKeyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const WalletDetail: FunctionComponent = () => {
  const data: any = useRoute().params?.data ?? {};
  const [isShow, setisShow] = useState(false);
  const [isShowDelete, setisShowDelete] = useState(false);
  const [showPwd, setshowPwd] = useState(false);
  const [showExportPwd, setshowExportPwd] = useState(false);
  const [thisExportType, setthisExportType] = useState(0);//0:私钥 1:keystore 2:助记词
  const [headerShow, setheaderShow] = useState(false);
  const headerHeight = useHeaderHeight();
  const { t } = useTranslation();
  const { walletPwd, imUserInfo, sendReduxAction, chainId, needReloadIntroduce } = useRedux();
  const reduxParams = useRedux();
  const navigation = useNavigation();
  const [thisWallet, setthisWallet] = useState({});
  const [dataFinish, setdataFinish] = useState(false);
  const [canShow, setcanShow] = useState(true);
  const { animatedStyle } = useKeyboardAvoiding();
  const [thisUserInfo, setthisUserInfo] = useState({
    userID: "",
    address: "",
    faceURL: "",
  });
  useInitScreen({
    navigationOptions: {
      headerTitle: t("my.walletDetails"),
      headerTransparent: true,
      headerShown: true,
      headerTintColor: "white",
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });
  const getThisWallet = async () => {
    let wallet;
    if (data.address) {
      if (canShow) {
        setisShow(true);
      }
      wallet = await storage.wallet(data.address);
      const userInfo = await UserService.getOtherUserInfo(
        [data.address],
        data?.name
      );
      setthisUserInfo(userInfo);
    } else wallet = await storage.wallet(imUserInfo?.userID);
    console.log("walletwalletwallet:\n" + JSON.stringify(wallet));
    setthisWallet(wallet);
    setisShow(false);
    setdataFinish(true);
    setcanShow(false);
  };

  const showExportPwdAction = (type: number) => {
    setthisExportType(type)
    setshowExportPwd(true)
  }
  useEffect(() => {
    getThisWallet();
    return () => {
      setthisWallet(null);
      setthisUserInfo(null);
      setdataFinish(false);
    };
  }, [imUserInfo, needReloadIntroduce]);
  const goNext = () => {
    setshowPwd(true);
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: 100 + useSafeAreaInsets().bottom,
          paddingTop: headerHeight + UIELEMENTS.PADDING_TOP,
        },
      ]}
    >
      <IDBitTabBg
        style={{
          padding: pxToDp(28),
          backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
          paddingVertical: pxToDp(24),
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Ripple onPress={() => setheaderShow(true)}>
          <View
            style={{
              width: pxToDp(128),
              height: pxToDp(128),
              backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
              borderRadius: pxToDp(12),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dataFinish ? (
              thisUserInfo?.faceURL ? (
                <FastImage
                  style={{
                    width: pxToDp(128),
                    height: pxToDp(128),
                    backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
                    borderRadius: pxToDp(12),
                  }}
                  source={{
                    uri: data?.address
                      ? thisUserInfo?.faceURL
                      : imUserInfo?.faceURL,
                  }}
                ></FastImage>
              ) : (
                <Image
                  style={{ width: pxToDp(70), height: pxToDp(80) }}
                  source={require("@/resources/idbt/my/add.png")}
                ></Image>
              )
            ) : null}
          </View>
        </Ripple>
        <View
          style={{
            marginLeft: pxToDp(16),
            height: pxToDp(128),
            justifyContent: "space-between",
          }}
        >
          <PressableSlop style={{ flexDirection: "row", alignItems: "center" }} onPress={() => Navigate.navigate('DomainSetting')}>
            <Text style={{ fontSize: pxToSp(32), color: "#fff" }}>
              {t("my.domainNameSetting")}
            </Text>
            <Image
              source={require("@/resources/idbt/my/edit.png")}
              resizeMode={"stretch"}
              style={{
                marginLeft: pxToDp(8),
                width: pxToDp(24),
                height: pxToDp(24),
                backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
                borderRadius: pxToDp(12),
              }}
            />
          </PressableSlop>
          <Text
            style={{ fontSize: pxToSp(24), color: "#fff", width: pxToDp(188) }}
            numberOfLines={1}
            ellipsizeMode={"middle"}
          >
            {data?.address ? thisUserInfo?.userID : imUserInfo?.userID}
          </Text>
          <PressableSlop onPress={() => Navigate.navigate('SetIntroduction')}>
            {
              needReloadIntroduce ? <Text style={{ fontSize: pxToSp(24), color: "#ABABAB" ,width:200}}
              ellipsizeMode={'middle'}
              numberOfLines={1}>
                {thisUserInfo?.introduce ? thisUserInfo.introduce : t("my.edit")}
              </Text> :
                <Text style={{ fontSize: pxToSp(24), color: "#ABABAB" ,width:200 }}
                ellipsizeMode={'middle'}
                numberOfLines={1}>
                  {thisUserInfo?.introduce ? thisUserInfo.introduce : t("my.edit")}
                </Text>
            }
          </PressableSlop>
        </View>
      </IDBitTabBg>
      <ListCell
        style={{ width: "100%", marginTop: pxToDp(24) }}
        text={t("my.exportPrivateKey")}
        imageSource={require("@/resources/return_4.png")}
        onPress={() => showExportPwdAction(0)}
      ></ListCell>
      <ListCell
        style={{ width: "100%" }}
        text={t("my.exportKeystore")}
        imageSource={require("@/resources/return_4.png")}
        onPress={() => showExportPwdAction(1)}
      ></ListCell>
      {thisWallet?.mnemonic ? (
        <ListCell
          style={{ width: "100%" }}
          text={t("my.exportSecretRecoveryPhrase")}
          imageSource={require("@/resources/return_4.png")}
          onPress={() => showExportPwdAction(2)}
        // onPress={() => {
        //   Navigate.navigate("BackUpMnemonic", {
        //     mnemonic: thisWallet?.mnemonic,
        //   });
        // }}
        ></ListCell>
      ) : null}
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
      <Modal
        isVisible={showPwd}
        style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
      >
        <WalletInput
          cardStyle={CardStyle?.GETPWD_STYLE}
          cancle_press={() => {
            setshowPwd(false)
          }}
          getPwd_sure_press={async (pwd: string) => {
            setisShow(true);
            setshowPwd(false);
            if (walletPwd == pwd) {
                  const wallets: any = await storage.wallets();
              if (wallets.length == 1) {
                const res = await storage.del_walllet(imUserInfo?.userID,chainId);
                  setisShow(false);
                  if (res == false) {
                  toast("删除错误",1000);
                  return;
                }
                else {
                  toast("删除成功",1000);
                }

                setTimeout(() => {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1, //the stack index
                      routes: [
                        { name: "FirstPage" }, //to go to initial stack screen
                      ],
                    })
                  );
                }, 2000);
              
                sendReduxAction(ReduxToken.REFRESH_IMUserInfo, {
                  imUserInfo: null,
                });
                IMServiceManager.getInstance().logout();

                setProvider(1)
                let commonData = IMServiceManager.getInstance();
                commonData.setChainId(1);
                sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: 1 })
                await Storage.save(CacheKeys.CHAINID, 1)
                // const wallets2: any = await storage.wallets()
                // await IMService.changeLoginAccount(reduxParams, wallets2[0])
              } else {
                  const res =await storage.del_walllet(thisUserInfo?.userID, chainId);
                  const wallets2: any = await storage.wallets();
                await IMService.changeLoginAccount(reduxParams, wallets2[0]);
                setisShow(false);
                if (res == false) {
                  toast("删除错误",1000);
                  return;
                }
                else {
                  toast("删除成功",1000);
                }

                setTimeout(() => {
                  Navigate.goBack();
                  sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
                }, 2000);
              }
            } else toast(t('my.pwdError'));
          }}
        ></WalletInput>
      </Modal>

      <Modal
        isVisible={showExportPwd}
        style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
      >
        <WalletInput
          cardStyle={CardStyle?.GETPWD_STYLE}
          cancle_press={() => {
            setshowExportPwd(false)
          }}
          getPwd_sure_press={async (pwd: string) => {
            setshowExportPwd(false);
            setisShow(true);
            if (walletPwd == pwd) {
              setisShow(false);
              setTimeout(() => {
                if (thisExportType == 0) Navigate.navigate('ExportSecert')
                else if (thisExportType == 1) Navigate.navigate('ExportKeyStore')
                else if (thisExportType == 2) {
                  Navigate.navigate("BackUpMnemonic", {
                    mnemonic: thisWallet?.mnemonic,
                  });
                }
              }, 1000);

            } else {
              setisShow(false);
              setTimeout(() => {
                toast("密码错误！");
              }, 1000);
            }
          }}
        ></WalletInput>
      </Modal>

      <Loading
        text=""
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
      ></Loading>
      <IDBitBtn
        text={t("my.deleteWallet")}
        containerStyle={{
          position: "absolute",
          bottom: pxToDp(64) + useSafeAreaInsets().bottom,
        }}
        onPress={goNext}
      ></IDBitBtn>
    </View>
  );
};

export default WalletDetail;
