import constants, { ReduxToken } from "../constants";
import { HashRequest, IDBITRequest } from "../request";
/**
 * 查询NFT
 */
export const getApplicationList = async (data: any) => {
  const params = data?.params;
  const result = [{ name: '俄罗斯方块', image: 'http://gd-hbimg.huaban.com/582f81d810365b88f9073d3ebc11450e3d6ce4d83b24-IfKDKo_fw236', descrip: '一款经典的休闲小游,一款经典的休闲小游' },
  { name: '轻松投篮', image: 'https://p1.ssl.qhimgs1.com/sdr/400__/t013f29e6429bece717.jpg', descrip: '一款经典的休闲小游' },
  { name: '猫咪快跑', image: 'http://hbimg.huabanimg.com/d723779765da4cb5188a107e0af7b9a5aea2ffc716bbe-PS6Yc2_fw236', descrip: '一款经典的休闲小游,一款经典的休闲小游,一款经典的休闲小游' }]
  return { list: result };
};

/**
 * 获取用户绑定的第三方信息信息
 * @param userIDList
 */
const getThirdStatusApi = (userIDList: string[], token?: string) => {
  return IDBITRequest.post(
    "/user/get_third_status",
    { userIDList, operationID: Date.now() + "" },
    true
  );
};