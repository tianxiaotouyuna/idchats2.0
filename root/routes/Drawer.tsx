import React, { FunctionComponent } from 'react';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '@/pages/HomePage/HomePage';
import UserCenter from '@/pages/UserCenter/UserCenter';
import { withFancyDrawer } from '@/components/DrawerWrapper/withFancyHeader';
import { Alert, Clipboard, Image,  Text, TouchableHighlight, View } from 'react-native';
import { UIELEMENTS } from '../constants';
import GoInPage from '@/pages/GuidePage/GoInPage/GoInPage';
import LoginType from '@/pages/GuidePage/GoInPage/LoginType/LoginType';
import Messages from '@/pages/HomePage/Messages/Messages';
import Community from '@/pages/HomePage/Community/Community';
import EmailLogin from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailLogin';
import EmailRegister from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailRegister/EmailRegister';
import SetPayPassword from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailRegister/SetPayPassword/SetPayPassword';
import ChangeEmail from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailRegister/ChangeEmail/ChangeEmail';
import ChangePassword from '@/pages/GuidePage/GoInPage/LoginType/EmailLogin/EmailRegister/ChangePassword/ChangePassword';
import { pxToDp, pxToSp, toast } from '@/utils/system';
import FastImage from 'react-native-fast-image';
import IDBitTabBg from '@/components/IDBitTabBg/IDBitTabBg';
import IDBitDrawerItem from '@/components/IDBitDrawerItem/IDBitDrawerItem';
import { Navigate } from '../utils';
import Settings from '@/pages/UserCenter/Settings/Settings';
import Applications from '@/pages/Applications/Applications';
import TransferNft from '@/pages/UserCenter/TransferNft/TransferNft';
import PayType from '@/pages/UserCenter/PayType/PayType';
import TransferToken from '@/pages/UserCenter/TransferToken/TransferToken';
import EditInfo from '@/pages/UserCenter/EditInfo/EditInfo';
import AppMainPage from '@/pages/Applications/AppMainPage/AppMainPage';
import Notification from '@/pages/Notification/Notification';
import DraftBox from '@/pages/Notification/DraftBox/DraftBox';
import EditSpace from '@/pages/Notification/EditSpace/EditSpace';
import CreateSpace from '@/pages/Notification/CreateSpace/CreateSpace';
import SpaceDetail from '@/pages/Notification/CreateSpace/SpaceDetail/SpaceDetail';
type drawerProps = {
  initName?: string;
};
export const Drawer: FunctionComponent<drawerProps> = (props) => {
  const DrawerContainer = createDrawerNavigator();
  const { initName } =props;

  const copyAdress = async (value: string) => {
    Clipboard.setString(value);
    let str = await Clipboard.getString();
    toast('复制成功')
    console.log('复制的内容', str)
  }
  const onPressFunction = () => {
    Navigate.navigate('HomePage')
  };

  function CustomDrawerContent(props:any) {
    return (
      <DrawerContentScrollView {...props}>
        <TouchableHighlight onPress={onPressFunction} >
          <View style={{ height: pxToDp(200), width: '100%', flexDirection: 'row',alignItems:'center' }}>
            <FastImage style={{ width: pxToDp(140), height: pxToDp(140), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, marginLeft: pxToDp(32), borderRadius: pxToDp(40) }} resizeMode='cover' source={{ uri: '' }} />
            <View style={{ flexDirection: 'column', marginLeft: pxToDp(20), height: pxToDp(130), justifyContent: 'space-between' }}>
              <Text style={{ color: '#F1F4F8', fontSize: pxToSp(40) }}>
                bou.idc
              </Text>
              <TouchableHighlight onPress={() => copyAdress('npub…sg39nk')}>
                <IDBitTabBg style={{ flexDirection: 'row', paddingHorizontal: pxToDp(8), borderRadius: pxToDp(10) }}>
                  <Text style={{ color: '#8796AE', fontSize: pxToSp(24) }}>npub…sg39nk</Text>
                  <Image
                    style={{ width: pxToDp(28), height: pxToDp(28), marginLeft: pxToDp(4) }}
                    source={require("@/resources/second/icon_copy.png")}
                    resizeMode={'stretch'}
                  />
                </IDBitTabBg>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
        <IDBitDrawerItem data={{ text: '消息', className: 'Messages' }} imageSource={require("@/resources/second/xiaoxi_n.png")} />
        <IDBitDrawerItem data={{ text: 'MINT', className: 'Messages' }} imageSource={require("@/resources/second/icon_copy.png")} />
        <IDBitDrawerItem data={{ text: '活动', className: 'Messages' }} imageSource={require("@/resources/second/bianwan_n.png")} />
        <IDBitDrawerItem data={{ text: '空间', className: 'Notification' }} imageSource={require("@/resources/second/kongjian_n.png")} />
        <IDBitDrawerItem data={{ text: '应用', className: 'Applications' }} imageSource={require("@/resources/second/icon_copy.png")} />
        <IDBitDrawerItem data={{ text: '设置', className: 'Settings' }} imageSource={require("@/resources/second/icon_copy.png")} />
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
        initialRouteName={initName}
        drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      >
        <DrawerContainer.Screen name="HomePage" component={withFancyDrawer(HomePage)} />
        <DrawerContainer.Screen name="UserCenter" component={withFancyDrawer(UserCenter)} />
        <DrawerContainer.Screen name="Messages" component={withFancyDrawer(Messages)} />
        <DrawerContainer.Screen name="Settings" component={withFancyDrawer(Settings)} />
        <DrawerContainer.Screen name="Applications" component={withFancyDrawer(Applications)} />
        <DrawerContainer.Screen name="TransferNft" component={withFancyDrawer(TransferNft)} />
        <DrawerContainer.Screen name="GoInPage" component={GoInPage} options={{headerBackgroundContainerStyle:{width:0}}}/>
        <DrawerContainer.Screen name="LoginType" component={LoginType} options={{headerBackgroundContainerStyle:{width:0}}}/>
        <DrawerContainer.Screen name="Community" component={Community} />
        <DrawerContainer.Screen name="EmailLogin" component={EmailLogin} options={{headerBackgroundContainerStyle:{width:0}}}/>
        <DrawerContainer.Screen name="EmailRegister" component={EmailRegister} />
        <DrawerContainer.Screen name="SetPayPassword" component={SetPayPassword} />
        <DrawerContainer.Screen name="ChangeEmail" component={ChangeEmail} />
        <DrawerContainer.Screen name="ChangePassword" component={ChangePassword} />
        <DrawerContainer.Screen name="PayType" component={PayType} />
        <DrawerContainer.Screen name="TransferToken" component={TransferToken} />
        <DrawerContainer.Screen name="EditInfo" component={EditInfo} />
        <DrawerContainer.Screen name="AppMainPage" component={AppMainPage} />
        <DrawerContainer.Screen name="Notification" component={Notification} />
        <DrawerContainer.Screen name="DraftBox" component={DraftBox} />
        <DrawerContainer.Screen name="EditSpace" component={EditSpace} />
        <DrawerContainer.Screen name="CreateSpace" component={CreateSpace} />
        <DrawerContainer.Screen name="SpaceDetail" component={SpaceDetail} />
      </DrawerContainer.Navigator>
    </View>
  )

};
