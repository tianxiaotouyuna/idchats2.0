import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { pxToDp, pxToSp, windowHeight } from "@/utils/system";
import { Image } from "react-native-animatable";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import useInitScreen from "@/hooks/useInitScreen";
import styles from "@/styles/pages/homepage/styles";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { UserService } from "@/services/index";
import LinearGradient from 'react-native-linear-gradient';
import NFTCard from "@/components/NFTCard/NFTCard";
import { UIELEMENTS } from "@/constants/index";
import FastImage from "react-native-fast-image";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import Modal from "react-native-modal";
import { Navigate } from "@/utils/index";
import IDbitPop, { PopStyle } from "@/components/IDbitPop/IDbitPop";
import useRedux from "@/hooks/useRedux";
import Loading from "@/components/LoadingSnipper/Loading";

const HomePage: FunctionComponent = (props: any) => {
  const [nftDatas, setnftDatas] = useState([{ image_url: '' }, { image_url: '' }]);
  const [activeSlide, setactiveSlide] = useState(0);
  const [showPop, setshowPop] = useState(false);
  const rigthImg1 = (require('@/resources/second/icon_xiala.png'))
  const [selectNet, setselectNet] = useState(0);
  const { selectWallet } = useRedux();
  const [worknets, setworknets] = useState([]);
  const [isShow, setisShow] = useState(false);
  const [thisUserInfo, setthisUserInfo] = useState({
    userID: "",
    address: "",
    faceURL: "",
  });
  const onPressFunction = () => {
    props.navigation.openDrawer();
  };
  const getThisWallet = async () => {
    const userInfo = await UserService.getOtherUserInfo(
      [selectWallet.address],
      selectWallet?.name
    );
    setthisUserInfo(userInfo);
    console.log("walletwalletwallet:\n" + JSON.stringify(selectWallet));
  };
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: 'white',
      headerShown: false,
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const getNftData = async () => {
    const nftDatas = await UserService.getNfts({ address: '0x7822d01737246a13f7979b9567e8d916f04ea074', chainId: 1 });
    setnftDatas(nftDatas);
  }
  useEffect(() => {
    SplashScreen.hide()
    getNftData()
    getNetworks()
    getThisWallet()
  }, [])
  const getNetworks = async () => {
    const works = await UserService.getNetworks();
    setworknets(works)
  }

  const pagination = () => {
    return (
      <Pagination
        dotsLength={nftDatas.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'transparent', paddingVertical: pxToDp(16) }}
        dotStyle={{
          width: pxToDp(18),
          height: pxToDp(8),
          marginHorizontal: 0,
          padding: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.56)'
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        animatedDuration={3}
      />
    );
  }
  const renderNav = () => (

    <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between", alignItems: 'center', paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL }}>
      <TouchableHighlight onPress={onPressFunction}>
        <Image
          style={styles.navItem}
          source={require("@/resources/second/more.png")}
          resizeMode={'stretch'}
        />
      </TouchableHighlight>
      <View style={{ flexDirection: 'row' }}>
        <PressableSlop onPress={onPressFunction}>
          <Image
            style={styles.navItem}
            source={require("@/resources/second/search.png")}
            resizeMode={'stretch'}
          />
        </PressableSlop>
        <TouchableHighlight style={styles.titleBg} onPress={() => setshowPop(true)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.titleText} numberOfLines={1}>{['ETH', 'BSC', 'Polygon'][selectNet]}</Text>
            <Image style={{ width: pxToDp(24), height: pxToDp(24), marginLeft: pxToDp(4) }} source={rigthImg1} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
  const onSnapToItem = (slideIndex: number) => {
    setactiveSlide(slideIndex);
  }
  const renderCasure = () => (
    <View>
      <Carousel
        data={nftDatas}
        activeSlideAlignment={'start'}
        renderItem={renderItem}
        sliderWidth={pxToDp(750)}
        itemWidth={pxToDp(750)}
        slideStyle={{ padding: UIELEMENTS.PADDING_HORIZONTAL, paddingBottom: 0 }}

        inactiveSlideScale={1}
        initialNumToRender={1}
        inactiveSlideOpacity={1}
        firstItem={0}
        layout={'stack'}
        onSnapToItem={onSnapToItem}
      />
      {pagination()}
    </View>
  )
  const renderItem = ({ item, index }: any) => {
    return (
      <NFTCard data={item} />
    )
  }
  const renderBottom = () => {
    const colors = ['#FF56FA', '#4560F7', '#30E2D1', '#FF6FFD'];
    return (
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0.25 }}
        style={styles.linearGradient}
      >
        <View style={styles.bottom_bg}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <FastImage
                style={{ width: pxToDp(160), height: pxToDp(160), borderRadius: pxToDp(40), backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR }}
                resizeMode="cover"
                source={{ uri: thisUserInfo?.faceURL }}
              />
              <View style={{ marginLeft: pxToDp(32), justifyContent: 'space-between' }}>
                <Text style={{ color: '#F1F4F8', fontSize: pxToSp(40), fontWeight: '500' }}>asd</Text>
                <IDBitTabBg style={{ flexDirection: 'row', paddingHorizontal: pxToDp(8), borderRadius: pxToDp(10) }}>
                  <Text style={{ color: '#8796AE', fontSize: pxToSp(24) }}>npub…sg39nk</Text>
                  <Image
                    style={{ width: pxToDp(28), height: pxToDp(28), marginLeft: pxToDp(4) }}
                    source={require("@/resources/second/icon_copy.png")}
                    resizeMode={'stretch'}
                  />
                </IDBitTabBg>
                <View style={{ flexDirection: 'row' }}>
                  <PressableSlop style={{ flexDirection: 'row' }}
                    onPress={() => Navigate.navigate('Follow')}>
                    <Text style={{ color: '#8796AE', fontSize: pxToSp(24) }}>关注</Text>
                    <Text style={{ color: '#F1F4F8', fontSize: pxToSp(30), fontWeight: '500' }}>326</Text>
                  </PressableSlop>
                  <PressableSlop style={{ flexDirection: 'row', marginLeft: pxToDp(50) }}
                    onPress={() => Navigate.navigate('Fans')}>
                    <Text style={{ color: '#8796AE', fontSize: pxToSp(24) }}>粉丝</Text>
                    <Text style={{ color: '#F1F4F8', fontSize: pxToSp(30), fontWeight: '500' }}>326</Text>
                  </PressableSlop>
                </View>
              </View>
            </View>
            <View style={{ height: 150, justifyContent: 'space-between' }}>
              <IDBitBtn text="编辑" containerStyle={{ width: pxToDp(124), height: pxToDp(48), alignSelf: 'flex-start' }} textStyle={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }} onPress={() => Navigate.navigate('EditInfo')}></IDBitBtn>
              <IDBitBtn onPress={() => Navigate.navigate('PayType')} text="支付方式" containerStyle={{ width: pxToDp(164), height: pxToDp(48), alignSelf: 'flex-start' }} textStyle={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}></IDBitBtn>
              <IDBitBtn onPress={() => Navigate.navigate('TransferToken')} text="转账Token" containerStyle={{ width: pxToDp(164), height: pxToDp(48), alignSelf: 'flex-start' }} textStyle={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}></IDBitBtn>
              <IDBitBtn onPress={() => Navigate.navigate('Notification')} text="创建推送" containerStyle={{ width: pxToDp(164), height: pxToDp(48), alignSelf: 'flex-start' }} textStyle={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}></IDBitBtn>
              <IDBitBtn onPress={() => Navigate.navigate('EditSpace')} text="编辑空间" containerStyle={{ width: pxToDp(164), height: pxToDp(48), alignSelf: 'flex-start' }} textStyle={{ color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR }}></IDBitBtn>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: pxToDp(0) + useSafeAreaInsets().bottom }}>
            <IDBitBtn
              onPress={() => {
                Navigate.navigate('Messages')
              }}
              imageSource={require("@/resources/second/icon_xiaoxi.png")}
              containerStyle={{ backgroundColor: '#080D1F', borderRadius: pxToDp(32), width: pxToDp(320), height: pxToDp(104) }}
              textStyle={{ color: '#F1F4F8', fontWeight: '600' }}
              text="消息">

              <LinearGradient
                colors={['#3E5FC4', '#9A48E2']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0.25 }}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              >
              </LinearGradient>
            </IDBitBtn>
            <IDBitBtn
              onPress={() => {
                Navigate.navigate('Community')
              }}
              containerStyle={{ backgroundColor: '#141F33', borderRadius: pxToDp(32), width: pxToDp(320), height: pxToDp(104) }}
              contentStyle={{ backgroundColor: '#141F33' }}
              textStyle={{ color: '#F1F4F8', fontWeight: '600' }}
              text="空间"></IDBitBtn>
          </View>
        </View>
        <Modal isVisible={showPop} style={[styles.bottomModal]}
          hideModalContentWhileAnimating={true}
          useNativeDriverForBackdrop={true}
          animationOutTiming={500}
          animationInTiming={800}
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
        >
          <IDbitPop data={worknets} popStyle={PopStyle.NETWORK_STYLE} onPress={(index: number) => {
            setisShow(true)
            setshowPop(false)
            setTimeout(() => {
              setisShow(false)
              setselectNet(index)
            }, 1.0);
          }}
            selectIndex={selectNet}
            onCanclePress={() => setshowPop(false)} style={{ paddingBottom: pxToDp(200) + useSafeAreaInsets().bottom, height: windowHeight - (pxToDp(50) + useSafeAreaInsets().top) }} />
        </Modal>

      </LinearGradient>
    )
  }
  return (
    <View style={[styles.container, { paddingTop: pxToDp(50) + useSafeAreaInsets().top }]}>
      {renderNav()}
      {renderCasure()}
      {renderBottom()}
      <Loading isShow={isShow} onTimeOut={() => setisShow(false)} text={''}></Loading>
    </View>
  );
};
export default HomePage;


