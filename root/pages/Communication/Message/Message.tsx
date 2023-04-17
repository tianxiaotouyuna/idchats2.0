import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import styles from "@/styles/pages/communication/message/styles";
import { pxToDp, pxToSp, sleep, toast, windowWidth } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import IDBITSearch from "@/components/IDBITSearch/IDBITSearch";
import GDataList from "@/components/GDataList";
import useRedux from "@/hooks/useRedux";
import ChatListCard from "@/components/ChatListCard/ChatListCard";
import { Navigate } from "@/utils/index";
import { CommonService, IMService, UserService } from "@/services/index";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import { useTranslation } from "react-i18next";
import IMServiceManager from "@/utils/IMServiceManager";
import { ScaleFromCenterAndroidSpec } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs";

const Message: FunctionComponent = (props) => {
  const { needReloadChatList, imUserInfo,unitCode } = useRedux();
  const { sendReduxAction } = useRedux();
  const gRef = useRef<GDataList>(null);
  const { t } = useTranslation();
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: false,
      title: "通讯",
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });

  useEffect(() => {
    gRef?.current?.refreshData();
  }, [needReloadChatList]);

  // useEffect(() => {
  //   getTokensInfo();
  // }, []);
  useEffect(() => {
    getTokensInfo();
  }, []);

  const getTokensInfo = async () => {
    const res = await CommonService.getTokensInfo(unitCode?"cny":'usd');
    sendReduxAction(ReduxToken.GET_TOKENS_INFO, { tokensInfo: res });
    let commonData = IMServiceManager.getInstance();
    commonData.setRateBase(res);
  };
  const getAddressTokensInfo = async () => {
    const res2 = await CommonService.getAddressTokensInfo(imUserInfo?.userID);
    let commonData = IMServiceManager.getInstance();
    commonData.setImInstance(res2);
  };
  const renderItem = ({ item, index }: any) => {
    return (
      <ChatListCard
        imUserInfo={imUserInfo}
        usId={imUserInfo?.userID}
        data={item}
      ></ChatListCard>
    );
  };

  return (
    <View style={[styles.container, { paddingHorizontal: 0 ,paddingBottom:0}]}>
      <IDBITSearch
        style={{
          height: pxToDp(76),
          marginHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        }}
      />
        <GDataList
          refreshControlColor={"#fff"}
          requestMethod={IMService.getMsgList}
          requestParams={{ path: {}, params: { imUserInfo: imUserInfo, t: t } }}
          defaultPageSize={20}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: pxToDp(20) }}></View>
          )}
          ref={gRef}
        />
    </View>
  );
};
export default Message;
