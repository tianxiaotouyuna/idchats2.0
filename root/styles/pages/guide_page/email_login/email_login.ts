import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: '#0F141E',
        paddingTop: pxToDp(138),
        paddingBottom: pxToDp(138),
        alignItems: "center",
        justifyContent: "space-between"
    },
    bottomWrap:{
        alignItems:"center",
        width:'100%',
    },
    image: {
        width:pxToDp(250),
        height:pxToDp(250),
        backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
    },
    text1: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: pxToSp(56),
        marginBottom:pxToDp(12)
    },
    text2: {
        color: '#3570FB',
        fontWeight: '500',
        fontSize: pxToSp(48),
        marginBottom:pxToDp(160),
    },
    dark_text1: {
        color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR,
        fontSize: pxToSp(30),
        marginTop:pxToDp(60),
        marginBottom:pxToDp(32)
    },
    dark_text2: {
        color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR,
        fontSize: pxToSp(30),
        marginTop:pxToDp(70),
        marginBottom:pxToDp(32)
    },
    beginBtn: {
        borderWidth:0,
        marginTop:pxToDp(32)
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    textPwd2: {
        color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR,
        fontSize: pxToSp(26),
        marginTop:pxToDp(24),
    },

})

export default styles;
