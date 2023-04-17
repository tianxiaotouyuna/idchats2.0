import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:pxToDp(280),
        alignItems:"center"
    }, 
    headImage:{
        width:pxToDp(686),
        height:pxToDp(280),
        paddingVertical:pxToDp(32),
        justifyContent:"space-between"
    },
    topBg:{
        paddingHorizontal:pxToDp(32),
    },
    arrow:{
        width:pxToDp(24),
        height:pxToDp(26)
    }
   
})

export default styles;
