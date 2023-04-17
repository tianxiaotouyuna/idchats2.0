import styles from './styles';
import React, { FunctionComponent, memo, ReactNode, useEffect } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable, Alert } from 'react-native'
import { pxToDp } from '@/utils/system';
import useRedux from '@/hooks/useRedux';
import { Fragment } from 'ethers/lib/utils';
import PressableSlop from '../PressableSlop/PressableSlop';
import Toast from 'react-native-root-toast';
type ExGoodsCardProps = {
    style?: StyleProp<ViewStyle>
    onPress?: () => void
}

const UserInfoItem: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { wallet } = useRedux();
    const { style, onPress } = props;
    const pressClick=()=>{
        wallet? onPress():Toast.show('请先创建钱包', { position: Toast.positions.CENTER })
    }
    return (
        <View style={[{ flexDirection: 'row', justifyContent: "space-between", backgroundColor: 'white', paddingHorizontal: pxToDp(40), paddingVertical: pxToDp(20) }, style]}>
            {/* <Image style={{ width: pxToDp(280), height: pxToDp(80), borderRadius: pxToDp(100) }} source={require('@/resources/asdasd.png')}></Image> */}
            {
                wallet ? <View>
                    <Text style={{ fontSize: pxToDp(34), fontWeight: 'bold' }}>当前钱包地址：</Text>
                    <Text style={{ fontSize: pxToDp(30), fontWeight: 'bold', width: pxToDp(400) }}>{wallet?.address}</Text>
                </View> :
                    <Text style={{ fontSize: pxToDp(34), fontWeight: 'bold' }}>请先创建钱包</Text>
            }
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <PressableSlop onPress={()=>pressClick()}>

                {wallet ? <Text style={{ fontWeight: 'bold' }}>退出登录</Text>:<Text style={{ fontWeight: 'bold' }}>未登录</Text>}
                </PressableSlop>
                <Image style={{ width: pxToDp(80), height: pxToDp(80), borderRadius: pxToDp(100), marginLeft: pxToDp(20) }} source={require('@/resources/主人1.png')}></Image>
            </View>
        </View>
    )
}
const areEqual = (prevProps: any, nextProps: any) => {
    return prevProps != nextProps
}
export default memo(UserInfoItem, areEqual) 
