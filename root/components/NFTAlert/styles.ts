import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginHorizontal: pxToDp(24),
        marginVertical: pxToDp(12),
        borderRadius: pxToDp(16),
        overflow: "hidden",
        height:pxToDp(300)
    },
 
})

export default styles;
