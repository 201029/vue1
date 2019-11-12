<template>
  <div class="modifypassword">
    <h1 class="tatle">修改密码</h1>
    <div class="box-content">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="原密码" prop="Original">
          <el-input v-model.number="ruleForm.Original"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpwd">
          <el-input type="password" v-model="ruleForm.checkpwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="confirm">确认</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入调用接口的函数 */
import { checkOldPwd, pwdedit } from "@/api/account";

// 引入工具函数
import { pwdReg } from "@/utils/reg";

/* 本地存储 */
import local from "@/utils/local";

export default {
  data() {
    /* 原密码的验证 */
    const verifyOriginalpwd = async (rule, value, callback) => {
      //调用接口函数  然后获取参
      let { code, msg } = await checkOldPwd({ oldPwd: value });

      if (value === "") {
        callback(new Error("请输入密码"));
        //接口 判断 参数 要加上''
      } else if (code == "11") {
        callback(new Error(msg));
      } else {
        // 如果确认新密码不为空
        if (this.ruleForm.pwd !== "") {
          this.$refs.ruleForm.validateField("pwd"); // 再次触发他的验证
        }
        callback();
      }
    };
    /* 密码验证 */
    const validatepwd = (rule, value, callback) => {
      // rule: 验证规则对象  value: 用户输入的值， callback: 回调函数
      //非空
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value === this.ruleForm.Original) {
        callback(new Error("密码不和原密码相同"));
        //正则验证
      } else if (!rule.pattern.test(value)) {
        callback(new Error("密码包含数字和英文，长度 3 ~ 12 位"));
      } else {
        // 如果确认再次验证密码新密码不为空
        if (this.ruleForm.checkpwd !== "") {
          this.$refs.ruleForm.validateField("checkpwd"); // 再次触发他的验证
        }
        callback();
      }
    };
    /* 密码的二次验证 */
    const validateCheckpwd = (rule, value, callback) => {
      console.log(this.ruleForm.pwd);
      var pwd = this.ruleForm.pwd; //获取到新输入的密码 然后验证 是否和这个输入的密码一样
      console.log(pwd);
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== pwd) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      //表单内容
      ruleForm: {
        Original: "", //原密码
        pwd: "", //新的密码
        checkpwd: "" //再次验证密码
      },
      //表单验证
      rules: {
        //验证原密码
        Original: [
          {
            required: true,
            validator: verifyOriginalpwd,
            trigger: "blur" //  触发验证的方式
          }
        ],
        //..验证新的密码
        pwd: [
          {
            required: true,
            validator: validatepwd,
            pattern: pwdReg(), // 验证规则
            trigger: "blur" //  触发验证的方式
          }
        ],
        //再次验证密码
        checkpwd: [
          {
            required: true,
            validator: validateCheckpwd,
            trigger: "blur" //  触发验证的方式
          }
        ]
      }
    };
  },

  methods: {
    /* 重置 */
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    //确认
    confirm() {
      this.$refs.ruleForm.validate(async valid => {
        console.log(valid);
        if (valid) {
          console.log("全端的验证通过");
          console.log(this.ruleForm);
          let { code } = await pwdedit({ newPwd: this.ruleForm.pwd });
          if (code === 0) {
            // 清除token
            local.remove("token");
            //跳转到登录页面
            this.$router.push("/login");
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.modifypassword {
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
    }
  }
}
</style>