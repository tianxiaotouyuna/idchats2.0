import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerStyle: {
        alignItems:"center",
        justifyContent:"center",
        height:pxToDp(88),
        backgroundColor:'#D5F713'    ,    
        borderRadius:pxToDp(12),
        alignSelf:"center",
        paddingHorizontal:0
    },
    contentStyle: {
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center",
    },
    imgStyle: {
        width:pxToDp(36),
        height:pxToDp(36),
        marginRight:pxToDp(12)
    },
    textStyle: {
        fontSize:pxToSp(32),
        color:'#000',fontWeight:'bold',
    },
})

export default styles;
