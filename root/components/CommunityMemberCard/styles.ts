import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerStyle: {
    },
    contentStyle: {
    },
    imgStyle: {
        width:pxToDp(36),
        height:pxToDp(36),
        marginRight:pxToDp(12)
    },
    dotStyle: {
        width:pxToDp(16),
        height:pxToDp(16),
        borderRadius:pxToDp(70),
        backgroundColor:'#52DA5A',
        position:'absolute',
        bottom:0,
        right:0,
        borderWidth:pxToDp(1),
        borderColor:'#212731'
    },
    dotStyle2: {
        width:pxToDp(16),
        height:pxToDp(16),
        borderRadius:pxToDp(70),
        backgroundColor:'#fff',
        position:'absolute',
        bottom:0,
        right:0,
        borderWidth:pxToDp(1),
        borderColor:'#212731',
        opacity:0.54
    },
})

export default styles;
