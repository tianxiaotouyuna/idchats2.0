import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: '#0F141E',
        paddingTop: pxToDp(200),
        paddingBottom: pxToDp(434),
        alignItems: "center",
        justifyContent: "space-between"
    },
    bottomWrap:{
        width:'100%',
    },
    image: {
        width:pxToDp(94),
        height:pxToDp(52),
    },
    text1: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: pxToSp(56),
        marginBottom:pxToDp(12)
    },
    text2: {
        color: '#EC8438',
        fontWeight: '500',
        fontSize: pxToSp(30),
    },
    textPwd: {
        color: 'white',
        fontWeight: '500',
        fontSize: pxToSp(30),
        marginTop:pxToDp(60),
    },
    beginBtn: {
        borderWidth:0,
        marginTop:32,
        marginHorizontal:pxToDp(32)
    }

})

export default styles;
