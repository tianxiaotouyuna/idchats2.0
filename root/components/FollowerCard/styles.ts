import { UIELEMENTS } from "@/constants/index";
import { COLORS } from "@/utils/Miscellaneous";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingLeft:pxToDp(10),
    paddingRight: UIELEMENTS.PADDING_HORIZONTAL,
    backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
    borderRadius:pxToDp(32),
  },
  container_pinned: {
    paddingLeft:pxToDp(10),
    paddingRight: UIELEMENTS.PADDING_HORIZONTAL,
    backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
    borderRadius:pxToDp(32),
  },


})

export default styles;
