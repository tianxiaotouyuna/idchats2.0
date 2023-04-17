import React, { FunctionComponent } from "react";
import { View, Image, Text, StyleProp, ViewStyle, Clipboard } from "react-native";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import useRedux from "@/hooks/useRedux";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import IDBitSepecter from "@/components/IDBitSepecter/IDBitSepecter";
import { UIELEMENTS } from "@/constants/index";
import { COLORS } from "@/utils/Miscellaneous";
const Top: FunctionComponent = (props) => {
    const insertDomain = () => {

    }
    const bindDomainClick = () => {

    }
    return (
        <View>

            <Text style={{ marginTop: pxToDp(54), color: '#FFFFFF', fontSize: pxToSp(28) }}>社交链接</Text>
            <IDBitBtn imageSource={require('@/resources/idbt/twitter.png')} text="链接推特账号" textStyle={{ color: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR }} containerStyle={{ borderColor: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR, borderWidth: pxToDp(1), backgroundColor: COLORS.clear, marginTop: pxToDp(32), paddingVertical: pxToDp(22), borderRadius: pxToDp(12) }}></IDBitBtn>
            <IDBitBtn imageSource={require('@/resources/idbt/facebook.png')} text="链接Facebook账号" textStyle={{ color: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR }} containerStyle={{ borderColor: UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR, borderWidth: pxToDp(1), backgroundColor: COLORS.clear, marginTop: pxToDp(32), paddingVertical: pxToDp(22), borderRadius: pxToDp(12) }}></IDBitBtn>
            <IDBitSepecter containerStyle={{ marginTop:pxToDp(60) }} />
        </View>
    );
};
export default Top;


