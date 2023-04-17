import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { checkPhone, pxToDp, pxToSp, toast } from "@/utils/system";
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
import { TextInput } from "react-native-gesture-handler";
import CountDownButton from 'react-native-smscode-count-down'
import { UserService } from "@/services/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "i18next";
const AssociateNewPhone: FunctionComponent = (props) => {
    const { imUserInfo, sendReduxAction } = useRedux();
    const headerHeight = useHeaderHeight();
    const [phoneNum, setphoneNum] = useState('');
    const [vertity, setvertity] = useState();
    const [isShow, setisShow] = useState(false);
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
    const shouldStartingCounting = () => {

    }
    return (
        <View style={[styles.container_clear, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight }]}>
            <Text style={{ marginTop: pxToDp(54), color: '#FFFFFF', fontSize: pxToSp(28) }}>关联手机号</Text>
            <IDBitTabBg style={{ height: pxToDp(88), paddingHorizontal: pxToDp(20), borderRadius: pxToDp(12), marginTop: pxToDp(12) }}>
                {/* <Text style={{ fontSize: pxToSp(28), color: '#B8B8B8' }}>13066660000</Text> */}
                <TextInput style={{ color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('my.pleaseTelphone')} onChangeText={(text: string) => { setphoneNum(text) }} value={phoneNum}></TextInput>
            </IDBitTabBg>
            <IDBitTabBg style={{ height: pxToDp(88), paddingLeft: pxToDp(20), borderRadius: pxToDp(12), marginTop: pxToDp(12), flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <TextInput value={vertity} onChangeText={(text: any) => { setvertity(text) }} style={{ width: pxToDp(200), color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('my.vercode')}></TextInput>

                <CountDownButton
                    style={{
                        borderTopRightRadius: pxToDp(16),
                        borderBottomRightRadius: pxToDp(16), backgroundColor: UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2, paddingHorizontal: pxToDp(26), paddingVertical: pxToDp(10), height: '100%'
                    }}
                    textStyle={{ color: '#000', fonSize: pxToDp(24) }}
                    timerCount={60}
                    timerTitle={t('my.telError')}
                    enable={true}
                    onClick={async (shouldStartCountting: Function) => {
                        if (checkPhone(phoneNum) == false) {
                            toast(t('my.telError'))
                            return
                        }
                        await UserService.sendSmsApi(phoneNum)
                        //随机模拟发送验证码成功或失败
                        shouldStartCountting(true)
                    }}
                    timerEnd={() => {
                        // this.setState({
                        //     state: '倒计时结束'
                        // })
                    }} />
            </IDBitTabBg>

            <IDBitBtn text={t('my.next')} containerStyle={{ bottom: useSafeAreaInsets().bottom + pxToDp(60), height: pxToDp(88), alignSelf: "center", position: 'absolute', paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }} onPress={async () => {
                if (checkPhone(phoneNum) == false) {
                    toast(t('my.telError'))
                    return
                }
                setisShow(true)
                const resp = await UserService.updateTelephoneInfoApi(vertity, phoneNum)
                    setisShow(false)
                    if (resp.errCode == 0) {
                    let info = imUserInfo;
                    info.phoneNumber = phoneNum;
                    sendReduxAction(ReduxToken.REFRESH_IMUserInfo, { imUserInfo: info })
                    setTimeout(() => {
                    toast(t('my.bindScuess'))
                    setTimeout(() => {
                            Navigate.goBack()
                        }, 1000);
                    }, 500);

                }
                else toast(t('common.error') + JSON.stringify(resp.errMsg))

                // Navigate.navigate('BindTel')
            }}></IDBitBtn>
            <Loading text={''} isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
        </View>
    );
};
export default AssociateNewPhone;


