import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { isAndroid, pxToDp, pxToSp, toast, windowHeight } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/utils/Miscellaneous";
import Loading from "@/components/LoadingSnipper/Loading";
import { CommonService, CommunityService, IMService, MyService } from "@/services/index";
import useRedux from "@/hooks/useRedux";
import GDataList from "@/components/GDataList";
import ChatListCard, {
  CardStyle,
} from "@/components/ChatListCard/ChatListCard";
import { useAnimatedKeyboard } from "react-native-reanimated";
import { useKeyboardHeight } from "@/hooks/keyboardHeight";
import { useHeaderHeight } from "@react-navigation/stack";
import NFTAlert, { AlertStyle } from "@/components/NFTAlert/NFTAlert";
import { isAddress } from "@/utils/regular";
import { Navigate } from "@/utils/index";
import { useTranslation } from "react-i18next";
import TokenCard from "@/components/TokenCard/TokenCard";
import CommunityListCard from "@/components/CommunityListCard/CommunityListCard";
const SearchPage: FunctionComponent = (props) => {
  const type = props.route.params?.type;
  const [isShow, setisShow] = useState(false);
  const [text, settext] = useState("");
  const { imIns, wallet, imUserInfo ,chainId,communities} = useRedux();
  const keyboardHeight = useKeyboardHeight();
  const headerHeight = useHeaderHeight();
  const [isShowAlert, setisShowAlert] = useState(false);
  const gRef = useRef<GDataList>(null);
  const { i18n ,t} = useTranslation();
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: "white",
      headerShown: true,
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });
  const onSearch = async (_text) => {
    settext(_text);
    if (isAddress(_text)) {
      const result = await IMService.searchUser({
        params: { imIns: imIns, wallet: wallet, text: _text.toLowerCase() },
      });
      if (result && result?.list.length) {
        gRef?.current?.refreshData();
      }
      else {
        setisShowAlert(true);
      }
    } else {
      gRef?.current?.refreshData();
    }
  };
  const onSearch_unHave = async (_text) => {
    settext(_text);
  };
  const renderItem = ({ item, index }: any) => {
    return <TokenCard data={item} />;
};

