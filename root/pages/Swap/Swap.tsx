import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import Top from "@/segments/Swap/Top/Top";

const Swap: FunctionComponent = (props) => {
    useInitScreen({
        navigationOptions: {
            title:'账单'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    return (
        <View style={[styles.container]}>
            <Top/>
        </View>
    );
};
export default Swap;


