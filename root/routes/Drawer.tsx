import React, { FunctionComponent, useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator, useDrawerProgress } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '@/pages/HomePage/HomePage';
import UserCenter from '@/pages/UserCenter/UserCenter';
import { withFancyDrawer } from '@/components/DrawerWrapper/withFancyHeader';
import { View } from 'react-native';
import { UIELEMENTS } from '../constants';

export const Drawer: FunctionComponent = (props) => {
  const DrawerContainer = createDrawerNavigator();

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList
          inactiveBackgroundColor={'transparent'}
          inactiveTintColor={'white'}
          activeBackgroundColor={'#FFFFFF88'}
          activeTintColor={'white'}
          {...props} />
        <DrawerItem label="Help" onPress={() => {
          props.navigation.closeDrawer();
        }} />
      </DrawerContentScrollView>
    );
  }
  return (
    <View style={{ backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR, flex: 1 }}>
      <NavigationContainer>
        <DrawerContainer.Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: 'transparent',
              drawerType: 'permanent',
              overlayColor:"transparent",
              width: 240,
            },
          }}
          initialRouteName="Home"
          drawerContent={(props: any) => <CustomDrawerContent {...props} />}
        >
          <DrawerContainer.Screen name="HomePage" component={withFancyDrawer(HomePage)} />
          <DrawerContainer.Screen name="UserCenter" component={withFancyDrawer(UserCenter)} />
        </DrawerContainer.Navigator>
      </NavigationContainer>
    </View>
  )

};