const renderItem_home = ({ item, index }: any) => {
  return <ChatListCard data={item} />;
};
  const renderTips = () => {
    return (
      <View>
        <Text style={{ color: "white", marginTop: pxToDp(30) }}>
          搜索或输入地址发起新聊天
        </Text>
      </View>
    );
  };
  const renderEmpty = () => {
    // Alert.alert(JSON.stringify(useKeyboardHeight()))
    return (
      <View
        style={{
          alignItems: "center",
          paddingBottom: isAndroid ? 0 : keyboardHeight,
        }}
      >
        <Image
                    style={{ width: pxToDp(238), height: pxToDp(200) }}
                    source={require("@/resources/idbt/my/noData_my.png")}
          resizeMode={'stretch'}
          />
        <Text style={{ color: "#ABABAB", fontSize: pxToSp(26) }}>{i18n.t('common.nodata')}</Text>
      </View>
    );
  };

  function push() {
    setisShowAlert(false)
    if (text.toLowerCase() == wallet?.address.toLowerCase()) {
      toast(i18n.t('home.own'), 2500)
      return;
    }
    setTimeout(() => {
      Navigate.navigate('ChatDetail', { chatData: { userID: text.toLowerCase() } });
    }, 1000);
  }
  const renderHomeSearch=()=>(
    <View
    style={[
      styles.container,
      { paddingHorizontal: pxToDp(30), paddingTop: 0 },
    ]}
  >
    <View
      style={{
        height: headerHeight - useSafeAreaInsets().top,
        justifyContent: "center",
        marginTop: useSafeAreaInsets().top,
        width: "100%",
        paddingLeft: pxToDp(70),
      }}
    >
      <IDBITSearch
        searchStyle={SearchStyle.PUSH_STYLE}
        onChange={(text: string) => onSearch(text)}
      //   onEndEdit={isFullAddress?(e:any)=> onSearch(e.nativeEvent.text):()=>{}}
      ></IDBITSearch>
    </View>
    {text.length ? (
      <GDataList
        refreshControlColor={"#fff"}
        style={{ marginTop: pxToDp(40) }}
        requestMethod={IMService.searchUser}
        requestParams={{
          params: { imIns: imIns, wallet: wallet, text: text },
        }}
        defaultPageSize={20}
        renderItem={renderItem_home}
        ListEmptyComponent={renderEmpty}
        ref={gRef}
        ItemSeparatorComponent={() => (
          <View style={{ height: pxToDp(20) }}></View>
        )}
      />
    ) : null}
    <Loading
      isShow={isShow}
      onTimeOut={() => setisShow(false)}
      text={i18n.t('common.loading')}
    ></Loading>
    <NFTAlert
      alertStyle={AlertStyle.DOUBLE_STYLE}
      cancleText={i18n.t('common.cancle')}
      sureText={i18n.t('common.sure')}
      isVisible={isShowAlert}
      content={i18n.t('home.local')}
      onSurePress={push}
      onCanclePress={() => setisShowAlert(false)}

    ></NFTAlert>
  </View>
  )
  const renderDiscoverSearch=()=>(
    <View
    style={[
      styles.container,
      { paddingHorizontal: pxToDp(30), paddingTop: 0 },
    ]}
  >
    <View
      style={{
        height: headerHeight - useSafeAreaInsets().top,
        justifyContent: "center",
        marginTop: useSafeAreaInsets().top,
        width: "100%",
        paddingLeft: pxToDp(70),
      }}
    >
      <IDBITSearch
        style={{ width: "100%" }}
        searchStyle={SearchStyle.PUSH_STYLE}
        onChange={(text: string) => onSearch(text)}
        placeholderText={type==SearchStyle.DISCOVER_STYLE?'搜索Dapp':''}
      //   onEndEdit={isFullAddress?(e:any)=> onSearch(e.nativeEvent.text):()=>{}}
      ></IDBITSearch>
    </View>
    {text.length ? (
      <GDataList
        refreshControlColor={"#fff"}
        style={{ marginTop: pxToDp(40) }}
        requestMethod={IMService.searchUser}
        requestParams={{
          params: { imIns: imIns, wallet: wallet, text: text },
        }}
        defaultPageSize={20}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ref={gRef}
        ItemSeparatorComponent={() => (
          <View style={{ height: pxToDp(20) }}></View>
        )}
      />
    ) : null}
    <Loading
      isShow={isShow}
      onTimeOut={() => setisShow(false)}
      text={"请稍后"}
    ></Loading>
  </View>
  )
  const renderAssetsSearch=()=>(
    <View
    style={[
      styles.container,
      { paddingHorizontal: pxToDp(30), paddingTop: 0 },
    ]}
  >
    <View
      style={{
        height: headerHeight - useSafeAreaInsets().top,
        justifyContent: "center",
        marginTop: useSafeAreaInsets().top,
        width: "100%",
        paddingLeft: pxToDp(70),
      }}
    >
      <IDBITSearch
        searchStyle={SearchStyle.PUSH_STYLE}
        placeholderText={t('my.searchToken')}
        onChange={(text: string) => onSearch(text)}
      //   onEndEdit={isFullAddress?(e:any)=> onSearch(e.nativeEvent.text):()=>{}}
      ></IDBITSearch>
    </View>
    {text.length ? (
      <GDataList
        refreshControlColor={"#fff"}
        style={{ marginTop: pxToDp(0) }}
        requestMethod={MyService.serachLocalToken}
        requestParams={{
          params: {  address: imUserInfo?.userID, text: text },
        }}
        defaultPageSize={20}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ref={gRef}
        ItemSeparatorComponent={() => (
          <View style={{ height: pxToDp(20) }}></View>
        )}
      />
    ) : null}
    <Loading
      isShow={isShow}
      onTimeOut={() => setisShow(false)}
      text={i18n.t('common.loading')}
    ></Loading>
  </View>
  )
  const renderItem_unHave = ({ item, index }: any) => {
      return <TokenCard data={item} cardStyle={1}/>;
  };
  
  const renderUnHaveTokenSearch=()=>(
    <View
    style={[
      styles.container,
      { paddingHorizontal: pxToDp(30), paddingTop: 0 },
    ]}
  >
    <View
      style={{
        height: headerHeight - useSafeAreaInsets().top,
        justifyContent: "center",
        marginTop: useSafeAreaInsets().top,
        width: "100%",
        paddingLeft: pxToDp(70),
      }}
    >
      <IDBITSearch
        searchStyle={SearchStyle.PUSH_STYLE}
        placeholderText={t('my.searchTokenOrAddress')}
        onChange={(text: string) => onSearch_unHave(text)}
      //   onEndEdit={isFullAddress?(e:any)=> onSearch(e.nativeEvent.text):()=>{}}
      ></IDBITSearch>
    </View>
    {text.length ? (
      <GDataList
        refreshControlColor={"#fff"}
        style={{ marginTop: pxToDp(0) }}
        requestMethod={CommonService.getAllTokensInfo_search}
        requestParams={{
          params: {  chainId: chainId, text: text },
        }}
        defaultPageSize={20}
        renderItem={renderItem_unHave}
        ListEmptyComponent={renderEmpty}
        ref={gRef}
        ItemSeparatorComponent={() => (
          <View style={{ height: pxToDp(20) }}></View>
        )}
      />
    ) : null}
    <Loading
      isShow={isShow}
      onTimeOut={() => setisShow(false)}
      text={i18n.t('common.loading')}
    ></Loading>
    <NFTAlert
      alertStyle={AlertStyle.DOUBLE_STYLE}
      cancleText={i18n.t('common.cancle')}
      sureText={i18n.t('common.sure')}
      isVisible={isShowAlert}
      content={i18n.t('home.local')}
      onSurePress={push}
      onCanclePress={() => setisShowAlert(false)}

    ></NFTAlert>
  </View>
  )
  const renderItemCommunity = ({ item, index }: any) => {
    return (
      <CommunityListCard data={item} onPress={()=>Navigate.navigate('GroupChatPage',{chatData:item})}></CommunityListCard>
    );
  };
  const renderSearchMyCommunity=()=>{
    return (
      <View
      style={[
        styles.container,
        { paddingHorizontal: pxToDp(30), paddingTop: 0 },
      ]}
    >
      <View
        style={{
          height: headerHeight - useSafeAreaInsets().top,
          justifyContent: "center",
          marginTop: useSafeAreaInsets().top,
          width: "100%",
          paddingLeft: pxToDp(70),
        }}
      >
        <IDBITSearch
          style={{ width: "100%" }}
          searchStyle={SearchStyle.PUSH_STYLE}
          onChange={(text: string) => onSearch(text)}
          placeholderText={t('community.enter15')}
        ></IDBITSearch>
      </View>
      {text.length ? (
        <GDataList
          refreshControlColor={"#fff"}
          style={{ marginTop: pxToDp(40) }}
          requestMethod={CommunityService.searchInJoinGroup}
          requestParams={{
            params: {text: text ,communities:communities},
          }}
          defaultPageSize={20}
          renderItem={renderItemCommunity}
          ListEmptyComponent={renderEmpty}
          ref={gRef}
          ItemSeparatorComponent={() => (
            <View style={{ height: pxToDp(20) }}></View>
          )}
        />
      ) : null}
      <Loading
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
        text={"请稍后"}
      ></Loading>
    </View>
    )
  }
  const renderSearchHotCommunity=()=>{
    return (
      <View
      style={[
        styles.container,
        { paddingHorizontal: pxToDp(30), paddingTop: 0 },
      ]}
    >
      <View
        style={{
          height: headerHeight - useSafeAreaInsets().top,
          justifyContent: "center",
          marginTop: useSafeAreaInsets().top,
          width: "100%",
          paddingLeft: pxToDp(70),
        }}
      >
        <IDBITSearch
          style={{ width: "100%" }}
          searchStyle={SearchStyle.PUSH_STYLE}
          onChange={(text: string) => onSearch(text)}
          placeholderText={t('community.enter15')}
        ></IDBITSearch>
      </View>
      {text.length ? (
        <GDataList
          refreshControlColor={"#fff"}
          style={{ marginTop: pxToDp(40) }}
          requestMethod={CommunityService.searchCommunityApi}
          requestParams={{
            params: {searchTitle: text },
          }}
          defaultPageSize={20}
          renderItem={renderItemCommunity}
          ListEmptyComponent={renderEmpty}
          ref={gRef}
          ItemSeparatorComponent={() => (
            <View style={{ height: pxToDp(20) }}></View>
          )}
        />
      ) : null}
      <Loading
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
        text={"请稍后"}
      ></Loading>
    </View>
    )
  }
  return (
   type==SearchStyle.DISCOVER_STYLE?renderDiscoverSearch():(type==SearchStyle.SEARCH_TOKEN_STYLE?renderAssetsSearch():(type==SearchStyle.HOME_STYLE?renderHomeSearch():(type==SearchStyle.SEARCH_UNHAVE_TOKEN_STYLE?renderUnHaveTokenSearch():
   (type==SearchStyle.SEARCH_MY_COMMUNITY_STYLE?renderSearchMyCommunity():renderSearchHotCommunity())
   )))
  );
};
export default SearchPage;
