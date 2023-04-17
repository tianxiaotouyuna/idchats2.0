import React, { FunctionComponent, useTransition} from "react";
import { View, Image, Text,  StyleProp, ViewStyle, Clipboard } from "react-native";
import styles from "./styles";
import { pxToDp, } from "@/utils/system";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import ScrollableTabView from "react-native-scrollable-tab-view";
import IDBITTabbar2 from "@/components/IDBITTabBar/IDBITTabbar2";
import Bill from "@/pages/My/Bill/Bill";
import MyNfts from "@/pages/My/MyNfts/MyNfts";
import { useTranslation } from "react-i18next";
import { CardStyle } from "@/components/NFTCard/NFTCard";
type OutPorps = {
    style?: StyleProp<ViewStyle>
    data?: any
}
const Top: FunctionComponent<OutPorps> = (props) => {
    const { style ,data} = props;
    const { t } = useTranslation();

    const handleChangeTab = () => {

    }
    return (
      <View style={[{width:'100%',flex:1},style]}>
      <View style={{paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,}}>
      <Image style={{borderRadius:pxToDp(8), width:'100%',height:pxToDp(88),marginVertical:pxToDp(24) }} resizeMode={'cover'}  source={require('@/resources/idbt/my/banner1.png')}></Image>

      </View>
      
      <ScrollableTabView
        style={styles.scroll_container}
        onChangeTab={handleChangeTab}
        renderTabBar={
        () => <IDBITTabbar2
        tabUnderlineScaleX={2.5}
        backgroundColor={'rgba(0,0,0,0)'} 
        hasSeparator={false} 
        activeTextColor={UIELEMENTS.DEFAULT_MAIN_TEXT_COLOR} 
        inactiveTextColor={'#ABABAB'} 
        inactiveTextFont={13} 
        activeTextFont={13}
        addFunction={()=>{Navigate.navigate('AddAddress')}}
        searchFunction={()=>{Navigate.navigate('AddAddress')}}/>}
        locked= {true}
      >
      <Bill key={`${'资产'}_${1}`} tabLabel={t('my.assets')} type={1} />
       <MyNfts key={`${'商店'}_${2}`} tabLabel={'NFT'} type={2} cardType={CardStyle.DETAIL_STYLE}/>
      </ScrollableTabView>
      </View>
    );
};
export default Top;


