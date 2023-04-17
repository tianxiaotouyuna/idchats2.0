import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, ScrollView, Pressable } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useHeaderHeight } from "@react-navigation/stack";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import { t } from "i18next";
import Ripple from "react-native-material-ripple";
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import MultipleInpput from "@/components/MultipleInpput/MultipleInpput";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UIELEMENTS } from "@/constants/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import Modal from "react-native-modal/dist/modal";
import CommunityAlert, { AlertStyle } from "@/components/NFTAlert/CommunityAlert/CommunityAlert";
import CommunityPop, { CommunityPopStyle } from "@/components/CommunityPop/CommunityPop";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { pinFileToIPFS } from "@/utils/uploadFile";
import Loading from "@/components/LoadingSnipper/Loading";
import { useRoute } from "@react-navigation/native";
import { BigNumber } from "bignumber.js";
import { CommunityService } from "@/services/index";
import useRedux from "@/hooks/useRedux";
import IDODropDownTab from "@/components/IDODropDownTab/IDODropDownTab";
import moment from "moment";
import { ethers } from "ethers";
import { gd } from "@/utils/pglobal";
import IdoAbi from "@/constants/config/abi/ido.json"
import { Navigate } from "@/utils/index";
export type IdoParams = {
    tokenA: string;
    tokenB: string;
    projectText: string;
    groupID: string;
    startTime: number;
    endTime: number;
    lockNum: number;
    inTokenCapacity: string;
    inTokenAmount: string;
    outTokenCapacity: string;
    outTokenSupply: string;
    decimalA: number;
    decimalB: number;
    maxExchange: string;
    exchange: string;
    timeList: number[];
    projectType: number; // 0 single 1 double
};
const CreateIDO2: FunctionComponent = (props) => {
    const headerHeight = useHeaderHeight();
    const chatData: any = useRoute().params?.chatData ?? {};
    const [startTime, setstartTime] = useState('请选择开始时间');
    const [firstUnlockTime, setfirstUnlockTime] = useState('第一次解锁日期');
    const [showAlert, setshowAlert] = useState(false);
    const [deleteCommunity, setdeleteCommunity] = useState();
    const [endTime, setendTime] = useState('请选择结束时间');
    const [showPop, setshowPop] = useState(false);
    const [showSlectToken, setshowSlectToeken] = useState(false);
    const [showSlectToken2, setshowSlectToken2] = useState(false);
    const [result, setresult] = useState(null);
    const [description, setdescription] = useState('');
    const [showPop2, setshowPop2] = useState(false);
    const [showPop3, setshowPop3] = useState(false);
    const [projectName, setprojectName] = useState('');
    const [tokenName, settokenName] = useState('');
    const [tokenInfo, settokenInfo] = useState(null);
    const [tokenInfo2, settokenInfo2] = useState(null);
    const [showLoading, setshowLoading] = useState(false);
    const [insertCount, setinsertCount] = useState('');
    const [exchangeCount, setexchangeCount] = useState('');
    const [allCount, setallCount] = useState('');
    const [danren, setdanren] = useState('');
    const [openCount, setopenCount] = useState('');
    const [Period, setPeriod] = useState('');
    const [twiterLink, settwiterLink] = useState('');
    const [website, setwebsite] = useState('');
    const [type, settype] = useState(0);
    const [unlockRules, setunlockRules] = useState('');
    const { selectWallet } = useRedux()
    const handleSuccess = Function;
    const [approved, setapproved] = useState(false);
    //   const { createIdo } = useIDOs({ onTxSuccess: handleSuccess},{});
    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            headerTitle: t('community.create9'),
            headerTintColor: 'white',
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });


    const selectFromLocal = async () => {

        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '图片库',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 600,
            maxHeight: 600,
            aspectX: 2,
            aspectY: 1,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        launchImageLibrary(options,
            (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    Alert.alert('自定义按钮:' + response.customButton)
                } else {
                    setresult(response.assets)
                }
            }
        )
    }

    const hideDatePicker = () => {
        setshowPop(false);
    };

    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes();
        setendTime(Y + M + D + h + m);
        hideDatePicker();
    };
    const hideDatePicker2 = () => {
        setshowPop2(false);
    };
    const handleConfirm2 = (date: any) => {
        console.warn("A date has been picked: ", date);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes();
        setstartTime(Y + M + D + h + m);
        hideDatePicker2();
    };

    const hideDatePicker3 = () => {
        setshowPop3(false);
    };

    const handleConfirm3 = (date: any) => {
        console.warn("A date has been picked: ", date);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes();
        setfirstUnlockTime(Y + M + D + h + m);
        hideDatePicker3();
    };
    const uploadLogo = async () => {
        let formData = new FormData();
        formData.append('file', { uri: result[0].uri, name: result[0].fileName, type: 'image/jpeg' })
        await pinFileToIPFS(formData, (responseData: any) => {
            console.log('Fetch Success==================');
            console.log(responseData);
            return 'ipfs://' + responseData?.IpfsHash;
        }, (e: any) => {
            toast(t('common.error' + ':' + JSON.stringify(e)))
        })
    }
    const getbackParams=(data:any)=>{
        setapproved(data?.isApproved)
    }
