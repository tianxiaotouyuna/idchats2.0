import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_scroll: {
        flex: 1,
        paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: '#0F141E',
        paddingTop: pxToDp(200)
    },
    bottomWrap:{
        alignItems:"center"
    },
    image: {
        width:pxToDp(614),
        height:pxToDp(614),
    },
    text1: {
        color: '#F2F2F2',
        fontWeight: '500',
        fontSize: pxToSp(41),
        marginTop:pxToDp(40),
        marginBottom:pxToDp(16)
    },
    text2: {
        color: '#ABABAB',
        fontSize: pxToSp(30),
        marginBottom:pxToDp(40),
    },
    beginBtn: {
        borderWidth:0,
        marginTop:pxToDp(80),
        marginBottom:pxToDp(300)
    }

})

export default styles;
