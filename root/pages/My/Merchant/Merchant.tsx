import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";

import { useDispatch } from "react-redux";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import NormalNavBar from "@/components/NormalNavBar/NormalNavBar";
import useInitScreen from "@/hooks/useInitScreen";
import NtfButton from "@/components/NtfButton/NtfButton";
import { USERINFO } from "@/constants/cache-keys";
import Loading from "@/components/LoadingSnipper/Loading";
import Toast from "react-native-root-toast";
import { Navigate } from "@/utils/index";
import { ReduxToken } from "@/constants/index";
import Center from "segments/My/Center/Center";
import Top from "segments/My/Top/Top";

const Merchant: FunctionComponent = (props) => {
    useInitScreen({
        navigationOptions: {
            title:'商户'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    return (
        <View style={[styles.container, { paddingHorizontal: pxToDp(30),paddingTop:0}]}>
        </View>
    );
};
export default Merchant;


