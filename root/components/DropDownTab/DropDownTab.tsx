import React, { FunctionComponent, useRef, useState } from "react";
import { View, StyleProp, ViewStyle, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { isAndroid, pxToDp, pxToSp, windowWidth } from "@/utils/system";
import { Text } from "react-native-animatable";
import ModalDropdown from 'react-native-modal-dropdown';
import { t } from "i18next";
export enum EYEStyle {
  BLACKSTYLE = 0, //退出登录
  CREATE_IDO_STYLE = 1, //退出登录
  PAY_TYPE_STYLE = 2, //退出登录
}
type butonProps = {
  style?: StyleProp<ViewStyle>;
  selectItem?: (value:string, index:number) => void;
  title?: string;
  ttitleColor?: string;
};

const DropDownTab: FunctionComponent<butonProps> = (props) => {
  const [titleIn, settitleIn] = useState('ETH');
  const [rigthImg, setrigthImg] = useState(require('@/resources/second/icon_shangla.png'));
  const [selectIndex, setselectIndex] = useState(0);
  const dropRef=useRef(ModalDropdown)
  const { style,selectItem } =props;
    const selectItemIn=(value:string, index:number)=>{
      settitleIn(value)
      selectItem(value,index)
      setselectIndex(index)
      dropRef?.current.hide()
    }
    const renderItem = (option,index,isSelected) => {
    return  isAndroid==true?<TouchableHighlight underlayColor="lightgray"  onPressOut={()=>selectItemIn([t('guidePage.recovery'), t('guidePage.private')][index],index)}>
      <View style={{paddingHorizontal:pxToDp(32),width:windowWidth-2*pxToDp(32),height:pxToDp(106),alignItems:'center',flexDirection:'row',justifyContent:"space-between"}}>
      <Text  style={{color: '#0D0E10',fontSize:pxToSp(32)}}>{[t('guidePage.recovery'), t('guidePage.private')][index]}</Text>
         {
          index==selectIndex?
         <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/icon_xuanzhong.png')} />:null
        }   
      </View>
      </TouchableHighlight>:
      <View style={{paddingHorizontal:pxToDp(32),width:windowWidth-2*pxToDp(32),height:pxToDp(106),alignItems:'center',flexDirection:'row',justifyContent:"space-between"}}>
      <Text  style={{color: '#0D0E10',fontSize:pxToSp(32)}}>{[t('guidePage.recovery'), t('guidePage.private')][index]}</Text>
         {
          index==selectIndex?
         <Image style={{ width: pxToDp(36), height: pxToDp(36) }} source={require('@/resources/idbt/icon_xuanzhong.png')} />:null
        }   
      </View>
    }
  return (
      <ModalDropdown style={{ }}
       onSelect={(index: any, value: any) => selectItemIn(value, index)} options={[t('guidePage.recovery'), t('guidePage.private')]} 
       animated={true}
       showsVerticalScrollIndicator={false}
       onDropdownWillShow={() => setrigthImg(require('@/resources/second/icon_xiala.png'))}
       onDropdownWillHide={() => setrigthImg(require('@/resources/second/icon_shangla.png'))}
      //  dropdownTextStyle={{backgroundColor:}}
       dropdownStyle={{marginTop:pxToDp(4),borderRadius:pxToDp(16),overflow:'hidden',width:windowWidth-2*pxToDp(32)}}
       renderSeparator={()=><View style={{marginHorizontal:pxToDp(32), height: pxToDp(1) ,backgroundColor:'#D4D4D4'}}></View>}
       renderRow={renderItem}
       ref={dropRef}
       >
        <View style={styles.titleBg}>
          <Text style={styles.titleText} numberOfLines={1}>{titleIn}</Text>
            <Image style={{ width: pxToDp(24), height: pxToDp(24),marginLeft:pxToDp(4) }} source={rigthImg} />
        </View>
      </ModalDropdown>

  );
};

export default DropDownTab;

