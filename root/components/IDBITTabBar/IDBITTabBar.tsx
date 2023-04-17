import { UIELEMENTS } from "@/constants/index";
import { pxToDp, windowWidth } from "@/utils/system";
import React, { FunctionComponent, ReactNode } from "react";
import { Animated, ColorValue, ImageSourcePropType, Pressable, StyleProp, StyleSheet, Text, TextPropTypes, TextStyle, ViewPropTypes, ViewStyle } from "react-native";
import { Image, View } from "react-native-animatable";
import Ripple from "react-native-material-ripple";
import { TabBarProps } from "react-native-scrollable-tab-view";
type this_props = {
  underImg?: ImageSourcePropType
  textStyle?: StyleProp<TextStyle>,
  activeTextColor?: string,
  inactiveTextColor?: string,
  activeTextFont?: number,
  inactiveTextFont?: number,
  tabBarUnderlineStyle?: StyleProp<ViewStyle>,
  tabUnderlineWidth?: number
  oneBarstyle?: StyleProp<TextStyle>,
  allBarStyle?: StyleProp<TextStyle>,
  tabUnderlineScaleX?: number,
  children?: ReactNode
  textSize?: number
  animated?: boolean
  backgroundColor?: ColorValue
  hasSeparator?: boolean
  containerWidth: number
}
const IDBITTabBar: FunctionComponent<this_props> = (props: TabBarProps) => {

  const { hasSeparator = true, goToPage, scrollValue = 0, activeTab, tabs = [], textStyle, activeTextColor, inactiveTextColor, textSize
    , oneBarstyle, tabBarUnderlineStyle, tabUnderlineWidth, allBarStyle, tabUnderlineScaleX, children, animated = true, backgroundColor = 'white',
    activeTextFont, inactiveTextFont, containerWidth, underImg
  } = props;
  const numberOfTabs = tabs.length;
  const translateX = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth / numberOfTabs],
  });

  const _renderTab = (name, page, isTabActive, onPressHandler) => {
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const fontSize = isTabActive ? activeTextFont : inactiveTextFont;
    return <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
      style={{ flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      onPress={() => onPressHandler(page)}
    >
      <View style={styles.tab}>
        <Text style={[{ color: textColor, fontWeight, textAlign: "center", fontSize: fontSize }, textStyle]}>
          {name}
        </Text>
      </View>
    </Ripple>;
  }


  const _renderUnderline = () => {
    const numberOfTabs = tabs.length;
    const underlineWidth = tabUnderlineWidth ? tabUnderlineWidth : containerWidth / (numberOfTabs * 2);
    const scale = tabUnderlineScaleX ? tabUnderlineScaleX : 3;
    const deLen = (containerWidth / numberOfTabs - underlineWidth) / 2;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: underlineWidth,
      height: pxToDp(8),
      borderRadius: 2,
      backgroundColor: activeTextColor,
      bottom: 0,
      left: deLen
    };

    const scaleValue = (defaultScale: number) => {
      let arr = new Array(numberOfTabs * 2);
      return arr.fill(0).reduce(function (pre, cur, idx) {
        idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5);
        idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
        return pre
      }, { inputRange: [], outputRange: [] })
    }
    const scaleX = scrollValue.interpolate(scaleValue(scale));

    return (
      animated?  <Animated.View
        style={[
          tabUnderlineStyle,
          {
            transform: [
              { translateX },
              { scaleX }
            ],
          },
          tabBarUnderlineStyle,
        ]}
      />
      :
        <View
          style={tabUnderlineStyle}
        />
    )
  }
  const _renderUnderlineImg = () => {
    // const numberOfTabs = tabs.length;
    // const underlineWidth = tabUnderlineWidth ? tabUnderlineWidth : containerWidth / (numberOfTabs * 2);
    // const scale = tabUnderlineScaleX ? tabUnderlineScaleX : 3;
    // const deLen = (containerWidth / numberOfTabs - underlineWidth) / 2;
    // const tabUnderlineStyle = {
    //   position: 'absolute',
    //   bottom: 0,
    //   left: deLen
    // };
    // return (
    //   <Image style={[tabUnderlineStyle,{ width: pxToDp(63), height: pxToDp(17)} ]} source={underImg}></Image>
    // )

    const numberOfTabs = tabs.length;
    const underlineWidth = tabUnderlineWidth ? tabUnderlineWidth : containerWidth / (numberOfTabs * 2);
    const scale = tabUnderlineScaleX ? tabUnderlineScaleX : 3;
    const deLen = (containerWidth / numberOfTabs - underlineWidth) / 2;
    const tabUnderlineStyle = {
      width: underlineWidth,
      height: pxToDp(17),
      position: 'absolute',
      bottom: 0,
      left: deLen
    };

    const scaleValue = (defaultScale: number) => {
      let arr = new Array(numberOfTabs * 2);
      return arr.fill(0).reduce(function (pre, cur, idx) {
        idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx - 1] + 0.5);
        idx % 2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
        return pre
      }, { inputRange: [], outputRange: [] })
    }
    const scaleX = scrollValue.interpolate(scaleValue(scale));

    return (
      animated?  <Animated.Image
      source={underImg}
        style={[
          tabUnderlineStyle,
          {
            transform: [
              { translateX },
              { scaleX }
            ],
          },
          tabBarUnderlineStyle,
        ]}
      />
      :
      <View
        style={tabUnderlineStyle}
      />
    )
  }
  return (
    <View style={[hasSeparator ? styles.contariner : styles.contariner_noSepecter, { backgroundColor: backgroundColor }]}>
      <View style={[styles.tabs, { backgroundColor: backgroundColor, width: containerWidth }]}>
        {children}
        {tabs.map((name, page) => {
          const isTabActive = activeTab === page;
          const renderTab = renderTab || _renderTab;
          return renderTab(name, page, isTabActive, goToPage);
        })}
        { underImg?_renderUnderlineImg():_renderUnderline()}
      </View>
    </View>
  );
};
export default IDBITTabBar;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 10
  },
  contariner: {
    height: 50,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
    backgroundColor: 'white'
  },
  contariner_noSepecter: {
    height: 50,
    backgroundColor: 'white'
  },
  tabs: {
    height: 49,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
});
