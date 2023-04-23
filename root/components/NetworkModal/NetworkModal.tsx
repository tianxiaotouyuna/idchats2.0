import React, { FunctionComponent, ReactNode, useEffect, useState } from "react";
import {
    View,
    StyleProp,
    ViewStyle,
    Text,
    Image,
    TouchableHighlight,
} from "react-native";
import styles from "./styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { UserService } from "@/services/index";
import NetworkCard from "./NetworkCard";
export enum NetworkStyle {
    DAIBILIST_POP = 6,//支付详情弹框
}
type PopProps = {
    style?: StyleProp<ViewStyle>;
    onPress?: (index:number) => void;
    onCanclePress?: () => void;
    selectIndex: number
};

const NetworkModal: FunctionComponent<PopProps> = (props) => {
    const { style, onPress ,onCanclePress,selectIndex} = props;
    const [worknets, setworknets] = useState([]);
    const getNetworks = async () => {
        const works = await UserService.getNetworks();
        setworknets(works)
    }
    useEffect(() => {
        getNetworks()
    }, [])

    const render = () => {
        return (
            <View style={[styles.modalContent, style]}>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%', paddingHorizontal: pxToDp(12) }}>
                    <Text style={{ color: '#F1F4F8', fontWeight: '500', fontSize: pxToSp(30), paddingVertical: pxToDp(40) }}>切换网络</Text>
                    <TouchableHighlight onPress={ onCanclePress}>
                        <Image source={require("@/resources/idbt/cancle.png")} style={{ width: pxToDp(32), height: pxToDp(32) }} ></Image>
                    </TouchableHighlight>
                </View>
                {
                    worknets?.map((item, index) => {
                        return <NetworkCard data={item} style={{ marginBottom: pxToDp(24) }} onPress={(index:number)=>onPress(index)} index={index} selectIndex={selectIndex}></NetworkCard>
                    })
                }
            </View>
        )
    }

    return (
        render()
    );
};

export default NetworkModal;
