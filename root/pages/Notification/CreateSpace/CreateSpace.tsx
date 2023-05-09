import React, { Fragment, FunctionComponent, useState } from "react";
import { View } from "react-native";
import styles from "@/styles/pages/guide_page/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import { Image, Text } from "react-native-animatable";
import useInitScreen from "@/hooks/useInitScreen";
import { t } from "i18next";
import GameCard from "@/components/GameCard/GameCard";
import MultipleInpput from "@/components/MultipleInpput/MultipleInpput";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import FastImage from "react-native-fast-image";
const CreateSpace: FunctionComponent = (props) => {
    const [content, setcontent] = useState('');
    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerTitle: t('notfication.edit'),
            headerTintColor: 'white',
            headerShown: true,
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const closePress = () => {

    }
    const renderItem = ({ item, index }: any) => {
        return <GameCard data={item}/>;
    };

    const _emptyView = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: pxToDp(238), height: pxToDp(200) }}
                    source={require("@/resources/idbt/my/noData_my.png")}
                    resizeMode={'stretch'}
                />
                <Text style={{ color: '#ABABAB', fontSize: pxToSp(26), marginTop: pxToDp(10) }}>{t('common.nodata')}</Text>
            </View>
        )
    }
    const createNotification = () => {

    }
    return (
        <View style={[styles.container, { paddingBottom: pxToDp(238), paddingTop: pxToDp(238), justifyContent: 'space-between' }]}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'}}>
                        <FastImage
                            style={{ width: pxToDp(168), height: pxToDp(168), borderRadius: pxToDp(18) }}
                            resizeMode="cover"
                            source={{ uri: 'http://gd-hbimg.huaban.com/582f81d810365b88f9073d3ebc11450e3d6ce4d83b24-IfKDKo_fw236' }}
                        />
                        <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR ,marginLeft:pxToDp(16),fontSize:pxToSp(32) }}>www.ajskd.com</Text>
                    </View>
                    <IDBitBtn text="解析" containerStyle={{ width: pxToDp(140), height: pxToDp(56) }}></IDBitBtn>
                </View>
                <MultipleInpput horderStyle={{ paddingHorizontal: pxToDp(16), marginTop: pxToDp(100) }} value={content} placeHolder={t('community.enter3')} length={150} onChangeText={(text: string) => setcontent(text)}></MultipleInpput>
                <PressableSlop onPress={() => Navigate.navigate('DraftBox')} style={{ flexDirection: 'row', marginTop: pxToDp(130), alignItems: 'center' }}>
                    <Image
                        style={{ width: pxToDp(32), height: pxToDp(32) }}
                        source={require("@/resources/second/icon_delete.png")}
                        resizeMode={'stretch'}
                    />
                    <Text style={{ color: '#F73838', fontSize: pxToSp(20) }}>删除</Text>
                </PressableSlop>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: pxToDp(18) }}>
                    <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>费用</Text>
                    <Text style={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}>费用</Text>
                </View>
            </View>
            <IDBitBtn text={'保存'} containerStyle={{ borderRadius: pxToDp(32), height: pxToDp(104), marginTop: pxToDp(180) }} onPress={createNotification}></IDBitBtn>
        </View>
    );
};
export default CreateSpace;


