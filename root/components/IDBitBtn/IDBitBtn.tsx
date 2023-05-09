import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: Function;
  imageSource?: ImageRequireSource;
  text?: string;
  fullWidth?:boolean
  children?: ReactNode;
};

const IDBitBtn: FunctionComponent<butonProps> = (props) => {
  const { imgStyle,children,  onPress, imageSource, text,textStyle, containerStyle ,contentStyle,fullWidth=true} =
    props;
  const [borderRadius, setborderRadius] = useState(1000);
  const onLayout=(event)=> {
      const {x, y, height, width,borderRadius} = event.nativeEvent.layout;
      setborderRadius(borderRadius)
    }
  const isClick = () => {
    onPress&& onPress()
  }
  return (

<Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
      onPress={isClick}
      style={[styles.containerStyle,fullWidth?{width:'100%'}:{},containerStyle]}
      rippleContainerBorderRadius={borderRadius}
    >
      <View  onLayout={onLayout} style={[styles.contentStyle,fullWidth?{width:'100%'}:{},contentStyle]}>
        {children}
        {imageSource ? <Image
          source={imageSource}
          resizeMode={'stretch'}
        /> : null}
        {text ? <Text style={[styles.textStyle,textStyle]}>{text}</Text> : null}
      </View>
    </Ripple>
  );
};

export default IDBitBtn;
