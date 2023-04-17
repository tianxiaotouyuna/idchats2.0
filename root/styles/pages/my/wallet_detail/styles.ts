import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F141E',
        paddingTop: pxToDp(105),
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL
    },
    scroll_container: {
        // paddingTop: pxToDp(40)
        // , 
        paddingBottom: pxToDp(30),
    },
    navItem: {
        width:pxToDp(40),
        height:pxToDp(40),
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
})

export default styles;
