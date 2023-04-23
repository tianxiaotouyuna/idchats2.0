import Axios from "axios";
import Constants from "@/constants/index";
import jquery from "@/utils/jquery";
import { toast } from "@/utils/system";
import axios from "axios";
import { Alert, Platform } from "react-native";

const DEFAULT_TIMEOUT = 50000;

export const getUrl = (api: string, data?: any, isV2?: boolean) => {

  return data && `${isV2 ? Constants.BASE_HOST_V2 : Constants.BASE_HOST}${api}?${!!data ? `${jquery.param(data)}` : ""
    }` || `${isV2 ? Constants.BASE_HOST_V2 : Constants.BASE_HOST}${api}`;
};
const json = async (
  api: string,
  data: any = {},
  method?: string,
  isV2?: boolean
) => {
  const url = getUrl(api, method === "GET" ? data : null, isV2);
  console.log("url======" + url);
  const instance = Axios.create({
    baseURL: isV2 ? Constants.BASE_HOST_V2 : Constants.BASE_HOST,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  });

  const resp: any = method === "POST" ?
    await instance.post(url, JSON.stringify(data)) :
    await instance.get(url);

  if (resp?.status === 200) {
    return Promise.resolve(resp?.data);
  } else {
    console.log('ERROR==========================:\n' + JSON.stringify(resp))
    toast(JSON.stringify(resp), 5000);
    return Promise.reject(resp?.data);
  }
};

export const get = (api: string, data?: any, isV2?: boolean) => {
  return json(api, data, 'GET', isV2);
};
export const post = async (api: string, data?: any, isV2?: boolean) => {
  return await json(api, data, 'POST', isV2);
};
export const uploadFile=(api: string, fileData: any, progressCallBack: Function, callBack: Function) => {

  let axiosPostRequestCancel = null
  const formData = new FormData();
  formData.append(Platform.OS+new Date().getTime().toString(), fileData);
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  formData.append("pinataOptions", pinataOptions);
  
  let config = {
    //添加请求头
    maxBodyLength: Infinity,
    headers: {
      pinata_api_key: '714738198040addd8a46',
      pinata_secret_api_key: '6b41d11e16646d0365136ec09c9b4bdc5ebf52f94c3186f881761232dbf53dfe',
      "Content-Type": "multipart/form-data"
    },
    timeout: 600000,
    //添加上传进度监听事件
    onUploadProgress: (e: any) => {
      let completeProgress = (e.loaded / e.total * 100) | 0;
      progressCallBack && progressCallBack(completeProgress)
    },
    cancelToken: new axios.CancelToken(function executor(c) {
      axiosPostRequestCancel = c // 用于取消上传
    })
  };

  axios.post(api, formData, config)
    .then(
      function (response) {
        Alert.alert(JSON.stringify(response))
        callBack && callBack(true, response)
      })
    .catch(function (error) {
        Alert.alert(JSON.stringify(error))
        callBack && callBack(error)
    });
}