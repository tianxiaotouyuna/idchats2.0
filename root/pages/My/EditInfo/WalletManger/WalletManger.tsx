import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import Loading from "@/components/LoadingSnipper/Loading";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import { useHeaderHeight } from "@react-navigation/stack";
import WalletManagerPop, { CardStyle } from "@/components/WalletManagerPop/WalletManagerPop";
import { Navigate } from "@/utils/index";
import Modal from "react-native-modal";
import WalletPop, { WalletPopStyle } from "@/components/WalletPop/WalletPop";
import { ethers } from "ethers";

const WalletManger: FunctionComponent = (props) => {
    const { t, i18n } = useTranslation();
    const [showSniper, setShowSniper] = useState(false);
    const headerHeight = useHeaderHeight();
    const { imUserInfo, sendReduxAction } = useRedux();
    const [showWalletPop, setshowWalletPop] = useState(false);
    const [showActionPop_popManager, setshowActionPop_popManager] = useState(false);
    const [currentPushChainId, setcurrentPushChainId] = useState(1);
    useInitScreen({
        navigationOptions: {
            headerTitle: t('my.wallets'),
            headerTransparent: true,
            headerShown: true,
            headerTintColor: 'white'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    return (
        <View style={[styles.container_clear, { paddingTop: headerHeight, paddingHorizontal: 0 }]}>
            <WalletManagerPop data={{}}
                containerStyle={{ flex: 1 }} cardStyle={CardStyle.PAGE_STYLE}
                onAddPress={(chainId: number) => {
                    setshowWalletPop(false)
                    setcurrentPushChainId(chainId)
                    setTimeout(() => {
                        setshowActionPop_popManager(true)
                    }, 500);
                }} selectWalletPress={() => {
                    setshowWalletPop(false)
                    setTimeout(() => {
                        sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
                    }, 500);
                }} canclePress={() => setshowWalletPop(false)} surePress={() => {
                    setshowWalletPop(false)
                    // Navigate.navigate("CreactCWallet", {})
                    Navigate.navigate("CreateWallet", { pushChainId: currentPushChainId })
                }} ></WalletManagerPop>

            <Loading isShow={showSniper} onTimeOut={() => setShowSniper(false)} text={'清理中...'}></Loading>
        </View>
    );
};
export default WalletManger;


