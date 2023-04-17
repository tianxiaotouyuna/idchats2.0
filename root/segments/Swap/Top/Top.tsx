import React, { FunctionComponent } from "react";
import { View, Image, Text, StyleProp, ViewStyle, Clipboard } from "react-native";
import styles from "./styles";
import { pxToDp, toast } from "@/utils/system";
import Ripple from "react-native-material-ripple";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import useRedux from "@/hooks/useRedux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import NtfButton from "@/components/NtfButton/NtfButton";
import { COLORS } from "@/utils/Miscellaneous";
type OutPorps = {
    style?: StyleProp<ViewStyle>
    data?: any
}
const Top: FunctionComponent<OutPorps> = (props) => {
    const { style, data } = props;
    const { wallet } = useRedux()

    const copyAdress = async (value: string) => {
        Clipboard.setString(value);
        let str = await Clipboard.getString();
        toast('复制成功')
        console.log('复制的内容', str)
    }
    return (
        <View
            style={[styles.container, { paddingTop: pxToDp(40) + useSafeAreaInsets().top }, style]} 
        >
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between" ,alignItems:"center"}}>
                <Text style={{ fontSize: pxToDp(48), color: '#fff',fontWeight:'bold' }}> 交换</Text>
                <IDBITSearch searchStyle={SearchStyle.SWAP_STYLE} ></IDBITSearch>
            </View>
        </View>
    );
};
export default Top;


