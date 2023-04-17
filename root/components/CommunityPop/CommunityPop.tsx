import React, { Fragment, FunctionComponent, ReactNode, useEffect, useState } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  Image,
  Clipboard,
  TouchableHighlight,
} from "react-native";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import Ripple from "react-native-material-ripple";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "i18next";
import GDataList from "@/components/GDataList";
import { CommonService, StorageService } from "@/services/index";
import WalletCard from "../WalletCard/WalletCard";
import { useHeaderHeight } from "@react-navigation/stack";
import i18n from "@/utils/locales";
import { UIELEMENTS } from "@/constants/index";
import TokenCard, { CardStyle } from "../TokenCard/TokenCard";
export enum CommunityPopStyle {
  SHARE_STYLE = 0, //删除钱包弹框
  DELETEWALLET = 1,//导入钱包弹框
  IDO_TOKEN_STYLE = 2,//导入IDO,选择TOKEN弹框
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  sure_press?: () => void;
  selectCell_press?: (item:any) => void;
  cancle_press?: () => void;
  onPressShare?: () => void;
  onPressInsert?: () => void;
  selectDaibi?: (text: string) => void;
  data?: any;
  communityPopStyle?: CommunityPopStyle;
  coins?:any
};

const CommunityPop: FunctionComponent<PopProps> = (props) => {
  const { data, style, onPressShare, cancle_press, communityPopStyle = 1,selectCell_press,coins } = props;
  const copyAdress = async (value: string) => {
    cancle_press()
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    console.log('复制的内容', str)
    setTimeout(() => {
      toast(t('community.copy1'))
    }, 500);
  }
  const renderShare = () => (
    <View style={{ backgroundColor: '#fff', paddingBottom: useSafeAreaInsets().bottom + pxToDp(0), borderTopLeftRadius: pxToDp(16), borderTopRightRadius: pxToDp(16) }}>
      <View style={{ width: '100%', height: pxToDp(130), backgroundColor: '#EBEBEB', paddingHorizontal: pxToDp(32), justifyContent: 'center' }}>
        <View>
          <Text style={{ color: '#000000', fontSize: pxToSp(32), fontWeight: '500' }}>{t('community.invite')}</Text>
          <Text style={{ color: '#61666E', fontSize: pxToSp(24), marginTop: pxToDp(6) }}>https://idchats.gg/mvENZpDH</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: pxToDp(32) }}>
        <Ripple onPress={onPressShare} style={{ width: '100%', height: pxToDp(100), backgroundColor: '#fff', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: pxToDp(28), height: pxToDp(28) }} source={require('@/resources/idbt/community/edit.png')} />
            <Text style={{ color: '#000000', marginLeft: pxToDp(8) }}>{t('community.share')}</Text>
          </View>
        </Ripple>

        <Ripple onPress={() => { copyAdress('asd') }} style={{ width: '100%', height: pxToDp(100), backgroundColor: '#fff', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: pxToDp(28), height: pxToDp(28) }} source={require('@/resources/idbt/community/copy.png')} />
            <Text style={{ color: '#000000', marginLeft: pxToDp(8) }}>{t('community.copy')}</Text>
          </View>
        </Ripple>

        <Ripple onPress={cancle_press} style={{ width: '100%', height: pxToDp(100), backgroundColor: '#fff', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: pxToDp(28), height: pxToDp(28) }} source={require('@/resources/idbt/community/popCancle.png')} />
            <Text style={{ color: '#000000', marginLeft: pxToDp(8) }}>{t('community.cancel1')}</Text>
          </View>
        </Ripple>
      </View>
    </View>

  )
  const renderItem = ({ item, index }: any) => {
    return <TokenCard data={item} cardStyle={CardStyle.IDO_SELECT_STYLE} onPress={(item:any)=>selectCell_press(item)}/>;
  };

  const _emptyView = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: 'center' }}>
        <Image
          style={{ width: pxToDp(238), height: pxToDp(200), marginTop: -pxToDp(40) }}
          source={require("@/resources/idbt/my/noData_my.png")}
          resizeMode={'stretch'}
        />
        <Text style={{ color: '#ABABAB', fontSize: pxToSp(26), marginTop: pxToDp(10) }}>{t('common.nodata')}</Text>
      </View>
    )
  }
  const renderPopIDO = () => {
    return (
      <View
        style={{ borderTopLeftRadius: pxToDp(24), borderTopRightRadius: pxToDp(24), backgroundColor: 'white', marginTop: useHeaderHeight() + 20, flex: 1, paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL }}
      >
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginTop: pxToDp(32) }}>
          <TouchableHighlight onPress={() => cancle_press()}>
            <Text style={{ color: '#999999', fontSize: pxToSp(26) }}>取消</Text>
          </TouchableHighlight>
          <View style={{ flexDirection: 'row', borderRadius: pxToDp(12), alignItems: 'center', backgroundColor: '#F6F6F6', height: pxToDp(72), marginRight: 10, flex: 1 }}>
            <Image source={require('@/resources/idbt/icon-search.png')} style={{ width: pxToDp(40), height: pxToDp(40), marginLeft: pxToDp(12) }}></Image>
            <Text style={{ color: '#999999', fontSize: pxToSp(26), marginLeft: pxToDp(12) }}>代币代号名称或合约地址备份</Text>
          </View>
        </View>
        <GDataList
          refreshControlColor={"#fff"}
          requestMethod={CommonService.getCoins}
          requestParams={{ params: { chainID: 1, text: 'e',coins:coins }, }}
          defaultPageSize={20}
          renderItem={renderItem}
          ListEmptyComponent={_emptyView}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: pxToDp(1),backgroundColor:UIELEMENTS.DEFAULT_SEPARATOR_COLOR, width: "100%" }}
            ></View>
          )}
        />
      </View>
    )
  }
  return (
    communityPopStyle == CommunityPopStyle.SHARE_STYLE ? renderShare() : communityPopStyle == CommunityPopStyle.DELETEWALLET ? renderShare() : renderPopIDO()
  );
};

export default CommunityPop;
