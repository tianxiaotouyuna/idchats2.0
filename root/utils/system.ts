import {
  Alert,
  Dimensions,
  PixelRatio,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
// require the module
import Toast from "react-native-root-toast";
import RNFS from 'react-native-fs';
import { BigNumber } from "@ethersproject/bignumber";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();
const uiWidth = 750;
const uiHeight = 1334;

// const scale = Math.min(windowHeight / uiHeight, windowWidth / uiWidth);
const windowWidthPx = PixelRatio.getPixelSizeForLayoutSize(windowWidth);
const windowHeightPx = PixelRatio.getPixelSizeForLayoutSize(windowHeight);
const scalePx = Math.min(windowHeightPx / uiHeight, windowWidthPx / uiWidth);

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";

export const pxToSp = (value: number) => {
  const scaleWidth = windowWidth / uiWidth;
  const scaleHeight = windowHeight / uiHeight;
  const scale = Math.min(scaleWidth, scaleHeight);
  return Math.round((value * scale) / fontScale + 0.5);
};
const isLandscape = () => {
  const dim = Dimensions.get("screen");
  return dim.width >= dim.height;
};
export const tabBarHeight = () => {
  const majorVersion = parseInt(Platform.Version, 10);
  const isIos = Platform.OS === "ios";
  const isIOS11 = majorVersion >= 11 && isIos;
  if (isIOS11 && !isLandscape()) return 49;
  return 29;
};

export const pxToDp = (value: number) => {
  if (!value) {
    return 0;
  }
  return Math.round((value * scalePx) / pixelRatio + 0.5);
};
export const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
  style?: StyleProp<ViewStyle>
) => {
  var style_;
  if (Platform.OS === "ios") {
    style_ = {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === "android") {
    style_ = {
      shadowColor: shadowColorAndroid,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
      elevation: elevation,
    };
  }
  return [style, style_];
};
/** 等待时长（秒） */
export const awaitTime = (duration: number) => {
  return new Promise((resolve) => {
    const time: any = setTimeout(() => resolve(time), duration * 1000);
  });
};

export const checkPhone = (phone: string) => {
  if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
    // alert("手机号码有误，请重填");
    return false;
  } else return true;
};
export function checkEmail(email: string) {

  // 对电子邮件的验证

  var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

  if (!myreg.test(email)) {

    return false;

  } else {

    return true;

  }

}
export function getLocalTime(nS: string) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
/** 等待时长（秒） */
export const toast = (content: string, time?: number) => {
  return Toast.show(content, { duration: time || 1500, position: Toast.positions.CENTER, containerStyle: { opacity: 1.0, backgroundColor: 'white', paddingHorizontal: pxToDp(40), paddingVertical: pxToDp(32), borderRadius: pxToDp(16) }, textStyle: { color: '#0D0E10', fontSize: pxToDp(34) } });
};
/** 等待时长（秒） */
export const log = (content: any, tag?: string, unTransform = false) => {
  tag = tag ? tag : (new Date(Date.now()) + '')
  unTransform == false ? console.log('-------------------' + tag + '-----------------------\n' + ':        ' + JSON.stringify(content))
    : console.log('-------------------' + tag + '-----------------------\n' + ':        ' + content)
};
export const readFile = async (path: string) => {
  try {
    const result = await RNFS.readFile(path, "utf8");
    // console.log("got data: ", result);
    return result
  } catch (err) {
    //alert(err.message);
    Toast.show(err?.message);
  }
}
export const readFile_image = async (path: string) => {
  try {
    const result = await RNFS.readFile(path, "base64");
    // console.log("got data: ", result);
    return result
  } catch (err) {
    //alert(err.message);
    Toast.show(err?.message);
  }
}

export const handleFixIpfs = (img: string) => {
  if (!img) img = '';
  const CID = require('cids')
  if (img.indexOf("ipfs://") > -1) {
    let url = img.split("//")[1];
    if (url.startsWith("Qm") && url.indexOf("/") > 0) {
      const cid = new CID(url.split("/")[0]);
      url = cid.toV1().toString();
      return `https://${url}.ipfs.nftstorage.link/${img.split("//")[1].split("/")[1]}`;
    } else if (url.startsWith("Qm")) {
      const cid = new CID(url);
      img = cid.toV1().toString();
      return `https://${img}.ipfs.nftstorage.link`;
      // return `${IPFS_URL}${img.split("//")[1]}`;
    } else {
      return `https://${img}.ipfs.nftstorage.link`;
    }
  }
  return img;
}
function add0(m: number) { return m < 10 ? '0' + m : m }
export function format(shijianchuo: number) {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return add0(h) + ':' + add0(mm);
}

export function randSort(arr: [{}]) {
  var mixedArray = [];
  while (arr.length > 0) {
    var randomIndex = parseInt(Math.random() * arr.length);
    mixedArray.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return mixedArray;
}
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function readXlsx(e) {
  e.preventDefault();
  if (e.target.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);
      console.log(json);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  }
}



export function newReadFile() {

  // On Android, use "RNFS.DocumentDirectoryPath"
  // (MainBundlePath is not defined)
  RNFS.readDir(RNFS.ExternalStorageDirectoryPath)
    .then((result) => {
      for (let i = 0; i < result.length; i++) {

        // Print the result
        console.log('GOT RESULT', result[i]);
      }

      // Stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then((statResult) => {
      if (statResult[0].isFile()) {

        // If we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }
      return 'no file';
    })
    .then((contents) => {

      // Print the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
};

// add 10%
export function calculateGasMargin(value: BigNumber, margin = 1000): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(margin))).div(BigNumber.from(10000));
}
