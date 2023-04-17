import React, {  FunctionComponent, useEffect} from "react";
import { View,  Text,  StyleProp, ViewStyle } from "react-native";
import { pxToDp } from "@/utils/system";
import useRedux from "@/hooks/useRedux";
import UserInfoItem from "@/components/UserInfoItem/UserInfoItem";
import { t } from "i18next";
type OutPorps = {
    style?: StyleProp<ViewStyle>
}
const Top: FunctionComponent<OutPorps> = (props) => {
    useEffect(() => {

    }, [])

    return (
        <View style={{backgroundColor:'white',paddingVertical:pxToDp(30) }}>
            <UserInfoItem style={{ paddingBottom: pxToDp(20),paddingTop:0 }} />

            <View style={{ alignSelf: 'center', alignItems: 'center'}}>
                <Text style={{ color: '#999' }}>账户总余额</Text>
                <Text style={{ paddingVertical: pxToDp(20), fontSize: pxToDp(34), fontWeight: 'bold' }}>$343</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{t('my.send')}</Text>
                    <Text style={{ marginLeft: pxToDp(50) }}>收到</Text>
                </View>
            </View>
        </View>
    );
};
export default Top;


