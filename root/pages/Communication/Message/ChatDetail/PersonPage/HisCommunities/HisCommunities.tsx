import React, { FunctionComponent } from "react";
import { Image, View } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import GDataList from "@/components/GDataList";
import { CommunityService } from "@/services/index";
import CommunityListCard, { CardStyle } from "@/components/CommunityListCard/CommunityListCard";
import { t } from "i18next";
import { useHeaderHeight } from "@react-navigation/stack";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommunityHotCard from "@/components/CommunityHotCard/CommunityHotCard";
import CommunityMemberCard from "@/components/CommunityMemberCard/CommunityMemberCard";

const HisCommunities: FunctionComponent = (props) => {
  const hisID: any = useRoute().params?.hisID ?? {};
  useInitScreen({
    navigationOptions: {
      headerTitle: t('home.community100'),
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
    console.log(item,'renderItemrenderItemrenderItemrenderItem');
    
return (
      <CommunityListCard cardStyle={CardStyle.OTHER_PEOPLE_STYLE} data={item} onPress={() => Navigate.navigate('GroupChatPage', { chatData: item })}></CommunityListCard>
      );
  };
  return (
    <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
      {/* <IDBITSearch searchStyle={SearchStyle.COMMUNITY_MEMBER_STYLE}></IDBITSearch> */}
      <GDataList
        refreshControlColor={"#fff"}
        requestParams={{ path: '', params: { fromUserID: hisID} }}
        requestMethod={hisID=='0x8dc2b2e0b7b8a8a06ee6b9f1cf67fc19cd8e2b60'? CommunityService.getCommunityHot:CommunityService.getUserJoinedGroupListApi_gData}
        defaultPageSize={1000}
        ItemSeparatorComponent={() => ( 
          <View style={{ height: pxToDp(40) }}></View>
        )}
        renderItem={renderItem}
      />
    </View>
  );
};
export default HisCommunities;


