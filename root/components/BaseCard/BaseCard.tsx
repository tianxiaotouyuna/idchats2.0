import styles from './baseCard-style';
import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import { pxToDp } from '@/utils/system';
type ExGoodsCardProps = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const BaseCard: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { style,children} = props;
    return (
        <View style={[styles.container,style]}>
          {children}
        </View>
    )
}
export default BaseCard
