import React, { FunctionComponent,  useState } from "react";
import { View, Text} from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { log, pxToDp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { CommunityService, DiscoverService } from "@/services/index";
import { useHeaderHeight } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import { t } from "i18next";
import { Navigate } from "@/utils/index";
import Loading from "@/components/LoadingSnipper/Loading";
import useRedux from "@/hooks/useRedux";
import Constants, { CacheKeys, ReduxToken } from "@/constants/index";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { useRoute } from "@react-navigation/native";
const CreateSubChannel: FunctionComponent = (props) => {
  const chatData: any = useRoute().params?.chatData ?? {};
  const headerHeight = useHeaderHeight();
  const [showLoading, setshowLoading] = useState(false);
  const [groupName, setgroupName] = useState('');
  const { imUserInfo, sendReduxAction } = useRedux();
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      headerTitle: t('community.create1'),
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });

  const submmit = async () => {

    // else
    if (groupName.length == 0) {
      toast(t('community.enter2'))
      return;
    }
    setshowLoading(true);
    const data = {
      channelName:groupName,
      groupID: chatData?.groupID,
      ownerUserID: chatData?.ownerUserID,
      opInfo: 'add',
    };
log(chatData,'createCommunityChannelApi')
    const ret: any = await CommunityService.createCommunityChannelApi(data)
    if (ret.errCode === 0) {
      setshowLoading(false);
      toast("Create Success!");
      log(ret,'retretretretret');
      setTimeout(() => {
        Navigate.navigate('GroupChatPage', { chatData: ret?.data })
        setTimeout(() => {
          sendReduxAction(ReduxToken.NEEDRELOAD_COMMUNITYLIST, {})
        }, 500);
      }, 1000);
    } else {
      setshowLoading(false);
      toast("Create Error!");
    }

  }
  return (
    <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight }]}>

      <View style={{ marginTop: pxToDp(28) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.channel')}</Text>
        </View>
        <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
          <TextInput style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.enter4')} onChangeText={text => setgroupName(text)} ></TextInput>
        </IDBitTabBg>
      </View>

      <View style={{ marginTop: pxToDp(28),flexDirection:'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.private')}</Text>
        </View>
      </View>
          <Text style={{color: '#ABABAB', fontSize: pxToDp(26), marginBottom: pxToDp(10),marginTop:pxToDp(10) }}>{t('community.only')}</Text>
      <IDBitBtn text={t('community.create6')} containerStyle={{ position: "absolute", bottom: pxToDp(64) + useSafeAreaInsets().bottom }} onPress={submmit}></IDBitBtn>

      <Loading
        text=""
        isShow={showLoading}
        onTimeOut={() => setshowLoading(false)}
      ></Loading>
    </View>
  );
};
export default CreateSubChannel;


