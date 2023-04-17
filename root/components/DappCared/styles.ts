import { UIELEMENTS } from "@/constants/index";
import { COLORS } from "@/utils/Miscellaneous";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingVertical:pxToDp(22),
    backgroundColor:COLORS.clear,
    },
    container_pinned: {
      paddingVertical:pxToDp(22),
      backgroundColor:'rgba(255, 255, 255, .05)'
      },
 
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      paddingLeft: 5,
      backgroundColor: '#efefef',
      margin: 20,
      minHeight: 50,
    },
    swipedRow: {
      width:'30%',
      alignItems: 'center',
      paddingLeft: 5,
      backgroundColor: '#818181',
      margin: 20,
      minHeight: 50,
    },
    swipedConfirmationContainer: {
      flex: 1,
    },
    deleteConfirmationText: {
      color: '#fcfcfc',
      fontWeight: 'bold',
    },
    deleteButton: {
      backgroundColor: '#b60000',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
    deleteButtonText: {
      color: '#fcfcfc',
      fontWeight: 'bold',
      padding: 3,
    },
})

export default styles;
