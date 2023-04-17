import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, Modal } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import storage from '@/utils/pstorage'
import Toast from "react-native-root-toast";
import Loading from "@/components/LoadingSnipper/Loading";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import { t } from "i18next";
import { Navigate, System } from "@/utils/index";
import WalletManagerPop from "@/components/WalletManagerPop/WalletManagerPop";
import { useNavigation } from "@react-navigation/native";
const Setup: FunctionComponent = (props) => {
    const { t, i18n } = useTranslation();
    const [showSniper, setShowSniper] = useState(false);
    const headerHeight = useHeaderHeight();
    const { laungueCode } = useRedux();
    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            headerTintColor: 'white'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: i18n.t('my.systemSettings'),
        })
    }, [laungueCode])

    return (
        <View style={[styles.container, { paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
            {/* <ListCell style={{ width: '100%' }} text={i18n.t('SetupPage.Language')} imageSource={require('@/resources/return_4.png')} pushRouteName={imUserInfo?.phoneNumber?'AssociateOldPhone':'AssociateNewPhone'}></ListCell> 
    
    <ListCell style={{ width: '100%' }} text={i18n.t('SetupPage.BindDomain')} imageSource={require('@/resources/return_4.png')} pushRouteName={'DomainSetting'}></ListCell>
    <ListCell style={{ width: '100%'}} text={i18n.t('SetupPage.switchLanguage')} imageSource={require('@/resources/return_4.png')} pushRouteName={'BindSocial'}></ListCell> */}
            <ListCell style={{ width: '100%' }} text={i18n.t('my.language')} imageSource={require('@/resources/return_4.png')} pushRouteName={'SetLanguage'} ></ListCell>
            <ListCell style={{ width: '100%' }} text={i18n.t('my.currencyUnit')} imageSource={require('@/resources/return_4.png')} pushRouteName={'CurrencyUnit'}></ListCell>

            {/* <View style={{ backgroundColor: '#dcdcdc', marginHorizontal: -pxToDp(30), paddingHorizontal: pxToDp(30) }}>
                <ListCell style={{ width: '100%', backgroundColor: '#dcdcdc', height: pxToDp(88) }} text={i18n.t('SetupPage.ChangeUserName')} imageSource={require('@/resources/return_4.png')} pushRouteName={'AssetsContainer'}></ListCell>
            </View>
            <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('SetupPage.BindDomain')} imageSource={require('@/resources/return_4.png')} pushRouteName={'AssetsContainer'}></ListCell>
            <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('SetupPage.switchLanguage')} imageSource={require('@/resources/return_4.png')} pushRouteName={'SetLaungue'}></ListCell>
            <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('SetupPage.checkSdk')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Merchant'}></ListCell>
            <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('SetupPage.BindEamil')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Setup'}></ListCell>
            <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('SetupPage.MerchantService')} imageSource={require('@/resources/return_4.png')} pushRouteName={'Setup'}></ListCell>
            <ListCell style={{ width: '100%', height: pxToDp(88) }} text={i18n.t('SetupPage.Export')} imageSource={require('@/resources/return_4.png')} pushRouteName={'ExportKey'}></ListCell>
            <ListCell style={{ width: '100%', height: pxToDp(88) }} text={'清除钱包'} imageSource={require('@/resources/return_4.png')} onPress={
                async () => {
                    setShowSniper(true)
                    clearWallets()

                    await imIns.logout()
                    sendReduxAction(ReduxToken.REFRESH_WALLET, { wallet: null })
                }
            }></ListCell> */}

            <Loading isShow={showSniper} onTimeOut={() => setShowSniper(false)} text={'清理中...'}></Loading>
        </View>
    );
};
export default Setup;


