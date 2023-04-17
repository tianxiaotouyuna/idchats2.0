import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import Top from "@/segments/My/Contour/Top/Top";
import DappCared from "@/components/DappCared/DappCared";
import GDataList from "@/components/GDataList";
import { DiscoverService, MyService } from "@/services/index";

const Contour: FunctionComponent = (props) => {
    const gRef = useRef<GDataList>();
    useInitScreen({
        navigationOptions: {
            title:'账单'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const renderItem = ({ item, index }: any) => {
        return <DappCared data={item} />;
    };
    return (
        <View style={[styles.container]}>
            <Top />
            <GDataList
                refreshControlColor={"#fff"}
                requestMethod={MyService.getNftList}
                defaultPageSize={20}
                renderItem={renderItem}
                ItemSeparatorComponent={() => (
                    <View style={{ backgroundColor: '#rgba(228, 228, 228, .09 )', height: pxToDp(.5), width: '100%', position: 'absolute', bottom: pxToDp(0) }}></View>
                )}
                ref={gRef}
            />
        </View>
    );
};
export default Contour;


