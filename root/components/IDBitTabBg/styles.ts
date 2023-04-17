import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
        backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,  
        borderRadius: pxToDp(16), 
        borderColor: 'rgba(56, 56, 56, 0.3)', 
        borderWidth: pxToDp(2) 
    }
 
    
 
})

export default styles;
