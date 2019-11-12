// import { type } from "os";

/**
 * 对于本地存储操作的封装 永久存储
 */

export default {  
    get(key) {
        let val = window.localStorage.getItem(key);//获取指定key本地存储的值
        return JSON.parse(val);
    },
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value)) //将value存储到key字段
    },
    remove(key) {
        window.localStorage.removeItem(key) //removeItem(key):删除指定key本地存储的值
    },
    clear() {
        window.localStorage.clear() //clear()方法清除 localStorage 保存对象的全部数据
    }
}


