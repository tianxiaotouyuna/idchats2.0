import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: pxToDp(32),
        height: pxToDp(32),
    },
    titleBg:{
        backgroundColor:'#1B212D',
        justifyContent:"space-between",
        alignItems:'center',
        flexDirection:'row',
        paddingVertical:pxToDp(4),
        paddingHorizontal:pxToDp(10),
        borderRadius:pxToDp(50)
    },
    titleText:{ 
        fontSize: pxToDp(32), 
        color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR, 
        maxWidth: pxToDp(260), 
    }
    
 
})

export default styles;
