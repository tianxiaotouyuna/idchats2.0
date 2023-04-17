import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import GDataList from "@/components/GDataList";
import { CommunityService } from "@/services/index";
import CommunityListCard from "@/components/CommunityListCard/CommunityListCard";
import CommunityHotCard from "@/components/CommunityHotCard/CommunityHotCard";
import Banner from "@/components/Banner/Banner";
import { UIELEMENTS } from "@/constants/index";
import { t } from "i18next";
import { Navigate } from "@/utils/index";
import useRedux from "@/hooks/useRedux";
import { log } from "react-native-reanimated";
import PressableSlop from "@/components/PressableSlop/PressableSlop";

const HotPage: FunctionComponent = (props) => {
  const [bannerData, setbannerData] = useState([]);
  const { needReloadCommunityList } = useRedux();
  const gRef = useRef<GDataList>(null);
  useEffect(() => {
    gRef?.current?.refreshData()
  }, [needReloadCommunityList])
  useInitScreen({
    navigationOptions: {
      title: '账单'
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  useEffect(() => {
    getBanner()
  }, [])
  const getBanner = async () => {
    const resp = await CommunityService.getHotBanner();
    setbannerData(resp)
  }
  const renderItem = ({ item, index }: any) => {
    return (
      <CommunityHotCard data={item} onPress={() => Navigate.navigate('GroupChatPage', { chatData: item })}></CommunityHotCard>
    );
  };
  return (
    <View style={[styles.container, { paddingBottom: 0 }]}>
      <Banner
        data={bannerData} containerStyle={{ width: '100%', height: pxToDp(240), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}></Banner>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'}}>
        {/* <Text style={{color:'#fff'}}>{t('community.hot2')}</Text> */}
        <IDBITSearch searchStyle={SearchStyle.SEARCH_HOT_COMMUNITY_STYLE} style={{ width: pxToDp(152) }}></IDBITSearch>
        <PressableSlop style={{ flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
          <Text style={{ fontSize: pxToSp(26), color: '#999999' }}>{t('community.trend')}</Text>
          <Image style={{ borderRadius: pxToDp(8), width: pxToDp(32), height: pxToDp(32) }} resizeMode={'cover'} source={require('@/resources/idbt/community/icon_qushi.png')}></Image>
        </PressableSlop>
      </View>
      <GDataList
        refreshControlColor={"#fff"}
        style={{ marginTop: pxToDp(40) }}
        requestMethod={CommunityService.getCommunityHot}
        defaultPageSize={100000}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{ height: pxToDp(40) }}></View>
        )}
        ref={gRef}
      />
    </View>
  );
};
export default HotPage;


