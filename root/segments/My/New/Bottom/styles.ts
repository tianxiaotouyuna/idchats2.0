import { pxToDp } from "@/utils/system";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F141E',
        paddingTop: pxToDp(105)
    },
    scroll_container: {
        // paddingTop: pxToDp(40),
        // , 
        paddingBottom: pxToDp(30),
        },
})

export default styles;
