import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, View } from "react-native";

import { pxToDp, pxToSp, windowWidth } from "@/utils/system";
import Top from "@/segments/My/New/Top/Top";
import Center from "@/segments/My/Center/Center";
import styles from "@/styles/pages/my/styles";
import { Image } from "react-native-animatable";
import Bottom from "@/segments/My/New/Bottom/Bottom"
import Modal from "react-native-modal";
import WalletManagerPop from "@/components/WalletManagerPop/WalletManagerPop";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { Navigate } from "@/utils/index";
import WalletPop, { WalletPopStyle } from "@/components/WalletPop/WalletPop";
import { ethers } from "ethers";
import useRedux from "@/hooks/useRedux";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const My: FunctionComponent = (props) => {
  const [showWalletPop, setshowWalletPop] = useState(false);
  const [showActionPop, setshowActionPop] = useState(false);
  const [currentPushChainId, setcurrentPushChainId] = useState(1);
  const{sendReduxAction}=useRedux()
  const renderNav = () => (

    <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between" ,paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL}}>
      <PressableSlop onPress={()=>setshowWalletPop(true)}> 
        <Image
        style={styles.navItem}
        source={require("@/resources/idbt/my/more.png")}
        resizeMode={'stretch'}
      /> 
      </PressableSlop>
      <View style={{ flexDirection: 'row' }}>
      <PressableSlop onPress={()=>setshowActionPop(true)}> 
        <Image
          style={styles.navItem}
          source={require("@/resources/idbt/my/walleta.png")}
          resizeMode={'stretch'}
        />
      </PressableSlop>
      <PressableSlop onPress={()=>Navigate.navigate('EditInfo')}> 
        <Image
          style={[styles.navItem, { marginLeft: pxToDp(24) }]}
          source={require("@/resources/idbt/my/设置.png")}
          resizeMode={'stretch'}
        />
      </PressableSlop>
      </View>
    </View>
  )
  return (
      <View style={[styles.container,{paddingTop:pxToDp(50)+useSafeAreaInsets().top}]}>
      {
        renderNav()
      }
      <Top style={{paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL}}/>
      <Bottom />

      <Modal isVisible={showWalletPop} style={[styles.bottomModal]}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={500}
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        backdropOpacity={0.5}
        backdropColor="black"
        statusBarTranslucent
        deviceHeight={1000}
        useNativeDriver={true}
        coverScreen={true}
      >
        <WalletManagerPop chainId={currentPushChainId} onAddPress={(chainId:number)=>{
          // setshowWalletPop(false) 
            setcurrentPushChainId(chainId)
        }}
        onPressInsert={()=>{
          setshowWalletPop(false)
        }}
        onPressCreate={()=>{
          setshowWalletPop(false)
        }}
        selectWalletPress={()=>{
           setshowWalletPop(false)
           setTimeout(() => {
            sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST,{})
           }, 500);
        }} canclePress={() => setshowWalletPop(false)} surePress={() => {
          setshowWalletPop(false)
            // Navigate.navigate("CreactCWallet", {})
            const entropy = ethers.utils.randomBytes(16);//生成随机字符串
            const mnemonicTemp = ethers.utils.entropyToMnemonic(entropy);//根据字符串生成助记词
                Navigate.navigate("CreateWallet", {mnemonic: mnemonicTemp,pushChainId:currentPushChainId})
              }} ></WalletManagerPop>
      </Modal>

      <Modal isVisible={showActionPop} style={styles.bottomModal} 
      hideModalContentWhileAnimating={true}
      useNativeDriverForBackdrop={true}
      animationOutTiming={1000}
      >
        <WalletPop onPressInsert={()=>{
            setshowActionPop(false)
                Navigate.navigate("InsertWallet", {pushChainId:currentPushChainId})
              }} cancle_press={()=>setshowActionPop(false)} onPressCreate={()=>{
            setshowActionPop(false)

            const entropy = ethers.utils.randomBytes(16);//生成随机字符串
            const mnemonicTemp = ethers.utils.entropyToMnemonic(entropy);//根据字符串生成助记词
            
                Navigate.navigate("CreateWallet", {mnemonic: mnemonicTemp,pushChainId:currentPushChainId})
          }} walletPopStyle={WalletPopStyle.MANAGER_ADD_WALLET} ></WalletPop>
      </Modal>
    </View>
  );
};
export default My;


