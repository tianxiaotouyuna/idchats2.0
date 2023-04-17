import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, Linking, NativeModules } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { isIOS, pxToDp, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import storage from '@/utils/pstorage'
import Toast from "react-native-root-toast";
import Loading from "@/components/LoadingSnipper/Loading";
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import ListCell from "@/segments/My/Center/ListCell/ListCell";
import { useHeaderHeight } from "@react-navigation/stack";
import DeviceInfo from 'react-native-device-info';
import { CommonService } from "@/services/index";
import NFTAlert, { AlertStyle } from "@/components/NFTAlert/NFTAlert";
import * as UpdateAPK from "rn-update-apk";
import IDBitProgress from "@/components/IDBitProgress/IDBitProgress";

const AboutUs: FunctionComponent = (props) => {
    const { t, i18n } = useTranslation();
    const [showSniper, setShowSniper] = useState(false);
    const headerHeight = useHeaderHeight();
    const { imUserInfo, laungueCode } = useRedux();
    const [thisAppVersion, setthisAppVersion] = useState('');
    const [showAlert, setshowAlert] = useState(false);
    const [showProgress, setshowProgress] = useState(false);
    const [downProgress, setdownProgress] = useState(0.0);
    const [downUrl, setdownUrl] = useState('');
    const [haveNew, sethaveNew] = useState(false);
    const [update_log, setupdate_log] = useState([]);
    const [update_log_en, setupdate_log_en] = useState([]);
    useInitScreen({
        navigationOptions: {
            headerTitle: t('my.aboutUs'),
            headerTransparent: true,
            headerShown: true,
            headerTintColor: 'white'
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    useEffect(() => {

        setthisAppVersion(DeviceInfo.getVersion())
        getUpdateInfo()
    }, [])

    const gotoWebSite = async () => {
        await Linking.openURL('https://idchats.com');
    }
    const getUpdateInfo = async () => {
        const thisV = DeviceInfo.getVersion();
        if (isIOS) {
            const resp = await CommonService.getVersionCode('ios')
            console.log('getVersionCode,iosios====' + JSON.stringify(resp))
            setupdate_log(resp?.update_log.split('&'))
            setupdate_log_en(resp?.update_log_en.split('&'))
            if (thisV != resp.version_name) {
                sethaveNew(true)
                setdownUrl(resp?.apk_url)
            }
        }
        else {
            const resp = await CommonService.getVersionCode('android')
            console.log('getVersionCode,android====' + JSON.stringify(resp))
            setupdate_log(resp?.update_log.split('&'))
            setupdate_log_en(resp?.update_log_en.split('&'))
            if (thisV != resp.version_name) {
                sethaveNew(true)
                setdownUrl(resp?.apk_url)
            }
        }
    }
    const versionUpdate = async () => {

        if (haveNew == false) {
            toast(t('my.isNewly'))
            return
        }
        else {
            setshowAlert(true)
        }
    }
    const downLoading = () => {
        setshowAlert(false)
        if (isIOS) {

            const RNUpdateAPK = NativeModules.RNUpdateAPK;
            RNUpdateAPK.installFromAppStore(downUrl);
        }
        else {
            const arr = downUrl.split('.');
            let isApkUrl = false;
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if (element == 'apk') isApkUrl = true
            }
            if (isApkUrl == false) {
                toast('接口错误：下载地址不是apk文件！')
                return
            }

            setshowProgress(true)
            updater.checkUpdate();
        }
    }

    const updater = new UpdateAPK.UpdateAPK({

        // iOS must use App Store and this is the app ID. This is a sample: "All Birds of Ecuador" (¡Qué lindo!)
        iosAppId: "1104809018",
        respData: {
            "versionName": "999.0.0",
            "versionCode": "998",
            "apkUrl": downUrl,
            "forceUpdate": false
        },
        apkVersionUrl:
            // "https://raw.githubusercontent.com/mikehardy/react-native-update-apk/master/example/test-version.json",
            "https://uapiwa8fvt.feishu.cn/file/boxcnW4qW6KBQe2uwUmrL7jtxOc",
        //apkVersionOptions is optional, you should use it if you need to pass options to fetch request
        apkVersionOptions: {
            method: 'GET',
            headers: {}
        },

        //apkOptions is optional
        //Complements or replaces the DownloadFileOptions (from react-native-fs) to download the new APK
        //By default the following options are already set: fromUrl, toFile, begin, progress, background and progressDivider
        //You should use it if you need to pass additional information (for example: headers) to download the new APK
        apkOptions: {
            headers: {}
        },

        // The name of this 'fileProviderAuthority' is defined in AndroidManifest.xml. THEY MUST MATCH.
        // By default other modules like rn-fetch-blob define one (conveniently named the same as below)
        // but if you don't match the names you will get an odd-looking XML exception:
        // "Attempt to invoke virtual method 'android.content.res.XmlResourceParser ....' on a null object reference"
        fileProviderAuthority: "com.idbitrn.provider",

        // This callback is called if there is a new version but it is not a forceUpdate.
        needUpdateApp: performUpdate => {
            Alert.alert(
                "Update Available",
                "New version released, do you want to update? " +
                "(TESTING NOTE 1: stop your dev package server now - or the test package will try to load from it " +
                "instead of the included bundle leading to Javascript/Native incompatibilities." +
                "TESTING NOTE 2: the version is fixed at 1.0 so example test updates always work. " +
                "Compare the Last Update Times to verify it installed)",
                [
                    { text: "Cancel", onPress: () => { } },
                    // Note, apps can be large. You may want to check if the network is metered (cellular data) to be nice.
                    // Note that the user will likely get a popup saying the device is set to block installs from uknown sources.
                    // ...you will need to guide them through that, maybe by explaining it here, before you call performUpdate(true);
                    { text: "Update", onPress: () => performUpdate(true) }
                ]
            );
        },

        // This will be called before the download/update where you defined forceUpdate: true in the version JSON
        forceUpdateApp: () => {
            console.log("forceUpdateApp callback called");
        },

        // Called if the current version appears to be the most recent available
        notNeedUpdateApp: () => {
            console.log("notNeedUpdateApp callback called");
        },

        // This is passed to react-native-fs as a callback
        downloadApkStart: () => {
            console.log("downloadApkStart callback called");
        },

        // Called with 0-99 for progress during the download
        downloadApkProgress: progress => {
            console.log(`downloadApkProgress callback called - ${progress}%...`);
            // This is your opportunity to provide feedback to users on download progress
            // If you hae a state variable it is trivial to update the UI

            setdownProgress(progress / 100)
            if (progress == 98) {
                setshowProgress(false)
                setTimeout(() => {
                    setdownProgress(0)
                }, 3000);
            }
        },

        // This is called prior to the update. If you throw it will abort the update
        downloadApkEnd: () => {

            // This could be an opportunity to check the APK signature thumbprints,
            // If they mismatch your update will fail, the user will have to uninstall first.

            // If you implement SHAsums on the file you could detect tampering here as well

            // Finally for APK25+ you should check REQUEST_INSTALL_PACKAGES permission
            // prior to the attempt at some point, and provide guidance about "unknown sources" etc
            console.log("downloadApkEnd callback called");
        },

        // This is called if the fetch of the version or the APK fails, so should be generic
        onError: err => {
            console.log("onError callback called", err);
            Alert.alert("There was an error", err.message);
        }
    });
    return (
        <View style={[styles.container, { paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
            <ListCell style={{ width: '100%' }} text={i18n.t('my.updates')} imageSource={require('@/resources/return_4.png')} rightText={thisAppVersion} onPress={versionUpdate}></ListCell>
            <ListCell style={{ width: '100%' }} text={t('my.userAgreement')} imageSource={require('@/resources/return_4.png')} pushRouteName={'UserAgreement'}></ListCell>
            <ListCell style={{ width: '100%' }} text={t('my.website')} imageSource={require('@/resources/return_4.png')} pushRouteName={imUserInfo?.phoneNumber ? 'AssociateOldPhone' : 'AssociateNewPhone'} onPress={gotoWebSite}></ListCell>
            <IDBitProgress isVisible={showProgress} color={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE2} progress={downProgress}></IDBitProgress>
            <NFTAlert alertStyle={AlertStyle.UPDATE_STYLE} isVisible={showAlert} dataList={laungueCode ? update_log_en : update_log} onCanclePress={() => setshowAlert(false)} onSurePress={downLoading}></NFTAlert>
            <Loading isShow={showSniper} onTimeOut={() => setShowSniper(false)} text={''}></Loading>
        </View>
    );
};
export default AboutUs;


