import React, { FunctionComponent, useState } from "react";
import {View } from "react-native";
import styles from "@/styles/pages/guide_page/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import useInitScreen from "@/hooks/useInitScreen";
import { t } from "i18next";
import GameCard from "@/components/GameCard/GameCard";
import MultipleInpput from "@/components/MultipleInpput/MultipleInpput";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import GDataList from "@/components/GDataList";
import { NotificationService } from "@/services/index";
import Ripple from "react-native-material-ripple";
import BaseCard from "@/components/BaseCard/BaseCard";
import FastImage from "react-native-fast-image";
import { UIELEMENTS } from "@/constants/index";
const DraftBox: FunctionComponent = (props) => {
  const [content, setcontent] = useState('');
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: t('notfication.draftBox'),
      headerTintColor: 'white',
      headerShown: true,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const closePress=()=>{

  }
  const renderItem = ({ item, index }: any) => {
      return (
        <Ripple
          pointerEvents={'box-none'}
        >
          <BaseCard style={{backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
          alignItems:'center',
          flexDirection:'row',
          padding:pxToDp(14),
          borderRadius:pxToDp(12)}}>
            <FastImage
              style={{width:pxToDp(76),height:pxToDp(76),borderRadius:pxToDp(18)}}
              resizeMode="cover"
              source={{ uri: item?.image }}
            />
              <Text style={{ fontSize: pxToSp(24), color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontWeight: 'bold', marginTop: pxToDp(16), marginBottom: pxToDp(20),marginHorizontal:pxToDp(14) ,flex:1}} ellipsizeMode='middle' numberOfLines={1}>{item?.content}</Text>
          </BaseCard>
        </Ripple>
      )
};

const _emptyView = () => {
    return (
        <View style={{ alignItems: "center" }}>
            <Image
                style={{ width: pxToDp(238), height: pxToDp(200) }}
                source={require("@/resources/idbt/my/noData_my.png")}
                resizeMode={'stretch'}
            />
            <Text style={{ color: '#ABABAB', fontSize: pxToSp(26), marginTop: pxToDp(10) }}>{t('common.nodata')}</Text>
        </View>
    )
}
const createNotification=()=>{

}
  return (
      <View style={[styles.container,{paddingBottom:pxToDp(238),paddingTop:pxToDp(238),justifyContent:'space-between'}]}>
        <GDataList
            style={{width:'100%'}}
                refreshControlColor={"#fff"}
                requestMethod={NotificationService.getDraftBox}
                requestParams={{ path: '', params: {  }}}
                defaultPageSize={20}
                renderItem={renderItem}
                ListEmptyComponent={_emptyView}
                ItemSeparatorComponent={() => (
                    <View style={{ height: pxToDp(24), width: '100%' }}></View>
                )}
            />
      </View>
  );
};
export default DraftBox;


