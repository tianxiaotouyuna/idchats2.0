import { IDBITRequest } from "@/request/index";
import IMServiceManager from "@/utils/IMServiceManager";

// qq123466
/**
 * 获取NonceCode
 */
export const getNonceCode = async (publicAddress: string) => {
  const resp = await IDBITRequest.post("/v1/api/noncecode", { publicAddress: publicAddress.toLowerCase(), operationID: Date.now() + "" });
  return resp?.data?.nonce;
};
/**
 * 获取授权token
 */
export const getLoginToken = async (publicAddress: string, signature: string) => {
  const resp = await IDBITRequest.post("/v1/api/login", { publicAddress: publicAddress.toLowerCase(), signature, operationID: Date.now() + "", platform: 5 });
  
  return resp?.data;
};

