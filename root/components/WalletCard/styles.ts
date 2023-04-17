import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor:'#fff'    ,    
        borderRadius:pxToDp(12),
        padding:pxToDp(20)
    },
    imgStyle: {
        width:pxToDp(36),
        height:pxToDp(36),
        marginRight:pxToDp(12)
    },
    textStyle: {
        fontSize:pxToSp(32),
        color:'#000',fontWeight:'500',
    },
})

export default styles;
