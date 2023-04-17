import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: pxToDp(40),
        height: pxToDp(40),
        backgroundColor: "#f7f7f7",
    },    
    base: {
        flexDirection:"row",
        width:'100%',
        alignItems:"center",
        paddingHorizontal:pxToDp(20),
        justifyContent:"space-between"
    },

 
})

export default styles;
