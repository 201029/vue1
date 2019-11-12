import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
    // redirect: '/home'
  },
  {
    path: '/login', //登录
    component: () => import('../views/Login.vue')
  }
  , {
    path: '/home', //管理系统首页
    component: () => import('../views/Home.vue'),
    children: [
      //后台首页
      , {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home', title: '后台首页' }
          ]
        },
        path: '', //后台首页
        component: () => import('../views/Index.vue')
      }
   
   
      , {//订单管理

        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/ordermanagement', title: '订单管理' }
          ]
        },
        path: '/home/ordermanagement', //订单管理
        component: () => import('../views/order/OrderManagement.vue')
      }
      , {//订单详细和修改
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/orderdetail', title: '订单详情' }
          ]
        },
        //订单详细和修改
        name: 'orderdetail',
        path: '/home/orderdetail',
        component: () => import('../views/order/OrderDetails.vue'),
      }
     
     
      , {//商品管理 //商品列表 商品添加 商品修改
        meta: {
          breadArr: [//商品列表
            { path: '/home', title: '首页' },
            { path: '/home/commoditylist', title: '商品管理' },
            { path: '/home/commoditylist', title: '商品列表' },
          ]
        },
        path: '/home/commoditylist', //商品列表
        component: () => import('../views/commodity/CommodityList.vue')
      }
      , {//商品添加
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/commoditylist', title: '商品管理' },
            { path: '/home/commodadd', title: '商品添加' },
          ]
        },
        path: '/home/commodadd', //商品添加
        component: () => import('../views/commodity/CommodityAdd.vue')
      }
      , {//商品修改
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/commoditylist', title: '商品管理' },
            { path: '/home/commodityedit', title: '商品编辑' },
          ]
        },
        path: '/home/commodityedit', //商品修改
        component: () => import('../views/commodity/CommodityEdit.vue')
      }
     

      , { //店铺管理
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/shopmanage', title: '店铺管理' }
          ]
        },
        path: '/home/shopmanage', //店铺管理
        component: () => import('../views/ShopManage.vue')
      }
     

      , {//账号管理 
        meta: { //账号列表  
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/usernamelist', title: '账号管理' },
            { path: '/home/usernamelist', title: '账号列表' },
          ]
        },
        path: '/home/usernamelist',
        component: () => import('../views/AccountManage/UserNameList.vue')
      }
      //账号管理  //添加账号 修改密码
      , {//账号管理  //添加账号
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/accountList', title: '账号管理' },
            { path: '/home/accountadd', title: '账号添加' },
          ]
        },
        path: '/home/accountadd',  //添加账号
        component: () => import('../views/AccountManage/AccountAdd.vue')
      }
      , {//修改密码 
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/usernamelist', title: '账号管理' },
            { path: '/home/modifypassword', title: '密码修改' },
          ]
        },
        path: '/home/modifypassword',  // 修改密码
        component: () => import('../views/AccountManage/ModifyPassword.vue')
      }
     
      // 销售统计  //商品统计 // 订单统计
      , { 
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/commodstatisti', title: '销售统计' },
            { path: '/home/commodstatisti', title: '商品统计' },
          ]
        },
        path: '/home/commodstatisti',  //商品统计
        component: () => import('../views/SalesStatistics/CommodStatisti.vue')
      }
      , {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/commodstatisti', title: '销售统计' },
            { path: '/home/orderstatistics', title: '订单统计' },
          ]
        },
        path: '/home/orderstatistics',  // 订单统计
        component: () => import('../views/SalesStatistics/OrderStatistics.vue')
      }
     
      // 个人中心
      , {
        meta: {
          breadArr: [
            { path: '/home', title: '首页' },
            { path: '/home/personcente', title: '个人中心' }
          ]
        },
        path: '/home/personcente',  // 个人中心
        component: () => import('../views/PersonCente.vue')
      }
    ]
  }


]

const router = new VueRouter({
  routes
})
export default router
