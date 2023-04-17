import { UIELEMENTS } from '@/constants/index';
import { pxToDp, windowWidth } from '@/utils/system';
import React, { useImperativeHandle,forwardRef, useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleProp, ViewStyle, Pressable } from 'react-native'
import Ripple from 'react-native-material-ripple';
import MnemonicRipple from '../MnemonicRipple/MnemonicRipple';
import PressableSlop from '../PressableSlop/PressableSlop';
import styles from './styles';
export enum MonicGridleStyle {
    OUTPUTSTYLE = 1,//生成助记词
    INPUTSTYLE = 2,//选择助记词,上面的输入框
    INPUTSTYLE_TIPS = 3,//选择助记词,下面的提示
}
type MonicGirdleProps = {
    style?: StyleProp<ViewStyle>
    data?: any
    paddingHorizontal?: number
    onTap?: () => void
    columnCount?: number
    rowCount?: number
    selfMargin?: number
    monicGridleStyle?: MonicGridleStyle
    selectHasChange?: (text: string) => void
    deleteHasChange?: (index:number) => void
    needRefresh?: boolean
    selectMnemonic?:any
    tabWidth?: number
}

const MnemonicGirdle = forwardRef((props:MonicGirdleProps,ref)=>{

 const [_selectMnemonic, set_selectMnemonic] = useState([]);
    const [new_data, setnew_data] = useState([]);
    const mrRef=useRef(MnemonicRipple)
    let {tabWidth, selectMnemonic,selectHasChange,deleteHasChange, selfMargin = pxToDp(10), style, onTap, data, paddingHorizontal = pxToDp(30), columnCount = 1, rowCount = 1, monicGridleStyle = MonicGridleStyle.OUTPUTSTYLE, needRefresh = false } = props;
    useEffect(() => {
        getData()
        
    }, [needRefresh])
    useImperativeHandle(ref, () => ({
        // methods connected to `ref`
        deletleOne: (selectMnemonic_:any) => {
            console.log('asdsssss'+JSON.stringify(selectMnemonic_))
            mrRef?.current.reOpen()
        }
      }))
    
    const getData = () => {
        var new_data_ = new Array()
        for (var i = 0; i < rowCount; i++) {
            var new_data_sub2 = new Array()
            for (var j = 0; j < columnCount; j++) {
                if (monicGridleStyle == MonicGridleStyle.INPUTSTYLE) {
                    new_data_sub2.push(data[i * columnCount + j])
                }
                else
                    new_data_sub2.push(data[i * columnCount + j])
            }
            new_data_.push(new_data_sub2)
        }
        setnew_data(new_data_)
        console.log('new_data===' + JSON.stringify(new_data))
        console.log('new_data_===' + JSON.stringify(new_data_))

    }
    const itemWidth = ((tabWidth?tabWidth:windowWidth) - paddingHorizontal * 2 - (columnCount - 1) * selfMargin) / columnCount
    const renderView = () => {
        console.log('new_data===' + JSON.stringify(2))

        return (
            <View style={[style, { justifyContent: 'space-between',width:'100%' }]}>

                {new_data?.map((item: any, index_row: number) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={`${item}_${index_row}`}>
                        {
                            item?.map((item2: any, index_column: number) => (
                                renderItem(item2, index_row, index_column)
                            ))
                        }
                    </View>

                ))}
            </View>
        )
    }
    const selectOne = (item: string) => {
        if (monicGridleStyle != MonicGridleStyle.INPUTSTYLE_TIPS) return
        selectHasChange(item)
    }
    const deleteOne=(index_row:number,index_column:number)=>{
        console.log(index_row+':'+index_column)
        console.log('all:'+index_row*columnCount+index_column)
        deleteHasChange(index_row*columnCount+index_column)
    }
    const renderItem = (item: string, index_row: number, index_column: number) => 
    {
        return(
        <View ref={ref} key={`${item}_${index_row}_${index_column}`}>
            {monicGridleStyle == MonicGridleStyle.INPUTSTYLE_TIPS ?
                <MnemonicRipple ref={mrRef} onSelected={selectMnemonic?.includes(item)} onPress={() => selectOne(item)} style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR, width: itemWidth, height: itemWidth / 2, alignItems: 'center', justifyContent: 'center', marginTop: selfMargin, borderRadius: pxToDp(16) }} rippleContainerBorderRadius={pxToDp(16)}>
                    <Text style={selectMnemonic?.includes(item)?styles.text_mnioc_sel:styles.text_mnioc}>{item}</Text>
                </MnemonicRipple>
                :
                <>
                    <Ripple onPress={() => selectOne(item)} style={{ backgroundColor: UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR,  width: itemWidth, height: itemWidth / 2, alignItems: 'center', justifyContent: 'center', marginTop: selfMargin, borderRadius: pxToDp(16) }} rippleContainerBorderRadius={pxToDp(16)}>
                        <Text style={styles.text_mnioc}>{item}</Text>
                    </Ripple>
                    {item&&monicGridleStyle==MonicGridleStyle.INPUTSTYLE? <PressableSlop style={styles.text_cancle_press} onPress={()=>deleteOne(index_row,index_column)}>
                            <Image source={require("@/resources/idbt/cancle.png")} style={{width:pxToDp(30),height:pxToDp(30)}} ></Image>
                    </PressableSlop>
                    :<Text style={styles.text_index}>{index_row * columnCount + index_column + 1}</Text>
                    }
                </>
            }

        </View >
    )
        }
    return (
        needRefresh?renderView():renderView()
    )
}
)
export default MnemonicGirdle
