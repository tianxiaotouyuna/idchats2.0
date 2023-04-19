import React, { FunctionComponent, useEffect, useState } from 'react';
import {  UIELEMENTS } from '../constants';
import {  createDrawerNavigator } from '@react-navigation/drawer';
import FirstPage from '@/pages/GuidePage/FirstPage/FirstPage';
import HomePageSec from '@/pages/HomePage/HomePageSec';
import {  View } from 'react-native';
import { CustomDrawerContent } from '@/components/CustomDrawerContent/CustomDrawerContent';
const Drawer = createDrawerNavigator();
export const Nav: FunctionComponent = (props) => {
  
  return (
      <View style={{backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR, flex: 1}}>
      <Drawer.Navigator
      useLegacyImplementation
        initialRouteName="HomePageSec"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="HomePageSec" component={HomePageSec} />
        <Drawer.Screen name="FirstPage" component={FirstPage} />
      </Drawer.Navigator>
      </View>
  )

};
