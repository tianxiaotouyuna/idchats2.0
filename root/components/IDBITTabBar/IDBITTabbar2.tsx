import { UIELEMENTS } from "@/constants/index";
import { pxToDp, windowWidth } from "@/utils/system";
import React, { FunctionComponent, ReactNode } from "react";
import { Alert, Animated, ColorValue, ImageSourcePropType, Pressable, StyleProp, StyleSheet, Text, TextStyle,  ViewStyle } from "react-native";
import { Image, View } from "react-native-animatable";
import Ripple from "react-native-material-ripple";
import { TabBarProps } from "react-native-scrollable-tab-view";
import IDBITSearch, { SearchStyle } from "../IDBITSearch/IDBITSearch";
import PressableSlop from "../PressableSlop/PressableSlop";
type this_props = {
  searchFunction?:()=>void,
  addFunction?:()=>void,
  underImg?: ImageSourcePropType,
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
  children?: ReactNode,
  textSize?: number,
  animated?: boolean,
  backgroundColor?: ColorValue
  hasSeparator?: boolean,

}
const IDBITTabbar2: FunctionComponent<this_props> = (props: TabBarProps) => {

  const {searchFunction=()=>{},addFunction=()=>{}, hasSeparator = true, goToPage, scrollValue = 0, activeTab, tabs = [], textStyle, activeTextColor, inactiveTextColor, textSize
    , oneBarstyle, tabBarUnderlineStyle, tabUnderlineWidth, allBarStyle, tabUnderlineScaleX, children, animated = true, backgroundColor = 'white',
    activeTextFont, inactiveTextFont, underImg,
  } = props;
  const containerWidth=130;
  const numberOfTabs = tabs.length;
  const translateX = scrollValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth / numberOfTabs],
  });

  const _renderTab = (name, page, isTabActive, onPressHandler) => {
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const fontSize = isTabActive ? activeTextFont : inactiveTextFont;
    const underlineWidth = containerWidth / (numberOfTabs );
    return <Ripple
      rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE}
      style={{ flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      onPress={() => onPressHandler(page)}
    >
      <View style={styles.tab}>
        <Text style={[{ color: textColor, fontWeight, textAlign: "center", fontSize: fontSize,width:underlineWidth-12 }, textStyle]}>
          {name}
        </Text>
      </View>
    </Ripple>;
  }

  const renderRight=()=>(
    <View style={{flexDirection:'row',alignItems:"center"}}>
      <IDBITSearch searchStyle={SearchStyle.SEARCH_TOKEN_STYLE}></IDBITSearch>
      <PressableSlop onPress={addFunction}>
      <Image style={{borderRadius:pxToDp(8), width:pxToDp(56),height:pxToDp(56),marginLeft:pxToDp(12) }} resizeMode={'cover'}  source={require('@/resources/idbt/my/icon_tianjia.png')}></Image>
      </PressableSlop>
    </View>
  )

  const _renderUnderline = () => {
    const numberOfTabs = tabs.length;
    const underlineWidth = containerWidth / (numberOfTabs );
    const scale = tabUnderlineScaleX ? tabUnderlineScaleX : 3;
    const deLen = (containerWidth / numberOfTabs - underlineWidth) / 2;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: underlineWidth-12,
      height: 24,
      borderRadius: 6,
      backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
      left: 0,
      top: (40-24)/2,
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
          {alignItems:"center"},
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
    <View style={[styles.contariner ,{paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL-pxToDp(1.),width:'100%',flexDirection:'row',justifyContent:"space-between"}]}>
      <View style={[styles.tabs, {  width:containerWidth}]}>
        {children}
        {tabs.map((name, page) => {
          const isTabActive = activeTab === page;
          const renderTab = renderTab || _renderTab;
          return renderTab(name, page, isTabActive, goToPage);
        })}
        { _renderUnderline()}
      </View>
      {renderRight()}
    </View>
  );
};
export default IDBITTabbar2;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: 'center',
    borderRadius:pxToDp(12),
    // paddingBottom: 10
  },
  contariner: {
    height: 40,
  },
  tabs: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
