import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: pxToDp(30),
        height: pxToDp(30),
        backgroundColor: "#f7f7f7",
        borderRadius:pxToDp(20)
    },

    btnBg: {
        width: pxToDp(44),
        height: pxToDp(44),
    },
    modalContent: {
      backgroundColor: 'white',
      alignItems: 'center',
      paddingHorizontal:pxToDp(40),
      paddingVertical: pxToDp(40),
      borderTopRightRadius:pxToDp(28),
      borderTopLeftRadius:pxToDp(28),
    },
    arrow:{
        width:pxToDp(22),
        height:pxToDp(20),
        
    },
    image_p:{
        width: pxToDp(120),
        height: pxToDp(120),
        backgroundColor: "#D8D8D8",
        borderRadius:pxToDp(20)
    },
    text: {
      fontSize: 15,
      color: "#666",
      textAlign: "center",
      width: 140,
      marginTop:pxToDp(28) ,fontWeight:"bold"
    },
        load_box: {
            width: 100,
            height: 100,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10
        },
        load_progress: {
            width: 50,
            height: 50
        },
        //默认字体颜色
        load_text: {
            color: '#FFF',
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(178,178,178,0.8)',
        }
})

export default styles;
