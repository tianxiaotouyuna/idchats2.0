import React, { FunctionComponent, ReactNode, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import Ripple from "react-native-material-ripple";
import { pxToDp } from "@/utils/system";
type butonProps = {
    containerStyle?: StyleProp<ViewStyle>;
    imgStyle?: StyleProp<ImageStyle>;
    onPress?: () => void;
    data?: any
};

const BannerCard: FunctionComponent<butonProps> = (props) => {
    const { imgStyle, onPress, data, containerStyle } =
        props;
    const [borderRadius, setborderRadius] = useState(1000);
    const onLayout = (event) => {
        const { x, y, height, width, borderRadius } = event.nativeEvent.layout;
        setborderRadius(borderRadius)
    }
    const isClick = () => {
        onPress && onPress()
    }
    return (
        <Ripple
            rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
            onPress={isClick}
            style={[styles.containerStyle, containerStyle]}
        // rippleContainerBorderRadius={borderRadius}
        >

            <View style={containerStyle}>
                <FastImage style={styles.imgStyle} resizeMode='cover' source={{ uri: data?.bannerImage }} />
            </View>
        </Ripple>
    );
};

export default BannerCard;
