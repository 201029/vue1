/**
 * 订单管理接口
 */

import req from '@/utils/request' //引入封装的axios

//   渲染列表(分页)
  export const OrderList = params => req.get('/order/orderlist', params)

// 修改订单
export const editOrder = params => req.post('/order/orderedit', params)