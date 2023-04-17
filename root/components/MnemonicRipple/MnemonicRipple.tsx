import React, { useEffect, useImperativeHandle, useState } from "react";
import Ripple from "react-native-material-ripple";
import { forwardRef } from "react";
type RippleProps = Ripple['props'] & {
  initData?: [],
  onSelected?: boolean
};

const MnemonicRipple = forwardRef((props: RippleProps, ref) => {
  const [isSelect, setisSelect] = useState(false);
  const { onSelected = false } = props;
  useEffect(() => {
    setisSelect(onSelected)
  }, [onSelected])
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    reOpen: () => {
      console.log('asdsssss' + JSON.stringify('selectMnemonic_'))
      reOpen()
    }
  }))
  const reOpen = () => {
    // setneedRefresh(!needRefresh)
  }
  const renderLoginOut = () => {
    const click = () => {

      props?.onPress()
      setisSelect(true)
    }
    return (
      <Ripple ref={ref} disabled={isSelect} onPress={() => click()} style={[props?.style, isSelect == true ? { backgroundColor: '#EBEBEB' } : {}]}  rippleContainerBorderRadius={props?.rippleContainerBorderRadius}>
        {props?.children}
      </Ripple>
    )
  }
  return (
    renderLoginOut()
  );
}
)

export default MnemonicRipple;
