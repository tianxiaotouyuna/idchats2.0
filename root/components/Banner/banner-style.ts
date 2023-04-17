import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerStyle: {
        marginVertical: pxToDp(12),
        borderRadius: pxToDp(16),
        overflow: "hidden",
        height:pxToDp(300)
    },
    pagination: {
        bottom: pxToDp(10),
    },
    spacing1: {
        margin: 12 
    },
    dot: {
        width: pxToDp(16),
        height: pxToDp(6),
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: pxToDp(4),
        marginLeft: pxToDp(3),
        marginRight: pxToDp(3),
    },
    active_dot: {
        width: pxToDp(32),
        height: pxToDp(6),
        borderRadius: pxToDp(4),
        backgroundColor: "#ffffff",
        marginLeft: pxToDp(3),
        marginRight: pxToDp(3),
    },
    image_wrap: {
        borderRadius: pxToDp(16),
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f7f7f7",
    }
})

export default styles;
