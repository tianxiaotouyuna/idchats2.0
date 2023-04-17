import React, { FunctionComponent, ReactNode, useEffect, useRef, useState } from "react";
import FastImage from "react-native-fast-image";
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CommunityService } from "@/services/index";
import styles from "./styles";
import { Navigate, Storage } from "@/utils/index";
import PopBtn from "../LoginOutBtn/PopBtn";
import NtfButton from "../NtfButton/NtfButton";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import PwdInput from "../PwdInput/PwdInput";
import useRedux from "@/hooks/useRedux";
import PressableSlop from "../PressableSlop/PressableSlop";
import "@ethersproject/shims"
import { ethers } from "ethers";
import { gd } from "@/utils/pglobal";
import IMServiceManager from "@/utils/IMServiceManager";
import storage from '@/utils/pstorage';
import { UserService } from "@/services/index";
import { CONSTRACTABIKEYS, CONSTRACTKEYS } from "@/constants/index";
import Toast from "react-native-root-toast";
import { t } from "i18next";
import pstorage from "@/utils/pstorage";
// import { useKeyboardAnimation } from 'react-native-keyboard-controller';
export enum CardStyle {
  BUY_STYLE = 1, //购买
  ZHUANGZHANG_STYLE = 2, //转账
  sell_STYLE = 3, //出售
  ZHUAnYINFT_STYLE = 4, //出售
  GETPWD_STYLE = 5, //出售
  XIAJIA_STYLE = 6, //出售
  JIANGJIA_STYLE = 7, //出售
  IDO_TRANSFER_STYLE = 8, //IDO
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  cardStyle?: CardStyle;
  sure_press?: () => void;
  getPwd_sure_press?: (pwd: string) => void;
  cancle_press?: () => void;
  zhuanyi_sure_press?: () => void;
  onRes?: () => void;
  onPWdScuess?: () => void;
  data?: any;
  daibi?: string;
  daibi_price?: string;
  daibi_name?: string;
  daibi_type?: string;
  toAddress_zhuanyiNft?: string;
  thisDownPrice?: string;
  nftDetailXiajia?: boolean
  nftDetailJiangjia?: boolean
};

