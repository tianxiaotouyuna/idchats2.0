import React, { FunctionComponent, useRef, useState } from "react";
import { View, StyleProp, ViewStyle, Text, Image, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "./styles";
import { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { screenHeight } from "@/utils/Dimensions";
import PressableSlop from "../PressableSlop/PressableSlop";
import SideSemegent from "./SideSemegent/SideSemegent";
import IDBitSepecter from "../IDBitSepecter/IDBitSepecter";
import ContentList from "./ContentList/ContentList";
import { useTranslation } from "react-i18next";
import useRedux from "@/hooks/useRedux";
import { IMService, UserService } from "@/services/index";
import Loading from "../LoadingSnipper/Loading";
import { Navigate, Storage } from "@/utils/index";
import { setProvider } from "@/utils/pglobal";
import IMServiceManager from "@/utils/IMServiceManager";
import Modal from "react-native-modal";
import WalletPop, { WalletPopStyle } from "../WalletPop/WalletPop";
import { ethers } from "ethers";
export enum CardStyle {
  POP_STYLE = 0, //退出登录
  PAGE_STYLE = 1, //退出登录
}
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  canclePress?: () => void;
  surePress?: () => void;
  selectWalletPress?: () => void;
  imageSource?: ImageRequireSource;
  text?: string;
  data?: any;
  cardStyle?: CardStyle
  onAddPress?: (index: number) => void;
  onPressInsert?:Function;
  onPressCreate?:Function;
  chainId?:number
};

const WalletManagerPop: FunctionComponent<butonProps> = (props) => {
  const { canclePress, onPress, surePress,chainId=1, onAddPress, data, selectWalletPress, containerStyle, cardStyle = CardStyle.POP_STYLE ,onPressInsert=()=>{},onPressCreate=()=>{}} =
    props;
  const [showActionPop, setshowActionPop] = useState(false);
  const reduxParams = useRedux();
  const { sendReduxAction } = useRedux();
  const { t } = useTranslation()
  const childRef = useRef()
  const isClick = () => {
    onPress && onPress()
  }
  const [isShow, setisShow] = useState(false);
  return (
    <View
      onPress={isClick}
      style={[{ width: '100%', height: screenHeight * 0.68, backgroundColor: '#282E38' }, containerStyle]}
    >
      {cardStyle == CardStyle.POP_STYLE ? <View>
        <View style={{ flexDirection: 'row', paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL, paddingVertical: pxToDp(30), width: '100%', justifyContent: "space-between", alignItems: "center" }}>
          <Image
            style={styles.navItem}
            source={require("@/resources/idbt/my/walletWhite.png")}
            resizeMode={'stretch'}
          />
          <Text style={{ color: '#fff', fontSize: pxToSp(30), justifyContent: "center" }}>{t('my.wallets')}</Text>
          <PressableSlop onPress={canclePress}>
            <Image
              style={styles.navItem}
              source={require("@/resources/idbt/cancle.png")}
              resizeMode={'stretch'}
            />
          </PressableSlop>
        </View>
        <IDBitSepecter containerStyle={{ marginHorizontal: -UIELEMENTS.PADDING_HORIZONTAL, width: '200%' }}></IDBitSepecter>
      </View> : null}
      <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
        <SideSemegent onPress={(index: number) => {
          childRef?.current.reloadList(index)
        }} data={data} containerStyle={{ width: pxToDp(132), backgroundColor: '#181E29' }}></SideSemegent>
        <ContentList cardStyle={cardStyle} onAddPress={(chainId: number) => {
          onAddPress(chainId);
          setshowActionPop(true);
        }} ref={childRef} containerStyle={{ paddingHorizontal: pxToDp(24) }} onPress={async (wallet: any) => {
          if (cardStyle == CardStyle.POP_STYLE) {
            setisShow(true)
            setProvider(wallet?.chainId)
            sendReduxAction(ReduxToken.SELECTWALLET, { selectWallet: wallet })
            await Storage.save(CacheKeys.SELECTWALLET, wallet)
            let commonData = IMServiceManager.getInstance();
            commonData.setChainId(wallet?.chainId);
            // Alert.alert('asd'+wallet?.chainId)
            await IMService.changeLoginAccount(reduxParams, wallet)
            sendReduxAction(ReduxToken.CHANGE_CHAIN, { chainId: wallet?.chainId })
            await Storage.save(CacheKeys.CHAINID, wallet?.chainId)
            setisShow(false)
            setTimeout(() => {
              selectWalletPress()
            }, 500);
          }
          else Navigate.navigate('WalletDetail', { data: { address: wallet?.address, type: 0 } })
        }}></ContentList>
      </View>
      <Loading
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
        text={""}
      ></Loading>

      <Modal isVisible={showActionPop} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
      >
        <WalletPop onPressInsert={() => {
          setshowActionPop(false)
          onPressInsert()
                Navigate.navigate("InsertWallet", {pushChainId:chainId})
              }} cancle_press={() => setshowActionPop(false)} onPressCreate={() => {
          setshowActionPop(false)
          onPressCreate()
          const entropy = ethers.utils.randomBytes(16);//生成随机字符串
          const mnemonicTemp = ethers.utils.entropyToMnemonic(entropy);//根据字符串生成助记词

          Navigate.navigate("CreateWallet", { mnemonic: mnemonicTemp, pushChainId: chainId })
        }} walletPopStyle={WalletPopStyle.MANAGER_ADD_WALLET} ></WalletPop>
      </Modal>
    </View>
  );
};

export default WalletManagerPop;
