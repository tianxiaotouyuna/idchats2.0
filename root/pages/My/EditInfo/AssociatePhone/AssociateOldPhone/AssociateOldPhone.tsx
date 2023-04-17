import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import storage from '@/utils/pstorage'
import Toast from "react-native-root-toast";
import Loading from "@/components/LoadingSnipper/Loading";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import FastImage from "react-native-fast-image";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import NtfButton from "@/components/NtfButton/NtfButton";
import { Navigate } from "@/utils/index";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AssociateOldPhone: FunctionComponent = (props) => {
    const { imUserInfo } = useRedux();
    const headerHeight = useHeaderHeight();

    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            title: '关联手机',
            headerTintColor: 'white',
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const clearWallets = async () => {
        try {
            await storage.clear_wallets()
            Toast.show('清理成功', { position: Toast.positions.BOTTOM })

        } catch (error) {
            Toast.show('清理钱包出错', { position: Toast.positions.CENTER })
        }
        setShowSniper(false)
    }
    return (
        <View style={[styles.container_clear, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
            <Text style={{marginTop:pxToDp(54),color:'#FFFFFF',fontSize:pxToSp(28)}}>当前手机号</Text>
            <IDBitTabBg style={{padding:pxToDp(20),borderRadius:pxToDp(12),marginTop:pxToDp(12)}}>
            <Text style={{ fontSize: pxToSp(28), color: '#B8B8B8' }}>{imUserInfo?.phoneNumber}</Text>
            </IDBitTabBg>

            <IDBitBtn text="更换手机号" containerStyle={{bottom:useSafeAreaInsets().bottom+pxToDp(60),height:pxToDp(88),alignSelf:"center",position:'absolute',paddingHorizontal:pxToDp(60)-UIELEMENTS.PADDING_HORIZONTAL}} onPress={()=>Navigate.navigate('VertityCurrentPhone')}></IDBitBtn>
        </View>
    );
};
export default AssociateOldPhone;


