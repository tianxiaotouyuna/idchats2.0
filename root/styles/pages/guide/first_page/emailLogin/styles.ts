import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: '#0F141E',
    },
    bottomWrap:{
    },
    image: {
        width:pxToDp(94),
        height:pxToDp(52),
    },
    text1: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: pxToSp(56),
        marginBottom:pxToDp(12),
        marginTop:pxToDp(48)
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
        marginTop:pxToDp(76)
    },
    textPwd: {
        color: 'white',
        fontWeight: '500',
        fontSize: pxToSp(30),
    },
    textPwd2: {
        color: 'white',
        fontWeight: '500',
        fontSize: pxToSp(30),
        marginTop:pxToDp(52),
    },

})

export default styles;
