

/**
 * 商品管理接口
 */

import req from '@/utils/request' //引入封装的axios

/* 添加商品 */
export const goodsAdd = params => req.post('/goods/goodsadd', params) 


/* 获取内容(分页) */
 export const goodslist = params => req.get('/goods/goodslist', params)


/* 删除 */
 export const goodsDel = params => req.get('/goods/goodsdel', params)



/* 修改 */
 export const goodsEdit = params => req.post('/goods/goodsedit', params)

 
