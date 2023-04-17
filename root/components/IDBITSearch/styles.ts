import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
    alignItems:"center",
    justifyContent:'center',
    borderRadius:pxToDp(100),
    paddingVertical:pxToDp(12)
    },
    container_push: {
      backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
      borderRadius:pxToDp(500),
      marginRight:pxToDp(0),
      },
      container_discover: {
        backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
        borderRadius:pxToDp(500),
        },
 
})

export default styles;
