import React, { FunctionComponent, useRef, useState } from "react";
import { View, Image, Text, StyleProp, ViewStyle, Clipboard, TouchableHighlight } from "react-native";
import styles from "./styles";
import { isAndroid, pxToDp, pxToSp, toast, windowWidth } from "@/utils/system";
import Ripple from "react-native-material-ripple";
import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import useRedux from "@/hooks/useRedux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDBITSearch, { SearchStyle } from "@/components/IDBITSearch/IDBITSearch";
import NtfButton from "@/components/NtfButton/NtfButton";
import { COLORS } from "@/utils/Miscellaneous";
import ModalDropdown from "react-native-modal-dropdown";
import Banner from "@/components/Banner/Banner";
type OutPorps = {
    style?: StyleProp<ViewStyle>
    bannerData?: any
    changeChain?: () => void
}
const Top: FunctionComponent<OutPorps> = (props) => {
    const { style, bannerData, changeChain } = props;
    const [selectIndex, setselectIndex] = useState(0);
    const [titleIn, settitleIn] = useState('链');
    const dropRef = useRef(ModalDropdown)
    const selectItemIn = (value: string, index: number) => {
        settitleIn(value)
        setselectIndex(index)
        dropRef?.current.hide()
        changeChain()
    }
    const selectItemIn_first = (value: string, index: number) => {
        settitleIn('链')
        setselectIndex(0)
        dropRef?.current.hide()
        changeChain()
    }
    const dropdownInfos = [
        '所有链',
        '索拉纳',
        '以太坊',
        '币安链',
        '多边形',
        '仲裁',
    ]
    const renderItem_first = (option, index, isSelected) => {
        return isAndroid == true ? <TouchableHighlight underlayColor="lightgray" onPressOut={() => selectItemIn(dropdownInfos[index], index)}>
            <View style={{ paddingLeft: pxToDp(20), paddingRight: pxToDp(12), paddingVertical: pxToDp(12), width: pxToDp(290), alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                <Text style={{ color: '#181E29', fontSize: pxToSp(28) }}>{dropdownInfos[index]}</Text>
                <PressableSlop onPress={() => selectItemIn_first(dropdownInfos[index], index)}>
                    <Text style={{ color: '#2D2D2D', fontSize: pxToSp(20) }}>清除</Text>
                </PressableSlop>
            </View>
        </TouchableHighlight> :
            <View style={{ paddingLeft: pxToDp(20), paddingRight: pxToDp(12), paddingVertical: pxToDp(12), width: pxToDp(290), alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" }}>
                <Text style={{ color: '#181E29', fontSize: pxToSp(32) }}>{dropdownInfos[index]}</Text>
                <PressableSlop onPress={() => selectItemIn_first(dropdownInfos[index], index)}>
                    <Text style={{ color: '#2D2D2D', fontSize: pxToSp(20) }}>清除</Text>
                </PressableSlop>
            </View>
    }
    const renderItem = (option, index, isSelected) => {
        if (index == 0) return renderItem_first(option, index, isSelected)
        else return isAndroid == true ? <TouchableHighlight underlayColor="lightgray" onPressOut={() => selectItemIn(dropdownInfos[index], index)}>
            <View style={{ paddingLeft: pxToDp(20), paddingRight: pxToDp(12), paddingVertical: pxToDp(12), width: pxToDp(290), alignItems: 'center', flexDirection: 'row' }}>
                {
                    index == selectIndex ?
                        <Image style={{ width: pxToDp(36), height: pxToDp(36), backgroundColor: '#CFCFCF' }} source={require('@/resources/idbt/icon_xuanzhong.png')} /> :
                        <Image style={{ width: pxToDp(36), height: pxToDp(36), backgroundColor: '#CFCFCF' }} />
                }
                <Text style={{ color: '#181E29', fontSize: pxToSp(24), marginLeft: pxToDp(12) }}>{dropdownInfos[index]}</Text>

            </View>
        </TouchableHighlight> :
            <View style={{ paddingLeft: pxToDp(20), paddingRight: pxToDp(12), paddingVertical: pxToDp(12), width: pxToDp(290), alignItems: 'center', flexDirection: 'row' }}>
                {
                    index == selectIndex ?
                        <Image style={{ width: pxToDp(36), height: pxToDp(36), backgroundColor: '#CFCFCF' }} source={require('@/resources/idbt/icon_xuanzhong.png')} /> :
                        <Image style={{ width: pxToDp(36), height: pxToDp(36), backgroundColor: '#CFCFCF' }} />
                }
                <Text style={{ color: '#181E29', fontSize: pxToSp(24) }}>{dropdownInfos[index]}</Text>

            </View>
    }
    return (
        <View
            style={[styles.container, style]} pointerEvents={'box-none'}
        >
            <View style={{ alignItems: "center" }}>
                <Banner data={bannerData} containerStyle={{ backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: '100%', height: pxToDp(212), borderRadius: pxToDp(10) }}></Banner>
                <View style={{ alignItems: "center", flexDirection: 'row', justifyContent: "space-between", width: '100%' }}>
                    <View style={{ flexDirection: 'row', paddingTop: pxToDp(40), paddingBottom: pxToDp(32) }}>
                        <PressableSlop onPress={() => { }} style={{ alignItems: "center", flexDirection: 'row' }}>
                            <Image style={{ width: pxToDp(22), height: pxToDp(30) }}
                                source={require("@/resources/idbt/路径.png")}
                            ></Image>
                            <Text style={{ fontSize: pxToDp(28), color: '#fff' }}> 热度</Text>
                        </PressableSlop>

                        <ModalDropdown
                            onSelect={(index: any, value: any) => selectItemIn(value, index)} options={dropdownInfos}
                            animated={true}
                            showsVerticalScrollIndicator={false}
                            //  dropdownTextStyle={{backgroundColor:}}
                            dropdownStyle={{ marginTop: pxToDp(4), borderRadius: pxToDp(16), overflow: 'hidden', height: pxToDp((106 + 2) * 3), width: pxToDp(290) }}
                            renderRow={renderItem}
                            ref={dropRef}
                        >
                            <View style={{ marginLeft: pxToDp(16), paddingVertical: pxToDp(14), paddingHorizontal: pxToDp(20), borderRadius: pxToDp(29), alignItems: "center", flexDirection: 'row', backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}>
                                <Image style={{ width: pxToDp(28), height: pxToDp(28) }}
                                    source={require("@/resources/idbt/编组.png")}
                                ></Image>
                                <Text style={{ fontSize: pxToSp(28), color: '#D5F713' }}> {titleIn}</Text>
                            </View>
                        </ModalDropdown>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <IDBITSearch searchStyle={SearchStyle.DISCOVER_STYLE} style={{ marginRight: pxToDp(16) }} ></IDBITSearch>
                        <NtfButton onPress={() => Navigate.navigate('ProjectInfo')} textStyle={{ color: "#18191B", fontWeight: '700' }} text="提交应用" width={10000} backgroundColor="#D5F713" borderColor={COLORS.clear} style={{ paddingHorizontal: pxToDp(20), paddingVertical: pxToDp(8) }}></NtfButton>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default Top;


