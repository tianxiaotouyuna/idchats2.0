import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import useRedux from "@/hooks/useRedux";
import useInitScreen from "@/hooks/useInitScreen";
import styles from "@/styles/pages/personpage/styles";
import Loading from "@/components/LoadingSnipper/Loading";
import Top from "@/segments/PersonPage/Top";
import { pxToDp, toast } from "@/utils/system";
import { useRoute } from "@react-navigation/native";
import { ReduxToken } from "@/constants/index";
import { CommunityService, IMService, UserService } from "@/services/index";
import Bottom from "@/segments/PersonPage/Bottom/Bottom";
import { ScrollView } from "react-native-gesture-handler";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "i18next";
import { Navigate } from "@/utils/index";
const PersonPage: FunctionComponent = () => {
  const { sendReduxAction, imIns, imUserInfo } = useRedux();
  const [isShow, setisShow] = useState(false);
  const [isFollow, setisFollow] = useState();
  const data: any = useRoute().params?.data ?? {};
  const [thisProfile, setthisProfile] = useState('');
  const [communities, setcommunities] = useState([]);
  const [isMy, setisMy] = useState(false);
  useEffect(() => {
    if(imUserInfo?.userID==data?.userID){
      setisMy(true)
    }
    getIsfollow()
  }, [imUserInfo]);
  
  const getIsfollow = async () => {
    const result = await IMService.checkIsFollower(
      imIns,
      imUserInfo?.userID,
      data?.userID
    );
    setisFollow(result);
    const res = await UserService.getUserProfile(
      data?.userID
    );
    setthisProfile(res);
    let communities ;
    if(data?.userID=='0x8dc2b2e0b7b8a8a06ee6b9f1cf67fc19cd8e2b60'){
       communities = await CommunityService.getCommunityHot_NoGDataList();
    }
   else {
    communities= await CommunityService.getUserJoinedGroupListApi(
      {fromUserID:data?.userID})
   }
    setcommunities(communities)
  };
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
  const onFollowerClick = async () => {
    setisShow(true);
   try {
    await imIns.followAddFriend({
      toUserID: data?.userID,
      follow: !isFollow,
    });
    setisFollow(!isFollow)
      setisShow(false);
      sendReduxAction(ReduxToken.NEEDRELOADCONTACT, {});
    } catch (error) {
    toast('失败：' +JSON.stringify(error))
   }
  };
  const push=()=> {
    Navigate.navigate('ChatDetail', { chatData:data,imUserInfo:imUserInfo });
  }
  return (
    <View style={[styles.container, { paddingTop: pxToDp(106)+useSafeAreaInsets().top }]}>
      <Top isMy={isMy} data={data} thisProfile={thisProfile} onFollowerClick={onFollowerClick} isfollow ={isFollow}/>
      <Bottom data={communities} hisID={data?.userID}/>
      <Loading
        text=""
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
      ></Loading>
     {isMy?
      null
      :
      <IDBitBtn text={t('community.start2')} containerStyle={{ position: "absolute", bottom: pxToDp(64) + useSafeAreaInsets().bottom }} onPress={push}></IDBitBtn>
    }
    </View>
  );
};

export default PersonPage;
