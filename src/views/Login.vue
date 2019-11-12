<template>
  <div class="login">
    <!-- 登录表单 -->
    <!--:model="loginFrom"  这个是获取到账号和密码的内容 :rules="rules" 是表单验证 -->
    <el-form
      size="small"
      :model="loginFrom"
      :rules="rules"
      status-icon
      ref="loginFrom"
      class="login-form"
    >
      <div class="title">
        <h1>系统登录</h1>
      </div>
      <!-- 账号  prop="username" 这个就是给账号绑定表单验证-->
      <el-form-item prop="username">
        <el-input
          v-model="loginFrom.username"
          prefix-icon="iconfont icon-zhanghao"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 密码  prop="password" 这个就是给密绑定表单验证-->
      <el-form-item prop="password">
        <el-input
          prefix-icon="iconfont icon-mimaguanli"
          v-model="loginFrom.password"
          @click.native="changeType"
          :suffix-icon=" OpenClose ? 'iconfont icon-mimaxianshi OpenClose':'iconfont icon-mimayincang OpenClose'"
          :type="OpenClose?  'tetx':'password'"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/*  引入工具函数 */
import { nameReg, pwdReg } from "../utils/reg";

/* 引入调用接口的函数 */
import { checklogin } from "../api/account";

/* 引入本地存储工具函数 */
import local from "../utils/local";

export default {
  data() {
    /* 自义定的表单验证 */
    /* 账号验证 */
    const validateName = (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
      console.log(rule);
      console.log(value);
      console.log(callback);
      //非空
      if (value === "") {
        callback(new Error("账号不能为空"));
        //正则验证
      } else if (!rule.pattern.test(value)) {
        callback(new Error("中文,长度 2 ~ 5 位"));
      } else {
        callback();
      }
    };

    /* 密码验证 */
    const validatepwd = (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
      console.log(rule);
      console.log(value);
      console.log(callback);
      //非空
      if (value === "") {
        callback(new Error("密码不能为空"));
        //正则验证
      } else if (!rule.pattern.test(value)) {
        callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
      } else {
        callback();
      }
    };

    return {
      //登录的表单 用于获取内容
      loginFrom: {
        username: "", //账号
        password: "" //密码
      },

      OpenClose: false, //眼睛的睁开(true)和闭上(false) 就是密码的正常显示和显示点点
      //表单验证
      rules: {
        //账号的验证
        username: [
          //element的内置方法  required 用于验证非空 message 提示信息 trigger 验证方式
          /*  { required: true, message: "账号不能为空", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "账号长度 3 ~ 6 位", trigger: "blur" } // 长度 */

          //自定义的账号的验证
          {
            validator: validateName,
            pattern: nameReg(), // 验证规则
            trigger: "blur" //  触发验证的方式
          }
        ],
        //密码的验证
        password: [
          /*  { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "密码长度为3 ~ 6 位", trigger: "blur" } */
          //自定义的密码的验证
          {
            validator: validatepwd,
            pattern: pwdReg(), // 验证规则
            trigger: "blur" //  触发验证的方式
          }
        ]
      }
    };
  },
  methods: {
    changeType(e) {
      // console.log(e);
      //console.log(e.target); //这个是input 本身
      //console.log(e.target.className); //获取到的是input上的class
      //OpenClose 这个是自己定义的用于判断是否是点击的眼睛这个图标 也可以用图标的class判断不过这个的class 获取他前面的图标的class有重合 就自己定义一个
      if (e.target.className.includes("OpenClose")) {
        // alert('1')
        //把OpenClose 的值 取反 false 为true  true 为false  控制他的睁眼和闭眼 和 密码的显示内容的格式 是黑点点还是 原内容
        this.OpenClose = !this.OpenClose;
      }
    },
    //登录
    submitForm() {
      //this.$refs.loginFrom 这个是获取到表单   validate 内置方法 把所以的验证都验证一遍 成功就返回true 不成功就返回 false
      this.$refs.loginFrom.validate(async valid => {
        console.log(valid); //验证的结果
        if (valid) {
          //调用接口函数
          let { code, token } = await checklogin(this.loginFrom);

          if (code === 0) {
            // 把获取到的token 存入本地存储  用于 验证 是否是登录进入的 不是就不让获取到接口信息 和 进入 页面
            local.set("token", token);
            //跳转到 后台首页
            this.$router.push("./home");
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background-image: url("../assets/imgs/779f89aeaa.jpg");
  background-size: 100%;
  // background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 440px;
    padding: 40px 40px;
    margin-bottom: 80px;
    background: url("../assets/imgs/border.png") 100% 100% no-repeat;
    background-size: 100%;
    .title {
      margin-bottom: 30px;
      h1 {
        width: 110px;
        font-size: 26px;
        font-weight: 500;
        margin: 0 auto;
        text-align: center;
        color: #eee;
        font-family: sans-serif;
        background: #7d9dce;
      }
    }
    .el-form-item {
      .el-input {
        border: none;
        border-bottom: 1px solid #accaf0;

        input {
          // background-color: #82a4d1;
          background-color: rgba(0, 0, 0, 0); //透明
          border: none;
          color: #eee;
          font-size: 18px;
          .OpenClose {
            margin-right: 5px;
          }
        }
      }
      .el-button {
        width: 100%;
        font-size: 18px;
      }
    }
  }
}
</style>