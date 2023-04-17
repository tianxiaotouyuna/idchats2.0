import React from 'react'
import {  Image, ImageSourcePropType, StyleSheet, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Route } from '../utils';
import { pxToDp, pxToSp } from '@/utils/system';
import RootTabBar from '@/components/RootTabBar/RootTabBar';
import { UIELEMENTS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import My from '@/pages/My/My';
import { useTranslation } from 'react-i18next'
import Communication from '@/pages/Communication/Communication';
import Swap from '@/pages/Swap/Swap';
import Discover from '@/pages/Discover/Discover';
import Community from '@/pages/Community/Community';
const TabClass = createBottomTabNavigator();

const Tab = () => {
    const { t } = useTranslation();
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:UIELEMENTS.DEFAULT_Tab_COLOR }} edges={['bottom']}>

            <TabClass.Navigator
                tabBar={(props) => <RootTabBar {...props} />}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let imageSource: ImageSourcePropType = {}
                        if (route.name === Route.SCREEN.Communication) {
                            imageSource = focused ? require("@/resources/idbt/toolbutton_slices/icon_hot_o.png") : require("@/resources/idbt/toolbutton_slices/icon_tongxun_n.png");
                        }
                        if (route.name === Route.SCREEN.Community) {
                            imageSource = focused ? require("@/resources/idbt/toolbutton_slices/icon_shequ_s.png") : require("@/resources/idbt/toolbutton_slices/icon_shequ_n.png");
                        }
                        // if (route.name === Route.SCREEN.Swap) {
                        //     imageSource = focused ? require("@/resources/idbt/toolbutton_slices/icon_jiaohuan_s.png") : require("@/resources/idbt/toolbutton_slices/icon_jiaohuan_n.png");
                        // }
                        // if (route.name === Route.SCREEN.Discover) {
                        //     imageSource = focused ? require("@/resources/idbt/toolbutton_slices/icon_faxian_s.png") : require("@/resources/idbt/toolbutton_slices/icon_faxian_n.png");
                        // }
                        if (route.name === Route.SCREEN.My) {
                            imageSource = focused ? require("@/resources/idbt/toolbutton_slices/icon_me_s.png") : require("@/resources/idbt/toolbutton_slices/icon_me_n.png");
                        }
                        return <Image style={styles.icon} source={imageSource} />
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#D5F713',
                    inactiveTintColor: '#ABABAB',
                    style: styles.tab_container,
                    tabStyle: styles.tab_container,
                    labelStyle: styles.label_sel
                }}
            >
                <TabClass.Screen name={Route.SCREEN.Communication} component={Communication} options={{
                    tabBarLabel: t('my.communication'),
                }} />
                <TabClass.Screen name={Route.SCREEN.Community} component={Community} options={{
                    tabBarLabel: t('common.commutie')
                }} />
                {/* <TabClass.Screen name={Route.SCREEN.Swap} component={Swap} options={({ route }) => ({
                    tabBarLabel: t('Exchange')
                })} /> */}
                {/* <TabClass.Screen name={Route.SCREEN.Discover} component={Discover} options={({ route }) => ({
                    tabBarLabel: t('Explore')
                })} /> */}
                <TabClass.Screen name={Route.SCREEN.My} component={My} options={{
                    tabBarLabel: t('common.my')
                }} />
            </TabClass.Navigator>
        </SafeAreaView>
    )                               
}

export default Tab


const styles = StyleSheet.create({
    tab_container: {
        height: pxToDp(98),
    },
    icon: {
        width: pxToDp(48),
        height: pxToDp(48),
    },
    label_sel: {
        fontSize: pxToSp(20),
    },
    label_un: {
        fontSize: pxToSp(20),
        height: 0
    },
    home_header: {
        backgroundColor: "#fd322d"
    },
    home_header_title: {
        fontWeight: "700",
        fontFamily: "System",
        color: "#ffffff",
        left: -pxToDp(24),
    },
    home_header_logo: {
        width: pxToDp(50),
        height: pxToDp(50),
    },
    home_header_left: {
        marginRight: 0,
        paddingHorizontal: pxToDp(24),
    }
})
