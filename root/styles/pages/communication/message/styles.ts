import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F141E',
        paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        paddingVertical: UIELEMENTS.PADDING_TOP
    },
    scroll_container: {
        // paddingTop: pxToDp(40)
        // , 
        paddingBottom: pxToDp(30),
        },
})

export default styles;