const checkApproved=()=>{
    if(approved==false){
        setshowLoading(true)
        setTimeout(() => {
            setshowLoading(false)
            Navigate.navigate('Approve', {idoData: {
                tokenInfo:tokenInfo2,
                idoContract_Address:'0xbdac78ad89149343a8c0f38ae768c0a90d09ebd1',
                resevier_Address:'0x7E89c2b18B269864DE7caC7fCbCe64b2BF74b75D',
                inTokenCapacity:'2000',
                token_Address:'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
              },setBackParams:(data:any)=>getbackParams(data)});
        }, 1000);
    }
    else createIDO();
}
    const createIDO = async () => {
    //     Alert.alert(chatData?.groupID)
    // const wallet_ = new ethers.Wallet(selectWallet?.privateKey, gd.public_provider);

    // const args=
    // {
    //     tokenB: "0xd989D103CC62Ff24d58a127268aED1f3C99796F2",
    //     tokenA: "0x87db11d115222522d97ea4ceeddfa1e8e7409b8d",
    //     startTime: 1680789326,
    //     endTime: 1681394131,
    //     inTokenCapacity: "300000000",
    //     inTokenAmount: "0",
    //     outTokenCapacity: "0",
    //     outTokenSupply: "300000000",
    //     projectText: "",
    //     groupID: chatData?.groupID,
    //     lockNum: 6,
    //     decimalA: 1000000000000000,
    //     decimalB: 1,
    //     maxExchange: "10000000",
    //     exchange: "2500",
    //     timeList: [
    //       1682690139,
    //       1685282139,
    //       1687874139,
    //       1690466139,
    //       1693058139,
    //       1695650139,
    //       1698242139,
    //       1700834139,
    //       1703426139,
    //       1706018139,
    //       1708610139,
    //       1711202139,
    //       1713794139,
    //       1716386139,
    //       1718978139,
    //       1721570139,
    //       1724162139,
    //       1726754139,
    //       1729346139,
    //       1731938139,
    //       1734530139,
    //       1737122139,
    //       1739714139,
    //       1742306139,
    //       1744898139,
    //       1747490139,
    //       1750082139,
    //       1752674139,
    //       1755266139,
    //       1757858139,
    //       1760450139,
    //       1763042139,
    //       1765634139,
    //       1768226139,
    //       1770818139,
    //       1773410139,
    //       1776002139,
    //       1778594139,
    //       1781186139,
    //       1783778139,
    //       1786370139,
    //       1788962139,
    //       1791554139,
    //       1794146139,
    //       1796738139,
    //       1799330139,
    //       1801922139,
    //       1804514139,
    //       1807106139,
    //       1809698139,
    //       1812290139,
    //       1814882139,
    //       1817474139,
    //       1820066139,
    //       1822658139,
    //       1825250139,
    //       1827842139,
    //       1830434139,
    //       1833026139,
    //       1835618139,
    //       1838210139,
    //       1840802139,
    //       1843394139,
    //       1845986139,
    //       1848578139,
    //       1851170139,
    //     ],
    //     projectType: 1,
    //   }
    // const signer = wallet_.connect(gd.public_provider);
    // const contract = new ethers.Contract('0x9B3802d47663083abd60249A7a2a0DB31b7Aec10', IdoAbi, signer);
    // const gasPrice =await gd.public_provider.getGasPrice()
    // let overrides = {
    //     gasLimit: 1230000,
    //     gasPrice: gasPrice,
    //     nonce: (await gd.public_provider.getTransactionCount(selectWallet.address)),
    //   }
    // const tx = await contract.createIDO({...args},overrides);
    // await tx.wait();
    // return
    // 等待交易上链
        if (projectName.length == 0) { toast('请输入项目名称'); return; }
        else if (tokenInfo2 == null) { toast('请输入代币名称'); return; }
        else if (description.length == 0) { toast('请输入项目简介'); return; }
        else if (insertCount.length == 0) { toast('请输入代币数量'); return; }
        else if (exchangeCount.length == 0) { toast('请输入兑换的代币数量'); return; }
        else if (danren.length == 0) { toast('请输入担任兑换上线'); return; }
        else if (allCount.length == 0) { toast('请输入总数量'); return; }
        else if (openCount.length == 0) { toast('请输入解锁次数'); return; }
        else if (twiterLink.length == 0) { toast('请输入推特链接'); return; }
        else if (website.length == 0) { toast('请输入官网链接'); return; }
        else if (firstUnlockTime == '第一次解锁日期') { toast('请选择第一次解锁日期'); return; }
        else if (startTime == '请选择开始时间') { toast('请选择开始时间'); return; }
        else if (endTime == '请选择结束时间') { toast('请选择结束时间'); return; }
        setshowLoading(true)
        var startTime_stamp = new Date(startTime).getTime() / 1000;
        var endTime_stamp = new Date(endTime).getTime() / 1000;
        const exchange = new BigNumber(exchangeCount)
            .div(insertCount)
            .times(10 ** (tokenInfo2?.decimals || 18))
            .div(1000)
            .toFixed(0)
            .toString();
        const timeList = getTimeList(30, openCount, 1);
        const struct: IdoParams = {
            tokenB: "0x7E89c2b18B269864DE7caC7fCbCe64b2BF74b75D",
            tokenA: "0xe21Ec84E66acD04ca1c4037b989210Faf1b7398C",
            startTime: startTime_stamp,
            endTime: endTime_stamp,
            inTokenCapacity: new BigNumber(allCount).times(10 ** (tokenInfo2?.decimals || 18)).toString(),
            inTokenAmount: "0",
            outTokenCapacity: "0",
            outTokenSupply: new BigNumber(allCount).times(10 ** (tokenInfo2?.decimals || 18)).toString(),
            projectText: description,
            groupID: chatData?.groupID,
            lockNum: timeList.length,
            decimalA: 1000000000000000,
            decimalB: 1,
            maxExchange: new BigNumber(danren)
                .times(10 ** (tokenInfo2?.decimals || 18))
                .toFixed(0)
                .toString(),
            exchange,
            timeList,
            projectType: 1,
        };
        let formData = new FormData();
        formData.append('file', { uri: result[0].uri, name: result[0].fileName, type: 'image/jpeg' })
        pinFileToIPFS(formData, async (responseData: any) => {
            console.log('Fetch Success==================');
            console.log(responseData);
            const logoAddress = 'ipfs://' + responseData?.IpfsHash;

            const projectText = {
                logo: logoAddress,
                name: projectName.trim(),
                proIntroduction: description.trim(),
                tLink: twiterLink?.trim(),
                oLink: website?.trim(),
            };

            console.log('structstructstructstruct\n' + JSON.stringify(struct));
            console.log('projectText\n' + JSON.stringify(projectText));
            await CommunityService.createIdo(struct, selectWallet, projectText,tokenInfo2)
            setshowLoading(false)
        }, (e: any) => {
            toast(t('common.error' + ':' + JSON.stringify(e)))
            setshowLoading(false)
        })
    }
    //从1970年开始的毫秒数然后截取10位变成 从1970年开始的秒数
    function timest() {
        var tmp = Date.parse(new Date()).toString();
        tmp = tmp.substr(0, 10);
        return tmp;
    }
    const getTimeList = (unlockRules: any, unLockCount: any, lockPeriod: any,) => {
        var firstUnlock = new Date(firstUnlockTime).getTime() / 1000;
        let list: number[] = [];
        for (let i = 0; i < unLockCount; i++) {
            list.push(firstUnlock + i * unlockRules * 86400);
        }
        return list;
    };
    const handleRuleChange = (val: string, number: number) => {
        if (number == 0) {
            settype(0)
            setunlockRules('1')
        }
        else if (number == 1) {
            settype(1)
            setunlockRules('30')
        }
        else {
            settype(2)
            setunlockRules('90')
        }
        if (val === "1") {
            setopenCount('1')
            setPeriod(moment(endTime).add(1, "minute"))
        } else {
            // form.setFieldValue("unLockCount", form.getFieldValue("unLockCount"));
        }
    };
    return (
        <ScrollView style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight }]}>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingHorizontal: pxToDp(16), justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.upload11')}</Text>
                        <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                    </View>

                    <Ripple onPress={selectFromLocal}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {
                                result ?
                                    <Image style={{ width: pxToDp(88), height: pxToDp(88), borderRadius: pxToDp(12), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }} source={{ uri: result[0].uri, scale: 1 }} />
                                    : <Image style={{ width: pxToDp(88), height: pxToDp(88), borderRadius: pxToDp(12) }} source={require('@/resources/idbt/community/addIdoImage.png')} />
                            }
                            <View style={{ marginLeft: pxToDp(24) }}>
                                <Text style={{ color: '#DADADA', marginTop: pxToDp(6), fontSize: pxToSp(24) }}>{t('community.leasgt')}</Text>
                                <Text style={{ color: '#DADADA', marginTop: pxToDp(6), fontSize: pxToSp(24) }}>{t('community.leasgt')}</Text>

                            </View>
                        </View>
                    </Ripple>
                </View>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.project2')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                    <TextInput onChangeText={(text: string) => setprojectName(text)} value={projectName} style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.enter5')}></TextInput>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.token')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16), height: 40, justifyContent: 'center' }}>
                    {tokenInfo2 ? <Text style={{ color: '#fff' }} >{tokenInfo2.symbol}</Text> :
                        <Text style={{ color: '#575C64' }} >{t('community.after1')}</Text>
                    }

                </IDBitTabBg>
            </View>



            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.project3')}</Text>
                </View>
                <MultipleInpput containerStyle={{ height: pxToDp(156) }} horderStyle={{ paddingHorizontal: pxToDp(16), height: pxToDp(156) }} placeHolder={t('community.enter6')} length={150} onChangeText={(text: string) => setdescription(text)}></MultipleInpput>
            </View>

            <View style={{ marginTop: pxToDp(36) }}>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingHorizontal: pxToDp(16) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.input1')}</Text>
                        <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.please11')} value={insertCount} onChangeText={text => setinsertCount(text)}></TextInput>
                        <PressableSlop onPress={() => setshowSlectToeken(true)} style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Text style={{ color: '#FFFFFF', fontSize: pxToDp(26) }}>{tokenInfo ? tokenInfo.symbol : t('community.select1')}</Text>
                            <Image style={{ width: pxToDp(16), height: pxToDp(10), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/community/sanjiao.png')} />
                        </PressableSlop>
                    </View>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(36) }}>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingHorizontal: pxToDp(16) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.rate')}</Text>
                        <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.please11')} value={exchangeCount} onChangeText={text => setexchangeCount(text)}></TextInput>
                        <PressableSlop onPress={() => setshowSlectToken2(true)} style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Text style={{ color: '#FFFFFF', fontSize: pxToDp(26) }}>{tokenInfo2 ? tokenInfo2.symbol : t('community.select1')}</Text>
                            <Image style={{ width: pxToDp(16), height: pxToDp(10), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/community/sanjiao.png')} />
                        </PressableSlop>
                    </View>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.single')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                    <TextInput style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.single')} value={allCount} onChangeText={text => setallCount(text)}></TextInput>
                </IDBitTabBg>
            </View>


            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.total12')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                    <TextInput style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.enter23')} value={danren} onChangeText={text => setdanren(text)}></TextInput>
                </IDBitTabBg>
            </View>


            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.unlocking')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                    <TextInput style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.please15')} value={openCount} onChangeText={text => setopenCount(text)}></TextInput>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.unlockCount')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDODropDownTab selectItem={(value: string, index: number) => {
                    handleRuleChange(value, index)
                }} />
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), backgroundColor: firstUnlockTime != '第一次解锁日期' ? '#464E5B' : UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(68) }}>
                            <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(24), marginBottom: pxToDp(10) }}>{t('community.firstDate')}</Text>
                            <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(24) }}>*</Text>
                        </View>
                        <Image style={{ width: pxToDp(32), height: pxToDp(32), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/community/icon_riqi.png')} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: pxToDp(68) }}>
                        <PressableSlop onPress={() => setshowPop3(true)}>
                            <Text style={{ marginLeft: pxToDp(10), color: firstUnlockTime != '第一次解锁日期' ? '#fff' : '#575C64', fontSize: pxToDp(24) }}>{firstUnlockTime}</Text>
                        </PressableSlop>
                    </View>
                </IDBitTabBg>
            </View>
            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.twitter2')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                    <TextInput style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.enter12')} value={twiterLink} onChangeText={text => settwiterLink(text)}></TextInput>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.project1')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                    <TextInput style={{ height: 40, color: '#fff' }} placeholderTextColor={'#575C64'} placeholder={t('community.enter14')} value={website} onChangeText={text => setwebsite(text)}></TextInput>
                </IDBitTabBg>
            </View>
            <View style={{ marginTop: pxToDp(28) }}>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), backgroundColor: startTime != '请选择开始时间' ? '#464E5B' : UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(68) }}>
                            <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(24), marginBottom: pxToDp(10) }}>{t('community.start')}</Text>
                            <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(24) }}>*</Text>
                        </View>
                        <Image style={{ width: pxToDp(32), height: pxToDp(32), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/community/icon_riqi.png')} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: pxToDp(68) }}>
                        <PressableSlop onPress={() => setshowPop2(true)}>
                            <Text style={{ marginLeft: pxToDp(10), color: startTime != '请选择开始时间' ? '#fff' : '#575C64', fontSize: pxToDp(24) }}>{startTime}</Text>
                        </PressableSlop>
                    </View>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), backgroundColor: endTime != '请选择结束时间' ? '#464E5B' : UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(68) }}>
                            <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(24), marginBottom: pxToDp(10) }}>{t('community.end')}</Text>
                            <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(24) }}>*</Text>
                        </View>
                        <Image style={{ width: pxToDp(32), height: pxToDp(32), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/community/icon_riqi.png')} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: pxToDp(68) }}>
                        <PressableSlop onPress={() => setshowPop(true)}>
                            <Text style={{ marginLeft: pxToDp(10), color: endTime != '请选择结束时间' ? '#fff' : '#575C64', fontSize: pxToDp(24) }}>{endTime}</Text>
                        </PressableSlop>
                    </View>
                </IDBitTabBg>
            </View>

            {
            approved?
            <IDBitBtn onPress={() => checkApproved()} text={t('community.create4')}
                containerStyle={{ marginTop: pxToDp(40), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
            ></IDBitBtn>
            :
            <IDBitBtn onPress={() => checkApproved()} text={t('community.approve')}
                containerStyle={{ marginTop: pxToDp(40), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
            ></IDBitBtn>
            }
            <Text style={{ marginBottom: useSafeAreaInsets().bottom + pxToDp(160), alignSelf: 'center', marginTop: pxToDp(20), fontSize: pxToSp(24), color: '#ABABAB' }}>平台将收取5%服务费</Text>
            <Modal isVisible={showPop} style={styles.bottomModal}
                hideModalContentWhileAnimating={true}
                useNativeDriverForBackdrop={true}
                animationOutTiming={1000}
            >
                <DateTimePickerModal
                    isVisible={showPop}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    timeZoneOffsetInMinutes={8 * 60}
                    date={new Date()}
                />
            </Modal>
            <Modal isVisible={showPop2} style={styles.bottomModal}
                hideModalContentWhileAnimating={true}
                useNativeDriverForBackdrop={true}
                animationOutTiming={1000}
            >
                <DateTimePickerModal
                    isVisible={showPop2}
                    mode="datetime"
                    onConfirm={handleConfirm2}
                    onCancel={hideDatePicker2}
                    timeZoneOffsetInMinutes={8 * 60}
                    date={new Date()}
                />
            </Modal>
            <Modal isVisible={showPop3} style={styles.bottomModal}
                hideModalContentWhileAnimating={true}
                useNativeDriverForBackdrop={true}
                animationOutTiming={1000}
            >
                <DateTimePickerModal
                    isVisible={showPop3}
                    mode="datetime"
                    onConfirm={handleConfirm3}
                    onCancel={hideDatePicker3}
                    timeZoneOffsetInMinutes={8 * 60}
                    date={new Date()}
                />
            </Modal>
            <Modal isVisible={showSlectToken} style={styles.bottomModal}
                hideModalContentWhileAnimating={true}
                useNativeDriverForBackdrop={true}
                animationOutTiming={300}
                statusBarTranslucent={false}
            >
                <CommunityPop cancle_press={() => setshowSlectToeken(false)} communityPopStyle={CommunityPopStyle.IDO_TOKEN_STYLE} selectCell_press={(item: any) => {
                    settokenInfo(item)
                    setshowSlectToeken(false)
                }} />
            </Modal>
            <Modal isVisible={showSlectToken2} style={styles.bottomModal}
                hideModalContentWhileAnimating={true}
                useNativeDriverForBackdrop={true}
                animationOutTiming={300}
                statusBarTranslucent={false}
            >
                <CommunityPop cancle_press={() => setshowSlectToken2(false)} communityPopStyle={CommunityPopStyle.IDO_TOKEN_STYLE} selectCell_press={(item: any) => {
                    settokenInfo2(item)
                    setshowSlectToken2(false)
                }} />
            </Modal>
            <CommunityAlert alertStyle={AlertStyle.CREATE_SUCCES_STYLE} isVisible={showAlert} onCanclePress={() => setshowAlert(false)} onSurePress={deleteCommunity}></CommunityAlert>

            <Loading
                text=""
                isShow={showLoading}
                onTimeOut={() => setshowLoading(false)}
            ></Loading>
        </ScrollView>
    );
};
export default CreateIDO2;


