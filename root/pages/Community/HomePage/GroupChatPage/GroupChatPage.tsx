import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import GroupDropDown from "@/components/GroupDropDown/GroupDropDown";
import { Alert, Image, Text, View } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { getLocalTime, isIOS, log, pxToDp, pxToSp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import useRedux from "@/hooks/useRedux";
import {
  Avatar,
  Bubble,
  Day,
  GiftedChat,
  InputToolbar,
  LoadEarlier,
  Message,
  MessageText,
  Time,
  User,
} from "react-native-gifted-chat";
import Toast from "react-native-root-toast";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import MessageSendBtn from "@/components/MessageSendBtn/MessageSendBtn";
import { COLORS, FONTS } from "@/utils/Miscellaneous";
import { Navigate } from "@/utils/index";
import { CommunityService, IMService } from "@/services/index";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import IMServiceManager from "@/utils/IMServiceManager";
import { CbEvents } from "@/services/open_im_sdk";
import { WsResponse } from "@/services/open_im_sdk/types";
import { useHeaderHeight } from "@react-navigation/stack";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { t } from "i18next";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import Ripple from "react-native-material-ripple";
import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import Loading from "@/components/LoadingSnipper/Loading";
import { messageTypes } from "@/services/open_im_sdk/constants/messageContentType";
import { screenWidth } from "@/utils/Dimensions";
import IDOingCard from "@/components/IDOingCard/IDOingCard";
const GroupChatPage: FunctionComponent = (props) => {
  const [messages, setMessages] = useState([]);

  const sendRef = useRef(GiftedChat);
  const chatData: any = useRoute().params?.chatData;
  const fromCreate: any = useRoute().params?.fromCreate;
  const { imUserInfo } = useRedux();
  const [finishedLoad, setfinishedLoad] = useState(false);
  const headerHeight = useHeaderHeight();
  const inDetailRef = useRef(true);
  const safeArea = useSafeAreaInsets();
  const [isShow, setisShow] = useState(false);
  const [channelName, setchannelName] = useState('');
  const [isJoinEd, setisJoinEd] = useState(false);
  const { sendReduxAction } = useRedux();
  const [isLoadEarlier, setIsLoadEarlier] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const channelIDRef = useRef()
  const [channelID, setChannelID] = useState();
  useEffect(() => {
    channelIDRef.current = channelID
  }, [channelID])

  const count = 20;
  useInitScreen({
    navigationOptions: {
      headerTitle: '',
      headerTransparent: true,
      headerShown: true,

      headerTintColor: "white",
      headerTitleContainerStyle: { flex: 1, alignItems: 'center' }
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });
  const getSubChannel = async () => {
    const resp2 = await CommunityService.getCommunityChannelListApi(chatData?.groupID)
    const resp=  modifyData(resp2);
    setChannelTitle(resp)
    setchannelName(resp[0]?.channelName)
    setChannelID(resp[0]?.channelID);
    log(resp,'channelIDchannelID')
    getChatDetail(resp[0]?.channelID);
  }
const modifyData=(resp:any)=>{
  let newRespTop=[];
  let newRespBottom=[];

  for (let index = 0; index < resp.length; index++) {
    const element = resp[index];
    if(element?.channelID==1){
      element.channelName=t('community.announcement')
      newRespTop.push(element);
    }
    else if(element?.channelID==2){
      element.channelName=t('community.square')
      newRespTop.push(element);
    }
    else newRespBottom.push(element);
  }

  return newRespTop.concat(newRespBottom);
}
  const navigation = useNavigation();
  const setChannelTitle = (resp: any) => {
    navigation.setOptions({
      headerTitle: (props: any) => <GroupDropDown data={resp} selectItem={(value: any, index: number) => {
        setIsLastPage(false);
        getChatDetail(value.channelID);
        setChannelID(value.channelID);
        setchannelName(value.channelName)
      }} />,
      headerTitleStyle: {
        width: 100,
      }
    })
  }


  React.useLayoutEffect(() => {
    setisJoinEd(chatData?.isJoinEd)
    navigation.setOptions({
      headerRight: () => (
        <Ripple
          onPress={() => Navigate.navigate('CommunitySettings', { chatData: chatData, })}
        >
          <PressableSlop
          >
            <Image
              style={{
                width: pxToDp(36),
                height: pxToDp(36),
                marginRight: UIELEMENTS.PADDING_HORIZONTAL,
              }}
              source={require("@/resources/idbt/community/icon_more.png")}
            />
          </PressableSlop>
        </Ripple>
      ),
    });
  }, []);
  const joinCommunity = async () => {
    setisShow(true)
    const resp = await CommunityService.joinGroup({
      groupID: chatData?.groupID,
      reqMsg: '',
      joinSource: 2
    })
    if (resp?.errCode == 0) {
      toast(t('community.join1'))
      setisJoinEd(true)
      sendReduxAction(ReduxToken.NEEDRELOAD_COMMUNITYLIST, {})
    }
    else toast(t('common.error') + ':' + resp?.errMsg)
    setisShow(false)
  }
  const goToTab = () => {
    Navigate.navigate('Tab')
  }
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (1) {
        return;
      } else {
        e.preventDefault();
      }
    });
  }, [navigation]);
  useEffect(() => {

    IMServiceManager.getInstance()._imInstance.on(
      CbEvents.ONRECVNEWMESSAGE,
      (data: WsResponse) => {
        log(data, 'INNNNNN------ONCONVERSATIONCHANGED')
        // log(channelIDRef?.current + imUserInfo.userID, 'thisChannelID')
        const obj = JSON.parse(data?.data);
        //排除重复
        // for (let index = 0; index < messa.length; index++) {
        //   const element = list[list.length - (index + 1)];
        // }
        if (obj?.groupID == chatData?.groupID && obj?.channelID == channelIDRef.current) {
          const msg = {
            _id: obj?.createTime,
            text: obj?.content,
            createdAt: obj?.createTime,
            user: {
              _id: obj?.sendID,
              name: obj?.senderNickname,
              avatar: obj?.senderFaceUrl,
            },
          };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [msg])
          );
          if (inDetailRef.current == true) {
            IMService.markGroupMessageAsRead({
              groupID: chatData?.groupID,
              msgIDList: []
            });
          }
        }
      }
    );
    getSubChannel()
    return () => {
      inDetailRef.current = false;
      setIsLastPage(false);
      setIsLoadEarlier(false);
    };
  }, []);

  const getChatDetail = async (channelID: string) => {
    let startClientMsgID;

    if (messages && messages.length) {
      startClientMsgID = messages[messages.length - 1]?.clientMsgID
      log(messages[messages.length - 1], 'messages0000')
    }
    let resp = await IMService.getMesgHistory_group({ groupID: chatData.groupID, channelID: channelID, count: count, startClientMsgID: startClientMsgID });
    if (resp.length < count) {
      setIsLastPage(true)
      resp = resp.concat(
        {
          _id: '-111',
          text: 'welcome10086',
          user: {
            _id: '-111',
            name: '-111',
            avatar: ''
          },
        }
      )
    };
    const lastMsgs = messages;
    let newMssages = lastMsgs.concat(resp);
    setMessages(newMssages);
    setisShow(false);
    setfinishedLoad(true);
    setIsLoadEarlier(false);
    if (isLoadEarlier == false && chatData?.conversationData?.unreadCount > 0) {
      IMService.markGroupMessageAsRead({
        groupID: chatData?.groupID,
        msgIDList: []
      });
    }

  };
  const readMsg = async () => {
    await IMService.readMsg(chatData, []);

  };
  const onSend = useCallback(async (msgs: any = [], cid: string) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, msgs)
    );
    const resp: any = await IMService.sendMsg_group(chatData, msgs[0]?.text, cid.toString());
    if (resp?.errCode != 0) toast(resp?.errMsg)
  }, []);

  const pushPersonPage = (user: User) => {
    const chatUser={
      ...user,
      userID:user._id,
      faceURL:user.avatar
    }
    log(user,'pushPersonPage');
    if (imUserInfo?.userID != user._id)
      Navigate.navigate("PersonPage", { data: chatUser });
    else Navigate.navigate("PersonPage", { data: imUserInfo });
  };

  const getMoreMessages = () => {
    if (isLoadEarlier == true || isLastPage == true) {//加载中 最后一页
      return;//
    }
    setIsLoadEarlier(true);
    getChatDetail(channelIDRef.current);
  }
  function render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
          paddingTop: headerHeight,
          paddingBottom: safeArea.bottom,
        }}
      >
        {/* <WelcomeCard></WelcomeCard> */}
      <IDOingCard/>
        <GiftedChat
          messagesContainerStyle={{ paddingHorizontal: pxToDp(20) }}
          messages={messages}
          onSend={(_messages) => onSend(_messages, channelIDRef?.current)}
          user={{
            _id: '-1',
            avatar: imUserInfo?.faceURL,
          }}
          isGroupChat={true}
          scrollToBottom={true}
          scrollToBottomComponent={() => <Image style={{ width: 20, height: 20 }} source={require('@/resources/idbt/community/jiantouxia.png')} />}
          onLoadEarlier={() => getMoreMessages()}
          loadEarlier={!isLastPage}
          renderLoadEarlier={(props) => {
            return (

              <LoadEarlier {...props} label={t('common.loadmore')}></LoadEarlier>
            )
          }
          }
          isLoadingEarlier={isLoadEarlier}
          infiniteScroll={true}
          // listViewProps={{
          //   onEndReachedThreshold: 0.5, // When the top of the content is within 3/10 of the visible length of the content
          //   onEndReached: () => getMoreMessages(),
          // }}
          renderInputToolbar={(props) => {
            return (

              isJoinEd ||fromCreate? <InputToolbar
                {...props}
                containerStyle={{
                  borderTopWidth: 0,
                  marginBottom: -safeArea.bottom,
                  position:'absolute',
                  bottom:0
                }}
                renderComposer={() => (
                  <MessageSendBtn
                    style={{  width:screenWidth,paddingBottom:pxToDp(4)+useSafeAreaInsets().bottom,alignItems:'center',justifyContent:'center'}}
                    user={imUserInfo}
                    onPress={(_messages) => {
                      sendRef?.current.onSend(_messages);
                    }}
                    enable={channelIDRef?.current == '1' && chatData?.creatorUserID != imUserInfo?.userID ? false : true}
                    placeHodler={channelIDRef?.current == '1' && chatData?.creatorUserID != imUserInfo?.userID ? t('community.you2') : t('common.send') + ' ' + channelName + ' ' + t('common.channel')}
                  />
                )}
              ></InputToolbar> : null
            );
          }}
          alignTop={true}
          bottomOffset={safeArea.bottom}
          ref={sendRef}
          wrapInSafeArea={false}
          showUserAvatar={true}
          showAvatarForEveryMessage={true}
          onPressAvatar={(user: User) => pushPersonPage(user)}
          renderMessage={(props) => {
            if (props.currentMessage.text == 'welcome10086') return (<WelcomeCard data={chatData}></WelcomeCard>)
            return (
              <Message
                {...props}
                containerStyle={{
                  left: {
                    ...props?.containerStyle?.left,
                    paddingVertical: pxToDp(26),
                    alignItems: "flex-start",
                  },
                  right: {
                    ...props?.containerStyle?.right,
                    paddingVertical: pxToDp(26),
                    alignItems: "flex-start",
                  },
                }}
                renderDay={() => (
                  <Day
                    {...props}
                    textStyle={{
                      color: "#999999",
                      backgroundColor: "rgba(244, 244, 244, 0.1)",
                      paddingHorizontal: pxToDp(12),
                      paddingVertical: pxToDp(8),
                      borderRadius: pxToDp(16),
                      overflow: "hidden",
                      fontSize: pxToSp(24),
                    }}
                    dateFormat={"YYYY/MM/DD"}
                  />
                )}
                renderAvatar={() => (
                  <Avatar
                    {...props}
                    textStyle={{ color: COLORS.clear }}

                    imageStyle={{
                      left: {
                        width: pxToDp(100),
                        height: pxToDp(100),
                        borderRadius: pxToDp(16),
                        backgroundColor:
                          UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
                      },
                      right: {
                        width: pxToDp(100),
                        height: pxToDp(100),
                        borderRadius: pxToDp(16),
                        backgroundColor:
                          UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
                      },
                    }}
                  />
                )}
                renderBubble={() => (
                  <Bubble
                    {...props}
                    optionTitles={[t('my.copy'), t('common.cancle')]}
                    renderTime={() => (
                      <Time
                        {...props}
                        timeTextStyle={{
                          left: {
                            ...props?.containerStyle?.left,
                            color: "#333333",
                          },
                          right: {
                            ...props?.containerStyle?.right,
                            color: "#333333",
                          },
                        }}
                        // timeFormat={'A hh:mm'}
                        containerStyle={{
                          left: {
                            ...props?.containerStyle?.left,
                            marginBottom: pxToDp(12),
                          },
                          right: {
                            ...props?.containerStyle?.right,
                            marginBottom: pxToDp(12),
                          },
                        }}
                      />
                    )}
                    wrapperStyle={{
                      left: {
                        ...props?.wrapperStyle?.left,
                        backgroundColor: "#F6F7F7",
                        paddingHorizontal: pxToDp(0),
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: pxToDp(24),
                        borderBottomLeftRadius: pxToDp(24),
                        borderBottomRightRadius: pxToDp(24),
                      },
                      right: {
                        ...props?.wrapperStyle?.right,
                        backgroundColor: "#C6D763",
                        paddingHorizontal: pxToDp(14),
                        borderTopLeftRadius: pxToDp(24),
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: pxToDp(24),
                        borderBottomRightRadius: pxToDp(24),
                      },
                    }}
                  />
                )}
              />
            );
          }}
          renderMessageText={(props) => {
            return (
              <MessageText
                {...props}
                optionTitles={[t('common.telephone'), t('common.sms'), t('common.cancle')]}
                textStyle={{
                  left: {
                    ...props?.textStyle?.left,
                    color: "#333333",
                    fontSize: pxToSp(28),
                    textAlign: "left",
                  },
                  right: {
                    ...props?.textStyle?.right,
                    color: "#333333",
                    textAlign: "left",
                  },
                }}
              />
            );
          }}
        />
      </View>
    );
  }
  const preView = () => {


    return (
      <View style={{ position: 'absolute', width: '100%', bottom: 0, height: 43 + useSafeAreaInsets().bottom, backgroundColor: '#272B34', paddingHorizontal: pxToDp(20) }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 43 }}>
          <View style={{ borderRadius: pxToDp(16), alignItems: 'center', flexDirection: 'row', height: 38, backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: '75%', paddingHorizontal: pxToDp(10) }}>
            <Text style={{ color: '#5C616C', width: '100%' }}>{t('community.you1')}</Text>
          </View>
          <IDBitBtn onPress={joinCommunity} textStyle={{ fontSize: pxToDp(24) }} text={t('community.join')} containerStyle={{ width: '20%', height: pxToDp(58) }} />
        </View>
      </View>
    )
  }
  return (
    <View
      style={[
        {
          backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
          flex: 1,
          paddingHorizontal: pxToDp(0),
        },
      ]}
    >
      {finishedLoad == true ? render() : null}
      {
        isJoinEd == false ?
          preView() : null
      }
      <Loading
        text=""
        isShow={isShow}
        onTimeOut={() => setisShow(false)}
      ></Loading>
    </View>
  );
};
export default GroupChatPage;
