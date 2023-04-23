import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  StyleProp,
  ViewStyle,
  Text,
} from "react-native";
import styles from "./styles";
import AnimatedLoader from "react-native-animated-loader";
import Config from "./Config";
export enum CardStyle {
  LOGINOUT_STYLE = 1, //退出登录
}
type PopProps = {
  style?: StyleProp<ViewStyle>;
  cardStyle?: CardStyle;
  isShow?: boolean;
  color?: string;
  text?: string;
  timeOutText?: string;
  onTimeOut?: () => void;
  thisTimeOut?: number;
};

const Loading: FunctionComponent<PopProps> = (props) => {
  const {
    style,
    thisTimeOut = 0,
    isShow = false,
    color,
    text,
    onTimeOut = () => {},
    timeOutText,
  } = props;
  const [isShowLoading, setisShowLoading] = useState(false);
  const ishowRef = useRef(false);
  useEffect(() => {
    setisShowLoading(isShow);
    ishowRef.current = isShow;
    if (isShow == true) {
      setTimeout(() => {
        if (ishowRef.current == true) {
          // Alert.alert(JSON.stringify(timeOutText||Config.TINEOUT_TEXT))
        }
        onTimeOut();
        setisShowLoading(false);
      }, thisTimeOut || Config.TINEOUT_SEC);
    }
  }, [isShow]);

  const renderView = () => {
    return (
            <AnimatedLoader
              visible={isShow}
              // overlayColor='rgba(178,178,178,0.8)'
              overlayColor='rgba(20, 26, 37,0.8)'
              source={require("./loader.json")}
              animationStyle={styles.load_progress}
              speed={1}
            >
              <Text style={[styles.load_text, style]}>{text}</Text>
            </AnimatedLoader>
    );
  };
  return renderView();
};

export default Loading;
