import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import GDataList from "@/components/GDataList";
import { HomeService, UserService } from "@/services/index";
import FollowerCard from "@/components/FollowerCard/FollowerCard";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import MultipleInpput from "@/components/MultipleInpput/MultipleInpput";
import { useNavigation } from "@react-navigation/native";
import Ripple from "react-native-material-ripple";
import Loading from "@/components/LoadingSnipper/Loading";
import useRedux from "@/hooks/useRedux";
import { t } from "i18next";

const SetIntroduction: FunctionComponent = (props) => {
    const [isShow, setisShow] = useState(false);
    const [saving, setSaving] = useState(false);
    const [introduce, setintroduce] = useState('');
    const{sendReduxAction}=useRedux()
    useEffect(() => {
        // Check if saving to avoid calling submit on screen unmounting
        if (saving) {
            submit()
        }
    }, [saving]);

    const submit = async () => {
        setisShow(true)
        // sendReduxAction(ReduxToken.CHANGE_LANGUAGE, { laungueCode: thisLaungeId })
        await UserService.updateProduce(introduce)
        sendReduxAction(ReduxToken.NEEDRELOAD_INTRODUCE,{})
        setSaving(false)
        setTimeout(() => {
            setisShow(false)/*  */
            toast(t('common.changeSucess'))
        }, 500);

    }

    useInitScreen({
        navigationOptions: {
            headerTitle: t('my.editProduce'),
            headerTransparent: true,
            headerShown: true,
            headerTintColor: "white",
        },
        statusBar: {
            backgroundColor: "transparent",
            barStyle: "light-content",
        },
    });
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ripple
                    onPress={() => setSaving(true)}
                    style={{ backgroundColor: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR, paddingVertical: pxToDp(6), paddingHorizontal: pxToDp(14), marginRight: pxToDp(20), borderRadius: pxToDp(12) }}
                >
                    <Text style={{ marginHorizontal: pxToDp(20), fontSize: pxToDp(28), color: '#000', fontWeight: '400' }}>{t('common.save')}</Text>
                </Ripple>
            ),
        });
    }, [navigation]);
    return (

        <View
            style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]} >
            <MultipleInpput placeHolder={t('my.pleaseContent')} length={60} onChangeText={(text: string) => setintroduce(text)}></MultipleInpput>
            <Loading text={''} isShow={isShow} onTimeOut={() => setisShow(false)}></Loading>
        </View>
    );
};
export default SetIntroduction;


