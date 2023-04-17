import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        padding:pxToDp(32),
        paddingVertical:pxToDp(18),
        justifyContent:"space-between",
        backgroundColor:'#353B3D'
    },
 dash:{
    overflow:'hidden', 
    borderColor: '#A9A9A9', 
    borderWidth: pxToDp(1), 
    borderStyle: 'dashed', 
    marginVertical: pxToDp(18) }

})

export default styles;
