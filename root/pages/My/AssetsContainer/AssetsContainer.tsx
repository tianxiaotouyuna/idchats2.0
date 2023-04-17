import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import Top from "@/segments/MyAssets/Top/Top";
import Center from "@/segments/MyAssets/Center/Center";
const AssetsContainer: FunctionComponent = (props) => {
    useInitScreen({
        navigationOptions: {
            title: '我的资产'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    return (
        <View style={[styles.container, { paddingHorizontal: 0, paddingTop: 0 }]}>
            <Top style={{ marginTop: pxToDp(30) }}></Top>
            <Center style={{ marginTop: pxToDp(30) }}></Center>
        </View>
    );
};
export default AssetsContainer;


