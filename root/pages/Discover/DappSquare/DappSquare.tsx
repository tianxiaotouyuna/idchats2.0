import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import Top from "@/segments/Discover/Dappsquare/Top/Top";
import GDataList from "@/components/GDataList";
import { DiscoverService } from "@/services/index";
import DappCared from "@/components/DappCared/DappCared";
import { UIELEMENTS } from "@/constants/index";

const DappSquare: FunctionComponent = (props) => {
    const gRef = useRef<GDataList>();
    const [bannerData, setbannerData] = useState([]);
    useInitScreen({
        navigationOptions: {
            title: '账单'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const renderItem = ({ item, index }: any) => {
        return <DappCared data={item} />;
    };
    useEffect(() => {
        getBannerData()
    
    }, [])
    
    const getBannerData=async ()=>{
       const resp=await DiscoverService.getBannerData()
       setbannerData(resp)
    }
    return (
        <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: 0 }]}>
            <Top bannerData={bannerData} changeChain={() => {gRef?.current?.refreshData()}}></Top>
            <GDataList
            style={{marginHorizontal:-UIELEMENTS.PADDING_HORIZONTAL}}
                refreshControlColor={"#fff"}
                requestMethod={DiscoverService.getDappsList}
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
export default DappSquare;


