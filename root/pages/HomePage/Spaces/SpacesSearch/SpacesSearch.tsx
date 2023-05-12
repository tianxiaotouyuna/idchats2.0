import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { pxToDp } from "@/utils/system";
import styles from "@/styles/pages/homepage/fans/fans";
import useInitScreen from "@/hooks/useInitScreen";
import GDataList from "@/components/GDataList";
import { UserService } from "@/services/index";
import { Navigate } from "@/utils/index";
import useRedux from "@/hooks/useRedux";
import FollowerCard from "@/components/FollowerCard/FollowerCard";
import { UIELEMENTS } from "@/constants/index";
import { useHeaderHeight } from "@react-navigation/elements";

const SpacesSearch: FunctionComponent = (props) => {
  const reduxParams=useRedux();
  const gRef = useRef<GDataList>(null);
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '粉丝',
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const renderItem = ({ item, index }: any) => {
    return (
      <FollowerCard data={item} onPress={()=>Navigate.navigate('GroupChatPage',{chatData:item})}></FollowerCard>
    );
  };
  return (
    <View style={[styles.container, { paddingTop: UIELEMENTS.PADDING_TOP+useHeaderHeight()}]}>
        <GDataList
          refreshControlColor={"#fff"}
          requestMethod={UserService.getFollowList}
          requestParams={{ path: '', params: { reduxParams: reduxParams} }}
          defaultPageSize={100000}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{ height: pxToDp(20) }}></View>
          )}
        ref={gRef}
        />
    </View>
  );
};
export default SpacesSearch;


