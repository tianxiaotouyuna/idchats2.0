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
import TokenCard, { CardStyle } from "@/components/TokenCard/TokenCard";
import useRedux from "@/hooks/useRedux";
import pstorage from "@/utils/pstorage";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/stack";

const AddAddress: FunctionComponent = (props) => {
const {t}=useTranslation()
  const gRef = useRef<GDataList>(null);
  const{imUserInfo,chainId}=useRedux();
useInitScreen({
  navigationOptions: {
    headerTitle: t("my.addToken"),
    headerTransparent: true,
    headerShown: true,
    headerTintColor: "white",
  },
  statusBar: {
    backgroundColor: "transparent",
    barStyle: "light-content",
  },
});
    const renderItem = ({ item, index }: any) => {
        return <TokenCard data={item} cardStyle={CardStyle.ADD_STYLE}/>;
    };
    
    useEffect(() => {
        gRef?.current.refreshData()

    }, [imUserInfo?.userID])
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
        <View
          style={[
            styles.container,
            {
              paddingBottom: 100 + useSafeAreaInsets().bottom,
              paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP,
            },
          ]}
        >
           <IDBITSearch placeholderText={'搜索代币'} searchStyle={SearchStyle.SEARCH_UNHAVE_TOKEN_STYLE}></IDBITSearch>
          <GDataList
          ref={gRef}
          style={{marginHorizontal: 0}}
                refreshControlColor={"#fff"}
                // requestMethod={CommonService.getAddressTokensInfo}
                requestMethod={CommonService.getAllTokensInfo_byChainId}
                requestParams={{ path: '', params: { chainId:chainId} }}
                defaultPageSize={20}
                renderItem={renderItem}
                ListEmptyComponent={_emptyView}
                ItemSeparatorComponent={() => (
                    <View style={{ backgroundColor: '#rgba(228, 228, 228, .09 )', height: pxToDp(0), width: '100%', position: 'absolute', bottom: pxToDp(0) }}></View>
                )}
            />
        </View>
    );
};
export default AddAddress;


