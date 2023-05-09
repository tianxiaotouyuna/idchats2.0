import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:UIELEMENTS.PADDING_TOP,
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
    },
    container_clear: {
        flex: 1,
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
    },
    scroll_container: {
        // paddingTop: pxToDp(40)
        // , 
        paddingBottom: pxToDp(30)
        },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      height:pxToDp(400),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    btn_icon: {
        width:pxToDp(40),
        height:pxToDp(40)
    },
    img_active: {
        width:pxToDp(24),
        height:pxToDp(8),
        marginTop:pxToDp(16),
        backgroundColor:UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE
    },
    separator: {
        width:'100%',
        height:pxToDp(1),
        backgroundColor:UIELEMENTS.DEFAULT_SEPARATOR_COLOR
    },
    btn_text: {
        marginTop:pxToDp(28),
        marginBottom:pxToDp(84),
        fontSize:pxToSp(24),
        color:'#999999'
    },
    tab_right:{
        width:pxToDp(44),
        height:pxToDp(44),
        marginHorizontal:pxToDp(32)
    },
})

export default styles;
