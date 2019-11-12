<template>
  <el-aside width="200px">
    <!-- router 这个是配路由的 没有路由就没有效果  :default-active="$route.path" 前面的是根据index的数据来加载选中的效果 $route.path 这个就是获取路由地址 这样就可以你点击那个, 这个选中的效果就会和index 的内容相等了 -->
    <el-menu
      :default-active="path"
      router
      unique-opened
      background-color="#304156"
      text-color="#fff"
    >
      <!-- 顶部logo 文字 -->
      <el-menu-item class="top-logo" default-active="#fff" background-color="#304156">
        <i class="logo iconfont icon-zhoubiancantingcanpanfandianguogaixianxing"></i>
        <span slot="title">外卖商家中心</span>
      </el-menu-item>

      <template v-for="(item,index) in Navcon">
        <!-- 一级导航 -->
        <el-menu-item v-if="!item.secondNav" :index="item.poute" :key="index">
          <i class="iconfont" :class="item.icon"></i>
          <span slot="title">{{item.tatle}}</span>
        </el-menu-item>

        <!-- 二级导航 -->
        <el-submenu v-else :index="item.poute" :key="index">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{item.tatle}}</span>
          </template>
          <el-menu-item
            v-for="(v,index) in item.secondNav "
            :key="index"
            :index="v.poute"
          >{{v.tatle}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      Navcon: [
        { poute: "/home", icon: "icon-houtaishouye", tatle: "后台首页" },
        {
          poute: "/home/ordermanagement",
          icon: "icon-icon_",
          tatle: "订单管理"
        },
        {
          poute: "/home/goods",
          icon: "icon-houtaishouye",
          tatle: "商品管理",
          secondNav: [
            { poute: "/home/commoditylist", tatle: "商品列表" },
            {
              poute: "/home/commodadd",
              tatle: "添加商品 "
            }
          ]
        },

        {
          poute: "/home/shopmanage",
          icon: "icon-dianpuguanli",
          tatle: "店铺管理"
        },

        {
          poute: "/home/name",
          icon: "icon-account-management",
          tatle: "账号管理",
          secondNav: [
            { poute: "/home/usernamelist", tatle: "账号列表" },
            {
              poute: "/home/accountadd",
              tatle: "添加账号"
            },
            {
              poute: "/home/modifypassword",
              tatle: "修改密码"
            }
          ]
        },
        {
          poute: "/home/statistics",
          icon: "icon-shangpintongji",
          tatle: "销售统计",
          secondNav: [
            { poute: "/home/commodstatisti", tatle: "商品统计" },
            {
              poute: "/home/orderstatistics",
              tatle: "订单统计"
            }
          ]
        }
      ]
    };
  },
  computed: {
    path() {
      // 只要路径包含order 就返回"/home/ordermanage"，让订单管理一直高亮
      if (this.$route.path === "/home/orderdetail") {
        return "/home/ordermanagement";
      }

      // 只要路径包含 commodity 就返回"/home/commoditylist"，让商品列表一直高亮
      if (this.$route.path.includes("commodity")) {
        return "/home/commoditylist";
      }

      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.el-aside {
  height: 100%;
  // background: #304156;
  // overflow: none;

  .el-menu {
    border: none;
    /*  .top-logo {
      // background: #304156 !important;
    } */
    .el-menu-item {
      .iconfont {
        color: #eee;
        margin: 10px;
      }
      .icon-zhoubiancantingcanpanfandianguogaixianxing {
        font-size: 30px;
        border: 1px solid #fff;
        border-radius: 20px;
        padding: 4px;
        background: #1296db;
      }
    }

    .el-submenu {
      .iconfont {
        color: #eee;
        margin: 10px;
      }
      .el-menu-item {
        background-color: #303f4f !important;
      }
    }
  }
}
</style>