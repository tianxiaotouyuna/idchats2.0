import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: pxToDp(32),
        height: pxToDp(32),
    },
    titleBg:{
        backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
        height:pxToDp(104),
        borderRadius:pxToDp(16),
        justifyContent:"space-between",
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:pxToDp(32)
    },
    titleText:{ 
        fontSize: pxToDp(32), 
        color: '#fff', 
        maxWidth: pxToDp(260), 
    }
    
 
})

export default styles;
