import Storage, { LoadParams } from 'react-native-storage';
import { CacheKeys } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

let storage: Storage

const init = () => {
    if (!storage) {

        storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,
            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,
            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            // defaultExpires: 1000 * 3600 * 24,
            defaultExpires: null,
            // 读写时在内存中缓存数据。默认启用。
            enableCache: true
        });

        storage.sync = {
            [CacheKeys.WALLETINFO]: () => null as Map<any,any>,
            [CacheKeys.WALLETPWD]: () => null as string,
            [CacheKeys.LANGUNECOD]: () => null as number,
            [CacheKeys.UNITCODE]: () => 1,
            [CacheKeys.CHAINID]: () => 1,//以太坊
            [CacheKeys.SELECTWALLET]: () => null as Map<any,any>,//以太坊
        }
    }
}

const save = (key: string, data: any, expires?: number) => {

    return storage.save({ key, data, expires });
}

const load = (key: string, params?: any, autoSync = true) => {
    return storage.load({
        key,
        autoSync,
        syncInBackground: true,
        syncParams: params
    })
}

const remove = (key: string) => {
    return storage.remove({ key })
}

const clear = (key?: string) => {
    if (!!key) {
        return storage.clearMapForKey(key);
    } else {
        return storage.clearMap();
    }
}

const getBatchData = (params: LoadParams[]) => {
    return storage.getBatchData(params);
}

export default (() => {
    init();
    return { save, load, remove, clear, getBatchData }
})()

