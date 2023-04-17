import Axios, { AxiosRequestConfig, Method } from "axios";
import Constants, { CacheKeys } from "@/constants/index";
import jquery from "@/utils/jquery";
import { toast } from "@/utils/system";
import { Alert } from "react-native";

const DEFAULT_TIMEOUT = 50000;

export const getUrl = (api: string, data?: any) => {

    return data && `${''}${api}?${!!data ? `${jquery.param(data)}` : ""
        }` || `${''}${api}`;
};
const config={
    timeout: DEFAULT_TIMEOUT,
    headers: {
    'Content-Type':'application/json',
      }
}
const json = async (
    api: string,
    data: any = {},
    method?: string,
    headerConfig?:any
) => {
    const url = getUrl(api, method === "GET" ? data : null);
    console.log("url======" + url);
    const instance = Axios.create(headerConfig||config);
    try {
        const resp: any = method === "POST" ?
            await instance.post(url, data,headerConfig) :
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
            console.log('ERROR==========================:\n' + JSON.stringify(e))
            // Alert.alert(JSON.stringify(e))
    }
};

export const get = async (api: string, data?: any,headerConfig?:any) => {
    return await json(api, data, 'GET',headerConfig);
};
export const post = async (api: string, data?: any,headerConfig?:any) => {
    return await json(api, data,'POST',headerConfig);
};


