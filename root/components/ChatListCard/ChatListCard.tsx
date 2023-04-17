import styles from './styles';
import React, {
  FunctionComponent,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  Pressable,
  Alert,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { format, pxToDp, pxToSp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import { UIELEMENTS } from '@/constants/index';
import { Navigate } from '@/utils/index';
import { Swipeable } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import { COLORS } from '@/utils/Miscellaneous';
import { IMService } from '@/services/index';
import useRedux from '@/hooks/useRedux';
import Loading from '../LoadingSnipper/Loading';
import { SearchStyle } from '../IDBITSearch/IDBITSearch';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
export enum CardStyle {
  CHAT_LIST = 0, //退出登录
  SEARCH_LIST = 1, //退出登录
}
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>;
  data: any;
  imUserInfo?: any;
  usId?: string;
  onPress?: () => {};
  cardStyle?: CardStyle;
};
const ChatListCard: FunctionComponent<ExGoodsCardProps> = props => {
  const { style, data, imUserInfo, onPress = () => { }, cardStyle = 0 } = props;
  const { imIns, sendReduxAction } = useRedux();
  const [lastMsgData, setlastMsgData] = useState();
  const { i18n, t } = useTranslation();
  const renderTitle = () => {
    return (
      <Text
        style={{
          paddingTop: pxToDp(40),
          color: '#FFFFFF',
          fontSize: pxToSp(30),
          paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        }}>
        {data}{' '}
      </Text>
    );
  };

  function push() {
    Navigate.navigate('ChatDetail', { chatData: data, imUserInfo: imUserInfo });
  }
  useEffect(() => {
    if (cardStyle == CardStyle.CHAT_LIST) setlastMsgData(JSON.parse(data?.latestMsg || '{}'));
  }, []);
  const onClose = () => {

  }
  const setTop = async () => {
    await IMService.pinConversation(imIns, sendReduxAction, {
      conversationID: data?.conversationID,
      isPinned: true
    })
  }
  const unSetTop = async () => {
    await IMService.pinConversation(imIns, sendReduxAction, {
      conversationID: data?.conversationID,
      isPinned: false
    })

  }
  var swipeoutBtns = [
    {
      backgroundColor: '#CCC66D',
      component: <View style={{ width: pxToDp(136), flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: pxToDp(48), height: pxToDp(48) }} source={require('@/resources/idbt/icon_zhiding.png')} />
          <Text style={{ color: '#fff', fontSize: pxToDp(28), marginTop: pxToDp(4) }}>{i18n.t('home.pin')}</Text>
        </View>
      </View>,
      onPress: setTop
    },
    {
      backgroundColor: '#DB5E5E',
      component: <View style={{ width: pxToDp(136), flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: pxToDp(48), height: pxToDp(48) }} source={require('@/resources/idbt/icon_quxiaozhid.png')} />
          <Text style={{ color: '#fff', fontSize: pxToDp(28), marginTop: pxToDp(4) }}>{i18n.t('home.unpin')}</Text>
        </View>
      </View>,
      onPress: unSetTop
    }
  ]
  /***权重
   * 如果涨幅大于count+1，跟一次，count+1
   * 止盈促使
   * 若果涨幅大于3，就不加
   */
  const [isError, setIsError] = React.useState(false)
  const onError = () => setIsError(true)
  const renderContent = () => {
    return (

      <Swipeout autoClose={true} backgroundColor={COLORS.clear} right={swipeoutBtns} buttonWidth={pxToDp(136)}>
        <Ripple
          rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
          rippleContainerBorderRadius={10}
          onPress={push}>
          <View
            style={[
              data.isPinned ? styles.container_pinned : styles.container,
              style,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
              },
            ]}>
            <View style={{ flexDirection: 'row' }}>
              <FastImage style={{
                backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
                width: pxToDp(96),
                height: pxToDp(96),
                borderRadius: pxToDp(12),
              }}
                source={{ uri: data?.faceURL }}
                // defaultSource={require('@/resources/idbt/moren.png')}
                ></FastImage>

              <View style={{ flexDirection: 'column', flex: 1 }}>
                <View
                  style={{
                    paddingLeft: pxToDp(36),
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      width: pxToDp(200),
                      fontSize: pxToDp(32),
                      color: 'white',
                    }}
                    ellipsizeMode={'middle'}
                    numberOfLines={1}>
                    {data?.showName}
                  </Text>
                  <Text style={{ color: 'white' }}>
                    {format(data?.latestMsgSendTime)}
                  </Text>
                </View>
                <View
                  style={{
                    paddingLeft: pxToDp(36),
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginTop: pxToDp(8),
                      width: pxToDp(300),
                      fontSize: pxToDp(26),
                      color: '#7B7C8B',
                    }}
                    numberOfLines={1}>
                    {JSON.parse(data?.latestMsg)?.content}
                  </Text>
                  {data?.unreadCount ? (
                    <View
                      style={{
                        backgroundColor: '#D5F713',
                        borderRadius: pxToDp(20),
                        paddingLeft: pxToDp(18),
                        paddingRight: pxToDp(16),
                        paddingVertical: pxToDp(4),
                      }}>
                      <Text style={{ color: '#0F141E', fontSize: pxToSp(24) }}>
                        {data?.unreadCount}
                      </Text>
                    </View>
                  ) : (
                    <Text style={{ color: '#0F141E', fontSize: pxToSp(24) }}>
                      {''}
                    </Text>
                  )}
                </View>
                <View style={{ marginLeft: pxToDp(36), backgroundColor: '#rgba(228, 228, 228, .09 )', height: pxToDp(.5), width: '100%', position: 'absolute', bottom: -pxToDp(22) }}></View>
              </View>
            </View>
          </View>
        </Ripple>
      </Swipeout>
    );
  };

  const renderSearchRow = () => {
    return (
      <Ripple
        rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
        rippleContainerBorderRadius={10}
        onPress={push}>
        <View
          style={[
            styles.container,
            style,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
            },
          ]}>
          <View style={{ flexDirection: 'row' }}>
            <FastImage style={{
              backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
              width: pxToDp(96),
              height: pxToDp(96),
              borderRadius: pxToDp(12),
            }}
            source={{ uri: data?.faceURL } }
              // defaultSource={require('@/resources/idbt/moren.png')}
              resizeMode='cover' source={{ uri: data?.faceURL }} />
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <View
                style={{
                  paddingLeft: pxToDp(36),
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    width: pxToDp(200),
                    fontSize: pxToDp(32),
                    color: 'white',
                  }}
                  ellipsizeMode={'middle'}
                  numberOfLines={1}>
                  {data?.showName}
                </Text>
              </View>
              <View style={{ marginLeft: pxToDp(36), backgroundColor: '#rgba(228, 228, 228, .09 )', height: pxToDp(.5), width: '100%', position: 'absolute', bottom: -pxToDp(22) }}></View>
            </View>
          </View>
        </View>
      </Ripple>
    )
  }
  return typeof data === 'string' ? renderTitle() : (cardStyle == CardStyle.SEARCH_LIST ? renderSearchRow() : renderContent());
};

export default ChatListCard;
