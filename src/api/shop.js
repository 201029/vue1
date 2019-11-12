/**
 * 店铺管理接口
 */

import req from '@/utils/request' //引入封装的axios

//获取
export const shopinfo = params => req.get('/shop/shopinfo', params)

// 修改
  export const shopedit = params => req.post('/shop/shopedit', params)