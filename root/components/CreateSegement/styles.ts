import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:pxToDp(70),
        paddingVertical:pxToDp(32),
        width:'100%'
    },
    text: {
        color:'#F2F2F2',
        fontSize:pxToDp(36)
    },
    text_sel: {        
        color:'#F2F2F2',
        fontSize:pxToDp(40)
    },
    bottomBar:{
        height:pxToDp(8),
        width:pxToDp(52),
        marginTop:pxToDp(10),
        backgroundColor:'#D5F713',
        borderRadius:pxToDp(4)
    },
    bottomDot:{
        height:pxToDp(8),
        width:pxToDp(8),
        marginTop:pxToDp(10),
        backgroundColor:'#D8D8D8',
        borderRadius:pxToDp(4)
    }
    
 
})

export default styles;
