import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import GDataList from "@/components/GDataList";

const AntiSpam: FunctionComponent = (props) => {
    useInitScreen({
        navigationOptions: {
            title:'账单'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const renderItem=()=>(
        <View></View>
    )
    const empty=()=>{

        return (
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: pxToDp(242), height: pxToDp(200) }}
                    source={require("@/resources/idbt/image_17.png")}
                    resizeMode={'stretch'}
                />
                <Text style={{ color: '#ABABAB' ,fontSize:pxToSp(26)}}>功能开发中...</Text>
            </View>
        )
    }
    const getData=()=>{
        return {list:[]};
    }
    return (
        <View style={[styles.container, {alignItems:"center", justifyContent:"center",paddingHorizontal: pxToDp(30),paddingTop:0}]}>

        <GDataList
          refreshControlColor={"#fff"}
          requestMethod={getData}
          defaultPageSize={20}
          renderItem={renderItem}
          ListEmptyComponent={empty}
          ItemSeparatorComponent={() => ( 
            <View style={{ height: pxToDp(20) }}></View>
          )}
        />
        </View>
    );
};
export default AntiSpam;


