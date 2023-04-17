import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderColor:'#fff',
    // borderWidth:pxToDp(.5)
    },
    copy:{
        width:pxToDp(22),
        height:pxToDp(20),
    },
    copy_text:{
        color:'#D5F713',
    }
 
})

export default styles;
