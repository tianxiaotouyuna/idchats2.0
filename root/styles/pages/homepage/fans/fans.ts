import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
        paddingHorizontal:UIELEMENTS.PADDING_HORIZONTAL,
    },
    navItem: {
        width:pxToDp(40),
        height:pxToDp(40),
        marginRight:pxToDp(28)
    },
    scroll_container: {
        // paddingTop: pxToDp(40),
        // , 
        paddingBottom: pxToDp(30),
        },
    bottom_bg: {
        borderTopRightRadius:pxToDp(84),
        borderTopLeftRadius:pxToDp(84),
        backgroundColor:'#293350',
        width:'100%',
        flex: 1,
        backdropFilter: 'blur(48px)',
        padding:pxToDp(40),
        justifyContent:'space-between'
    },
    linearGradient: {
        flex: 1,
        borderTopRightRadius:pxToDp(84),
        borderTopLeftRadius:pxToDp(84),
        opacity:0.8,
        overflow:'hidden',
        marginTop:pxToDp(0)
      },
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      image: {
        width: pxToDp(32),
        height: pxToDp(32),
    },
    titleBg:{
        backgroundColor:'#1B212D',
        justifyContent:"space-between",
        alignItems:'center',
        flexDirection:'row',
        paddingVertical:pxToDp(4),
        paddingHorizontal:pxToDp(10),
        borderRadius:pxToDp(50)
    },
    titleText:{ 
        fontSize: pxToDp(32), 
        color: UIELEMENTS.DEFAULT_DARK_TEXT_COLOR, 
        maxWidth: pxToDp(260), 
    }
})

export default styles;
