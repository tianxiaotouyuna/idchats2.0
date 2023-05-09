import { UIELEMENTS } from "@/constants/index";
import { DEFAULT_HEADER_COLOR_ACTIVE2 } from "@/constants/ui-elements";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerStyle: {
        alignItems:"center",
        justifyContent:"center",
        height:pxToDp(104),
        backgroundColor: DEFAULT_HEADER_COLOR_ACTIVE2,
        borderRadius:pxToDp(12),
        alignSelf:"center",
        paddingHorizontal:0,
        overflow: 'hidden'
    },
    contentStyle: {
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center",
        width:'100%',
        height:'100%',
        backgroundColor: DEFAULT_HEADER_COLOR_ACTIVE2
    },
    imgStyle: {
        width:pxToDp(36),
        height:pxToDp(36),
        marginRight:pxToDp(12)
    },
    textStyle: {
        fontSize:pxToSp(32),
        color:'#F1F4F8',fontWeight:'500',
    },
})

export default styles;
