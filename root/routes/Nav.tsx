import React, { FunctionComponent, useEffect, useState } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { Navigate, Route } from '../utils';
import { Drawer } from './Drawer';
import useRedux from '@/hooks/useRedux';
import { StorageService } from '../services';
import { ReduxToken } from '../constants';
import GoInPage from '@/pages/GuidePage/GoInPage/GoInPage';
type navProps = {
  initName?: string;
};

export const Nav: FunctionComponent<navProps> = (props) => {

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
  return (
    <NavigationContainer ref={Navigate.navigationRef} theme={DarkTheme} >
      <Drawer initName={initName}/>
    </NavigationContainer>)
};
