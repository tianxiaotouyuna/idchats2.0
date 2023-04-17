import React, { FunctionComponent, useEffect, useRef, useState, useTransition } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import GDataList from "@/components/GDataList";
import { CommonService, DiscoverService, MyService, UserService } from "@/services/index";
import { UIELEMENTS } from "@/constants/index";
import DappCared from "@/components/DappCared/DappCared";
import { useTranslation } from "react-i18next";
import TokenCard from "@/components/TokenCard/TokenCard";
import useRedux from "@/hooks/useRedux";
import pstorage from "@/utils/pstorage";

const Bill: FunctionComponent = (props) => {
const {t}=useTranslation()
  const gRef = useRef<GDataList>(null);
  const{imUserInfo,needReloadAssetsList}=useRedux();
    const renderItem = ({ item, index }: any) => {
        return <TokenCard data={item} />;
    };
    
    useEffect(() => {
        gRef?.current.refreshData()

    }, [imUserInfo?.userID,needReloadAssetsList])
    const _emptyView = () => {
        return (
                <View style={{ alignItems: "center" }}>
                    <Image
                        style={{ width: pxToDp(238), height: pxToDp(200) }}
                        source={require("@/resources/idbt/my/noData_my.png")}
                        resizeMode={'stretch'}
                    />
                    <Text style={{ color: '#ABABAB' ,fontSize:pxToSp(26),marginTop:pxToDp(10)}}>{t('common.nodata')}</Text>
                </View>
            )
        }
    return (
        <View style={[styles.container, {paddingTop: 0}]}>
         {
           
          <GDataList
          ref={gRef}
                refreshControlColor={"#fff"}
                requestMethod={UserService.getTokenList}
                requestParams={{ path: '', params: { imUserInfo: imUserInfo } }}
                defaultPageSize={20}
                renderItem={renderItem}
                ListEmptyComponent={_emptyView}
                ItemSeparatorComponent={() => (
                    <View style={{ backgroundColor: '#rgba(228, 228, 228, .09 )', height: pxToDp(.5), width: '100%', position: 'absolute', bottom: pxToDp(0) }}></View>
                )}
            />
        } 
        </View>
    );
};
export default Bill;


