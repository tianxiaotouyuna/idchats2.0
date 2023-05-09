import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  Text,
  Image,
  Alert,
} from "react-native";
import styles from "./styles";
import { Navigate, Storage } from "@/utils/index";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp, pxToSp } from "@/utils/system";
import { CacheKeys, UIELEMENTS } from "@/constants/index";
import PressableSlop from "../PressableSlop/PressableSlop";
import Ripple from "react-native-material-ripple";
import { COLORS } from "@/utils/Miscellaneous";
import IDBitSepecter from "../IDBitSepecter/IDBitSepecter";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "i18next";
export enum WalletPopStyle {
  MNEMONICPOP = 1, //助记词提示
  DELETEWALLET = 2,//删除钱包弹框
  INSERT_WALLET = 3,//导入钱包弹框
  PAY_DETAIL = 4,//支付详情弹框
  MANAGER_ADD_WALLET = 5,//支付详情弹框
  DAIBILIST_POP = 6,//支付详情弹框
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  sure_press?: () => void;
  cancle_press?: () => void;
  onPressCreate?: () => void;
  onPressInsert?: () => void;
  selectDaibi?: (text: string) => void;
  data?: any;
  walletPopStyle?: WalletPopStyle
};

const WalletPop: FunctionComponent<PopProps> = (props) => {
  const { data, style, sure_press, cancle_press, walletPopStyle = 1, onPressInsert, selectDaibi,onPressCreate } = props;

  const [wallet, setwallet] = useState();
  const [gasPrice, setgasPrice] = useState();
  const [showInsertTypePop, setshowInsertTypePop] = useState(false);
  useEffect(() => { 
    // const gasPrice_ = gd.public_provider.getGasPrice()
    // setgasPrice(gasPrice_)
    get_storageInfo();
  }, [])

  const get_storageInfo = async () => {
    let info = await Storage.load(CacheKeys.WALLETINFO);
    setwallet(info)
  }



  const renderTipsMnemonic = () => {
    return (

      <View style={[styles.modalContent, style]}>

        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center", width: '100%', marginTop: pxToDp(20) }}>
            <Image
              style={styles.arrow}
              source={require("@/resources/主人1.png")}
            />
            <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginTop: pxToDp(12), alignSelf: "center" }}>温馨提示</Text>
          </View>
        </View>
        <Text style={{ fontSize: pxToDp(28), color: '#333333', marginTop: pxToDp(50), marginBottom: pxToDp(60) }}>
          創建的身份將作為您的帳戶，務必保存助記詞
        </Text>
        <NtfButton width={'100%'} heigh={pxToDp(100)} text="下一步" backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} textColor={'white'} style={{ marginHorizontal: pxToDp(100), }}
          onPress={sure_press}></NtfButton>

      </View>
    )
  }
  const closeInput = () => {
    cancle_press()
  }
  const renderDelete = () => {
    return (

      <View style={[styles.modalContent, style]}>
        <Pressable onPress={closeInput} style={{ position: "absolute", right: pxToDp(20), top: pxToDp(10), width: pxToDp(80), height: pxToDp(80), alignItems: "center", justifyContent: "center" }}>
          <Image
            style={styles.image}
            source={require("@/resources/主人1.png")}
          />
        </Pressable>
        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ alignItems: "center", width: '100%', marginTop: pxToDp(20) }}>
            <Image
              style={styles.arrow}
              source={require("@/resources/主人1.png")}
            />
            <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginTop: pxToDp(12), alignSelf: "center" }}>删除</Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: pxToDp(28), color: '#333333', marginTop: pxToDp(50) }}>
            删除后将删除钱包数据，请务必确保
          </Text>
          <Text style={{ fontSize: pxToDp(28), color: '#333333', marginTop: pxToDp(10), marginBottom: pxToDp(60) }}>
            该钱包已备份助记词
          </Text>
        </View>
        <NtfButton width={'100%'} heigh={pxToDp(100)} text="确认删除" backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} textColor={'white'} style={{ marginHorizontal: pxToDp(100), }}
          onPress={() => {
            sure_press()
          }}></NtfButton>

      </View>
    )
  }
  const renderInsert = () => {
    return (
      <View style={[styles.modalContent, style]}>
        <Pressable onPress={() => {
          sure_press()
          Navigate.navigate('MnemonicInsert')
        }} style={{ height: pxToDp(88), width: '100%', alignItems: "center", justifyContent: "center" }}>
          <Text>助記詞</Text>
        </Pressable>

        <View
          style={{
            backgroundColor: "#F0F0F0",
            marginTop: pxToDp(20),
            height: pxToDp(2),
            width: "100%",
          }}
        />
        <Pressable onPress={() => {
          sure_press()
          Navigate.navigate('KeyInsert')
        }} style={{ height: pxToDp(88), width: '100%', alignItems: "center", justifyContent: "center" }}>
          <Text>私鑰</Text>
        </Pressable>
      </View>
    )
  }
  const renderPayDetail = () => {
    return (

      <View style={[styles.modalContent, { paddingBottom: pxToDp(60) }]}>
        <View style={{ flexDirection: "row", width: '100%', justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>支付详情</Text>
          <PressableSlop onPress={closeInput} style={{ position: "absolute", right: pxToDp(20), alignItems: "center", justifyContent: "center" }}>
            <Image
              style={styles.image}
              source={require("@/resources/closure.png")}
            />
          </PressableSlop>
        </View>
        <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10), marginTop: pxToDp(30) }}>{data?.amount}{data?.daibiName}</Text>
        <View style={{ flexDirection: "row", width: '100%', alignItems: "center", marginTop: pxToDp(50) }}>
          <Text style={{ color: '#333333', fontSize: pxToDp(28) }}>支付信息</Text>
          <Text style={{ position: "absolute", left: pxToDp(200), color: '#333333', fontSize: pxToDp(28), right: pxToDp(40) }} numberOfLines={2}>{data?.type}</Text>
        </View>
        <View style={{ flexDirection: "row", width: '100%', alignItems: "flex-start", marginTop: pxToDp(30) }}>
          <Text style={{ color: '#333333', fontSize: pxToDp(28) }}>轉入地址</Text>
          <Text style={{ position: "absolute", left: pxToDp(200), color: '#333333', fontSize: pxToDp(28), right: pxToDp(40) }} numberOfLines={2}>{data?.toAddress}</Text>
        </View>

        <View style={{ flexDirection: "row", width: '100%', alignItems: "flex-start", marginTop: pxToDp(30) }}>
          <Text style={{ color: '#333333', fontSize: pxToDp(28) }}>付款地址</Text>
          <Text style={{ position: "absolute", left: pxToDp(200), color: '#333333', fontSize: pxToDp(28), right: pxToDp(40) }} numberOfLines={2}>{data?.address}</Text>
        </View>


        <View style={{ flexDirection: "row", width: '100%', alignItems: "flex-start", marginTop: pxToDp(30) }}>
          <Text style={{ color: '#333333', fontSize: pxToDp(28) }}>礦工費</Text>
          <Text style={{ position: "absolute", left: pxToDp(200), color: '#333333', fontSize: pxToDp(28), right: pxToDp(40) }} numberOfLines={2}>{0.03}</Text>
        </View>

        <NtfButton
          width={'100%'}
          heigh={pxToDp(100)}
          onPress={sure_press}
          text={"下一步"}
          borderRadius={pxToDp(12)}
          textColor={'white'}
          backgroundColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
          style={{ marginTop: pxToDp(44) }}
        />
      </View>
    )
  }

  const render_addWallet = () => {
    return (
      <View style={[{  backgroundColor: COLORS.clear }]}>
        <Ripple onPress={
          onPressCreate
        } style={{ flexDirection: "row", justifyContent: 'center', width: '100%', height: pxToDp(98), alignItems: 'center', backgroundColor: UIELEMENTS.DEFAULT_Tab_COLOR }}>
          <Text style={{ fontSize: pxToDp(30), color: '#fff', fontWeight: "bold" }}>{t('guidePage.create1')}</Text>
        </Ripple>
        <IDBitSepecter></IDBitSepecter>
        <Ripple onPress={onPressInsert} style={{ flexDirection: "row", width: '100%', height: pxToDp(98),justifyContent: 'center', alignItems: "center",  backgroundColor: UIELEMENTS.DEFAULT_Tab_COLOR }}>
          <Text style={{ fontSize: pxToDp(30), color: '#fff', fontWeight: "bold" }}>{t('guidePage.import')}</Text>
        </Ripple>

        <Ripple onPress={cancle_press}  style={{ flexDirection: "row", marginTop: pxToDp(10), width: '100%', height: pxToDp(98)+useSafeAreaInsets().bottom, backgroundColor: UIELEMENTS.DEFAULT_Tab_COLOR }}>
        <View style={{width: '100%', height: pxToDp(98),justifyContent: 'center', alignItems: "center", }}>
        <Text style={{ fontSize: pxToDp(30), color: '#fff', fontWeight: "bold" }}>{t('common.cancle')}</Text>

        </View>
        </Ripple>
      </View>
    )
  }
  const renderItem = (item: any, index: number) => (
    <Ripple onPress={() => {
      selectDaibi(item)
    }} style={{ height: pxToDp(88), width: '100%', alignItems: "center", justifyContent: "center" }} key={item?.coinName+ index}>
      <Text>{item?.coinName}</Text>
    </Ripple>

  )
  const renderDaibiList = () => {
    return (
      <View style={[styles.modalContent, style]}>
        {data?.map((item: any, index: number) => (
          renderItem(item, index)
        ))}

      </View>
    )
  }
  return (
    walletPopStyle == WalletPopStyle.MNEMONICPOP ? renderTipsMnemonic() : (walletPopStyle == WalletPopStyle.DELETEWALLET ? renderDelete() : (walletPopStyle == WalletPopStyle.INSERT_WALLET ? renderInsert() : (
      walletPopStyle == WalletPopStyle.PAY_DETAIL ? renderPayDetail() : (walletPopStyle == WalletPopStyle.MANAGER_ADD_WALLET ? render_addWallet() : renderDaibiList())
    )))
  );
};

export default WalletPop;
