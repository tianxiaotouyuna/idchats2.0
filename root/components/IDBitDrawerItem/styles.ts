import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contranier: {
        height:pxToDp(88),
        paddingHorizontal:pxToDp(32),
        flexDirection: 'row', width: '100%', alignItems: 'center' 
    },
 dash:{
    overflow:'hidden', 
    borderColor: '#A9A9A9', 
    borderWidth: pxToDp(1), 
    borderStyle: 'dashed', 
    marginVertical: pxToDp(18) }

})

export default styles;
