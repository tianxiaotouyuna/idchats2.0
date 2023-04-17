import React, { FunctionComponent } from "react";
import { Image, View } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import GDataList from "@/components/GDataList";
import { CommunityService } from "@/services/index";
import CommunityListCard from "@/components/CommunityListCard/CommunityListCard";
import { t } from "i18next";
import { useHeaderHeight } from "@react-navigation/stack";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommunityHotCard from "@/components/CommunityHotCard/CommunityHotCard";
import CommunityMemberCard from "@/components/CommunityMemberCard/CommunityMemberCard";

const MemberList: FunctionComponent = (props) => {
  const chatData: any = useRoute().params?.chatData ?? {};
  useInitScreen({
    navigationOptions: {
      headerTitle: t('community.community8'),
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
return (
      <CommunityMemberCard data={item} cardStyle={item?.isIn} onPress={() => Navigate.navigate('PersonPage', { data: item })}></CommunityMemberCard>
    );
  };
  return (
    <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
      {/* <IDBITSearch searchStyle={SearchStyle.COMMUNITY_MEMBER_STYLE}></IDBITSearch> */}
      <GDataList
        refreshControlColor={"#fff"}
        requestParams={{ path: '', params: { groupID: chatData?.groupID } }}
        requestMethod={CommunityService.getGroupAllMemberListApi_GDataList}
        defaultPageSize={320}
        renderItem={renderItem}
      />
    </View>
  );
};
export default MemberList;


