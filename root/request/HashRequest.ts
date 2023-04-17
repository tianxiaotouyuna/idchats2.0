import Axios, { AxiosRequestConfig, Method } from "axios";
import Constants, { CacheKeys } from "@/constants/index";
import jquery from "@/utils/jquery";
import { toast } from "@/utils/system";
import { Alert } from "react-native";

const DEFAULT_TIMEOUT = 50000;
const REACT_APP_SIMPLE_HASH_API_KEY = 'tally_sk_428718ba-abc9-453a-af95-fd07d046f115_cp3n5shchhcf05xk'

export const getUrl = (api: string, data?: any) => {

    return data && `${Constants.HASH_HOST}${api}?${!!data ? `${jquery.param(data)}` : ""
        }` || `${Constants.HASH_HOST}${api}`;
};
const json = async (
    api: string,
    data: any = {},
    method?: string,
) => {
    const url = getUrl(api, method === "GET" ? data : null);
    console.log("url======" + url);
    const instance = Axios.create({
        baseURL: Constants.HASH_HOST,
        timeout: DEFAULT_TIMEOUT,
        headers: { accept: 'application/json', 'X-API-KEY': REACT_APP_SIMPLE_HASH_API_KEY }
    });

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

export const get = async (api: string, data?: any) => {
    return await json(api, data, 'GET');
};
export const post = async (api: string, data?: any) => {
    return await json(api, data, 'POST');
};


