
import { UIELEMENTS } from "@/constants/index";
import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        // padding:pxToDp(6),
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
        flex:1
        // borderColor:'#EEEEEE',
        // borderWidth:pxToDp(1),
        
    },
})

export default styles;
