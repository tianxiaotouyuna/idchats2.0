import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    transitionContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    transparentCard: {
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        opacity:0.3,
        borderRadius:pxToDp(30)
    },
    card: {
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        borderRadius:pxToDp(30),
        position:'absolute',
        top:0,
        left:0,
        overflow:'hidden'
    },
});

export default styles;
