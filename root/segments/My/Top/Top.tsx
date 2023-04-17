import React, { FunctionComponent} from "react";
import { View, Image, Text,  StyleProp, ViewStyle, Clipboard } from "react-native";
import styles from "./styles";
import { pxToDp, toast } from "@/utils/system";
import Ripple from "react-native-material-ripple";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import useRedux from "@/hooks/useRedux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type OutPorps = {
    style?: StyleProp<ViewStyle>
    data?: any
}
const Top: FunctionComponent<OutPorps> = (props) => {
    const { style ,data} = props;
    const {wallet}=useRedux()

    const copyAdress = async (value: string) => {
        Clipboard.setString(value);
        let str = await Clipboard.getString();
        toast('复制成功')
        console.log('复制的内容', str)
      }
    return (
    <Ripple
        rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
        rippleContainerBorderRadius={10}
        style={[styles.container, {paddingTop:pxToDp(40)+useSafeAreaInsets().top},style]} pointerEvents={'box-none'} 
    >
        <View style={{ alignItems: "center" }}>
            <Image style={{ backgroundColor: 'red', width: pxToDp(130), height: pxToDp(130), borderRadius: pxToDp(100) }} ></Image>
            <Text style={{ fontWeight: 'bold', fontSize: pxToDp(34) }}>www.testCN.eth</Text>
            {/* <Text style={{ fontSize: pxToDp(30) ,width:pxToDp(300)}} ellipsizeMode={'middle'} numberOfLines={2}>DID:{imUserInfo?.userID}</Text> */}
            <PressableSlop onPress={() => copyAdress('0x7822d01737246a13f7979b9567e8d916f04ea074')}>
        <View style={{flexDirection: 'row' ,marginTop:pxToDp(32),height:pxToDp(60),alignItems:'center'}}>
          <Text style={styles.copy_text}>测试号地址1 点击复制:</Text>
          <Image
            style={styles.copy}
            source={require("@/resources/idbt/copy.png")}
          />
        </View>
      </PressableSlop>
      <PressableSlop onPress={() => copyAdress('0x68557cC1498Bcd8f70269f5D0B1a305B8882EDE3')}>
        <View style={{flexDirection: 'row' ,marginTop:pxToDp(32),height:pxToDp(60),alignItems:'center'}}>
          <Text style={styles.copy_text}>测试号地址2 点击复制:</Text>
          <Image
            style={styles.copy}
            source={require("@/resources/idbt/copy.png")}
          />
        </View>
      </PressableSlop>
            <View style={{ alignItems: "center", flexDirection: 'row' }}>
                <PressableSlop onPress={()=>Navigate.navigate('Followers')} style={{ alignItems: "center", flexDirection: 'row' }}>
                    <Text style={{ fontSize: pxToDp(30) }}>20</Text>
                    <Text style={{ fontSize: pxToDp(30) }}> Followers</Text>
                </PressableSlop>
                <PressableSlop onPress={ ()=>Navigate.navigate('Likes')} style={{ alignItems: "center", flexDirection: 'row', marginLeft: pxToDp(20) }}>
                    <Text style={{ fontSize: pxToDp(30) }}>20</Text>
                    <Text style={{ fontSize: pxToDp(30) }}> Likes</Text>
                </PressableSlop>
            </View>
        </View>
    </Ripple>
    );
};
export default Top;


