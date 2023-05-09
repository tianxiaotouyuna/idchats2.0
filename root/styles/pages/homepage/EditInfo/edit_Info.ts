import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: UIELEMENTS.PADDING_TOP,
        paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
    },
    atavar: { width: pxToDp(132), height: pxToDp(132), borderRadius: pxToDp(36), backgroundColor: UIELEMENTS.DEFAULT_IMAGEBACKGROUND_COLOR },
    cell_container: {
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: pxToDp(16), paddingVertical: pxToDp(10), alignItems: 'center',
        marginBottom: pxToDp(24), borderRadius: pxToDp(32)
    },
    padding_style2: { paddingVertical: pxToDp(30) },
    sub_text_color: { color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR },
    cell_text: { color: UIELEMENTS.DEFAULT_NORMAL_TEXT_COLOR, fontSize: pxToSp(30) },
    btn_container:{
        width:pxToDp(148),
        height:pxToDp(80),
        borderRadius:pxToDp(32)
    },
    tagInput:{
        width:'100%',
        flex:1,
        marginBottom:pxToDp(60)
    },
    saveBtn:{
        borderRadius: pxToDp(32)
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
})

export default styles;
