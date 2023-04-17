import { UIELEMENTS } from "@/constants/index";
import { pxToDp, pxToSp } from "@/utils/system";
import { StyleSheet } from "react-native";
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: UIELEMENTS.PADDING_HORIZONTAL,
        backgroundColor: '#0F141E',
        paddingVertical: pxToDp(190),
    },
    tips: {
        color:'#ABABAB',
        fontSize:pxToSp(28)
    },
    btn: {
        borderWidth:0,
        marginTop:pxToDp(160),
        marginBottom:pxToDp(300)
    },
    text1: {
        color:'white',
        fontSize:pxToSp(30),
        marginTop:pxToDp(100),
        marginBottom:pxToDp(24)
    },
    text2: {
        color:'white',
        fontSize:pxToSp(30),
        marginTop:pxToDp(60),
        marginBottom:pxToDp(24)
    },
    text2_keystore: {
        color:'white',
        fontSize:pxToSp(30),
        marginTop:pxToDp(60)
    },
    contentBg:{
        backgroundColor:UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,
        width:'100%',
        height:pxToDp(422),
        borderRadius:pxToDp(16),
    },
    textInput:{
        width: '90%',
        color:'white',
        marginLeft:pxToDp(32),
        fontSize:pxToDp(32),
      },
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      arrowStyle:{width:pxToDp(32),height:pxToDp(32)},
      right: {
        width:pxToDp(28),
        height:pxToDp(28),
      },
      copy:{
          width:pxToDp(22),
          height:pxToDp(20),
      },
      copy_text:{
          color:'#fff',
      },
      selectFile:{paddingHorizontal:pxToDp(32), height:pxToDp(104), marginVertical: pxToDp(24), flexDirection: 'row', justifyContent: "space-between",alignItems:'center' },
      insertPwd: {paddingHorizontal:pxToDp(32), height:pxToDp(104), flexDirection: 'row', justifyContent: "space-between" }
})

export default styles;
