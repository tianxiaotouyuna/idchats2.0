import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, ScrollView } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import Top from "@/segments/Discover/Dappsquare/Top/Top";
import GDataList from "@/components/GDataList";
import { DiscoverService } from "@/services/index";
import DappCared from "@/components/DappCared/DappCared";
import { useHeaderHeight } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import NtfButton from "@/components/NtfButton/NtfButton";
import { color } from "react-native-reanimated";
import { COLORS } from "@/utils/Miscellaneous";

const ProjectInfo: FunctionComponent = (props) => {
    const headerHeight = useHeaderHeight();
    const gRef = useRef<GDataList>();
    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            title: '项目信息',
            headerTintColor: 'white',
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const renderItem = ({ item, index }: any) => {
        return <DappCared data={item} />;
    };
    const submmit=()=>{

    }
    return (
        <ScrollView style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight }]}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: pxToDp(28) }}>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#D5F713' }}>*</Text>
                        <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>中文名称</Text>
                    </View>
                    <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                        <TextInput style={{height:40}} placeholderTextColor={'#575C64'} placeholder={'输入你的中文名称'}></TextInput>
                    </IDBitTabBg>
                </View>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#D5F713' }}>*</Text>
                        <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>英文名称</Text>
                    </View>
                    <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                        <TextInput style={{height:40}} placeholderTextColor={'#575C64'} placeholder={'输入你的英文名称'}></TextInput>
                    </IDBitTabBg>
                </View>
            </View>


            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#D5F713' }}>*</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>项目简介（0/100）</Text>
                </View>
                    <IDBitTabBg style={{ paddingBottom: pxToDp(106), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                        <TextInput style={{height:40}} placeholderTextColor={'#575C64'} placeholder={'一句话简单描述项目，将出现在DAPP副标'}></TextInput>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#D5F713' }}>*</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>项目链接</Text>
                </View>
                    <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                        <TextInput style={{height:40}} placeholderTextColor={'#575C64'} placeholder={'输入链接'}></TextInput>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#D5F713' }}>*</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>社交媒体</Text>
                </View>
                    <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                        <TextInput style={{height:40}} placeholderTextColor={'#575C64'} placeholder={'输入链接'}></TextInput>
                </IDBitTabBg>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: pxToDp(28) }}>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#D5F713' }}>*</Text>
                        <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>IDChats社区链接</Text>
                    </View>
                    <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                        <TextInput style={{height:40}}placeholderTextColor={'#575C64'} placeholder={'输入你的中文名称'}></TextInput>
                    </IDBitTabBg>
                </View>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#D5F713' }}>*</Text>
                        <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>IDChats通信地址</Text>
                    </View>
                    <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                        <TextInput style={{height:40}} placeholderTextColor={'#575C64'} placeholder={'输入你的英文名称'}></TextInput>
                    </IDBitTabBg>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: pxToDp(28) }}>
                <Text style={{ color: '#D5F713' }}>*</Text>
                <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>LOGO</Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: pxToDp(84), height: pxToDp(86),marginVertical:pxToDp(46) }} source={require('@/resources/idbt/upload2.png')} />
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>点击上传文件</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#5C616C', fontSize: pxToDp(24), marginBottom: pxToDp(10) }}>或者拖拽上传</Text>

                </View>
                <Text style={{ marginLeft: pxToDp(10), color: '#5C616C', fontSize: pxToDp(24), marginBottom: pxToDp(10) }}>（Logo大小：200✖️200px,支持JPG，PNG）</Text>
            </View>
            <NtfButton style={{marginTop:pxToDp(104),marginBottom:pxToDp(300)}} text="提交" borderRadius={pxToDp(16)} backgroundColor="#D5F713" heigh={pxToDp(96)} textColor='#0F141E' textStyle={{fontSize:pxToSp(36)}} borderColor={COLORS.clear} onPress={submmit}></NtfButton>

        </ScrollView>
    );
};
export default ProjectInfo;


