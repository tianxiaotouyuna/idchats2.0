import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, Image, Text, View } from "react-native";
import { getLocalTime, isIOS, log, pxToDp, pxToSp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
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
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import MessageSendBtn from "@/components/MessageSendBtn/MessageSendBtn";
import { COLORS, FONTS } from "@/utils/Miscellaneous";
import { Navigate } from "@/utils/index";
import { IMService } from "@/services/index";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import IMServiceManager from "@/utils/IMServiceManager";
import { CbEvents } from "@/services/open_im_sdk";
import { WsResponse } from "@/services/open_im_sdk/types";
import { useHeaderHeight } from "@react-navigation/stack";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { t } from "i18next";
import { screenWidth } from "@/utils/Dimensions";
import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import FastImage from "react-native-fast-image";
import styles from "@/components/RootTabBar/styles";
const AIChatPage: FunctionComponent = (props) => {
  const [messages, setMessages] = useState([]);
  const [mMessageText, setMessageText] = React.useState("");

  const sendRef = useRef(GiftedChat);
  const stackRoute = useRoute();
  const chatData = useMemo(() => stackRoute?.params?.chatData, []);
  const imUserInfo = useMemo(() => stackRoute?.params?.imUserInfo, []);
  const [finishedLoad, setfinishedLoad] = useState(false);
  const headerHeight = useHeaderHeight();
  const inDetailRef = useRef(true);
  const safeArea = useSafeAreaInsets();
  const [isLoadEarlier, setIsLoadEarlier] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const count = 20;
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      title:
        chatData?.userID.length >= 10
          ? chatData.userID.substring(0, 5) +
          "..." +
          chatData.userID.substring(chatData.userID.length - 5)
          : chatData.userID,
      headerTintColor: "white",
    },
    statusBar: {
      backgroundColor: "transparent",
      barStyle: "light-content",
    },
  });

  const getMoreMessages = () => {
    if (isLoadEarlier == true || isLastPage == true) {//加载中 最后一页
      return;//
    }
    setIsLoadEarlier(true);
    getChatDetail();
  }
  useEffect(() => {
    IMServiceManager.getInstance()._imInstance.on(
      CbEvents.ONRECVNEWMESSAGE,
      (data: WsResponse) => {
        const obj = JSON.parse(data?.data);
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
        if (inDetailRef.current == true) readMsg();
      }
    );
    getChatDetail();
    return () => {
      inDetailRef.current = false;
    };
  }, []);

  const getChatDetail = async () => {

    let startClientMsgID;

    if (messages && messages.length) {
      startClientMsgID = messages[messages.length - 1]?.clientMsgID
      log(messages[messages.length - 1], 'messages0000')
    }
    let resp = await IMService.getMesgHistory({ groupID: chatData?.groupID, userID: chatData?.userID, count: count, startClientMsgID: startClientMsgID });
    if (resp.length < count) {
      setIsLastPage(true)
    };
    let newMssages = messages.concat(resp);
    setMessages(newMssages);
    setfinishedLoad(true);
    setIsLoadEarlier(false);
    log(newMssages, 'chatDatachatDatachatDatachatData')
    if (isLoadEarlier == false && chatData?.unreadCount > 0) {
      await IMService.readMsg(chatData, []);
    }
  };
  const readMsg = async () => {
    await IMService.readMsg(chatData, []);
  };
  //社区群聊、单聊里AI布局不同、提示文字等细节调整
  //充值时候，选择链的弹框
  const onSend = useCallback(async (msgs = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, msgs)
    );
    await IMService.sendMsg(chatData, msgs[0]?.text);
  }, []);

  const pushPersonPage = (user: User) => {
    if (imUserInfo?.userID != user._id)
      Navigate.navigate("PersonPage", { data: chatData });
    else Navigate.navigate("PersonPage", { data: imUserInfo });
  };
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
        <GiftedChat
          messagesContainerStyle={{ paddingHorizontal: pxToDp(20) }}
          messages={messages}
          onSend={(_messages) => onSend(_messages)}
          user={{
            _id: imUserInfo?.userID,
            avatar: imUserInfo?.faceURL,
          }}
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
          renderInputToolbar={(props) => {
            return (
              <InputToolbar
                {...props}
                containerStyle={{
                  borderTopWidth: 0,
                  marginBottom: -safeArea.bottom,
                  position: 'absolute',
                  bottom: 0
                }}
                renderComposer={() => (
                  <MessageSendBtn
                    style={{ width: screenWidth, paddingBottom: pxToDp(4) + useSafeAreaInsets().bottom, alignItems: 'center', justifyContent: 'center' }}
                    user={imUserInfo}
                    placeHodler={t('home.private')}
                    onPress={(_messages) => {
                      sendRef?.current.onSend(_messages);
                    }}
                  />
                )}
              ></InputToolbar>
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
            // if (props.currentMessage.text == 'welcome10086') return (
            //   <View style={{ flexDirection: 'row', paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL, paddingTop: UIELEMENTS.PADDING_TOP }}>
            //     <View style={{ height: pxToDp(116), alignItems: 'center' }}>
            //       <FastImage style={{ width: pxToDp(116), borderRadius: pxToDp(10), height: pxToDp(116) }} source={{ uri: chatData?.faceURL }}></FastImage>
            //       <View style={styles.dotStyle}>
            //       </View>
            //     </View>
            //     <View style={{ justifyContent: 'space-between', marginLeft: pxToDp(28), flex: 1 }}>
            //       <Text style={{ color: '#fff', fontSize: pxToSp(44), fontWeight: '500' }}>AI</Text>
            //       <Text style={{ color: '#ABABAB', fontSize: pxToSp(30) }}>{t('home.question')}</Text>
            //     </View>
            //   </View>
            // )
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
    </View>
  );
};
export default AIChatPage;
