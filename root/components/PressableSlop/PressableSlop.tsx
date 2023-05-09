import { pxToDp } from '@/utils/system';
import React, { FunctionComponent, useState } from 'react'
import { Alert, Pressable, PressableProps, TouchableHighlight, TouchableHighlightProps } from 'react-native'
export enum TouchType {
    DEFAULT_STYLE = 0, //0:默认 
    HIGHLIGHT_STYLE = 1, //TouchableHighlight
  }
type PressableSlopProps =TouchableHighlightProps& {
    touchType?:TouchType;//
}

const PressableSlop: FunctionComponent<PressableSlopProps> = (props) => {
    const [slopActivi, setslopActivi] = useState({top: 0, bottom: 0, left: 0, right: 0});
    const {touchType=0}=props;
    const onLayout=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        let slopVer=0;
        let slopHor=0;
        if(height<44) slopVer=pxToDp(44-height)
        if(width<44) slopHor=pxToDp(44-width)
        setslopActivi({top: slopVer, bottom: slopVer, left: slopHor, right: slopHor})
      }
    return (
        touchType==0?  <Pressable style={props?.style} onLayout={onLayout} onPress={props?.onPress} hitSlop={slopActivi}>
            {props?.children }
        </Pressable>:
        <TouchableHighlight onPress={props?.onPress}  onLayout={onLayout} hitSlop={slopActivi} underlayColor={'transparent'}>
            {props?.children }
        </TouchableHighlight>
    )
}
export default PressableSlop
