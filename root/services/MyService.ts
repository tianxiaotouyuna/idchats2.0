import { CoinGeckoRrquest, IDBITRequest } from "@/request/index";
import pstorage from "@/utils/pstorage";
import { UserService } from ".";

/**
 * 获取用户信息
 */
export const getUserInfo = async (publicAddress: string) => {
  const resp = await IDBITRequest.post("/user/get_self_user_info", { userID: publicAddress.toLowerCase(), operationID: Date.now() + "" });
  return resp?.data;
};
/**
* 获取授权token
*/
export const getNftList = async () => {
  return { list: [] };
};
export const serachLocalToken = async (data: any) => {
  const { address, wallet, text } = data.params
  const coinNames = await pstorage.coinNames(address);
  let result = []
  result = compareList(text, coinNames)
  if (result.length == 0) return { list: [] };
  const resp =await UserService.getTokenListByCoinNames(result, address);
  return { list: resp ?? [] };
};
const compareList = (value: string, list: any) => {
  // value:要查询的字符串
  // list:这里匹配，lis必须是个数组
  if (value) {
    let arr = [] as Array<any>
    list.forEach((el: any) => {
      if (el.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        arr.push(el)
      }
    })
    return arr;
  }
}
export const serachUnHaveToken = async (data: any) => {
  const { address, wallet, text } = data.params
  const coinNames = await pstorage.coinNames(address);
  let result = []
  result = compareList(text, coinNames)
  if (result.length == 0) return { list: [] };
  const resp =await UserService.getTokenListByCoinNames(result, address);
  return { list: resp ?? [] };
};
