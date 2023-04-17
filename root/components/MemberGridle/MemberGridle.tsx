import { UIELEMENTS } from '@/constants/index';
import { Navigate } from '@/utils/index';
import { pxToDp, windowWidth } from '@/utils/system';
import React, { FunctionComponent } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import styles from './styles';
export enum CardStyle {
    ExMallCard = 1,//兑换确认页面
    SignInCard = 2,//兑换记录页面
}
type HomeGirdleProps = {
    style?: StyleProp<ViewStyle>
    items: any
    paddingHorizontal: number
    paddingWrapper: number
    onTap?: () => void
    splitCount?: number
}

const MemberGridle: FunctionComponent<HomeGirdleProps> = (props) => {

    const { style, onTap, items, paddingHorizontal, splitCount = 0, paddingWrapper } = props;
    const itemWidth = (windowWidth - paddingWrapper * 2 - paddingHorizontal * 2) / splitCount || items.length
    const [isError, setIsError] = React.useState(false)
    const onError = () => setIsError(true)
    const renderView = () => (
        <View style={[style, { flexDirection: 'row' }]}>
            {items?.map((item: any, index: number) => {
                if (splitCount && index > (splitCount - 1)) return
                else return (
                    renderItem(item, index)
                )
            }
            )}
        </View>
    )
    const renderItem = (item: any, index: number) => (
        <Ripple rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} onPress={() => { Navigate.navigate('Category', { title: item?.name }) }} style={[styles.ripple, { width: itemWidth, height: itemWidth }]} key={`${index}`}>
            <FastImage
                style={{ width: pxToDp(52), height: pxToDp(52), borderRadius: pxToDp(10), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}
                resizeMode="cover"
                  source={{ uri: item?.faceURL } }
  
                // defaultSource={require('@/resources/idbt/moren.png')}

            />
            <Text style={styles.text} ellipsizeMode={'middle'} numberOfLines={1}>{item?.operatorUserID}</Text>
        </Ripple>

    )
    return (

        renderView()
    )
}
export default MemberGridle
