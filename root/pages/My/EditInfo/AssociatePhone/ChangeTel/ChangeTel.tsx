import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

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

const ChangeTel: FunctionComponent = (props) => {
    const { i18n } = useTranslation();
    const [showSniper, setShowSniper] = useState(false);
    const { imIns, sendReduxAction } = useRedux();
    const headerHeight = useHeaderHeight();
   
    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            title: '编辑资料',
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
        <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight+UIELEMENTS.PADDING_TOP }]}>
            <ListCell style={{ width: '100%' }} text={i18n.t('SetupPage.ChangeUserName')} imageSource={require('@/resources/return_4.png')} pushRouteName={'AssociateOldPhone'}></ListCell>
            <ListCell style={{ width: '100%' }} text={i18n.t('SetupPage.BindDomain')} imageSource={require('@/resources/return_4.png')} pushRouteName={'AssetsContainer'}></ListCell>
            <ListCell style={{ width: '100%'}} text={i18n.t('SetupPage.switchLanguage')} imageSource={require('@/resources/return_4.png')} pushRouteName={'SetLaungue'}></ListCell>
        </View>
    );
};
export default ChangeTel;


