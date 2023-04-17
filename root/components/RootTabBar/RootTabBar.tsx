import useRedux from '@/hooks/useRedux'
import styles from './styles'
import { pxToDp, pxToSp } from '@/utils/system'
import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { CommonActions, Route } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { View, Text, Pressable, Image, Animated } from 'react-native'

type RootTabBarProps = BottomTabBarProps<BottomTabBarOptions> & {

}

const RootTabBar: FunctionComponent<RootTabBarProps> = (props) => {
    const {
        state,
        descriptors,
        navigation,
        activeTintColor = "#fc3c47",
        inactiveTintColor = "#999999",

        style,
        labelStyle,
        tabStyle,

    } = props;

    const { isLogin } = useRedux();


    const renderTabItem = (route: Route<any>, index: number) => {
        const { options } = descriptors[route?.key];
        const focused = index === state.index;
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const color = focused ? activeTintColor : inactiveTintColor;

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
            });
         

            if (!focused && !event.defaultPrevented) {
                navigation.dispatch({
                    ...CommonActions.navigate(route.name),
                    target: state.key
                });
            }
        }

        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key
            });
        };

        return (
            <Pressable key={route?.key} style={[styles.button, tabStyle]} onPress={onPress} onLongPress={onLongPress}>
                {options?.tabBarIcon?.({ focused, color: activeTintColor, size: pxToDp(25) })}
                <Text style={[styles.button_txt, { color }, labelStyle]}>{label}</Text>
            </Pressable>
        )
    }

    return (
        <Animated.View style={[styles.container, style]}>
            {state?.routes?.map(renderTabItem)}
        </Animated.View>
    )
}

export default RootTabBar
