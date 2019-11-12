<template>
  <div class="accoutadd">
    <h1 class="tatle">添加账户</h1>
    <div class="box-content">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <!-- @blur="Registers" -->
          <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input type="tetx" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="用户组" prop>
          <el-select v-model="ruleForm.namegroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="高级管理员" value="高阶管理员"></el-option>
            <el-option label="中级管理员" value="中级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <!-- <el-button type="primary" @click="confirmAdd">添加</el-button> -->
          <el-button type="primary" @click="confirmAdd">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/*  引入工具函数 */
import { nameReg, pwdReg } from "../../utils/reg";

/*引入接口配置文件 */
import {
  registers, //账号是否重复,
  addAccount //添加账号
} from "../../api/account";

export default {
  data() {
    /* 账号验证 */
    const validateName = async (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数

      //发送ajax 请求  用于 验证
      let { code, msg } = await registers({username:value} );

      if (value === "") {
        callback(new Error("账号不能为空")); //非空
        //正则验证
      } else if (!rule.pattern.test(value)) { //账号正则
        callback(new Error("中文,长度 2 ~ 5 位"));
      } else if (code === 2) { //账号是否重复
        callback(new Error(msg));
      } else {
        callback();
      }
    };

    /* 密码验证 */
    const validatepwd = (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
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
      //表单内容
      ruleForm: {
        username: "", //用户名 昵称
        pwd: "", //密码
        namegroup: "" //用户组
      },
      Benchmarking: false, //用于 判断 账号是否重复
      rules: {
        //自定义的账号的验证
        username: [
          {
            required: true,
            validator: validateName,
            pattern: nameReg(), // 验证规则
            trigger: "blur" //  触发验证的方式
          }
        ],
        //密码正则验证
        pwd: [
          {
            required: true,
            validator: validatepwd,
            pattern: pwdReg(), // 验证规则
            trigger: "blur" //  触发验证的方式
          }
        ],
        //用户组的非空验证
        namegroup: [
          {
            required: true,
            required: true,
            message: "请你选择用户组",
            trigger: "change"
          } // 非空
        ]
      }
    };
  },
  methods: {
    /* 重置 */
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },

    /* 确认添加  接口添加*/
    confirmAdd() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          console.log("前端的验证通过");
          console.log(this.ruleForm); //表单的所有数据
          /* 调用接口  addAccount () 传入参数  this.ruleForm  aiait 这个是让他执行完才执行其代码  let {} 结构 后台返回的数据 */
          let { code, msg } = await addAccount(this.ruleForm);

          if (code === 0) {
            /* 路由跳转 */
            this.$router.push("/home/usernamelist");
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.accoutadd {
  width: 100%;
  height: auto;
  background: #fff;
  box-shadow: 0 0 10px 2px #ccc;
  padding-top: 30px;

  .tatle {
    font-size: 18px;
    margin: 0 0 0 40px;
  }
  .box-content {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 400px;

      .el-select {
        width: 300px;
      }
    }
  }
}
</style>