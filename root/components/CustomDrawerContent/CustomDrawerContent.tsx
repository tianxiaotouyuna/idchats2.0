import React from "react";
import {  Alert, ScrollView, ScrollViewProps } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { DrawerNavigationHelpers, DrawerDescriptorMap } from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";


export function CustomDrawerContent(props: (JSX.IntrinsicAttributes & ScrollViewProps & { children: React.ReactNode; } & React.RefAttributes<ScrollView>) | (JSX.IntrinsicAttributes & { state: DrawerNavigationState<ParamListBase>; navigation: DrawerNavigationHelpers; descriptors: DrawerDescriptorMap; })) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList
        inactiveBackgroundColor={'transparent'}
        inactiveTintColor={'white'}
        activeBackgroundColor={'#FFFFFF88'}
        activeTintColor={'white'}
        {...props}
      />
      <DrawerItem label="Helpa" onPress={() => Alert.alert('Link to help')} />
    </DrawerContentScrollView>
  );
}
