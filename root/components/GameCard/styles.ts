import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: pxToDp(32),
        flexDirection:'row',
        padding:pxToDp(20),
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR
    },
    image:{
        width: pxToDp(244),
        height: pxToDp(176),
        borderRadius: pxToDp(30),
        backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR
    },
})

export default styles;
