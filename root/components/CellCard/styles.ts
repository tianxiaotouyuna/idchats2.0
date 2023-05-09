import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#293350',
        overflow: 'hidden',
        width: '100%',
        height: pxToDp(124),
        borderRadius: pxToDp(26)
    },
    image_left: {
        width: pxToDp(64),
        height: pxToDp(64),
        backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR
    },
    image_right: {
        width: pxToDp(60),
        height: pxToDp(60),
    },
    image_right_holder: {
        width: pxToDp(64),
        height: pxToDp(64),
    },
})

export default styles;
