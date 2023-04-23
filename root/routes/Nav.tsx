import React, { FunctionComponent, useEffect, useState } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { Navigate, Route } from '../utils';
import { Drawer } from './Drawer';
type navProps = {
  initName?: string;
};

export const Nav: FunctionComponent<navProps> = (props) => {
  return (
    <NavigationContainer ref={Navigate.navigationRef} theme={DarkTheme} >
      <Drawer/>
    </NavigationContainer>)
};
