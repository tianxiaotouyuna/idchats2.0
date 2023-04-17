import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: '#0F141E',
        paddingTop: pxToDp(354),
        paddingBottom: pxToDp(320),
        alignItems: "center",
        justifyContent: "space-between"
    },
    bottomWrap:{
        alignItems:"center"
    },
    image: {
        width:pxToDp(430),
        height:pxToDp(430),
    },
    text1: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: pxToSp(56),
        marginBottom:pxToDp(12)
    },
    text2: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: pxToSp(30),
        marginBottom:pxToDp(60),
        opacity:0.7
    },
    beginBtn: {
        borderWidth:0,
        marginTop:pxToDp(32)
    }

})

export default styles;
