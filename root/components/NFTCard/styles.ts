import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        width: '100%',
        height: pxToDp(764),
        borderRadius: pxToDp(64)
    },
    publish_image: {
        height: pxToDp(316),
        width: pxToDp(316),
    },
    hot_image: {
        width: pxToDp(280),
        height: pxToDp(200),
        backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR
    },
    hot_image_double: {
        width: '100%',
        height: '100%',
        backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR
    },
    hot_head: {
        width: pxToDp(88),
        height: pxToDp(88),
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: pxToDp(4),
        marginTop: -pxToDp(44),
        backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR
    },
    spacing1: {
        margin: 12
    },
    orderlist_image: {
        width: pxToDp(168),
        height: pxToDp(168),
        backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR
    },
})

export default styles;
