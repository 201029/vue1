/* 工具函数  */

//账号的正则验证  中文 长度 2 ~ 5 位
export const nameReg = () => /^[\u4e00-\u9fa5]{2,5}$/

//密码的正则验证  //密码包含数字和英文，长度 3 ~ 12 位 
export const pwdReg = () => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{3,12}$/