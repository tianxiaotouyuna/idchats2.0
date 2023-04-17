import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   
  modalContent: {
    backgroundColor: 'white',
    alignItems: 'center',
    height:pxToDp(416),
    paddingHorizontal:pxToDp(40),
    paddingVertical: pxToDp(80),
    borderTopRightRadius:pxToDp(28),
    borderTopLeftRadius:pxToDp(28),
  },
    text: {
      fontSize: 15,
      color: "#666",
      textAlign: "center",
      width: 140
    }
  });
  export default styles;