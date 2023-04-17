import styles from './styles';
import React, { FunctionComponent, memo, ReactNode, useEffect } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import { pxToDp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import { UIELEMENTS } from '@/constants/index';
type ExGoodsCardProps = {
    style?: StyleProp<ViewStyle>
    onPress?: () => {}
    children?: ReactNode;
}

const IDBitTabBg: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { style, onPress = () => { }, children } = props;
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}
export default IDBitTabBg
