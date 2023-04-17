import { UIELEMENTS } from "@/constants/index";
import { COLORS } from "@/utils/Miscellaneous";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.clear,
  },
  container_pinned: {
    paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
    backgroundColor: 'rgba(255, 255, 255, .05)'
  },


})

export default styles;
