import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { View, Image, Pressable } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useHeaderHeight } from "@react-navigation/stack";
import { t } from "i18next";

import { UIELEMENTS } from "@/constants/index";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Navigate } from "@/utils/index";
import Loading from "@/components/LoadingSnipper/Loading";
const SetCount: FunctionComponent = (props) => {
    const [count, setcount] = useState('0');
    const setBackParams: any = useRoute().params?.setBackParams ?? Function;//0:token 1:NFT
    const [showLoading, setshowLoading] = useState(false);
    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            headerTitle: t('community.authorized'),
            headerTintColor: 'white',
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const saveCount = () => {
        if (count.length == 0) { toast(t('community.please101'));  return; }
        setshowLoading(true);
        setBackParams({count:count});
        setTimeout(() => {
            setshowLoading(false);
            Navigate.goBack();
        }, 300);
    }
    return (
        <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>

            <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                <TextInput keyboardType={'numbers-and-punctuation'} onChangeText={(text: string) => setcount(text)} value={count} style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.please101')}></TextInput>
            </IDBitTabBg>
            <IDBitBtn text={t('common.confirm')} containerStyle={{ position: "absolute", bottom: pxToDp(64) + useSafeAreaInsets().bottom }} onPress={saveCount}></IDBitBtn>
            <Loading
                text=""
                isShow={showLoading}
                onTimeOut={() => setshowLoading(false)}
            ></Loading>
        </View>
    );
};
export default SetCount;


