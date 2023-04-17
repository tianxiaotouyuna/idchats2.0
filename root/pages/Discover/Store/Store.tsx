import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { t } from "i18next";

const Store: FunctionComponent = (props) => {
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
        <View style={[styles.container, {alignItems:"center", justifyContent:"center",paddingHorizontal: pxToDp(30),paddingTop:0}]}>
            <Text style={{color:'white'}}>{t('common.todo')}</Text>
        </View>
    );
};
export default Store;


