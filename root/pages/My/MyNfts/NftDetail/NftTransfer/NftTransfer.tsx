import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  View,
  Pressable,
  Alert,
  NavigatorIOS,
  Text,
  Clipboard,
  TextInput,
} from "react-native";
import { Image } from "react-native-animatable";
import styles from "@/styles/pages/my/wallet_transfer/styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CommonService, UserService } from "@/services/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CONSTRACTKEYS, ReduxToken, UIELEMENTS } from "@/constants/index";
import useInitScreen from "@/hooks/useInitScreen";
import FastImage from "react-native-fast-image";
import Loading from "@/components/LoadingSnipper/Loading";
import { useHeaderHeight } from "@react-navigation/stack";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import IDBitSepecter from "@/components/IDBitSepecter/IDBitSepecter";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import NFTAlert, { AlertStyle } from "@/components/NFTAlert/NFTAlert";
import { isAddress } from "@/utils/regular";
import Modal from "react-native-modal";
import WalletPop, { WalletPopStyle } from "@/components/WalletPop/WalletPop";
import WalletInput, { CardStyle } from "@/components/WalletInput/WalletInput";
import { useTranslation } from "react-i18next";
import useRedux from "@/hooks/useRedux";
import { getTokenAbi, getTokenContract } from "@/utils/pglobal";
import { Navigate } from "@/utils/index";
import pstorage from "@/utils/pstorage";

const NftTransfer: FunctionComponent = () => {
  const data: any = useRoute().params?.data ?? {}; //0:token 1:NFT
  const [isShow, setisShow] = useState(false);
  const [thisType, setthisType] = useState(0);
  const headerHeight = useHeaderHeight();
  const [showAlert, setshowAlert] = useState(false);
  const [address, setaddress] = useState("");
  const [payCount, setpayCount] = useState("");
  const [showPayDetail, setshowPayDetail] = useState(false);
  const [showPwd, setshowPwd] = useState(false);
  const { sendReduxAction } = useRedux();
  const rightBtnClick = () => { };
  const { t } = useTranslation();
  useEffect(() => {
    setaddress(data?.address);
    return () => {
      setaddress("");
    };
  }, []);

  useInitScreen({
    navigationOptions: {
      headerTitle: t("my.transfer"),
      headerTransparent: true,
      headerShown: true,
      headerTintColor: "white",
      headerRight: () => {
        return data?.type ? (
          <PressableSlop
            onPress={() => {
              rightBtnClick();
            }}
          >
            <Image
              style={{
                width: pxToDp(36),
                height: pxToDp(36),
                marginRight: UIELEMENTS.PADDING_HORIZONTAL,
              }}
              source={require("@/resources/idbt/my/transfer/history.png")}
            />
          </PressableSlop>
        ) : null;
      },
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });
  const goNext = () => {
    if (isAddress(address) == false) {
      toast(t('my.rightAddress'));
      return;
    }
    setshowPwd(true);
  };
  const renderNftView = () => (
    <Fragment>
      <IDBitTabBg style={{ borderRadius: pxToDp(16), paddingHorizontal: pxToDp(24), height: pxToDp(88 * 2 + 5), width: '100%' }}>
        <View style={{ height: pxToDp(88), width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
          <Text style={{ color: '#fff', fontSize: pxToDp(28) }}>{t('my.receiver')}</Text>
          {/* <Image
          style={{ width: pxToDp(34), height: pxToDp(36) }}
          source={require("@/resources/idbt/my/transfer/zhuanzhang.png")} /> */}
        </View>
        <IDBitSepecter></IDBitSepecter>
        <View style={{ height: pxToDp(88), width: '100%', justifyContent: "center" }}>
          <TextInput multiline={false} numberOfLines={1} style={{ height: 40, fontSize: pxToSp(32), color: '#fff', width: '100%' }} value={address} onChangeText={(text: string) => setaddress(text)} placeholderTextColor={'#ABABAB'} placeholder={t('my.enterAddress')}></TextInput>
        </View>
      </IDBitTabBg>
      <IDBitTabBg
        style={{
          padding: pxToDp(28),
          borderRadius: pxToDp(16),
          paddingHorizontal: pxToDp(24),
          marginTop: pxToDp(24),
          width: "100%",
        }}
      >
        <Text style={{ color: "#fff", fontSize: pxToDp(32) }}>{t('my.sendNft')}</Text>
        <View style={{
          marginTop: pxToDp(28),
          flexDirection: "row", alignItems: 'center'
        }}>
          <FastImage
            style={{
              backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
              width: pxToDp(116),
              height: pxToDp(116),
              borderRadius: pxToDp(10),
            }}
            resizeMode="cover"
            source={{ uri: data?.image_url }}
          />
          <Text style={{ marginLeft: pxToDp(30), color: "#fff", fontSize: pxToDp(32) }}>
            {data?.name}
          </Text>
        </View>
      </IDBitTabBg>
      <Modal isVisible={showPwd} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
      >
        <WalletInput onPWdScuess={() => setisShow(true)} cardStyle={CardStyle.ZHUAnYINFT_STYLE} data={data} cancle_press={() => setshowPwd(false)} zhuanyi_sure_press={() => {
          setshowPwd(false)
          setTimeout(() => {
            setisShow(true)
          }, 1000);
        }} onRes={() => {
          setisShow(false)
          setTimeout(() => {
            setshowAlert(true)
          }, 500);

        }} toAddress_zhuanyiNft={address}></WalletInput>
      </Modal>
      <IDBitBtn text={t('common.confirm')} containerStyle={{ position: "absolute", bottom: pxToDp(64) + useSafeAreaInsets().bottom }} onPress={goNext}></IDBitBtn>
    </Fragment>
  );
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
      {renderNftView()}
      <Loading
        text=""
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
      ></Loading>
      <NFTAlert isVisible={showAlert} alertStyle={AlertStyle.TRANSFER_STYLE} onCanclePress={() => {
        setshowAlert(false)
        setTimeout(() => {
          setTimeout(() => {
            sendReduxAction(ReduxToken.NEEDRELOAD_MYNFTLIST, {})

          }, 500);
          setTimeout(() => {
            sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
          }, 500);
        pstorage.update_wallet_balance()

          Navigate.navigate("Tab");
        }, 1000);
      }
      }></NFTAlert>
    </View>
  );
};

export default NftTransfer;
