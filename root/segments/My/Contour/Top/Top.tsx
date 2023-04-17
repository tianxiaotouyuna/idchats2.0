import React, { FunctionComponent } from "react";
import { View, Image, Text, StyleProp, ViewStyle, Clipboard, ImageBackground } from "react-native";
import styles from "./styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import Ripple from "react-native-material-ripple";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import useRedux from "@/hooks/useRedux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import NtfButton from "@/components/NtfButton/NtfButton";
import { COLORS } from "@/utils/Miscellaneous";
type OutPorps = {
  style?: StyleProp<ViewStyle>
  data?: any
}
const Top: FunctionComponent<OutPorps> = (props) => {
  const { style, data } = props;

  return (
          <View >
          <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
      rippleContainerBorderRadius={10}
       pointerEvents={'box-none'} 
      >
      <ImageBackground source={require('@/resources/idbt/image_1.png')}
     blurRadius={30} 
     style={[styles.container, { marginHorizontal:-UIELEMENTS.PADDING_HORIZONTAL,flexDirection: 'row',alignItems:'center', paddingVertical: pxToDp(22),paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL }, style,]} pointerEvents={'box-none'}
     >

      <FastImage style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: pxToDp(124), height: pxToDp(124), borderRadius: pxToDp(10) }} resizeMode='cover' source={{ uri: data?.header }} />
      <View style={{ flex: 1 ,height:pxToDp(124),justifyContent:'space-between',marginLeft:pxToDp(16)}}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: "space-between" }}>
          <View >
            <Text style={{ color: '#fff', fontSize: pxToDp(28) }}>Apyshdaa66.com</Text>
            <Text style={{ color: '#B3B3B3', fontSize: pxToDp(24) }}>osijaa......B12B</Text>
          </View>
          <NtfButton backgroundColor="#D5F713" style={{ paddingHorizontal: pxToDp(12), paddingVertical: pxToDp(8) }} width={10000} borderRadius={pxToDp(6)} text="编辑资料" onPress={()=>{Navigate.navigate('EditInfo')}} imgStyle={{ width: pxToDp(22), height: pxToDp(22) }} imageSource={require('@/resources/idbt/Vector.png')} textColor="#0F141E" font={pxToSp(24)} borderColor={COLORS.clear}></NtfButton>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#CECECE', fontSize: pxToDp(24) }}>关注</Text>
            <Text style={{ color: '#fff', fontSize: pxToDp(24) , marginLeft: pxToDp(2)}}>133</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: pxToDp(26) }}>
            <Text style={{ color: '#CECECE', fontSize: pxToDp(24) }}>粉丝</Text>
            <Text style={{ color: '#fff', fontSize: pxToDp(24), marginLeft: pxToDp(2) }}>11</Text>
          </View>
        </View>
      </View>
      </ImageBackground>
    </Ripple>
    <Text style={{color:'#D5F713',fontSize:pxToDp(24),paddingVertical:pxToDp(18)}}>NFTs</Text>
    </View>
    );
};
export default Top;


