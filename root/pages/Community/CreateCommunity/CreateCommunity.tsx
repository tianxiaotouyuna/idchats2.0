import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, ScrollView, Pressable } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { log, pxToDp, pxToSp, readFile, readFile_image, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { CommunityService, DiscoverService } from "@/services/index";
import DappCared from "@/components/DappCared/DappCared";
import { useHeaderHeight } from "@react-navigation/stack";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import NtfButton from "@/components/NtfButton/NtfButton";
import { COLORS } from "@/utils/Miscellaneous";
import { t } from "i18next";
import Ripple from "react-native-material-ripple";
import DocumentPicker, {
  isInProgress,
} from 'react-native-document-picker'
import { Navigate } from "@/utils/index";
import MultipleInpput from "@/components/MultipleInpput/MultipleInpput";
import Loading from "@/components/LoadingSnipper/Loading";
import useRedux from "@/hooks/useRedux";
import Constants, { CacheKeys, ReduxToken, UIELEMENTS } from "@/constants/index";
import useIpfs from "@/hooks/useIpfs";
import { pinFileToIPFS, testAuthentication, upload3, uploadFiles } from "@/utils/uploadFile";
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from "@react-navigation/native";
const CreateCommunity: FunctionComponent = (props) => {
  const info: any = useRoute().params?.info
  const headerHeight = useHeaderHeight();
  const [result, setresult] = useState(null);
  const [showLoading, setshowLoading] = useState(false);
  const [groupName, setgroupName] = useState('');
  const [description, setdescription] = useState('');
  const { uploadToIpfs } = useIpfs();
  const { imUserInfo, sendReduxAction } = useRedux();
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      headerTitle: info ? t('community.modify2') : t('community.create3'),
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const renderItem = ({ item, index }: any) => {
    return <DappCared data={item} />;
  };

  const submmit = async () => {
    // else
    if (groupName?.length == 0) {
      toast(t('community.enter2'))
      return;
    }
    else if (description?.length == 0) {
      toast(t('community.enter3'))
      return;
    }
    if (!result) {
      toast(t('community.upload3'))
      return;
    }
    log(result, 'resultresultresultresultresult')
    const isJpgOrPng = result[0].type === "image/jpeg" || result[0].type === "image/jpg" || result[0].type === "image/png" || result[0].type === "image/svg" || result[0].type === "image/webp" || result[0].type === "image/gif";

    if (!isJpgOrPng) {
      toast(t('community.You3'))
      return
    }
    const isLt2M = result.size / 1024 / 1024 < 3;
    //  if (!isLt2M) {
    //   toast(t('community.xuanzexiaoyu3'))
    //   return;
    // }

    setshowLoading(true);
    if (result[0].uri == info?.uri) uploadInfo(info?.uri);

    else await uploadLogo();

  }
  const uploadInfo = async (faceURL: string) => {
    const data = {
      faceURL: faceURL,
      groupName: groupName,
      introduction: description,
      notification: '',
      ownerUserID: imUserInfo?.userID,
      groupID: info?.groupID
    };
    let ret: any = {};
    if (info) ret = await CommunityService.modifyGroupInfoApi(data);
    else ret = await CommunityService.createCommunityApi(data);
    if (ret.errCode === 0) {
      setshowLoading(false);
      info? toast(t('guidePage.modify100')):toast(t('community.create11'));
      setTimeout(() => {
        Navigate.navigate('GroupChatPage', { chatData: ret?.data, fromCreate: 1 })
        setTimeout(() => {
          sendReduxAction(ReduxToken.NEEDRELOAD_COMMUNITYLIST, {})
        }, 500);
      }, 1000);
    } else {
      setshowLoading(false);
      toast(t('common.error' + ':' + JSON.stringify(ret?.errMsg)))
    }
  }
  const uploadLogo = async () => {
    let formData = new FormData();
    formData.append('file', { uri: result[0].uri, name: result[0].fileName, type: 'image/jpeg' })
    const resp = await pinFileToIPFS(formData, (responseData: any) => {
      console.log('Fetch Success==================');
      console.log(responseData);
      uploadInfo('ipfs://' + responseData?.IpfsHash);
    }, (e: any) => {
      toast(t('common.error' + ':' + JSON.stringify(e)))
    })
    // testAuthentication()
  }
  useEffect(() => {
    setgroupName(info?.groupName);
    setdescription(info?.description);
    info && setresult([{ uri: info?.uri, type: "image/jpeg" }]);
    return () => {
      setgroupName(null);
      setdescription(null);
      setresult(null);
      setdescription(null);
    }
  }, [])

  const selectPhoto = async () => {
    const k_string = await readFile(result.fileCopyUri);

  }

  const selectFromLocal = async () => {

    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '图片库',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 600,
      maxHeight: 600,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options,
      (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          Alert.alert('自定义按钮:' + response.customButton)
        } else {
          setresult(response.assets)
        }
      }
    )
  }
  return (
    <ScrollView style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight }]}>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: pxToDp(28) }}>
        <View style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.a')}</Text>
          </View>
        </View>
      </View>

      <Ripple onPress={selectFromLocal}>
        {
          result ?
            <View style={{ marginLeft: pxToDp(4), width: pxToDp(184), height: pxToDp(184), alignItems: 'center', justifyContent: 'center', borderRadius: pxToDp(12),overflow:'hidden', borderColor: '#A9A9A9', borderWidth: pxToDp(4), borderStyle: 'dashed', marginVertical: pxToDp(34) }}>
              <Image style={{ width: pxToDp(184), height: pxToDp(184), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }} source={{ uri: result[0].uri, scale: 1 }} />
            </View>
            :
            <View style={{ marginLeft: pxToDp(4), width: pxToDp(184), height: pxToDp(184),overflow:'hidden', alignItems: 'center', justifyContent: 'center', borderRadius: pxToDp(12), borderColor: '#A9A9A9', borderWidth: pxToDp(4), borderStyle: 'dashed', marginVertical: pxToDp(34) }}>
              <Image style={{ width: pxToDp(60), height: pxToDp(46) }} source={require('@/resources/idbt/community/icon_paishe.png')} />
              <Text style={{ color: '#DADADA', marginTop: pxToDp(6), fontSize: pxToSp(24) }}>{t('community.upload1')}</Text>
            </View>
        }
      </Ripple>

      <View style={{ marginTop: pxToDp(28) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.community6')}</Text>
        </View>
        <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
          <TextInput style={{ height: 40, color: '#fff' }} value={groupName} placeholderTextColor={'#575C64'} placeholder={t('community.enter2')} onChangeText={text => setgroupName(text)} ></TextInput>
        </IDBitTabBg>
      </View>

      <View style={{ marginTop: pxToDp(28) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.community7')}</Text>
        </View>
        <MultipleInpput horderStyle={{ paddingHorizontal: pxToDp(16) }} value={description} placeHolder={t('community.enter3')} length={150} onChangeText={(text: string) => setdescription(text)}></MultipleInpput>
      </View>
      <Pressable onPress={() => Navigate.navigate('CommunityRules')}>

        <Text style={{ color: '#ABABAB', fontSize: pxToSp(24), marginTop: pxToDp(12) }}>
          {(t('community.by') + '^' + t('community.community1') + '。').split("^").map((x, ind) =>
            <Text style={[{ color: ind == 0 ? '#ABABAB' : '#3C77EC', fontSize: pxToSp(24) }]} key={x + ind}>
              {x}
            </Text>
          )
          }
        </Text>
      </Pressable>
      <NtfButton style={{ marginTop: pxToDp(104), marginBottom: pxToDp(300) }} text={info ? t('community.modify') : t('community.create4')} borderRadius={pxToDp(16)} backgroundColor="#D5F713" heigh={pxToDp(96)} textColor='#0F141E' textStyle={{ fontSize: pxToSp(36) }} borderColor={COLORS.clear} onPress={submmit}></NtfButton>

      <Loading
        text=""
        isShow={showLoading}
        onTimeOut={() => setshowLoading(false)}
      ></Loading>
    </ScrollView>
  );
};
export default CreateCommunity;


