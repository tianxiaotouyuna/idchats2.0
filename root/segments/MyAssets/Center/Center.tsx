import React, { FunctionComponent,  useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styles from "./styles";
import { UIELEMENTS } from "@/constants/index";
import useRedux from "@/hooks/useRedux";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import IDBITTabBar from "@/components/IDBITTabBar/IDBITTabBar";
import Assets from "../Assets/Assets";
import { pxToSp } from "@/utils/system";
import Nfts from "../NFTS/Nfts";
import TxRecord from "../TxRecord/TxRecord";
type OutPorps = {
    style?: StyleProp<ViewStyle>
}
const Center: FunctionComponent<OutPorps> = (props) => {
    const { style } = props;
    const { imIns, chatList } = useRedux();

    const [tabsInfo] = useState([
        { name: "资产", type: 1 },
        { name: "NFTS", type: 2 },
        { name: "交易记录", type: 3 },
    ])
    const handleChangeTab = () => {

    }
    const showScrollBar = () => {
        return (
            <ScrollableTabView
                style={styles.container}
                onChangeTab={handleChangeTab}
                renderTabBar={() => <IDBITTabBar activeTextColor={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} inactiveTextColor={'#7e87a1'} textSize={pxToSp(28) } />}
            >
                {tabsInfo?.map((item: any, index: number) => {
                    if (index == 1) return <Assets key={`${item?.name}_${index}`} tabLabel={item?.name} type={item?.type} />
                    else if (index == 2) return <Nfts key={`${item?.name}_${index}`} tabLabel={item?.name} type={item?.type} />
                    else return <TxRecord key={`${item?.name}_${index}`} tabLabel={item?.name} type={item?.type} />
                })}
            </ScrollableTabView>
        )
    }
    return (
        showScrollBar()
    );
}
export default Center;


