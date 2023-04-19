import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {  TouchableHighlight, View } from "react-native";

import { pxToDp } from "@/utils/system";
import { Image } from "react-native-animatable";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { UIELEMENTS } from "@/constants/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import useInitScreen from "@/hooks/useInitScreen";
import styles from "@/styles/pages/homepage/styles";
import { Navigate } from "@/utils/index";

const HomePage: FunctionComponent = (props) => {
  const onPressFunction = () => {
    props.navigation.openDrawer();
  };

  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: 'white',
      headerShown: false,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  const renderNav = () => (

    <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between" ,paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL}}>
      <TouchableHighlight onPress={onPressFunction}> 
        <Image
        style={styles.navItem}
        source={require("@/resources/idbt/my/more.png")}
        resizeMode={'stretch'}
      /> 
      </TouchableHighlight>
      <View style={{ flexDirection: 'row' }}>
      <PressableSlop onPress={onPressFunction}> 
        <Image
          style={styles.navItem}
          source={require("@/resources/idbt/my/walleta.png")}
          resizeMode={'stretch'}
        />
      </PressableSlop>
      <PressableSlop onPress={()=>Navigate.navigate('EditInfo')}> 
        <Image
          style={[styles.navItem, { marginLeft: pxToDp(24) }]}
          source={require("@/resources/idbt/my/设置.png")}
          resizeMode={'stretch'}
        />
      </PressableSlop>
      </View>
    </View>
  )
  return (
      <View style={[styles.container,{paddingTop:pxToDp(50)+useSafeAreaInsets().top}]}>
      {
        renderNav()
      }

    </View>
  );
};
export default HomePage;


