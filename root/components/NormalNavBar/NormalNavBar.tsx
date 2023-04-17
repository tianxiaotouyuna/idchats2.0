import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  Modal,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import styles from './styles';
import {pxToDp, windowWidth} from '@/utils/system';
import PressableSlop from '../PressableSlop/PressableSlop';
import {Navigate} from '@/utils/index';
import {UIELEMENTS} from '@/constants/index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export enum CardStyle {
  LOGINOUT_STYLE = 1, //退出登录
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  cardStyle?: CardStyle;
  title?: string;
  sub_title?: string;
  insertMargin?: number;
  close?: (id: number) => void;
  tabMainPage?: boolean;
  rightTitle?: string;
};

const NormalNavBar: FunctionComponent<PopProps> = props => {
  const {
    style,
    title,
    sub_title,
    insertMargin,
    close,
    tabMainPage = false,
    rightTitle = false,
  } = props;
  const closePress = () => {
    // close()
    Navigate.goBack();
  };
  const renderView = () => {
    return (
      <View
        style={[
          style,
          {
            position:'absolute',
            left:0,
            top:0,
            height: pxToDp(160),
            width: windowWidth,
            paddingHorizontal: pxToDp(36),
            borderBottomLeftRadius: pxToDp(40),
            borderBottomRightRadius: pxToDp(40),
            backgroundColor: '#636969',
          },
        ]}>
        <View
          style={{
            marginTop: useSafeAreaInsets().top,
            flexDirection: 'row',
            justifyContent: tabMainPage?'center':'space-between',
            flex: 1,
            alignItems: 'center',
            width: '100%',
          }}>
          {tabMainPage == false && (
            <PressableSlop onPress={() => Navigate.goBack()}>
              <Image
                style={{
                  width: pxToDp(60),
                  height: pxToDp(60),
                  marginHorizontal: insertMargin,
                }}
                source={require('resources/image/back.png')}
              />
              
            </PressableSlop>
          )}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: pxToDp(50),
                fontWeight: 'bold',
                color: 'white',
              }}>
              {title}
            </Text>
            {sub_title&&sub_title.length?<Text style={{color: 'white', fontSize: pxToDp(28)}}>
              {sub_title}
            </Text>:null}
          </View>
          {tabMainPage == false && (
            <PressableSlop onPress={() => closePress()}>
              <Image
                style={{
                  width: pxToDp(60),
                  height: pxToDp(60),
                  marginHorizontal: insertMargin,
                }}
                source={require('resources/image/close.png')}
              />
            </PressableSlop>
          )}
        </View>
      </View>
    );
  };
  return renderView();
};

export default NormalNavBar;
