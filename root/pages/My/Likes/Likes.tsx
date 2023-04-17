import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import GDataList from "@/components/GDataList";
import { HomeService, UserService } from "@/services/index";
import FollowerCard, { CardStyle } from "@/components/FollowerCard/FollowerCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/stack";
import { UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import LikeCard from "@/components/LikeCard/LikeCard";
import { t } from "i18next";

const Likes: FunctionComponent = (props) => {
    const [count, setcount] = useState(0);
    const { imUserInfo } = useRedux();
    useInitScreen({
        navigationOptions: {
            headerTitle: t('my.following'),
            headerTransparent: true,
            headerShown: true,
            headerTintColor: "white",
        },
        statusBar: {
            backgroundColor: "transparent",
            barStyle: "light-content",
        },
    });
    const renderItem = ({ item, index }: any) => {
        return (
            <LikeCard data={item} ></LikeCard>
        )
    };
    return (
        <View style={[styles.container, { paddingBottom: 100 + useSafeAreaInsets().bottom, paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
            <GDataList
                style={{
                    width:
                        '100%',
                }}
                requestMethod={UserService.getLikes}
                requestParams={{ path: '', params: { userId: imUserInfo.userID } }}
                defaultPageSize={10}
                renderItem={renderItem}
            />
        </View>
    );
};
export default Likes;


