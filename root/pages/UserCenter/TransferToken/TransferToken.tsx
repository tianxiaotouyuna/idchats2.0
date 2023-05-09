import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

import { pxToDp, pxToSp } from "@/utils/system";
import styles from "@/styles/pages/transfer_nft/styles";
import useInitScreen from "@/hooks/useInitScreen";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { useHeaderHeight } from "@react-navigation/elements";
import { UIELEMENTS } from "@/constants/index";
import { Image } from "react-native-animatable";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import GasGridle from "@/components/GasGridle/GasGridle";
import Modal from "react-native-modal";
import PressableSlop, { TouchType } from "@/components/PressableSlop/PressableSlop";
import IDbitPop, { PopStyle } from "@/components/IDbitPop/IDbitPop";

const TransferToken: FunctionComponent = (props) => {
  const [selectIndex, setselectIndex] = useState(0);
  const [selectTokenInfo, setselectTokenInfo] = useState('');
  const [showDaiBiList, setshowDaiBiList] = useState(false);
  const [tokenInfos, settokenInfos] = useState([{'coinName':'ETH'},
  {'coinName':'BTC'},
  {'coinName':'USDT'},
  {'coinName':'USDC'},]);
  const gasItems = [{ type: '慢', content: '0.000396ETH',price:'≈$0.66', time: 15 },
  { type: '推荐', content: '0.000396ETH',price:'≈$0.66', time: 3 },
  { type: '快', content: '0.000396ETH',price:'≈$0.66', time: 1 },
  { type: '自定义', content: '0.000396ETH',price:'≈$0.66', time: 1 }];
  useEffect(() => {
    setselectTokenInfo(tokenInfos[0])
  }, [])
  
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '转账',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const goNext = () => {

  }
  return (
    <View style={[styles.container, { paddingTop: (useHeaderHeight() + UIELEMENTS.PADDING_TOP) }]}>
      <IDBitTabBg style={{ height: pxToDp(188) }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: pxToDp(88), paddingHorizontal: pxToDp(32) }}>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>收款地址</Text>
          <Image source={require('@/resources/second/icon_dizhiben.png')} style={{ width: pxToDp(48), height: pxToDp(48) }}></Image>
        </View>
        <View style={{ width: '100%', height: pxToDp(112), alignItems: 'center', justifyContent: 'center', borderRadius: pxToDp(32), paddingHorizontal: pxToDp(32) }}>
          <TextInput style={{ height: pxToDp(88), width: '100%', color: '#fff', borderRadius: pxToDp(32) }} placeholder="輸入或長按粘貼钱包地址" placeholderTextColor={'#7082A0'}></TextInput>
        </View>
      </IDBitTabBg>
      <IDBitTabBg style={{ justifyContent: 'space-between', marginTop: pxToDp(24), borderRadius: pxToDp(32), alignItems: 'center', padding: pxToDp(32) }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>转账数量</Text>
          <PressableSlop touchType={TouchType.HIGHLIGHT_STYLE} onPress={()=>{setshowDaiBiList(true)}} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>{selectTokenInfo?.coinName}</Text>
            <Image source={require('@/resources/second/icon_arrow.png')} style={{ width: pxToDp(36), height: pxToDp(36) }}></Image>
          </View>
          </PressableSlop>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: pxToDp(36) }}>
          <TextInput style={{ height: pxToDp(88), color: '#fff', borderRadius: pxToDp(32), fontSize: pxToSp(52), fontWeight: '500' }} placeholder="0.00" placeholderTextColor={'#7082A0'}></TextInput>
          <IDBitBtn text="全部" containerStyle={{ width: pxToDp(124), height: pxToDp(60) }}></IDBitBtn>
        </View>
        <Text style={{ color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR, marginTop: pxToDp(48), alignSelf: 'flex-start' }}>钱包余额：0.02071 ETH</Text>
      </IDBitTabBg>

      <IDBitTabBg style={{ width: '100%', height: pxToDp(408), padding: pxToDp(32),marginTop:pxToDp(24) }}>
          <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>礦工費</Text>
                <View style={{ width: '100%', height: pxToDp(0.5), backgroundColor: '#404B6B' ,marginVertical:pxToDp(26)}}></View>
        <GasGridle selectIndex={selectIndex} style={{ width: '100%',backgroundColor:'red'}} items={gasItems} paddingHorizontal={pxToDp(32)} paddingWrapper={UIELEMENTS.PADDING_HORIZONTAL} splitCount={4}
         onTap={(index:number)=>setselectIndex(index)}></GasGridle>
        <View style={{ flexDirection: 'row', alignItems: 'center',alignSelf:'flex-end' ,paddingTop:pxToDp(32)}}>
            <Text style={{ color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR }}>高级功能</Text>
            <Image source={require('@/resources/second/icon_arrow.png')} style={{ width: pxToDp(36), height: pxToDp(36) }}></Image>
          </View>
      </IDBitTabBg>

      <Modal isVisible={showDaiBiList} style={styles.bottomModal}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={1000}
        >  
        <IDbitPop data={tokenInfos} popStyle={PopStyle.SELECT_TOKEN_STYLE} selectDaibi={async (tokenInfo: any,index:number) => {
          setshowDaiBiList(false)
          setselectTokenInfo(tokenInfo)
          setselectIndex(index)
        }} selectIndex={selectIndex}/>
        {/* <WalletPop data={tokenInfos} selectDaibi={async (tokenInfo: any) => {
          setshowDaiBiList(false)
          setselectTokenInfo(tokenInfo)
        }} cancle_press={() => setshowDaiBiList(false)} walletPopStyle={WalletPopStyle.DAIBILIST_POP} ></WalletPop> */}
      </Modal>

      <IDBitBtn text={'确认'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginTop: pxToDp(180) }} onPress={goNext}></IDBitBtn>
    </View>
  );
};
export default TransferToken;


