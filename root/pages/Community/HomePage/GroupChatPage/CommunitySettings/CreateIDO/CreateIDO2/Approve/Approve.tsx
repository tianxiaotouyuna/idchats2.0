import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { View, Image, Pressable } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp, pxToSp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useHeaderHeight } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/utils/Miscellaneous";
import { t } from "i18next";

import { UIELEMENTS } from "@/constants/index";
import { Navigate } from "@/utils/index";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { Text } from "react-native-animatable";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { useRoute } from "@react-navigation/native";
import useRedux from "@/hooks/useRedux";
import Loading from "@/components/LoadingSnipper/Loading";
import { CommunityService } from "@/services/index";
import { BigNumber } from "ethers";
import erc20 from "@/constants/config/abi/erc20.json"
const MaxUint256: BigNumber = (/*#__PURE__*/BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));

const Approve: FunctionComponent = (props) => {
    const idoData: any = useRoute().params?.idoData ?? null;//0:token 1:NFT
    const setBackParams: any = useRoute().params?.setBackParams ?? Function;//0:token 1:NFT
    const { selectWallet } = useRedux();
    const [count, setcount] = useState('0');
    const [showLoading, setshowLoading] = useState(false);
useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            headerTitle: t('community.approve'),
            headerTintColor: 'white',
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    const getbackParams=(data:any)=>{
        setcount(data?.count);
    }
    const approveThis=async ()=>{
        setshowLoading(true);
    const res=await CommunityService.approveTx(selectWallet,idoData?.idoContract_Address,idoData?.token_Address ,erc20,count?count.toString() : MaxUint256)
        if(res['code']==1){
        setBackParams({isApproved:true});
        Navigate.goBack();
        setshowLoading(false);
        }
        else toast('授权出错');
}
const showSetCount=()=>{
    Navigate.navigate('SetCount',{'setBackParams':(data:any)=>getbackParams(data)})
}
// resevier_Address:'0x9B3802d47663083abd60249A7a2a0DB31b7Aec10',
// inTokenCapacity:'2000',
    return (
        <View style={[styles.container, { paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: pxToDp(140), height: pxToDp(140), marginVertical: pxToDp(0) }} source={require('@/resources/idbt/ido/icon.png')} />
                <Text style={{ color: '#7082A0', fontSize: pxToDp(30), paddingVertical: pxToDp(6) }}>idchats.com</Text>
                <Text style={{ color: '#7082A0', fontSize: pxToDp(30) }}>{t('community.applyfor')}{idoData?.tokenInfo?.symbol}{t('community.transwer')}</Text>
                <View style={{flexDirection:'row'}}>
                    <Image style={{ width: pxToDp(40), height: pxToDp(40), marginVertical: pxToDp(0) }} source={require('@/resources/idbt/ido/icon.png')} />
                    <Text style={{ color: '#7082A0', fontSize: pxToDp(30) }}>{t('community.donot')}</Text>
                </View>
            </View>

            <IDBitTabBg style={{ height: pxToDp(150), marginTop: pxToDp(24), flexDirection: 'row', width: '100%', padding: pxToDp(8) }}>
                <Text style={{ color: '#fff', fontSize: pxToSp(30) }}>{t('community.pwallet')}</Text>
                <View style={{ flex: 1, marginHorizontal: pxToDp(20) }}>
                    <Text style={{ color: '#fff', fontSize: pxToSp(30) }} numberOfLines={2}>{selectWallet?.address}</Text>
                    <Text style={{ color: '#7082A0', fontSize: pxToSp(24), width: pxToDp(386) }}>=Gas(53786)*Gas Price(180 Gwei)</Text>
                </View>
            </IDBitTabBg>

            <IDBitTabBg style={{ height: pxToDp(150), marginTop: pxToDp(24), flexDirection: 'row', alignItems: 'center', padding: pxToDp(8) }}>
                <Text style={{ color: '#fff', fontSize: pxToSp(30) }}>{t('community.license')}</Text>
                <Text style={{ color: '#fff', fontSize: pxToSp(30), marginHorizontal: pxToDp(20), flex: 1 }} numberOfLines={2}>{idoData?.token_Address}</Text>
            </IDBitTabBg>

            <Pressable onPress={showSetCount}>
                <IDBitTabBg style={{ height: pxToDp(150), marginTop: pxToDp(24), flexDirection: 'row', width: '100%', alignItems: 'center', padding: pxToDp(8), justifyContent: 'space-between' }}>
                    <Text style={{ color: '#fff', fontSize: pxToSp(30) }}>{t('community.authorized')}</Text>
                    <Text style={{ color: '#fff', fontSize: pxToSp(30), marginHorizontal: pxToDp(20), textAlign: 'left', flex: 1 }} numberOfLines={2}>{count=='0'?t('community.authorized'):count}</Text>
                    <Image style={{ width: pxToDp(48), height: pxToDp(48), marginVertical: pxToDp(0) }} source={require('@/resources/idbt/ido/icon_retunea.png')} />
                </IDBitTabBg>
            </Pressable>

            <IDBitTabBg style={{ height: pxToDp(150), marginTop: pxToDp(24), flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: pxToDp(8) }}>
                <Text style={{ color: '#fff', fontSize: pxToSp(30) }}>{t('community.minerfees')}{'   '}</Text>
                <View style={{ flex: 1, marginHorizontal: pxToDp(20) }}>
                    <Text style={{ color: '#fff', fontSize: pxToSp(30) }}>0.009681 ETH</Text>
                    <Text style={{ color: '#7082A0', fontSize: pxToSp(24), width: pxToDp(386) }}>=Gas(53786)*Gas Price(180 Gwei)</Text>
                </View>
                <Image style={{ width: pxToDp(48), height: pxToDp(48), marginVertical: pxToDp(0) }} source={require('@/resources/idbt/ido/icon_retunea.png')} />
            </IDBitTabBg>

            <IDBitBtn text={t('community.approve')}
                containerStyle={{ position: 'absolute', bottom: useSafeAreaInsets().bottom + pxToDp(60), marginTop: pxToDp(40), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
                onPress={approveThis}
            />
              <Loading
                text=""
                isShow={showLoading}
                onTimeOut={() => setshowLoading(false)}
            ></Loading>
        </View>
    );
};
export default Approve;


