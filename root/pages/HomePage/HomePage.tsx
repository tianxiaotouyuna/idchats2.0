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
import NetworkModal from "@/components/NetworkModal/NetworkModal";
import { Navigate } from "@/utils/index";

const HomePage: FunctionComponent = (props) => {
  const [nftDatas, setnftDatas] = useState([]);
  const [activeSlide, setactiveSlide] = useState(0);
  const [showPop, setshowPop] = useState(false);
  const rigthImg1 = (require('@/resources/second/icon_xiala.png'))
  const rigthImg2 = (require('@/resources/second/icon_shangla.png'))
  const [selectNet, setselectNet] = useState(0);
  const [isShow, setisShow] = useState(false);
  const onPressFunction = () => {
    props.navigation.openDrawer();
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
    getNftData()
    SplashScreen.hide()
  }, [])

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
                style={{ width: pxToDp(160), height: pxToDp(160), borderRadius: pxToDp(40), backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}
                resizeMode="cover"
                source={{ uri: 'item?.faceURL ' }}
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
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#8796AE', fontSize: pxToSp(24) }}>关注</Text>
                    <Text style={{ color: '#F1F4F8', fontSize: pxToSp(30), fontWeight: '500' }}>326</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: pxToDp(50) }}>
                    <Text style={{ color: '#8796AE', fontSize: pxToSp(24) }}>关注</Text>
                    <Text style={{ color: '#F1F4F8', fontSize: pxToSp(30), fontWeight: '500' }}>326</Text>
                  </View>
                </View>
              </View>
            </View>
            <Image
              style={{ width: pxToDp(60), height: pxToDp(48), marginLeft: pxToDp(4), alignSelf: 'flex-start' }}
              source={require("@/resources/second/icon_bianji.png")}
              resizeMode={'stretch'}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: pxToDp(0) + useSafeAreaInsets().bottom }}>
            <IDBitBtn
              onPress={()=>{
                Navigate.navigate('Messages')
              }}
              imageSource={require("@/resources/second/icon_xiaoxi.png")}
              containerStyle={{ backgroundColor: '#080D1F', borderRadius: pxToDp(32), width: pxToDp(320), height: pxToDp(104) }}
              textStyle={{ color: '#F1F4F8', fontWeight: '600' }}
              text="消息"></IDBitBtn>
            <IDBitBtn
              onPress={()=>{
                Navigate.navigate('Community')
              }}
              containerStyle={{ backgroundColor: '#3570FB', borderRadius: pxToDp(32), width: pxToDp(320), height: pxToDp(104) }}
              textStyle={{ color: '#F1F4F8', fontWeight: '600' }}
              text="加入社区"></IDBitBtn>
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
          <NetworkModal onPress={(index: number) => {
            setisShow(true)
            setTimeout(() => {
              setisShow(false)
              setselectNet(index)
              setshowPop(false)
            }, 1.0);
          }}
            selectIndex={selectNet}
            onCanclePress={() => setshowPop(false)} style={{ paddingBottom: pxToDp(200) + useSafeAreaInsets().bottom,height:windowHeight- (pxToDp(50) + useSafeAreaInsets().top )}} />
        </Modal>

      </LinearGradient>
    )
  }
  return (
    <View style={[styles.container, { paddingTop: pxToDp(50) + useSafeAreaInsets().top }]}>
      {renderNav()}
      {renderCasure()}
      {renderBottom()}
      {/* <Loading text="" isShow={isShow} onTimeOut={() => setisShow(false)}></Loading> */}
    </View>
  );
};
export default HomePage;


