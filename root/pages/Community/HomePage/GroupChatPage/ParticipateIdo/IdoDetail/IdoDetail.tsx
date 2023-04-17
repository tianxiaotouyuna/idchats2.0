import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import useInitScreen from "@/hooks/useInitScreen";
import useRedux from "@/hooks/useRedux";
import IDOGoCard, { CardStyle } from "@/components/IDOGoCard/IDOGoCard";
import { useRoute } from "@react-navigation/native";
import { HScrollView } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header'
import { UIELEMENTS } from "@/constants/index";
import IDBITTabBar3 from "@/components/IDBITTabBar/IDBITTabBar3";
import { Image, View } from "react-native-animatable";
import { pxToDp } from "@/utils/system";
import { screenWidth } from "@/utils/Dimensions";

const IdoDetail: FunctionComponent = (props) => {
  const { needReloadCommunityList } = useRedux();
  const data: any = useRoute().params?.data;
  useInitScreen({
    navigationOptions: {
      headerTitle: 'IDO Detail',
      headerTransparent: false,
      headerShown: true,

      headerTintColor: "white",
      headerTitleContainerStyle: { flex: 1, alignItems: 'center' }
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });


  return (
    <CollapsibleHeaderTabView style={{backgroundColor:UIELEMENTS.DEFAULT_BACKGROUND_COLOR}} renderScrollHeader={() => <IDOGoCard data={data} cardStyle={CardStyle.DETAILSTYLE}></IDOGoCard>}

    renderTabBar={(tabbarProps)=>(<IDBITTabBar3
      {...tabbarProps}
      tabUnderlineScaleX={2.5}
      backgroundColor={UIELEMENTS.DEFAULT_BACKGROUND_COLOR}
      hasSeparator={false}
      activeTextColor={UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR}
      inactiveTextColor={'#fff'}
      inactiveTextFont={13}
      activeTextFont={13} 
      containerWidth={260}/>
           )}
      
    >
      <HScrollView index={0} key={`${'asd'}_${0}`} tabLabel={'项目详情'} >
          <Image style={{ width: '100%', height: pxToDp(800) }} source={require('@/resources/idbt/ido/asd.png')} />
      </HScrollView>
      <HScrollView index={1} key={`${'asd'}_${1}`} tabLabel={'您的分配'} >
          <Image style={{ width: '100%', height: pxToDp(800) }} source={require('@/resources/idbt/ido/asd.png')} />
      </HScrollView>
      <HScrollView index={2} key={`${'asd'}_${2}`} tabLabel={'锁仓记录'} >
          <Image style={{ width: '100%', height: pxToDp(800) }} source={require('@/resources/idbt/ido/asd.png')} />
      </HScrollView>
    </CollapsibleHeaderTabView>
  )
};
export default IdoDetail;


