import { pxToDp } from "@/utils/system";
import React, { FunctionComponent } from "react";
import { View,  Pressable, StyleProp, ViewStyle } from "react-native";
import Swiper from "react-native-swiper";
import { Navigate } from "../../utils";
import BannerCard from "../BannerCard/BannerCard";
import styles from "./banner-style";

type BannerProps = {
  data?: any;
  width?: number;
  height?: number;
  onDataFinish?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
};

const Banner: FunctionComponent<BannerProps> = (props) => {
  const {
    data = [],
    width = pxToDp(702),
    height = pxToDp(296),
    containerStyle,
    itemContainerStyle
  } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Swiper
        containerStyle={containerStyle}
        key={data.length}
        dotStyle={styles.dot}
        activeDotStyle={styles.active_dot}
        autoplay={true}
        autoplayTimeout={3}
        bounces={true}
        showsPagination={data?.length > 1}
        loop={true}
        paginationStyle={styles.pagination}
        // 添加这个属性解决第二个循环抖动问题
        removeClippedSubviews={false}
        disableIntervalMomentum={true}
        // automaticallyAdjustContentInsets={true}
      >
        {data?.map((item: any, index: number) => (
          <Pressable
            key={`${index}`}
            onPress={() => Navigate.navigate('Search')}
          >

            <BannerCard
              containerStyle={containerStyle}
              data={item}
              onPress={() => { Navigate.navigate('GroupChatPage',{chatData:item})}}
            />

          </Pressable>
        ))}
      </Swiper>
    </View>
  );
};

export default Banner;
