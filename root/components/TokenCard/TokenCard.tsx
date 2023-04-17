import styles from './styles';
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable, ImageSourcePropType, Alert, ImageRequireSource } from 'react-native'
import { log, pxToDp, pxToSp } from '@/utils/system';
import Ripple from 'react-native-material-ripple';
import { ReduxToken, UIELEMENTS } from '@/constants/index';
import FastImage from 'react-native-fast-image';
import NtfButton from '../NtfButton/NtfButton';
import useRedux from '@/hooks/useRedux';
import Loading from '../LoadingSnipper/Loading';
import { Navigate } from '@/utils/index';
import Swipeout from 'react-native-swipeout';
import { COLORS } from '@/utils/Miscellaneous';
import { IMService } from '@/services/index';
import IDBitSepecter from '../IDBitSepecter/IDBitSepecter';
import PressableSlop from '../PressableSlop/PressableSlop';
import storage from '@/utils/pstorage';
import { getAllWallets } from '@/services/StorageService';
import { t } from 'i18next';
import { CoinType } from '@/constants/config/coins';
interface CoinItem extends CoinType {
  icon: ImageRequireSource;
}
export enum CardStyle {
  ASSET_STYLE = 0, //资产列表
  ADD_STYLE = 1, //添加代币
  IDO_SELECT_STYLE = 2, //IDO添加代币
}
type ExGoodsCardProps = {
  style?: StyleProp<ViewStyle>
  data: any
  onPress?: (item:any) => void
  cardStyle?: CardStyle//0:我关注的，1：关注我的
  reloadList?: () => void
}

