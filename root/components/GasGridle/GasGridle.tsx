import { UIELEMENTS } from '@/constants/index';
import { Navigate } from '@/utils/index';
import { pxToDp, pxToSp, windowWidth } from '@/utils/system';
import React, { FunctionComponent } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import styles from './styles';
import IDBitTabBg from '../IDBitTabBg/IDBitTabBg';
export enum CardStyle {
    ExMallCard = 1,//兑换确认页面
    SignInCard = 2,//兑换记录页面
}
type HomeGirdleProps = {
    style?: StyleProp<ViewStyle>
    items: any
    paddingHorizontal: number
    paddingWrapper: number
    onTap?: (index: number) => void
    splitCount?: number;
    selectIndex?: number;
}

const GasGridle: FunctionComponent<HomeGirdleProps> = (props) => {

    const { selectIndex, style, onTap = (index: number) => { }, items, paddingHorizontal, splitCount = 0, paddingWrapper } = props;
    const itemWidth = (windowWidth - paddingWrapper * 2 - paddingHorizontal * 2) / splitCount || items.length
    const [isError, setIsError] = React.useState(false)
    const onError = () => setIsError(true)
    const renderView = () => (
        <View style={[style, { flexDirection: 'row', backgroundColor: 'transparent' }]}>
            {items?.map((item: any, index: number) => {
                if (splitCount && index > (splitCount - 1)) return
                else return (
                    index == items.length - 1 ? renderCustom(item, index) :
                        index == selectIndex ? renderItem_selected(item, index) : renderItem(item, index)
                )
            }
            )}
        </View>
    )
    const renderItem = (item: any, index: number) => (
        <View key={index+'asd'}  style={{ width: itemWidth, padding: pxToDp(4), alignItems: 'center' }}>
            <Ripple rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} onPress={() => onTap(index)} style={[styles.ripple, { borderColor: '#404B6B', borderWidth: pxToDp(2), backgroundColor: 'transparent', borderRadius: pxToDp(12) }]} key={`${index}`}>
                <Text style={{ color: '#D4D4D4', fontSize: pxToSp(28) }} numberOfLines={1}>{item?.type}</Text>
                <Text style={{ color: '#7082A0', fontSize: pxToSp(20), marginTop: pxToDp(12) }} ellipsizeMode={'middle'} numberOfLines={1}>{item?.content}</Text>
                <Text style={{ color: '#7082A0', fontSize: pxToSp(20), marginTop: pxToDp(12) }} numberOfLines={1}>{item?.price}</Text>
                <View style={{ width: itemWidth - 20, height: pxToDp(0.5), backgroundColor: '#404B6B', marginTop: pxToDp(12) }}></View>
                <Text style={{ color: '#D4D4D4', fontSize: pxToSp(28), marginTop: pxToDp(12) }} numberOfLines={1}>{item?.time}</Text>
            </Ripple>
        </View>
    )
    const renderItem_selected = (item: any, index: number) => (
        <View key={index+'asd'}  style={{ width: itemWidth, padding: pxToDp(4), alignItems: 'center' }}>
            <Ripple rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} onPress={() => { Navigate.navigate('Category', { title: item?.name }) }} style={[styles.ripple, { borderColor: '#0642B5', borderWidth: pxToDp(2), overflow: 'hidden', borderRadius: pxToDp(12), backgroundColor: '#fff' }]} key={`${index}`}>
                <Text style={{ color: '#0642B5', fontSize: pxToSp(28) }} numberOfLines={1}>{item?.type}</Text>
                <Text style={{ color: '#0642B5', fontSize: pxToSp(20), marginTop: pxToDp(12) }} ellipsizeMode={'middle'} numberOfLines={1}>{item?.content}</Text>
                <Text style={{ color: '#0642B5', fontSize: pxToSp(20), marginTop: pxToDp(12) }} numberOfLines={1}>{item?.price}</Text>
                <View style={{ width: itemWidth - 20, height: pxToDp(0.5), backgroundColor: '#3570FB', marginTop: pxToDp(12) }}></View>
                <Text style={{ color: '#0642B5', fontSize: pxToSp(28), marginTop: pxToDp(12) }} numberOfLines={1}>{item?.time}</Text>
                <View style={{ backgroundColor: '#447CFF', width: pxToDp(38), height: pxToDp(24), position: 'absolute', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', top: 0 }}>
                    <Image style={{ width: pxToDp(16), height: pxToDp(10) }} source={require('@/resources/second/gas_sel.png')}></Image>
                </View>
            </Ripple>
        </View>
    )
    const renderCustom = (item: any, index: number) => (
            <Ripple key={index+'asd'} style={{ alignItems: 'center', justifyContent: 'center', borderRadius: pxToDp(12), width: itemWidth-pxToDp(8), margin: pxToDp(4), borderColor: '#404B6B', borderWidth: pxToDp(2) }}>
                <Text style={{ color: '#D4D4D4', fontSize: pxToSp(28) }} numberOfLines={1}>{item?.type}</Text>
        </Ripple>
    )
    return (
        renderView()
    )
}
export default GasGridle
