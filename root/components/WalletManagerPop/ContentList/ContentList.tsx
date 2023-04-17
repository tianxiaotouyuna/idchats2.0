import React, {
  forwardRef,
  FunctionComponent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Text,
  Image,
  ImageRequireSource,
} from "react-native";
import { pxToDp, pxToSp } from "@/utils/system";
import GDataList from "@/components/GDataList";
import { MyService, StorageService } from "@/services/index";
import WalletCard from "@/components/WalletCard/WalletCard";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { ethers } from "ethers";
import { t } from "i18next";
export enum CardStyle {
  POP_STYLE = 0, //
  PAGE_STYLE = 1, //
}
type butonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (index: number) => void;
  onAddPress?: (chainId: number) => void;
  imageSource?: ImageRequireSource;
  imageSource_sel?: ImageRequireSource;
  isSelected?: boolean;
  cardStyle?: CardStyle;
  thisIndex?: number;
};

const ContentList: FunctionComponent<butonProps> = (props, ref) => {
  const {
    onPress,
    cardStyle,
    containerStyle,
    onAddPress,
  } = props;
  const [chainId, setchainId] = useState(1);
  const [chainName, setchainName] = useState("");
  const chainIds = [1,56,137];
  const chainNames = [t('common.ethereum'),t('common.binanceChain'),t('common.polygon')];
  const gRef = useRef<GDataList>(null); 
  useEffect(() => {
    setchainId(chainIds[0]);
    setchainName(chainNames[0]);
  }, []);
  // internal method
  const reloadList = (index: number) => {
    setchainId(chainIds[index]);
    setchainName(chainNames[index]);
    gRef?.current.refreshData();
  };
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    reloadList: (index: number) => {
      reloadList(index);
    },
  }));
  const renderItem = ({ item, index }: any) => {
    return <WalletCard data={item} onPress={onPress} cardStyle={cardStyle} />;
  };

  const _emptyView = () => {
    return (
            <View style={{ alignItems: "center" ,justifyContent:'center'}}>
                <Image
                    style={{ width: pxToDp(238), height: pxToDp(200) ,marginTop:-pxToDp(40)}}
                    source={require("@/resources/idbt/my/noData_my.png")}
                    resizeMode={'stretch'}
                />
                <Text style={{ color: '#ABABAB' ,fontSize:pxToSp(26),marginTop:pxToDp(10)}}>{t('common.nodata')}</Text>
            </View>
        )
    }
  return (
    <View style={[{ flex: 1 }, containerStyle]}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            paddingVertical: pxToDp(28),
            fontWeight: "500",
          }}
        >
          {chainName}
        </Text>
        <PressableSlop
          onPress={() => {
            const entropy = ethers.utils.randomBytes(16); //生成随机字符串
            const mnemonicTemp = ethers.utils.entropyToMnemonic(entropy); //根据字符串生成助记词
            onAddPress(chainId);
            // setTimeout(() => {
            //   Navigate.navigate("CreateWallet", {
            //     mnemonic: mnemonicTemp,
            //     chainId: chainId,
            //   });
            // }, 500);
          }}
        >
          <Image
            style={{ width: pxToDp(50), height: pxToDp(50) }}
            source={require("@/resources/idbt/my/add-circle.png")}
            resizeMode={"stretch"}
          />
        </PressableSlop>
      </View>
      <GDataList
        refreshControlColor={"#fff"}
        requestMethod={StorageService.getAllWallets}
        requestParams={{ path: {}, params: { chainId: chainId } }}
        defaultPageSize={20}
        renderItem={renderItem}
        ref={gRef}
        ListEmptyComponent={_emptyView}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: pxToDp(36), width: "100%", bottom: pxToDp(0) }}
          ></View>
        )}
      />
    </View>
  );
};

export default forwardRef(ContentList);