const WalletInput: FunctionComponent<PopProps> = (props) => {
  const { onPWdScuess, nftDetailJiangjia = false, nftDetailXiajia = false, thisDownPrice = '0', getPwd_sure_press, daibi_price = '', daibi_type, daibi_name, toAddress_zhuanyiNft = '', zhuanyi_sure_press = () => { }, style, cardStyle = CardStyle.BUY_STYLE, sure_press = () => { }, cancle_press = () => { }, data, daibi = 'ETH', onRes = () => { } } = props;
  // const { height, progress } = useKeyboardAnimation();
  const [pwd, setpwd] = useState('');
  const { imUserInfo, chainId } = useRedux()
  const { selectWallet } = useRedux()

  // const [ styleKeyboard, setStyleKeyboard ] = useState(true)
  // useEffect(() => {

  //   Keyboard.addListener("keyboardDidShow", () => {
  //     scrollComponent.current.scrollToEnd();
  //   })

  // })
  const closeInput = () => {
    cancle_press()
  }

  const getPwdClick = () => {
    getPwd_sure_press(pwd)
  }
  const txGo = () => {
      if (pwd.length == 0) {
      return;
    }
    cardStyle == CardStyle.ZHUANGZHANG_STYLE ? zhuanzhang_timing() : (cardStyle == CardStyle.GETPWD_STYLE ? getPwdClick() : transferNft())
  }
  const zhuanzhang_timing = () => {
    sure_press()
    setTimeout(() => {
      zhuanzhang()
    }, 500);
  }

  const transferNft = async () => {
    console.log('asdasd===' + JSON.stringify(data))
    zhuanyi_sure_press()
    await UserService.transferNftContract(data.contract_address, imUserInfo.userID, pwd, toAddress_zhuanyiNft, data?.token_id, CONSTRACTABIKEYS.ERC721ABI, data?.nft_id, onPWdScuess, chainId)
    onRes()
  }
  const zhuanzhang = async () => {

    const prov = gd.public_provider;
    let commonData = IMServiceManager.getInstance();
    const walAddr = commonData._userID;
    console.log('walAddr=====' + JSON.stringify(walAddr))
    let mod_wallet = await storage.wallet(walAddr);
    console.log('data=====' + JSON.stringify(data))
    console.log('mod_wallet=====' + JSON.stringify(mod_wallet))
    let wallet;
    try {
      wallet = await ethers.Wallet.fromEncryptedJson(mod_wallet.keyStore, pwd);
    }
    catch (e) {
      onRes()
      Alert.alert(t('my.pwdError'))
      return;
    }
    let connect_wallet = wallet.connect(prov);

    console.log('prov\n==========' + JSON.stringify(prov))

    if (daibi == 'ETH') {
      try {
        // eth 转账
        console.log('data?.amount\n==========' + JSON.stringify(data?.address))
        const tx = await connect_wallet.sendTransaction({
          to: data?.address,
          value: ethers.utils.parseEther(data?.amount)
        });
        // 等待交易上链
        await tx.wait();
        // 打印交易信息
        console.log(tx);
        onRes()
        pstorage.update_wallet_balance()
        // toast('转账成功')
        // await refreshWallets_zhuangzhang()
        // setTimeout(() => {
        //   Navigate.navigate('Tab')
        // }, 1000);

      }
      catch (e) {
        onRes()
        toast('转账失败')
        console.log('error333:' + JSON.stringify(e));

      }
    }
    else {

      let token = new ethers.Contract(data?.tokenAddress,
        [{ "inputs": [{ "internalType": "string", "name": "name_", "type": "string" }, { "internalType": "string", "name": "symbol_", "type": "string" }, { "internalType": "uint256", "name": "supply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]
        , connect_wallet);
      if (token != null) {
        try {
          console.log('转账:                ' + JSON.stringify(data))
          const gasPrice =await gd.public_provider.getGasPrice()
          let overrides = {
            gasLimit: 1230000,
            gasPrice: gasPrice,
            nonce: (await gd.public_provider.getTransactionCount(wallet.getAddress())),
          }
          Alert.alert(JSON.stringify(wallet))

          let tx = await token.transfer(data?.resevierAddress, ethers.utils.parseEther(data?.inTokenCapacity), overrides)
          try {
            await tx.wait()
            onRes()
            pstorage.update_wallet_balance()
            Toast.show('转账成功', { position: Toast.positions.CENTER })
          }
          catch (e) {
            onRes()
            console.log('3:' + JSON.stringify(e))
            Toast.show('转账失败', { position: Toast.positions.CENTER })
          }
          if(daibi=='ido_transfer')createIdo()
          else await refreshWallets_zhuangzhang()
          setTimeout(() => {
            Navigate.navigate('Tab')
          }, 1000);

        }
        catch (e) {
          console.log(e)
          onRes()
          Toast.show(JSON.stringify(e), { position: Toast.positions.CENTER })
        }
      }
    }            

  }

  const createIdo=async ()=>{

    await CommunityService.createIdo({
      tokenB: "0x7E89c2b18B269864DE7caC7fCbCe64b2BF74b75D",
      tokenA: "0xe21Ec84E66acD04ca1c4037b989210Faf1b7398C",
      startTime: "1680626984",
      endTime: "1681490988",
      inTokenCapacity: "2000",
      inTokenAmount: "0",
      outTokenCapacity: "0",
      outTokenSupply: "2000",
      projectText: "",
      groupID: "2548300071",
      lockNum: "6",
      decimalA: "1000000000000000",
      decimalB: "1",
      maxExchange: "10000000",
      exchange: "2500",
      timeList: [
        "1682095798",
        "1684687798",
        "1687279798",
        "1689871798",
        "1692463798",
        "1695055798",
      ],
      projectType: "1",
    },
    selectWallet,
    {
      logo: "QmRbxpF9q9gHnVjHsM3n1PnA9kb2wQM4j5gWWyA6eKXrFG",
      name: "asd",
      proIntroduction: "aaa",
      tLink: "assssss",
      oLink:"aaaaa",
    },data?.tokenInfo)
  return
  }
  const renderLoginOut = () => {
    return (

      // <Animat
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.screenContainer}
      >
        <View
          style={styles.content}>
          <View style={[styles.modalContent, style]}>
            <View style={{ flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between" }}>

              <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>{t('common.pleasePwd')}</Text>
              <PressableSlop onPress={closeInput}>
                <Image
                  style={styles.image}
                  source={require("@/resources/closure.png")}
                />
              </PressableSlop>
            </View>

            <PwdInput onChangePWdText={(text: string) => { setpwd(text) }} style={{ width: pxToDp(606), height: pxToDp(84), marginTop: pxToDp(44), borderRadius: pxToDp(16), borderWidth: pxToDp(2), borderColor: '#E8E8E8' }}></PwdInput>
            {/* <Text style={{ fontSize: pxToSp(24), color: '#3352DB', alignSelf: "flex-end", marginTop: pxToDp(12) }}>忘记密码</Text> */}

            <View style={{ justifyContent: "center", alignItems: "center", width: '100%', marginTop: pxToDp(40) }}>
              <NtfButton text={t('common.confirm')} width={pxToDp(492)} heigh={pxToDp(84)} textColor='white' borderRadius={pxToDp(12)} backgroundColor='#3352DB' borderColor='#3352DB' onPress={txGo} >
                {" "}
              </NtfButton>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView>


      // </Animated.View>
    )
  }
  const renderLoginOut_android = () => {
    return (

          <View style={[styles.modalContent, style]}>
            <View style={{ flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between" }}>

              <Text style={{ fontSize: pxToSp(32), fontWeight: "bold", marginLeft: pxToDp(10) }}>{t('common.pleasePwd')}</Text>
              <PressableSlop onPress={closeInput}>

                <Image
                  style={styles.image}
                  source={require("@/resources/closure.png")}
                />
              </PressableSlop>
            </View>

            <PwdInput onChangePWdText={(text: string) => { setpwd(text) }} style={{ width: pxToDp(606), height: pxToDp(84), marginTop: pxToDp(44), borderRadius: pxToDp(16), borderWidth: pxToDp(2), borderColor: '#E8E8E8' }}></PwdInput>
            {/* <Text style={{ fontSize: pxToSp(24), color: '#3352DB', alignSelf: "flex-end", marginTop: pxToDp(12) }}>忘记密码</Text> */}

            <View style={{ justifyContent: "center", alignItems: "center", width: '100%', marginTop: pxToDp(40) }}>
              <NtfButton text={t('common.confirm')} width={pxToDp(492)} heigh={pxToDp(84)} textColor='white' borderRadius={pxToDp(12)} backgroundColor='#3352DB' borderColor='#3352DB' onPress={txGo} >
                {" "}
              </NtfButton>
            </View>

          </View>


    )
  }
  return (
    Platform.OS == "ios" ?  renderLoginOut():renderLoginOut()
  );
};

export default WalletInput;
