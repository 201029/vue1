/**
 * 账号管理接口
 */

import req from '@/utils/request' //引入封装的axios

//验证账号是否重复
export const registers = params => req.post('/account/registers', params)

// 添加账号
export const addAccount = params => req.post('/account/accountadd', params)

// 渲染列表(分页)
export const accountlist = params => req.get('/account/accountlist', params)

// 单个删除
export const accountDel = params => req.get('/account/accountdel', params)

//多个删除
export const batchdel = params => req.get('/account/accountbatchdel', params)

//编辑
export const accountedit = params => req.post('/account/accountedit', params)

//登录
export const checklogin = params => req.post('/account/checklogin', params)

//原密码验证是否存在 验证旧密码
export const checkOldPwd = params => req.get('/account/checkoldpwd', params)

//修改密码
export const pwdedit = params => req.post('/account/passwordedit', params)

// 获取账号信息
export const getAccountInfo = params => req.get('/account/accountinfo', params)

// 修改头像
export const editAvatarImg = params => req.get('/account/avataredit', params)

 
 




