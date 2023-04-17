import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F141E',
        paddingTop: pxToDp(40)
    },
    scroll_container: {
        // paddingTop: pxToDp(40),
        // , 
        paddingBottom: pxToDp(0),
        },
})

export default styles;
