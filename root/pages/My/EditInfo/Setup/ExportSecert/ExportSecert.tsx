import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, Clipboard } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import { UIELEMENTS } from "@/constants/index";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import IDBitSepecter from "@/components/IDBitSepecter/IDBitSepecter";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Navigate } from "@/utils/index";
import useRedux from "@/hooks/useRedux";
import storage from '@/utils/pstorage'
import { t } from "i18next";

const ExportSecert: FunctionComponent = (props) => {
    const { i18n } = useTranslation();
    const [thisWallet, setthisWallet] = useState({privateKey:''});
const {imUserInfo}=useRedux()
    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            title: '导出密钥',
            headerTintColor: 'white',
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const getThisWallet=async ()=>{

        const wallet=await storage.wallet(imUserInfo?.userID);
        setthisWallet(wallet)
    }
    useEffect(() => {
        getThisWallet()
    }, [imUserInfo])
    
    const copyAdress = async (value: string) => {
      Clipboard.setString(value);
      let str = await Clipboard.getString();
      toast('复制成功')
      console.log('复制的内容', str)
    }
    return (

        <View style={[styles.container, { paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP, alignItems: 'center', justifyContent: 'space-between', paddingBottom: useSafeAreaInsets().bottom + pxToDp(60) }]}>
            <View style={{ width: '100%' ,alignItems:"center"}}>
            <IDBitTabBg style={{ paddingHorizontal: pxToDp(34), paddingVertical: pxToDp(26) ,width:'100%'}}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start',width:'100%' }}>
                    <View style={{ width: pxToDp(40), height: pxToDp(40), alignItems: "center", justifyContent: 'center' }}>
                        <Image
                            style={{ width: pxToDp(32), height: pxToDp(32) }}
                            source={require("@/resources/idbt/my/gandanhao.png")}
                        />
                    </View>
                    <Text style={{ textAlignVertical: 'top', marginLeft: pxToDp(6), color: '#FC5143', fontSize: pxToSp(28), lineHeight: pxToDp(40) }}>{t('my.exportPrivateKey')}</Text>
                </View>
            </IDBitTabBg>
                {/* <View style={{ flexDirection: 'row' ,marginBottom:pxToDp(36),alignItems:'center'}}>
                    <IDBitSepecter containerStyle={{ width: '25%' }}></IDBitSepecter>
                    <Text style={{ fontSize: pxToSp(24), color: '#ABABAB' ,marginHorizontal:pxToDp(16)}}>明文私钥</Text>
                    <IDBitSepecter containerStyle={{ width: '25%' }}></IDBitSepecter>
                </View> */}
                <IDBitTabBg style={{marginTop:pxToDp(60), paddingHorizontal: pxToDp(34), paddingVertical: pxToDp(26), height: pxToDp(226), marginBottom: pxToDp(88) }}>
                    <Text style={{ fontSize: pxToSp(30), color: '#ABABAB' }}>{thisWallet?.privateKey}</Text>
                </IDBitTabBg>
            </View>
                <IDBitBtn text="复制私钥" containerStyle={{ height: pxToDp(88), alignSelf: "center", paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }} onPress={copyAdress}></IDBitBtn>
        </View>
    );
};
export default ExportSecert;


