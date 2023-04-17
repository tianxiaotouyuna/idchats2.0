import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import GDataList, { WHERELIST } from "@/components/GDataList";
import { DiscoverService, MyService, StorageService, UserService } from "@/services/index";
import { UIELEMENTS } from "@/constants/index";
import DappCared from "@/components/DappCared/DappCared";
import { useTranslation } from "react-i18next";
import useRedux from "@/hooks/useRedux";
import NFTCard from "@/components/NFTCard/NFTCard";
import { useRoute } from "@react-navigation/native";

const MyNfts: FunctionComponent = (props) => {
    const { t } = useTranslation()
    const { imUserInfo,chainId,needReloadMyNftList } = useRedux()
    const cardType = useRoute().params?.cardType ?? {};
    const gRef = useRef(GDataList)
    const renderItem = ({ item, index }: any) => {
        return <NFTCard data={item} cardStyle={cardType}/>;
    };
    useEffect(() => {
        gRef?.current.refreshData()

    }, [imUserInfo?.userID,chainId,needReloadMyNftList])

    const _emptyView = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: pxToDp(238), height: pxToDp(200) }}
                    source={require("@/resources/idbt/my/noData_my.png")}
                    resizeMode={'stretch'}
                />
                <Text style={{ color: '#ABABAB', fontSize: pxToSp(26), marginTop: pxToDp(10) }}>{t('common.nodata')}</Text>
            </View>
        )
    }
    return (
        <View style={[styles.container, {paddingTop: pxToDp(20) }]}>
            <GDataList
                refreshControlColor={"#fff"}
                requestMethod={UserService.getNfts}
                requestParams={{ path: '', params: { address: imUserInfo?.userID ,chainId:chainId} }}
                // whereList={WHERELIST.DEFAULT_STYLE_BOUBLE_COLUNM}
                defaultPageSize={20}
                renderItem={renderItem}
                ListEmptyComponent={_emptyView}
                ItemSeparatorComponent={() => (
                    <View style={{ height: pxToDp(24), width: '100%' }}></View>
                )}
                ref={gRef}
            />
        </View>
    );
};
export default MyNfts;


