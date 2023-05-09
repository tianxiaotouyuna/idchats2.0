import styles from './styles';
import React, { FunctionComponent, ReactNode, useState } from 'react'
import { View, StyleProp, ViewStyle, Text, Image, } from 'react-native'
import IDBitBtn from '../IDBitBtn/IDBitBtn';
import TagInput from 'react-native-tags-input';
import { pxToDp } from '@/utils/system';
 type ExGoodsCardProps = {
    style?: StyleProp<ViewStyle>;
    onPress?: () => {};
    data?:any
}

const IDbitTagInput: FunctionComponent<ExGoodsCardProps> = (props) => {

    const { style, onPress = () => { },data={} } = props;
    const [tags, settags] = useState({
        tag: '',
        tagsArray: ['啊啥的都多', '的点点滴滴', '啊阿啊阿列克']
      });
    const updateTagState=(state)=>{
            settags(state)
    }
    return (
        <View style={[styles.container, style]}>
            <View style={styles.header_container}>
                <Text style={styles.text}>标签</Text>
                <IDBitBtn text='自定义+' containerStyle={styles.custom_btn} textStyle={styles.custom_btn_text}></IDBitBtn>
            </View>
            <View style={styles.content}>
            {
                data.length==0?
                <Text style={styles.holder_text}>请自定义标签</Text>:
                <TagInput
                  updateState={updateTagState}
                  tags={tags}
                  tagStyle={styles.tag_container}
                  tagTextStyle={styles.tag_text}
                //   deleteElement={()=>(
                //   <Image style={styles.deleteElement} source={require('@/resources/second/icon_cancel.png')}></Image>
                //   )}
                //   deleteIconStyles={styles.deleteIconStyles}
                  inputContainerStyle={styles.inputContainerStyle}
                  />
            }
            </View>
        </View>
    )
}
export default IDbitTagInput
