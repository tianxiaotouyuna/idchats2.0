import React, { FunctionComponent } from "react";
import {View } from "react-native";
import styles from "@/styles/pages/guide_page/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import useInitScreen from "@/hooks/useInitScreen";
import { t } from "i18next";
import GDataList from "@/components/GDataList";
import { AppService } from "@/services/index";
import GameCard from "@/components/GameCard/GameCard";
const Applications: FunctionComponent = (props) => {
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: t('application.application'),
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
    return <GameCard data={item} dismissHandle={closePress} />;
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
  return (
      <View style={[styles.container,{paddingBottom:pxToDp(238),paddingTop:pxToDp(238)}]}>
            <GDataList
            style={{width:'100%'}}
                refreshControlColor={"#fff"}
                requestMethod={AppService.getApplicationList}
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
export default Applications;


