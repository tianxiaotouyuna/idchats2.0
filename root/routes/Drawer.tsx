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
        <DrawerItem label="项目首页" onPress={() => { props.navigation.closeDrawer(); }}
          inactiveBackgroundColor={'transparent'}
          inactiveTintColor={'white'}
          activeBackgroundColor={UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR}
          activeTintColor={'white'}
        />
        <DrawerItem label="个人中心" onPress={() => { props.navigation.closeDrawer(); }}
          inactiveBackgroundColor={'transparent'}
          inactiveTintColor={'white'}
          activeBackgroundColor={UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR}
          activeTintColor={'white'}
        />
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
              width:'70%'
            },
              drawerType: 'slide',
              
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
