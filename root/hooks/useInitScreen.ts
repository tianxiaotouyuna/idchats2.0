
import { assign } from 'lodash'
import React, { useEffect } from 'react'
import { View, Text, StatusBarProps, StatusBar, Alert, Platform } from 'react-native'
import changeNavigationBarColor, { hideNavigationBar } from 'react-native-navigation-bar-color'
import useNavigationListener from './useNavigationListener'
import { StackNavigationOptions } from '@react-navigation/stack'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import useNavigationOptions from './useNavigationOptions'
import useStatusBar from './useStatusBar'
import { UIELEMENTS } from '../constants'
import { Source } from 'react-native-fast-image'
import { ImageSource } from 'react-native-vector-icons/Icon'
import { pxToDp } from '@/utils/system'
import { System } from '../utils'

type Options = {
    navigationBarColor?: String
    headerTintColor?: String
    headerTitleAlign?:String
    headerBackImageSource?:ImageSource
    title?:String

    statusBar?: StatusBarProps
    navigationOptions?: StackNavigationOptions
    backListener?:()=>void
}

const useInitScreen = (options: Options = {}) => {
    const isAn=System.isAndroid;
    const {
        navigationBarColor = "#ffffff",
        headerBackImageSource,
        backListener,
        title
    } = options;

    const default_settings={
        headerTintColor : UIELEMENTS.DEFAULT_HEADER_COLOR,
        headerTitleAlign:'center',
        headerStyle: {
            shadowOpacity: 0,
            borderBottomWidth: 0,
            shadowColor: 'transparent', // this covers iOS
            elevation: 0, // this covers Android
        },
        headerLeftContainerStyle:{marginLeft:isAn?0:pxToDp(16)}
    }
    let transTitle;
    if(title)transTitle=options.navigationOptions.t('screenTitle')
    if(options.navigationOptions)Object.assign(options.navigationOptions, {'headerLeftContainerStyle':options.navigationOptions?.headerLeftContainerStyle||default_settings.headerLeftContainerStyle,'headerStyle':options.navigationOptions?.headerStyle||default_settings.headerStyle,'headerTitleAlign':options.navigationOptions?.headerTitleAlign||default_settings.headerTitleAlign,'headerTintColor':options.navigationOptions?.headerTintColor||default_settings.headerTintColor})
    let navigationReturns ;
   if(options.navigationOptions)navigationReturns= useNavigationOptions(options.navigationOptions);
   else navigationReturns=useNavigationOptions(default_settings);
    useStatusBar(options.statusBar);
   useNavigationListener({
        onFocus: () => {
            initAndroidNavigation();
        },
        // chmod +x gradlew
        onState:(e:any)=> {
        //     if(backListener&&e?.data?.state?.routes[e?.data?.state?.routes.length-1]?.name=='Tab'&&e?.data?.state?.routes.length>1){
        //         backListener()
        //     }
        //    else {}
        },
        
    })

    const initAndroidNavigation = () => {
        // changeNavigationBarColor(navigationBarColor, true, true);
        changeNavigationBarColor(UIELEMENTS.DEFAULT_BACKGROUND_COLOR, true, false);
    }

    return { ...navigationReturns }

}
// sadness apart inmate round lava enough neck step benefit stem range shrimp
export default useInitScreen
