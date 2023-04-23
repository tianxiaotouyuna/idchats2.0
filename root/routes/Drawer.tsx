import React, { FunctionComponent } from 'react';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '@/pages/HomePage/HomePage';
import UserCenter from '@/pages/UserCenter/UserCenter';
import { withFancyDrawer } from '@/components/DrawerWrapper/withFancyHeader';
import { View } from 'react-native';
import { UIELEMENTS } from '../constants';
import GoInPage from '@/pages/GuidePage/GoInPage/GoInPage';
import LoginType from '@/pages/GuidePage/GoInPage/LoginType/LoginType';
import Messages from '@/pages/HomePage/Messages/Messages';
import Community from '@/pages/HomePage/Community/Community';
import EmailLogin from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailLogin';
import EmailRegister from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailRegister/EmailRegister';
import SetPayPassword from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailRegister/SetPayPassword/SetPayPassword';
import ChangeEmail from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailRegister/ChangeEmail/ChangeEmail';

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
      <DrawerContainer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'transparent',
            width: '70%'
          },
          drawerType: 'slide',
        }}
        initialRouteName="GoInPage"
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      >
        <DrawerContainer.Screen name="HomePage" component={withFancyDrawer(HomePage)} />
        <DrawerContainer.Screen name="UserCenter" component={withFancyDrawer(UserCenter)} />
        <DrawerContainer.Screen name="GoInPage" component={GoInPage} />
        <DrawerContainer.Screen name="LoginType" component={LoginType} />
        <DrawerContainer.Screen name="Messages" component={Messages} />
        <DrawerContainer.Screen name="Community" component={Community} />
        <DrawerContainer.Screen name="EmailLogin" component={EmailLogin} />
        <DrawerContainer.Screen name="EmailRegister" component={EmailRegister} />
        <DrawerContainer.Screen name="SetPayPassword" component={SetPayPassword} />
        <DrawerContainer.Screen name="ChangeEmail" component={ChangeEmail} />
      </DrawerContainer.Navigator>
    </View>
  )

};
