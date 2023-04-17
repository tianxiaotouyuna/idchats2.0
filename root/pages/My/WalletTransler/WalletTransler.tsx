import React, { Fragment, FunctionComponent, useEffect, useState, useTransition } from "react";
import { View, Pressable, Alert, NavigatorIOS, Text, Clipboard, TextInput } from "react-native";
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
import { getRateByToken, getTokenAbi, getTokenContract } from "@/utils/pglobal";
import { Navigate } from "@/utils/index";
import Ripple from "react-native-material-ripple";
import storage from "@/utils/storage";
import pstorage from "@/utils/pstorage";


const WalletTransler: FunctionComponent = () => {
  const data: any = useRoute().params?.data ?? {};//0:token 1:NFT
  const [isShow, setisShow] = useState(false);
  const headerHeight = useHeaderHeight();
  const [showAlert, setshowAlert] = useState(false);
  const [address, setaddress] = useState('');
  const [payCount, setpayCount] = useState('');
  const [showPayDetail, setshowPayDetail] = useState(false);
  const [showPwd, setshowPwd] = useState(false);
  const [tokenFee, settokenFee] = useState();
  const { imUserInfo, unitCode, sendReduxAction } = useRedux();
  const [gasPrice, setgasPrice] = useState('');
  const [tokenInfos, settokenInfos] = useState([]);
  const [selectTokenInfo, setselectTokenInfo] = useState({});
  const [showDaiBiList, setshowDaiBiList] = useState(false);
  const [thisPrice, setthisPrice] = useState(0.00);
  const rightBtnClick = () => {
  }
  const { t } = useTranslation()
  useEffect(() => {
    setaddress(data?.address)
    return () => {
      setaddress('')
    }
  }, [])
  useEffect(() => {
    getCoinNames()

  }, [])
  const getCoinNames = async () => {
    const wallet = await pstorage.wallet(imUserInfo?.userID)
    settokenInfos(wallet?.coinInfos)//获取当前钱包token信息列表
    setselectTokenInfo(wallet?.coinInfos[0])//设置默认选择token信息
    getTokenFee_bySelect(wallet?.coinInfos[0])
  }
  const getTokenFee = async (info:any) => {
    const res = await UserService.getTokenFee(imUserInfo?.userID, selectTokenInfo?.coinToken, selectTokenInfo?.coinName, getTokenAbi());

    settokenFee(res);
    const gas = await UserService.getGasFee()
    setgasPrice(gas)
    console.log('getDaibiAmount=========' + JSON.stringify(res))
  }

  const getTokenFee_bySelect = async (info:any) => {
    const res = await UserService.getTokenFee(imUserInfo?.userID, info?.coinToken, info?.coinName, getTokenAbi());

    settokenFee(res);
    const gas = await UserService.getGasFee()
    setgasPrice(gas)
    setisShow(false)
    const rate= await getRateByToken(info?.coinName)
    const price = (gas* rate) || 0.0;
    setthisPrice(price.toFixed(18))
    console.log('getDaibiAmount=========' + JSON.stringify(res))
  }

  useInitScreen({
    navigationOptions: {
      headerTitle: t('my.transfer'),
      headerTransparent: true,
      headerShown: true,
      headerTintColor: 'white',
      headerRight: () => {
        return data?.type ? (
          <PressableSlop
            onPress={() => {
              rightBtnClick();
            }}
          >
            <Image
              style={{ width: pxToDp(36), height: pxToDp(36), marginRight: UIELEMENTS.PADDING_HORIZONTAL }}
              source={require("@/resources/idbt/my/transfer/history.png")} />
          </PressableSlop>
        ) : null
      },
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const goNext = () => {
    if (isAddress(address) == false) {
      toast(t('my.rightAddress'))
      return
    }
    else if (payCount.length == 0) {
      toast(t('my.transferAmount'))
      return;
    }
    setshowPwd(true)
  }

  const renderTokenView = () => (
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

      <IDBitTabBg style={{ borderRadius: pxToDp(16), paddingHorizontal: pxToDp(24), height: pxToDp(88 * 3 + 5), marginTop: pxToDp(24), width: '100%' }}>
        <View style={{ height: pxToDp(88), width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
          <Text style={{ color: '#fff', fontSize: pxToDp(28) }}>{t('my.amount')}</Text>
          <PressableSlop  onPress={() => { setshowDaiBiList(true) }}>
            
          <Ripple style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: pxToDp(28) }}>{selectTokenInfo?.coinName}</Text>
            <Image style={{ width: pxToDp(30), height: pxToDp(30), marginLeft: pxToDp(6) }} source={require('@/resources/idbt/Frame.png')}></Image>
          </Ripple>
          </PressableSlop>
        </View>
        <IDBitSepecter></IDBitSepecter>
        <View style={{ height: pxToDp(88), width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput multiline={false} numberOfLines={1} style={{ height: 40, fontSize: pxToSp(32), color: '#fff', width: '70%' }} value={payCount} onChangeText={(text: string) => setpayCount(text)} placeholderTextColor={'#ABABAB'} placeholder={t('my.enterPayCount')}></TextInput>
          <Ripple style={{ paddingHorizontal: pxToDp(16), paddingVertical: pxToDp(4), borderRadius: pxToDp(100), borderWidth: pxToDp(1), borderColor: '#979797' }}
            rippleContainerBorderRadius={pxToDp(100)}
            onPress={() => setpayCount(tokenFee)}
          >
            <Text style={{ fontSize: pxToSp(24), color: '#ABABAB' }}>{t('my.all')}</Text>
          </Ripple>
        </View>
        <IDBitSepecter></IDBitSepecter>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(88), width: '100%', justifyContent: "space-between" }}>
          <Text style={{ color: '#fff', fontSize: pxToDp(32) }}>{t('my.balance')}</Text>
          <Text style={{ color: '#fff', fontSize: pxToDp(32) }}>{tokenFee} {tokenFee ? selectTokenInfo?.coinName : ''}</Text>
        </View>
      </IDBitTabBg>

      <IDBitTabBg style={{ borderRadius: pxToDp(16), paddingHorizontal: pxToDp(24), height: pxToDp(88 * 3 + 5), marginTop: pxToDp(24), width: '100%',alignItems:'flex-end' }}>
        <View style={{ height: pxToDp(88), width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
          <Text style={{ fontSize: pxToSp(28), color: '#ABABAB' }}>{t('my.minerFee')}</Text>
        </View>
        <IDBitSepecter></IDBitSepecter>
        <View style={{ height: pxToDp(176), width: '100%'}}>
        <View style={{ height: pxToDp(88), width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: "center" }}>
          <Text style={{ color: '#fff', fontSize: pxToDp(28) }}>{t('my.average')}</Text>
          <Text style={{ color: '#fff', fontSize: pxToDp(28) }}>{gasPrice} {gasPrice ? selectTokenInfo?.coinName : ''}</Text>
        </View>
        <View style={{ height: pxToDp(88), width: '100%', alignItems: "center",flexDirection:'row-reverse'}}>
        {thisPrice? <Text style={{ color: '#fff', fontSize: pxToDp(28) }}>≈{unitCode ? '$' : '¥'}{thisPrice}</Text>:null}
        </View>
        </View>
      </IDBitTabBg>
      <Modal isVisible={showPayDetail} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
      >
        <WalletPop data={{ daibiName: 'ETH', amount: parseFloat(payCount), type: 'ETH' + '转账', toAddress: address, address: '0xxx33333', gasPrice: 0.03 }} cancle_press={() => setshowPayDetail(false)} sure_press={() => {
          setshowPayDetail(false)
          setshowPwd(true)
        }} walletPopStyle={WalletPopStyle.PAY_DETAIL} ></WalletPop>
      </Modal>

      <Modal isVisible={showPwd} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
      >
        <WalletInput cardStyle={CardStyle?.ZHUANGZHANG_STYLE} daibi={'ETH'} data={{ address: address, amount: (payCount) }} cancle_press={() => setshowPwd(false)} sure_press={() => {
          setshowPwd(false)
          setTimeout(() => {
            setisShow(true)
          }, 1000);
        }} onRes={() => {
          setisShow(false)
          setTimeout(() => {
            setshowAlert(true)
          sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST,{})
        }, 500);

        }}></WalletInput>
      </Modal>

      <Modal isVisible={showDaiBiList} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
        >  
        <WalletPop data={tokenInfos} selectDaibi={async (tokenInfo: any) => {
          setshowDaiBiList(false)
          setisShow(true)
          setselectTokenInfo(tokenInfo)
          await getTokenFee_bySelect(tokenInfo)
        }} cancle_press={() => setshowDaiBiList(false)} walletPopStyle={WalletPopStyle.DAIBILIST_POP} ></WalletPop>
      </Modal>
      <IDBitBtn text={t('common.confirm')} containerStyle={{ position: "absolute", bottom: pxToDp(64) + useSafeAreaInsets().bottom }} onPress={goNext}></IDBitBtn>
    </Fragment>
  )
  return (
    <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom, paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
      {renderTokenView()}
      <Loading text="" isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
      <NFTAlert isVisible={showAlert} alertStyle={AlertStyle.TRANSFER_STYLE} onCanclePress={() => {
        setshowAlert(false)
        setTimeout(() => {
          Navigate.navigate("Tab");
        }, 1000);
      }
      }></NFTAlert>
    </View>
  );
};

export default WalletTransler;