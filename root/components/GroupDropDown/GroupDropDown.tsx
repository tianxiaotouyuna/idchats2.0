import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, StyleProp, ViewStyle, Image, TouchableHighlight, TouchableNativeFeedback, Alert } from "react-native";
import styles from "./styles";
import { isAndroid, pxToDp, pxToSp, windowWidth } from "@/utils/system";
import PressableSlop from "../PressableSlop/PressableSlop";
import { Text } from "react-native-animatable";
import ModalDropdown from 'react-native-modal-dropdown';
import { t } from "i18next";
import { UIELEMENTS } from "@/constants/index";
import { COLORS } from "@/utils/Miscellaneous";
import { screenWidth } from "@/utils/Dimensions";
export enum EYEStyle {
  BLACKSTYLE = 1, //退出登录
  WHITESTYLE = 2, //退出登录
}
type butonProps = {
  style?: StyleProp<ViewStyle>;
  selectItem?: (value: string, index: number) => void;
  title?: string;
  ttitleColor?: string;
  data?: any
};

const GroupDropDown: FunctionComponent<butonProps> = (props) => {
  const [titleIn, settitleIn] = useState(t('community.announcement'));
  const [rigthImg, setrigthImg] = useState(require('@/resources/idbt/icon_shangla.png'));
  const [selectIndex, setselectIndex] = useState(0);
  const dropRef = useRef(ModalDropdown)
  const { style, selectItem, data } = props;
  const selectItemIn = (value: string, index: number) => {
    settitleIn(value?.channelName)
    selectItem(value, index)
    setselectIndex(index)
    dropRef?.current.hide()
  }
  useEffect(() => {

    settitleIn(data[0]?.channelName)
  }, [])

  const renderItem = (option, index, isSelected) => {
    return isAndroid == true ? <TouchableHighlight style={{backgroundColor:'rgba(20, 26, 37, 1)'}} underlayColor="lightgray" onPressOut={() => selectItemIn(data[index], index)}>
      <View style={{ backgroundColor: 'rgba(20, 26, 37, 1)', paddingHorizontal: pxToDp(20), height: pxToDp(88), alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
        <View style={{ flexDirection: 'row' }}>
          {
            index == 0 ?
              <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/community/icon_gonggao.png')}></Image>
              : (index == 1 ?
                <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/community/icon_guangchang.png')} /> : <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/community/icon_jing.png')} />
              )

          }
          <Text style={{ color: '#ABABAB', fontSize: pxToSp(32), marginLeft: pxToDp(6) }}>{data[index].channelName}</Text>
        </View>
        {
          index == selectIndex ?
            <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/community/icon_xuanzhongyuan.png')} /> : <View style={{ width: pxToDp(36), height: pxToDp(36), borderRadius: pxToDp(36), borderWidth: pxToDp(1), borderColor: '#979797' }} ></View>
        }
      </View>
    </TouchableHighlight> :
      <View style={{ backgroundColor: 'rgba(20, 26, 37, 1)', paddingHorizontal: pxToDp(20), width: windowWidth - 2 * 16, height: pxToDp(88), alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
        <View style={{ flexDirection: 'row' }}>
          {
            index == 0 ?
              <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/community/icon_gonggao.png')}></Image>
              : (index == 1 ?
                <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/community/icon_guangchang.png')} /> : <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/community/icon_jing.png')} />
              )

          }
          <Text style={{ color: '#ABABAB', fontSize: pxToSp(32), marginLeft: pxToDp(6) }}>{data[index].channelName}</Text>
        </View>
        {
          index == selectIndex ?
            <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/community/icon_xuanzhongyuan.png')} /> : <View style={{ width: pxToDp(36), height: pxToDp(36), borderRadius: pxToDp(36), borderWidth: pxToDp(1), borderColor: '#979797' }} ></View>
        }
      </View>
  }
  return (
    <ModalDropdown style={{ width: 200,paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL}}
      onSelect={(index: any, value: any) => selectItemIn(value, index)} options={data}
      animated={true}
      showsVerticalScrollIndicator={false}
      onDropdownWillShow={() => setrigthImg(require('@/resources/idbt/icon_xiala.png'))}
      onDropdownWillHide={() => setrigthImg(require('@/resources/idbt/icon_shangla.png'))}
      //  dropdownTextStyle={{backgroundColor:}}
      dropdownStyle={{ paddingTop: pxToDp(4), borderRadius: pxToDp(8), overflow: 'hidden', height: pxToDp((88 + 2) * data.length), marginLeft:-(screenWidth-200)/2,width:screenWidth-2*UIELEMENTS.PADDING_HORIZONTAL,backgroundColor: 'rgba(20, 26, 37, 1)', borderColor: COLORS.clear }}
      renderSeparator={() => <View style={{ marginHorizontal: pxToDp(32), height: pxToDp(1), backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></View>}
      renderRow={renderItem}
      ref={dropRef}
    >
      <View style={styles.titleBg}>
        <Text style={styles.titleText} numberOfLines={1}>{titleIn}</Text>
        <Image style={{ width: pxToDp(24), height: pxToDp(24), marginLeft: pxToDp(6) }} source={rigthImg} />
      </View>
    </ModalDropdown>

  );
};

export default GroupDropDown;
