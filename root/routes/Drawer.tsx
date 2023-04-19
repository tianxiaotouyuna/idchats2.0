import React, { FunctionComponent, useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '@/pages/HomePage/HomePage';
import UserCenter from '@/pages/UserCenter/UserCenter';
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
        <DrawerContainer.Screen name="HomePage" component={HomePage}/>
      </DrawerContainer.Navigator>
    </NavigationContainer>
  )

};
