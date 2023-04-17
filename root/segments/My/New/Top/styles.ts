import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(255,255,255,0.18)',
    marginTop:pxToDp(32),borderRadius:pxToDp(16) 
    },
    copy:{
        width:pxToDp(22),
        height:pxToDp(20),
    },
    sendText:{
        color:'#fff',
        marginLeft:pxToDp(8),
        fontSize:pxToSp(28)
    }
 
})

export default styles;
