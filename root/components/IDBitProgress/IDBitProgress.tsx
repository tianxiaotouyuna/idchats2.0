import React, { FunctionComponent, ReactNode, useState } from "react";
import { View, StyleProp, ViewStyle, Pressable, Text, Image, Touchable, ImageURISource, TextStyle, ImageStyle, ImageRequireSource, Alert } from "react-native";
import styles from "./styles";
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";
type butonProps = {
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    isVisible?: boolean;
    color?: string;
    progress?: number;
};

const IDBitProgress: FunctionComponent<butonProps> = (props) => {
    const { containerStyle, isVisible ,color,progress} =
        props;
    return (    <Modal
        isVisible={isVisible}
        style={{ alignItems: "center" }}
        hideModalContentWhileAnimating={true}
        useNativeDriverForBackdrop={true}
        animationOutTiming={300}
        animationIn="bounceIn"
        animationOut="bounceOut"
      >
        <View
            style={[styles.containerStyle, containerStyle]}
        >
            <Progress.Bar progress={progress} width={200} color={color} />
        </View>
        </Modal>
    );
};

export default IDBitProgress;
