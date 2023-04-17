import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#999999'
    , 
    paddingTop: pxToDp(40)
    , 
    paddingBottom: pxToDp(30)
    },
    copy:{
        width:pxToDp(22),
        height:pxToDp(20),
    },
    copy_text:{
        color:'#D5F713',
    },
    segment:{
        width:'100%',
    },
 
})

export default styles;
