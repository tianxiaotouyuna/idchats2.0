import React, { Fragment, FunctionComponent, useEffect } from "react";
import { View, Image, Text, StyleProp, ViewStyle } from "react-native";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import FastImage from "react-native-fast-image";
import { UIELEMENTS } from "@/constants/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import Ripple from "react-native-material-ripple";
import { t } from "i18next";
import CommunityListCard, { CardStyle } from "@/components/CommunityListCard/CommunityListCard";
import { Navigate } from "@/utils/index";
type OutPorps = {
  style?: StyleProp<ViewStyle>;
  data?: any;
  hisID:string
};
const Bottom: FunctionComponent<OutPorps> = (props) => {
  useEffect(() => { }, []);
  const { data,hisID} = props;
  // toast(JSON.stringify(data?.userProfile))
  return (
    <Fragment >
      <Ripple onPress={()=>Navigate.navigate('HisCommunities',{hisID:hisID})} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' ,paddingBottom: pxToDp(30) }}>
        <Text style={{ fontSize: pxToSp(28), color: '#fff' }}>{t('home.thegroup')}</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{ fontSize: pxToSp(28), color: '#fff' }}>{t('home.more')}</Text>
        <Image style={{ width: pxToDp(28), height: pxToDp(28), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/home/icon_tiaozhuan.png')} />

        </View>
      </Ripple>
      {data?.map((item: any, index: number) => {
       return index < 3 ?
          <CommunityListCard containerStyle={{marginBottom:pxToDp(32)}} cardStyle={CardStyle.OTHER_PEOPLE_STYLE} data={item} onPress={() => Navigate.navigate('GroupChatPage', { chatData: item })}></CommunityListCard>
          : null
      })}
    </Fragment>
  );
};
export default Bottom;
