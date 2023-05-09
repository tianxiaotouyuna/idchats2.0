import styles from './styles';
import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable, ImageSourcePropType } from 'react-native'
import { pxToDp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import { UIELEMENTS } from '@/constants/index';
import { Navigate } from '@/utils/index';
type ExGoodsCardProps = {
    style?: StyleProp<ViewStyle>
    imageSource?: ImageSourcePropType
    leftSource?: ImageSourcePropType
    text: string
    onPress?: Function
    pushRouteName?: string
    rightImgSource?: ImageSourcePropType;
    rightText?: string;
    ishowSelect?: boolean
}

const ListCell: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { style, imageSource,leftSource, rightText, text, pushRouteName = '', onPress, rightImgSource, ishowSelect } = props;
    const _onPress = () => {
        if (onPress) onPress()
        else Navigate.navigate(pushRouteName);
    }
    return (
        <Ripple
            rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
            onPress={_onPress}
        >
            <View style={[styles.container, style]}>
                <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pxToDp(22) }}>
                    {
                        leftSource?
                    <Image style={{width: pxToDp(40), height: pxToDp(40)}} source={leftSource}></Image>
                    :null
                    }    
                        <Text style={{ fontSize: pxToDp(28), color: '#fff' }} numberOfLines={1}>{text}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pxToDp(22) }}>
                        <Text style={{ fontSize: pxToDp(28), color: '#fff' }} numberOfLines={1}>{rightText}</Text>

                        {
                            rightImgSource ? (ishowSelect == true ? <Image style={{ width: pxToDp(30), height: pxToDp(30) }} source={rightImgSource}></Image> :
                                null
                            ) : <Image style={{ width: pxToDp(30), height: pxToDp(30) }} source={require('@/resources/idbt/Frame.png')}></Image>

                        }
                    </View>
                    <View style={{ backgroundColor: '#rgba(228, 228, 228, .09 )', height: pxToDp(.5), width: '100%', position: 'absolute', bottom: pxToDp(0) }}></View>
                </View>
            </View>
        </Ripple>
    )
}
export default ListCell
