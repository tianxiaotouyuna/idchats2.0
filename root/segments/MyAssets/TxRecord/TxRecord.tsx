import styles from './styles';
import React, { FunctionComponent, useEffect } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable, ImageSourcePropType } from 'react-native'
import { pxToDp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import { UIELEMENTS } from '@/constants/index';
import FastImage from 'react-native-fast-image';
import NtfButton from '@/components/NtfButton/NtfButton';
type ExGoodsCardProps = {
    style?: StyleProp<ViewStyle>
    data: any
    onPress?: () => {}
}

const TxRecord: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { style, data, onPress = () => { } } = props;
    return (

        <Ripple
            rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
            rippleContainerBorderRadius={10}
            onPress={onPress} pointerEvents={'box-none'} 
        >
            <View style={[styles.container, style, { flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }]}>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <FastImage style={{ backgroundColor: '#333333', width: pxToDp(100), height: pxToDp(100), margin: pxToDp(20), borderRadius: pxToDp(10) }} resizeMode='cover' source={{ uri: data?.header }} />
                    <Text style={{ margin: 10, width: pxToDp(180) }} numberOfLines={1}>{data?.showName}</Text>
                </View>
                <NtfButton text={'关注'} width={pxToDp(120)} heigh={pxToDp(60)} style={{marginRight:pxToDp(20),borderWidth:0}} textColor={'white'} backgroundColor={'#000'} onPress={()=>{}}></NtfButton>
            </View>
        </Ripple>
    )
}
export default TxRecord
