import { IDBITRequest } from "@/request/index";

/**
 * 获取IDO历史
 */
export const getIdoHistory = async (publicAddress: string) => {
    const list=[
        {
            head:'',
            round:'第三轮',
            status:'即将开始',
            symbolName:'USDT',
            descrition:'可作为浏览器扩展程序和移动应用程序使用，为您提供密钥保管库、安全登录、令牌钱包和令牌交换——管理数字资产所需的一切。',
            exchange:'1 BUSD =200.0000 WWY',
            theTop:'30000',
            participants:'300',
            progress:'0.47'
        },
        {
            head:'',
            round:'第二轮',
            status:'已开始',
            symbolName:'USDT',
            descrition:'可作为浏览器扩展程序和移动应用程序使用，为您提供密钥保管库、安全登录、令牌钱包和令牌交换——管理数字资产所需的一切。',
            exchange:'2 BUSD =200.0000 WWY',
            theTop:'310000',
            participants:'1300',
            progress:'0.8'
        },
        {
            head:'',
            round:'第四轮',
            status:'已结束',
            symbolName:'USDT',
            descrition:'可作为浏览器扩展程序和移动应用程序使用，为您提供密钥保管库、安全登录、令牌钱包和令牌交换——管理数字资产所需的一切。',
            exchange:'13 BUSD =200.0000 WWY',
            theTop:'330000',
            participants:'400',
            progress:'0.21'
        },
        {
            head:'',
            round:'第五轮',
            status:'已结束',
            symbolName:'USDT',
            descrition:'可作为浏览器扩展程序和移动应用程序使用，为您提供密钥保管库、安全登录、令牌钱包和令牌交换——管理数字资产所需的一切。',
            exchange:'4 BUSD =200.0000 WWY',
            theTop:'430000',
            participants:'300',
            progress:'0.33'
        },
        {
            head:'',
            round:'第三轮',
            status:'已结束',
            symbolName:'USDT',
            descrition:'可作为浏览器扩展程序和移动应用程序使用，为您提供密钥保管库、安全登录、令牌钱包和令牌交换——管理数字资产所需的一切。',
            exchange:'4 BUSD =200.0000 WWY',
            theTop:'530000',
            participants:'5300',
            progress:'0.58'
        }
    ]
  return {list:list};
};