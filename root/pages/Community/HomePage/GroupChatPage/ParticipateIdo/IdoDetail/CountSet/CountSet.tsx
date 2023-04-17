import React, { FunctionComponent,  useState } from "react";
import { View, TextInput } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { t } from "i18next";
import useRedux from "@/hooks/useRedux";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import useInitScreen from "@/hooks/useInitScreen";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { UIELEMENTS } from "@/constants/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CountSet: FunctionComponent = (props) => {
    useInitScreen({
        navigationOptions: {
          headerTitle: '授权数量',
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
    
  const{needReloadCommunityList}=useRedux();
    const [address, setaddress] = useState('');
    const doNext=()=>{

    }
    return (
    <View style={[styles.container, { paddingBottom:0}]}>
    <IDBitTabBg style={{ height: pxToDp(88), width: '100%', justifyContent: "center" }}>
      <TextInput multiline={false} numberOfLines={1} style={{ marginLeft:pxToDp(16), height: 40, fontSize: pxToSp(32), color: '#fff', width: '100%' }} value={address} onChangeText={(text: string) => setaddress(text)} placeholderTextColor={'#ABABAB'} placeholder={'请输入授权的数量'}></TextInput>
    </IDBitTabBg>
    <IDBitBtn text={t('common.confirm')} containerStyle={{ bottom: useSafeAreaInsets().bottom + pxToDp(60), height: pxToDp(88), alignSelf: "center", position: 'absolute', paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }} onPress={ () =>{}} ></IDBitBtn>
    </View>
    );
};
export default CountSet;


