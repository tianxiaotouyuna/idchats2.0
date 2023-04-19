import React, { FunctionComponent, useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import FirstPage from '@/pages/GuidePage/FirstPage/FirstPage';
import HomePageSec from '@/pages/HomePage/HomePageSec';
import { NavigationContainer } from '@react-navigation/native';
const DrawerContainer = createDrawerNavigator();

export const Drawer: FunctionComponent = (props) => {

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => {
          props.navigation.closeDrawer();
        }} />
      </DrawerContentScrollView>
    );
  }
  return (
    <NavigationContainer>
      <DrawerContainer.Navigator
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      >
        <DrawerContainer.Screen name="HomePageSec" component={HomePageSec}/>
        <DrawerContainer.Screen name="FirstPage" component={FirstPage}/>
      </DrawerContainer.Navigator>
    </NavigationContainer>
  )

};
