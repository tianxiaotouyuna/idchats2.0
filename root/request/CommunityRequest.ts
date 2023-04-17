import Axios, { AxiosRequestConfig, Method } from "axios";
import Constants, { CacheKeys } from "@/constants/index";
import jquery from "@/utils/jquery";
import Toast from "react-native-root-toast";
import IMServiceManager from "@/utils/IMServiceManager";
import { toast } from "@/utils/system";
import { Alert } from "react-native";

const DEFAULT_TIMEOUT = 50000;

export const getUrl = (api: string, data?: any,isV2?: boolean) => {

  return data && `${isV2? Constants.COMMUNITY_HOST:Constants.COMMUNITY_HOST}${api}?${!!data ? `${jquery.param(data)}` : ""
    }` || `${isV2? Constants.COMMUNITY_HOST:Constants.COMMUNITY_HOST}${api}`;
};
const json = async (
  api: string,
  data: any = {},
  method?: string,
  isV2?: boolean
) => {
  const url = getUrl(api, method === "GET" ? data : null,isV2);
  console.log("url======" + url);
  // Alert.alert(JSON.stringify(IMServiceManager.getInstance().getChainId()))
  const instance = Axios.create({
    baseURL:isV2? Constants.COMMUNITY_HOST:Constants.COMMUNITY_HOST,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'token': IMServiceManager.getInstance().getToken(),
      'chainId': IMServiceManager.getInstance().getChainId(),
      // 'chainId':1//137 Matic
  }
  });

  const resp: any = method === "POST" ?
    await instance.post(url, JSON.stringify(data)) :
    await instance.get(url);

  if (resp?.status === 200) {
return Promise.resolve(resp?.data);
  } else {
    console.log('ERROR==========================:\n'+JSON.stringify(resp))
    toast(JSON.stringify(resp),5000)
    return Promise.reject(resp?.data);
  }
};

export const get = (api: string, data?: any, isV2?: boolean) => {
  return json(api, data, 'GET',isV2);
};
export const post = async (api: string, data?: any, isV2?: boolean) => {
  return await json(api, data, 'POST',isV2);
};


