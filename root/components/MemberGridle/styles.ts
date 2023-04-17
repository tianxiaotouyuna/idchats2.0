import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingVertical: pxToDp(24),
    },
   
    image: {
        width: pxToDp(560),
        height: pxToDp(784),
        // width: "100%",
        // height: "100%",
    },
    ripple: {
        flexDirection:"column",
        alignItems:"center",
        justifyContent:'center',
    },
    text: {
        marginTop:pxToDp(6),
        fontSize:pxToSp(24),
        color:'#FFFFFF',
        width:pxToDp(60)
    },
    text_mnioc: {
        fontSize:pxToSp(36),
        color:'#333333',
        fontWeight:"bold"
    },
    text_index: {
        position:"absolute",
        right:pxToDp(20),
        top:pxToDp(20),
        color:'#333333'
    },
    text_cancle_press:{
        position:"absolute",
        right:pxToDp(20),
        top:pxToDp(20),
        width:pxToDp(30),
        height:pxToDp(30),
        borderRadius:pxToDp(60),
        alignItems:"center",
        justifyContent:"center"
    },
    text_cancle: {
        color:'#EE0000',
        textAlignVertical:"center",
    },
})

export default styles;
