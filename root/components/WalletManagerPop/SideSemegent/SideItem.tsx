import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "../styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { pxToDp, pxToSp } from "@/utils/system";
import { screenHeight } from "@/utils/Dimensions";
import PressableSlop from "../../PressableSlop/PressableSlop";
type butonProps = {
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: (index:number) => void;
    imageSource?: ImageRequireSource;
    imageSource_sel?: ImageRequireSource;
    isSelected?:boolean;
    thisIndex?:number
};

const SideItem: FunctionComponent<butonProps> = (props) => {
    const {  onPress, imageSource, containerStyle,isSelected, thisIndex,imageSource_sel} =
        props;
        
    return (
        <Ripple style={{
            flexDirection: 'row', width: '100%',
            height:pxToDp(104),
            paddingVertical: pxToDp(22),
            backgroundColor: isSelected==false?'#181E29':'#282E38',
            justifyContent:'center',
        }}
        onPress={()=>onPress(thisIndex)}
       >
            <Image
                style={styles.navItem}
                source={isSelected?imageSource_sel:imageSource}
                resizeMode={'stretch'}
            />
        </Ripple>
    )
};

export default SideItem;
