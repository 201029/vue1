<template>
  <div>
    <el-header>
      <el-row>
        <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!--  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/ordermanagement' }">活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>-->

            <!-- 面包屑导航 -->
            <el-breadcrumb-item
              :key="i"
              v-for="(item, i) in breadArr"
              :to="{ path: item.path }"
            >{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>

        <el-col :span="12" class="box-left">
          <div class="nickname">{{account}}</div>
          <div class="Head-portrait">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img v-if="imgUrl" :src=" serveApi + imgUrl " alt />
              </span>
              <!-- 头像到个人中心 路由  以及这个自带的 点击事件的函数 -->
              <el-dropdown-menu divided size="medium" slot="dropdown">
                <router-link style="text-decoration: none;" to="/home/personcente">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                </router-link>
                <el-dropdown-item command="Logout" class="tetx">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
//引入本地存储的工具函数 用于 本地存储
import local from "../../utils/local";

/* 引入调用接口的函数 */
import { getAccountInfo } from "../../api/account";

export default {
  data() {
    return {
      // serveApi: "http://172.16.11.202:8088/upload/goods/", //图片路径
      serveApi: "http://127.0.0.1:8088/upload/goods/", //图片路径
      account: "", //用户名
      imgUrl: "", //头像 图片
      breadArr: [] //用于 面包屑导航
    };
  },
  methods: {
    handleCommand(command) {
      //判断是否是Logout 是就退出登录

      if (command === "Logout") {
        // 删除本地存储的token
        local.remove("token");

        //退出跳转到 登录页面
        this.$router.push("/login");

        //  退出给的提示
        this.$message({
          type: "success",
          message: "退出成功,欢迎再次登录,嘿嘿"
        });
      }
    },
    /* 用于渲染头像和用户名 */
    async GetAccountInfo() {
      let { accountInfo } = await getAccountInfo();

      this.account = accountInfo.account;
      this.imgUrl = accountInfo.imgUrl;
    },
    // 计算面包屑
    calcBreadArr() {
      // 取出meta中的数组

      console.log(this.$route);

      this.breadArr = this.$route.meta.breadArr;
    }
  },
  created() {
    this.GetAccountInfo(); //一进入页面就调用 用户信息接口

    /*用于 监听事件 接收数据 头像的更改之后的实时联动 */
    this.$bus.$on("updateAvatar", () => {
      //发生更改就 在次调用 用户信息接口
      this.GetAccountInfo();
    });

    // 进入页面 加载 调用一次计算面包屑的函数
    this.calcBreadArr();
  },
  // 观察数据变化 执行相关的操作
  watch: {
    "$route.path"() {
      this.calcBreadArr(); // 计算面包屑
    }
  }
};
</script>

<style lang="less" >
.el-header {
  height: 80px !important;
  background: #fff;
  // margin-bottom: 30px;
  box-shadow: 0 1px 8px 2px #ccc;
  /* 面包屑导航 */
  .el-breadcrumb {
    line-height: 80px;
    // font-size: 14px !important;
  }
  /*昵称 和 头像  */
  .box-left {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* 昵称 */
    .nickname {
      text-align: right;
      margin-right: 10px;
    }
    /* 头像 */
    .Head-portrait {
      display: flex;
      justify-content: flex-end;
      margin: 0 50px 0 0;
      img {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin: 10px 0;
      }
      .tetx {
        color: red;
      }
    }
  }
}
</style>