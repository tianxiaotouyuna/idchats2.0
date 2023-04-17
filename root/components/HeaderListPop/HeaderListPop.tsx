import styles from './styles';
import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import { pxToDp, pxToSp, toast } from '@/utils/system';
import GDataList, { WHERELIST } from "@/components/GDataList";
import { UserService } from '@/services/index';
import NFTCard from '../NFTCard/NFTCard';
import useRedux from '@/hooks/useRedux';
import IDBitBtn from '../IDBitBtn/IDBitBtn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UIELEMENTS } from '@/constants/index';
import Loading from '../LoadingSnipper/Loading';
import { useTranslation } from 'react-i18next';
type ExGoodsCardProps = {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
    closePress?: () => void;
    selectItemPress?: () => void;
}

const HeaderListPop: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { style, children, closePress, selectItemPress } = props;
      const { imUserInfo ,chainId} = useRedux()
      const {t}=useTranslation()
    const renderItem = ({ item, index }: any) => {
        return <NFTCard data={item} dismissHandle={closePress} />;
    };

    const _emptyView = () => {
        return (
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: pxToDp(238), height: pxToDp(200) }}
                    source={require("@/resources/idbt/my/noData_my.png")}
                    resizeMode={'stretch'}
                />
                <Text style={{ color: '#ABABAB', fontSize: pxToSp(26), marginTop: pxToDp(10) }}>{t('common.nodata')}</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, style]}>
            <GDataList
                refreshControlColor={"#fff"}
                requestMethod={UserService.getNfts}
                requestParams={{ path: '', params: { address: imUserInfo?.userID ,chainId:chainId} }}
                // whereList={WHERELIST.DEFAULT_STYLE_BOUBLE_COLUNM}
                defaultPageSize={20}
                renderItem={renderItem}
                ListEmptyComponent={_emptyView}
                ItemSeparatorComponent={() => (
                    <View style={{ height: pxToDp(24), width: '100%' }}></View>
                )}
            />
            <IDBitBtn text={t('common.cancle')} containerStyle={{bottom:useSafeAreaInsets().bottom+pxToDp(60),height:pxToDp(88),alignSelf:"center",position:'absolute',paddingHorizontal:pxToDp(60)-UIELEMENTS.PADDING_HORIZONTAL}} onPress={closePress}></IDBitBtn>
        </View>
    )
}
export default HeaderListPop
