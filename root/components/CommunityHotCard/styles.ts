import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerStyle: {
    },
    contentStyle: {
    },
    imgStyle: {
        width:pxToDp(36),
        height:pxToDp(36),
        marginRight:pxToDp(12)
    },
})

export default styles;
