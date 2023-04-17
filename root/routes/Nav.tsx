import React, {  FunctionComponent, useEffect, useState } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import { Navigate } from '../utils';
import Screen from '@/routes/Screen';
import { ReduxToken } from '../constants';
import useRedux from '@/hooks/useRedux';
import { StorageService } from '../services';
type navProps = {
  initName?: string;
};

export const Nav: FunctionComponent<navProps> = (props) => {
  const RootStack = createStackNavigator();
  const reduxParams = useRedux();
  useEffect(() => {
    initRunloop()
  }, [])
  const initRunloop = async () => {
    const { initState } = await StorageService.load_initState(reduxParams)
    const { sendReduxAction } = reduxParams;
    sendReduxAction(ReduxToken.LOAD_INITSTATE, { initState: initState })
  }
  const { initName } =props;
    return(
  <NavigationContainer ref={Navigate.navigationRef} theme={DarkTheme} >
    <RootStack.Navigator >
      <RootStack.Screen
        name='Screen'
        component={Screen}
        options={{
          headerShown: false,
        }}
        initialParams={{initName:initName}}
      />

    </RootStack.Navigator>
  </NavigationContainer>)

};
