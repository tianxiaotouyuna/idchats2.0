import constants, { ReduxToken } from "../constants";
import { HashRequest, IDBITRequest } from "../request";
/**
 * 查询NFT
 */
export const getDraftBox = async (data: any) => {
  const params = data?.params;
  const result = [{ image: 'http://gd-hbimg.huaban.com/582f81d810365b88f9073d3ebc11450e3d6ce4d83b24-IfKDKo_fw236', content: '一款经典的休闲小游,一款经典的休闲小游' },
  { image: 'https://p1.ssl.qhimgs1.com/sdr/400__/t013f29e6429bece717.jpg', content: '一款经典的休闲小游' },
  { image: 'http://hbimg.huabanimg.com/d723779765da4cb5188a107e0af7b9a5aea2ffc716bbe-PS6Yc2_fw236', content: '一款经典的休闲小游,一款经典的休闲小游,一款经典的休闲小游' }]
  return { list: result };
};