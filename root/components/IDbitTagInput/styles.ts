import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
        backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,  
        borderRadius: pxToDp(16), 
        borderColor: 'rgba(56, 56, 56, 0.3)', 
        borderWidth: pxToDp(2) 
    },
    content: { 
        backgroundColor: '#222B45',  
        borderRadius: pxToDp(20), 
        marginBottom:pxToDp(20),
        marginTop:pxToDp(20),
        marginHorizontal:pxToDp(20),
        flex:1
    },
    text:{
        color:UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR,
        fontSize:pxToSp(30),
    },
    holder_text:{
        color:'#7082A0',
        fontSize:pxToSp(28),
        margin:pxToDp(24)
    },
    custom_btn:{
        width:pxToDp(140),
        height:pxToDp(56),
        borderRadius:pxToDp(24)
    },
    custom_btn_text:{fontSize:pxToSp(26)},
    header_container:{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:pxToDp(16),
    paddingTop: pxToDp(24)},
    tag_container:{
        backgroundColor:'rgba(241, 244, 248, 0.08)',
        borderRadius:pxToDp(24),
        borderWidth:0
    },
    tag_text:{
        color:'#F1F4F8',
        fontSize:pxToSp(26)
    },
    deleteIconStyles:{
        color:'red',width: pxToDp(40), height: pxToDp(40)
    },
    inputContainerStyle: { 
       height:0 
    },
    deleteElement:{width: pxToDp(40), height: pxToDp(40),backgroundColor:'red'}
})

export default styles;
