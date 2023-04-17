import Axios, { AxiosRequestConfig, Method } from "axios";
import Constants, { CacheKeys } from "@/constants/index";
import jquery from "@/utils/jquery";
import { toast } from "@/utils/system";
import { Alert } from "react-native";
import { AnyKindOfDictionary } from "lodash";

const DEFAULT_TIMEOUT = 50000;
export const getUrl = (api: string, data?: any,useDefine?:boolean) => {
return data && `${api}?${!!data ? `${jquery.param(data)}` : ""
    }` || api;
};
const json = async (
    api: string,
    data: any = {},
    method?: string,
) => {
    const url = getUrl(api, method === "GET" ? data : null);
    console.log("url======" + url);
    const instance =
    Axios.create({
       timeout: DEFAULT_TIMEOUT,
       headers: { accept: 'application/json' }
   })

    try {
        const resp: any = method === "POST" ?
            await instance.post(url, JSON.stringify(data)) :
            await instance.get(url);

        if (resp?.status === 200) {
            return Promise.resolve(resp?.data);
        } else {
            console.log('ERROR==========================:\n' + JSON.stringify(resp))
            toast(JSON.stringify(resp), 5000)
            return Promise.reject(resp?.data);
        }
    }
    catch (e) {
        Alert.alert(JSON.stringify(e))
    }
};

export const get = async (api: string, data?: AnyKindOfDictionary) => {
    return await json(api, data, 'GET');
};
export const post = async (api: string, data?: any) => {
    return await json(api, data, 'POST');
};




