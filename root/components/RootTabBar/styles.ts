import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: pxToDp(98),
        backgroundColor: '#272B34',
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button_txt: {
        fontSize: pxToSp(20),
    },
})

export default styles;
