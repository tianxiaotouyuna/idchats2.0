import styles from './styles';
import React, { FunctionComponent, memo, ReactNode, useEffect } from 'react'
import { Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import IDBitTabBg from '../IDBitTabBg/IDBitTabBg';
import { View } from 'react-native-animatable';
import { t } from 'i18next';
type ExGoodsCardProps = {
    style?: StyleProp<ViewStyle>
    onPress?: () => {}
    index?: number;
}

const CreateSegement: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { style, onPress = () => { }, index = 1 } = props;
    return (
        <IDBitTabBg style={styles.container}>
            <View style={{alignItems:'center'}}>
                <Text style={index == 0 ? styles.text_sel : styles.text}>{t('guidePage.create2')}</Text>
                <View style={styles.bottomDot}></View>
            </View> 
            <View style={{alignItems:'center'}}>
                <Text style={index == 1 ? styles.text_sel : styles.text}>{t('guidePage.backup')}</Text>
                <View style={index == 1 ?styles.bottomBar:styles.bottomDot}></View>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={index == 2 ? styles.text_sel : styles.text}>{t('guidePage.verify')}</Text>
                <View style={index == 2 ?styles.bottomBar:styles.bottomDot}></View>
            </View>
        </IDBitTabBg>
    )
}
export default CreateSegement
