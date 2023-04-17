import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
        width: pxToDp(120),
        height: pxToDp(120),
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
        width:pxToDp(120),
        height:pxToDp(120),
        
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
    }
})

export default styles;
