import { IDBITRequest } from "@/request/index";
import { normalizeHexAddress } from "@/utils/regular";
import { randSort, sleep, toast } from "@/utils/system";
import { remove } from "lodash";
import { Alert } from "react-native";
import { StylePropType } from "react-native-gifted-chat";
import { ReduxToken } from "../constants";
import { OpenIMSDK } from "./open_im_sdk";
import { PinCveParams } from "./open_im_sdk/types";

/**
 * 获取授权token
 */
export const getDappsList = async () => {
    //   const resp = await IDBITRequest.post("/v66/api/loginloading", {});
    const json = [{
        img: 'https://img0.baidu.com/it/u=990331460,1567030543&fm=253&fmt=auto&app=138&f=PNG?w=455&h=267',
        name: 'Dapp大神',
        content: '哦奥ID叫啊上帝啊哦ID急哦啊睡觉滴哦啊激动i哦i啊扫地机哦哦i家啊扫地机',
        address: '0x3884829sdjkjdkj39'
    },
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fitem.misuland.com%2Fattachment%2F723D129B29436E82042E4A5E34A6C26A.jpg&refer=http%3A%2F%2Fitem.misuland.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672904850&t=0284283750d6aadbda9200d607804a81',
        name: 'Dapp市场',
        content: '哦奥ID叫啊上帝啊哦ID急哦啊睡觉滴哦啊激动i哦i啊扫地机哦哦i家啊扫地机',
        address: '0x3884829sdjkjdkj39'
    },
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fitem.misuland.com%2Fattachment%2F723D129B29436E82042E4A5E34A6C26A.jpg&refer=http%3A%2F%2Fitem.misuland.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672904850&t=0284283750d6aadbda9200d607804a81',
        name: 'Dapp终端',
        content: '哦奥ID叫啊上帝啊哦ID急哦啊睡觉滴哦啊激动i哦i啊扫地机哦哦i家啊扫地机',
        address: '0x3884829sdjkjdkj39'
    },
    {
        img: 'https://img0.baidu.com/it/u=990331460,1567030543&fm=253&fmt=auto&app=138&f=PNG?w=455&h=267',
        name: 'Dapp玩家',
        content: '哦奥ID叫啊上帝啊哦ID急哦啊睡觉滴哦啊激动i哦i啊扫地机哦哦i家啊扫地机',
        address: '0x3884829sdjkjdkj39'
    }]
    await sleep(2000)
    return {list:randSort(json)};
};
/**
 * 获取banner信息
 */
export const getBannerData = async () => {
    //   const resp = await IDBITRequest.post("/v66/api/loginloading", {});
    const json = [{
        img: 'https://img0.baidu.com/it/u=990331460,1567030543&fm=253&fmt=auto&app=138&f=PNG?w=455&h=267',
        name: 'Dapp大神',
        content: '哦奥ID叫啊上帝啊哦ID急哦啊睡觉滴哦啊激动i哦i啊扫地机哦哦i家啊扫地机',
        address: '0x3884829sdjkjdkj39'
    },
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fitem.misuland.com%2Fattachment%2F723D129B29436E82042E4A5E34A6C26A.jpg&refer=http%3A%2F%2Fitem.misuland.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672904850&t=0284283750d6aadbda9200d607804a81',
        name: 'Dapp市场',
        content: '哦奥ID叫啊上帝啊哦ID急哦啊睡觉滴哦啊激动i哦i啊扫地机哦哦i家啊扫地机',
        address: '0x3884829sdjkjdkj39'
    },
    {
        img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fitem.misuland.com%2Fattachment%2F723D129B29436E82042E4A5E34A6C26A.jpg&refer=http%3A%2F%2Fitem.misuland.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672904850&t=0284283750d6aadbda9200d607804a81',
        name: 'Dapp终端',
        content: '哦奥ID叫啊上帝啊哦ID急哦啊睡觉滴哦啊激动i哦i啊扫地机哦哦i家啊扫地机',
        address: '0x3884829sdjkjdkj39'
    },
    {
        img: 'https://img0.baidu.com/it/u=990331460,1567030543&fm=253&fmt=auto&app=138&f=PNG?w=455&h=267',
        name: 'Dapp玩家',
        content: '哦奥ID叫啊上帝啊哦ID急哦啊睡觉滴哦啊激动i哦i啊扫地机哦哦i家啊扫地机',
        address: '0x3884829sdjkjdkj39'
    }]
    await sleep(2000)
    return randSort(json);
};
/**
 * 置顶、取消置顶
 */
export const pinConversation = async (imIns: OpenIMSDK, sendReduxAction: any, parmas: PinCveParams) => {
    try {
        await imIns.pinConversation(parmas)
        sendReduxAction(ReduxToken.NEEDRELOADCHATLIST, {})
    } catch (error) {
        toast('失败：' + JSON.stringify(error))
    }
};

