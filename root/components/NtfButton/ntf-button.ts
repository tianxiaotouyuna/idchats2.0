import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    swiper: {
        marginVertical: pxToDp(12),
        borderRadius: pxToDp(16),
        overflow: "hidden",
        flexDirection:"row"
    },
    head: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f7f7f7",
    },
    text1: {
        fontSize:pxToSp(28),
        color:UIELEMENTS.DEFAULT_SUB_COLOR
    },
    text2: {
        fontSize:pxToSp(24),
        color:'#EB5757'
    },
    base: {
        alignItems:"center",
        justifyContent:"center",
        // borderColor:UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE,
        // borderWidth:pxToDp(1),
        
    },
    btn_icon: {
        width:pxToDp(44),
        height:pxToDp(44)
    },
    btn_text: {
        marginLeft:pxToDp(10),
        fontSize:pxToSp(28),
        color:UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE ,fontWeight:"bold"
    },
    spinner: {
       marginLeft: pxToDp(10)
     },
})

export default styles;
