import * as ReduxToken from './redux-token';
import * as CacheKeys from './cache-keys';
import * as UIELEMENTS from './ui-elements';
import * as CONSTRACTKEYS from './contract-keys';
import * as CONSTRACTABIKEYS from './contractAbi-keys';

const isReleaseEnvironment = false; // 是否发布环境
const HASH_HOST = 'https://api.simplehash.com/api'
const COINGECKO_HOST = 'https://api.coingecko.com/api/v3'
const REACT_APP_ALCHEMY_ID='-xNVgyEDtBlMSxbJJv4kOcOYi312c7uV'
const REACT_APP_SIMPLE_HASH_API_KEY='tally_sk_428718ba-abc9-453a-af95-fd07d046f115_cp3n5shchhcf05xk'
const REACT_APP_INFURA_PROJECTID='2IZyP7mrZXq9wiQ18VQXHPstB4s'
const REACT_APP_INFURA_APIKEY='a75c4e8a196777e6f5dc20a9effafca4'
const PINATA_UPLOADURL='https://api.pinata.cloud/pinning/pinFileToIPFS'

const envParams = isReleaseEnvironment ? ({
   BASE_HOST : 'https://test1.idchats.com',
   IM_HOST : 'wss://test1.idchats.com/ws',
   BASE_HOST_V2 : 'https://test1.idchats.com',
   BASE_HOST_V3 : 'https://test1.idchats.com',
   IDO_CONTRACT_ADRESS:'0xb499E637c696e4F00abF91ac266113B68E556250'
}) : ({
   BASE_HOST :'http://192.168.100.99:10004',//内网接口
   IM_HOST : 'ws://192.168.100.99:10003',
   BASE_HOST_V2 : 'http://192.168.100.99:10002',
   BASE_HOST_V3 : 'http://192.168.100.99:10030',//app接口
   COMMUNITY_HOST : 'http://192.168.100.99:10002',
   // BASE_HOST : 'https://test1.idchats.com',//测试接口
   // IM_HOST : 'wss://test1.idchats.com/ws',
   // BASE_HOST_V2 : 'https://test1.idchats.com',
   // BASE_HOST_V3 : 'https://test1.idchats.com',
   // COMMUNITY_HOST : 'https://test1.idchats.com',
   // IDO_CONTRACT_ADRESS:'0xb499E637c696e4F00abF91ac266113B68E556250'

})

export { ReduxToken, CacheKeys, UIELEMENTS ,CONSTRACTKEYS,CONSTRACTABIKEYS};

export default {
  ...envParams,
  HASH_HOST,
  COINGECKO_HOST,
  isReleaseEnvironment,
  REACT_APP_ALCHEMY_ID,
  REACT_APP_SIMPLE_HASH_API_KEY,
  REACT_APP_INFURA_PROJECTID,
  REACT_APP_INFURA_APIKEY,
  PINATA_UPLOADURL,
};






//  const IPFS_URL = "https://ipfs.io/ipfs/";

// const BASE_HOST='http://192.168.124.25:8082/renren-api/robot'// 测试环境
// const BASE_HOST='http://localhost:8082/renren-api/robot'// 测试环境
// 10002 token
// const BASE_HOST = 'http://192.168.100.99:10004'// 自己接口服务器
// const IM_HOST = 'ws://192.168.100.99:10003'// WS服务器
// const BASE_HOST_V2 = 'http://192.168.100.99:10002'// 自己接口服务器

// const BASE_HOST = 'https://www.idchats.com.com'// 自己接口服务器 adimin 10002
// const IM_HOST = 'wss://idchats.com:10003'// WS服务器

// const BASE_HOST = 'https://test1.idchats.com'// 自己接口服务器
// const IM_HOST = 'wss://test1.idchats.com/ws'// WS服务器
// const BASE_HOST_V2 = 'https://test1.idchats.com'// 自己接口服务器