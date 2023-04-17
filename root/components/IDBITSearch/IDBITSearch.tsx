import styles from './styles';
import React, { FunctionComponent, memo, ReactNode, useEffect, useState } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable, NativeSyntheticEvent, Alert } from 'react-native'
import IDBitTabBg from '../IDBitTabBg/IDBitTabBg';
import { pxToDp, pxToSp } from '@/utils/system';
import { Navigate } from '@/utils/index';
import { TextInput } from 'react-native-gesture-handler';
import { onChange } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
export enum SearchStyle {
  HOME_STYLE = 0,
  PUSH_STYLE = 1,
  DISCOVER_STYLE = 2,
  SWAP_STYLE = 3,
  MY_STYLE = 4,
  SEARCH_TOKEN_STYLE = 5,
  SEARCH_UNHAVE_TOKEN_STYLE = 6,
  COMMUNITY_MEMBER_STYLE = 7,//社区成员搜索
  SEARCH_MY_COMMUNITY_STYLE = 8,//社区搜索
  SEARCH_HOT_COMMUNITY_STYLE = 9,//社区热门搜索
}
type ExGoodsCardProps = {
    style?: StyleProp<ViewStyle>
    onPress?: () => {}
    children?: ReactNode;
    searchStyle?: SearchStyle
    onEndEdit?: (e: any) => {}
    onChange?: (text: string) => {}
    onSearch?: (text: string) => {}
    placeholderText?: string;
}
const IDBITSearch: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { style, placeholderText, onPress = () => { }, onChange = () => { }, onSearch = () => { }, onEndEdit = () => { }, children, searchStyle = SearchStyle.HOME_STYLE } = props;

    const { i18n ,t} = useTranslation();
    
  
const [pushShowText, setpushShowText] = useState('');
const okmk=(text: string)=>{

    // if (text.length >= 20) {
    //     setpushShowText(text.substring(0, 5) +
    //     text.substring(text.length - 15))
    // }
    // else setpushShowText(text);
    setpushShowText(text);
    onChange(text)
}
    const renderHomeStyle = () => {

        return <IDBitTabBg style={[styles.container, style]} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/resources/idbt/icon-search.png')} style={{ width: pxToDp(40), height: pxToDp(40) }}></Image>
                <Text style={{ color: '#999999', fontSize: pxToSp(30), marginLeft: pxToDp(12) }}>{i18n.t('home.search')}</Text>
            </View>
        </IDBitTabBg>
    }
    const renderPushStyle = () => {
        return <IDBitTabBg style={[styles.container_push, style]} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/resources/idbt/icon-search.png')} style={{ marginLeft: pxToDp(32), width: pxToDp(40), height: pxToDp(40) }}></Image>
                <TextInput multiline={false} numberOfLines={1}  value={pushShowText} onChangeText={(text: string) => okmk(text)} onEndEditing={(e: any) => onEndEdit(e)} autoFocus={true} returnKeyType={'done'} placeholder={placeholderText || i18n.t('home.start')} placeholderTextColor={'#999999'} style={{ color: '#fff', fontSize: pxToSp(30), marginLeft: pxToDp(10),marginRight: pxToDp(16), height: pxToDp(80),flex:1}}></TextInput>
            </View>
        </IDBitTabBg>
    }
    const renderDisverStyle = () => {
        return <IDBitTabBg style={[styles.container_discover, { paddingHorizontal: pxToDp(20), paddingVertical: pxToDp(12) }, style]} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/resources/idbt/icon-search.png')} style={{ width: pxToDp(40), height: pxToDp(40) }}></Image>
                <Text style={{ color: '#999999', fontSize: pxToSp(30), marginLeft: pxToDp(12) }}>{i18n.t('home.search')}</Text>
            </View>
        </IDBitTabBg>
    }
    const renderSwapStyle = () => {
        return <IDBitTabBg style={[styles.container_discover, style, { paddingLeft: pxToDp(20), paddingVertical: pxToDp(12), paddingRight: pxToDp(20) }]} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#999999', fontSize: pxToSp(30) }}>{i18n.t('home.search')}</Text>
                <Image source={require('@/resources/idbt/icon-search.png')} style={{ width: pxToDp(40), height: pxToDp(40), marginLeft: pxToDp(12) }}></Image>
            </View>
        </IDBitTabBg>
    }
    const renderMyStyle = () => {
        return <IDBitTabBg style={[styles.container_discover, { paddingVertical: pxToDp(8) }, style]} >
            <View style={{ flexDirection: 'row', alignItems: 'center',marginHorizontal: pxToDp(20),  }}>
                <Image source={require('@/resources/idbt/icon-search.png')} style={{ width: pxToDp(32), height: pxToDp(32) }}></Image>
                <Text style={{ color: '#999999', fontSize: pxToSp(24), marginLeft: pxToDp(4),marginRight:pxToDp(10) }}>{i18n.t('home.search')}</Text>
            </View>    
        </IDBitTabBg>
    }
    return (
        <Pressable onPress={() => Navigate.navigate('SearchPage', { type: searchStyle })}>
            {searchStyle == SearchStyle.HOME_STYLE ? renderHomeStyle() : (searchStyle == SearchStyle.PUSH_STYLE ? renderPushStyle() : (searchStyle == SearchStyle.DISCOVER_STYLE ? renderDisverStyle() :(searchStyle == SearchStyle.SWAP_STYLE ? renderSwapStyle() : (searchStyle==SearchStyle.MY_STYLE?renderMyStyle():(searchStyle==SearchStyle.SEARCH_TOKEN_STYLE?renderMyStyle():(searchStyle==SearchStyle.SEARCH_UNHAVE_TOKEN_STYLE?renderHomeStyle():
            (searchStyle==SearchStyle.SEARCH_MY_COMMUNITY_STYLE?renderHomeStyle():renderMyStyle())
            ))))))}
        </Pressable>
    )
}
export default IDBITSearch