const TokenCard: FunctionComponent<ExGoodsCardProps> = (props) => {


  const { style, reloadList,data, onPress , cardStyle = 0 } = props;
  const [has, sethas] = useState(false);
  const [isShow, setisShow] = useState(false);
  const { unitCode, imUserInfo ,sendReduxAction} = useRedux()
  useEffect(() => {
    getThisWallet()

  }, [])
  const getThisWallet = async () => {
    const wallet = await storage.wallet(imUserInfo?.userID);
    // Alert.alert(JSON.stringify(wallet.coinNames))
    console.log('coinName\n' + data?.coinName);
    for (var i = 0; i < wallet.coinInfos.length; i++) {
      const a = wallet.coinInfos[i].coinName;
      const b = data?.coinName;
      console.log('nnnnnnnn\n' + wallet.coinInfos[i].coinName);
      if (a == b) {
        sethas(true)
      }
      else {
        sethas(false)
      }

    }
  }
  const renderAssetCard = () => {
    return (

      <Ripple
        rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
        rippleContainerBorderRadius={10}
        style={{ paddingVertical: pxToDp(20) }}
        pointerEvents={'box-none'}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {
              data?.coinName=='ETH'?
              <Image style={{ width: pxToDp(70), height: pxToDp(70), borderRadius: pxToDp(10) }} resizeMode='cover' source={require("@/resources/idbt/my/eth_sel.png")} />:
            ( 
              data?.coinName=='BNB'?
              <Image style={{ width: pxToDp(70), height: pxToDp(70), borderRadius: pxToDp(10) }} resizeMode='cover' source={require("@/resources/idbt/my/bnb_sel.png")} />:
              (
              data?.coinName=='MATIC'?
              <Image style={{ width: pxToDp(70), height: pxToDp(70), borderRadius: pxToDp(10) }} resizeMode='cover' source={require("@/resources/idbt/my/MATIC2.png")} />:
              <FastImage style={{ backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: pxToDp(70), height: pxToDp(70), borderRadius: pxToDp(10) }} resizeMode='cover' source={{ uri: data?.coinIcon }} />

            ))
            }
            <Text style={{ color: '#fff', fontSize: pxToSp(32), marginLeft: pxToDp(20) ,fontWeight:'bold'}}>{data?.coinName}</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Text style={{ color: '#fff', fontSize: pxToSp(30) ,fontWeight:'bold'}}>{data?.amount}</Text>
            <Text style={{ color: '#fff', fontSize: pxToSp(24) }}>{unitCode ? '$' : '¥'}{data?.price}</Text>
          </View>
        </View>
        <IDBitSepecter containerStyle={{ position: 'absolute', bottom: 0 }}></IDBitSepecter>
      </Ripple>
    )
  }
  const addToken = async (item: any) => {
    setisShow(true)
    const wallets = await storage.wallets();

    let newWallets = [];
    for (var i = 0; i < wallets.length; i++) {
      if (wallets[i].address == imUserInfo?.userID) {
        let thisWallet = wallets[i];
        console.log('thisWallet.coinNames=====\n' + JSON.stringify(thisWallet))
        if (has == false) thisWallet.coinInfos.push(item)
        else {
          for (var j = 0; j < thisWallet.coinInfos.length; j++) {
            if (thisWallet.coinInfos[j].coinName == data?.coinName) thisWallet.coinInfos.splice(j, 1)
          }
        }
        newWallets.push(thisWallet)
        console.log('aaaaaa=====\n' + JSON.stringify(thisWallet))
      }
      else newWallets.push(wallets[i])
    }
    await storage.update_wallets(newWallets)
    sendReduxAction(ReduxToken.NEEDRELOADASSETSLIST, {})
    sethas(!has)
    setisShow(false)
  }
  const renderAddCard = () => {
    return (
      <View>
        {data != t('my.hotToken') ?
          <Ripple
            rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
            rippleContainerBorderRadius={10}
            style={{ paddingVertical: pxToDp(20) }}
            pointerEvents={'box-none'}
            onPress={() => { }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: pxToDp(80), height: pxToDp(80), borderRadius: pxToDp(10) }} resizeMode='cover' source={{ uri: data?.coinIcon }} />
                <Text style={{ color: '#fff', fontSize: pxToSp(24), marginLeft: pxToDp(20) }}>{data?.coinName}</Text>
              </View>
              <View>
                <Text style={{ color: '#fff', fontSize: pxToSp(24) }}>{data?.amount}</Text>
                <PressableSlop onPress={() => { addToken(data) }}>
                  {has == false ? <Image
                    style={{ width: pxToDp(48), height: pxToDp(48) }}
                    source={require("@/resources/idbt/my/add2.png")}
                  ></Image> : <Image
                    style={{ width: pxToDp(48), height: pxToDp(48) }}
                    source={require("@/resources/idbt/my/plus.png")}
                  ></Image>}
                </PressableSlop>
              </View>
            </View>
            <IDBitSepecter containerStyle={{ position: 'absolute', bottom: 0 }}></IDBitSepecter>
          </Ripple> :
          <Text style={{ color: '#ABABAB', fontSize: pxToSp(26), marginVertical: pxToDp(22) }}>{t('my.hotToken')}</Text>
        }
        <Loading
          text=""
          isShow={isShow}
          onTimeOut={() => setisShow(false)}
        ></Loading>
      </View>
    )
  }

  const renderIDOAddCard = () => {
    log(data,'sdrenderIDOAddCard')
    return (
      <View>
        {data != t('my.hotToken') ?
          <Ripple
            rippleColor={UIELEMENTS.DEFAULT_HEADER_COLOR}
            rippleContainerBorderRadius={10}
            style={{ paddingVertical: pxToDp(20) }}
            pointerEvents={'box-none'}
            onPress={()=>onPress(data)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: pxToDp(80), height: pxToDp(80), borderRadius: pxToDp(10) }} resizeMode='cover' 
                source={data.icon}
                />
               <View >
               <Text style={{ color: '#333333', fontSize: pxToSp(26), marginLeft: pxToDp(20) }}>{data?.name}</Text>
                <Text style={{ color: '#ABABAB', fontSize: pxToSp(24), marginLeft: pxToDp(20) }}>{data?.symbol}</Text>
               </View>
              </View>
              <View>
                <Text style={{ color: '#fff', fontSize: pxToSp(24) }}>{data?.amount}</Text>
                <PressableSlop onPress={() => { onPress(data) }}>
                  <Image
                    style={{ width: pxToDp(48), height: pxToDp(48) }}
                    source={require("@/resources/idbt/community/icon_weixuannew.png")}
                  ></Image>
                </PressableSlop>
              </View>
            </View>
            <IDBitSepecter containerStyle={{ position: 'absolute', bottom: 0 }}></IDBitSepecter>
          </Ripple> :
          <Text style={{ color: '#ABABAB', fontSize: pxToSp(26), marginVertical: pxToDp(22) }}>{t('my.hotToken')}</Text>
        }
        <Loading
          text=""
          isShow={isShow}
          onTimeOut={() => setisShow(false)}
        ></Loading>
      </View>
    )
  }
  return (
    cardStyle == CardStyle.ASSET_STYLE ? renderAssetCard() :cardStyle == CardStyle.ADD_STYLE ? renderAddCard():renderIDOAddCard()
  )
}
export default TokenCard
