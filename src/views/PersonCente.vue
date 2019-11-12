<template>
  <div class="personcente">
    <el-card class="box-card">
      <div class="tatle">
        <span>个人中心</span>
      </div>
      <div>
        <p>
          管理原 ID :
          <span>{{ accountInfo.id}}</span>
        </p>
        <p>
          账号 :
          <span>{{ accountInfo.account}}</span>
        </p>
        <p>
          用户组 :
          <span>{{ accountInfo.userGroup}}</span>
        </p>
        <p>
          本次登录时间 :
          <span>{{accountInfo.time | filterTime}}</span>
        </p>

        <p>
          <el-row>
            <el-col :span="8">
              <!-- 商品图片 -->
              <el-upload
                class="avatar-uploader"
                :action="UploadpicturesApi"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if=" accountInfo.imgUrl" :src="serveApi + accountInfo.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>

            <el-col :span="16">
              <el-button @click="beforeAvatarUpload2" type="primary">修改头像</el-button>
            </el-col>
          </el-row>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
/* 引入接口函数 */
import { getAccountInfo, editAvatarImg } from "../api/account";

/* 格式化时间 */
import moment from "moment";

export default {
  data() {
    return {
      //  serveApi: "http://172.16.11.202:8088/upload/goods/",
      serveApi: "http://127.0.0.1:8088/upload/goods/",
      UploadpicturesApi: "http://172.16.11.202:8088/goods/upload",
      accountInfo: {
        id: "",
        account: "",
        userGroup: "",
        time: "",
        imgUrl: "" //用于头像
      }
    };
  },
  methods: {
    /* 上传图片后 马上显示在页面上 */
    handleAvatarSuccess(res, file) {
      console.log(res); // 可以获取到图片上传后的数据
      let { code, imgUrl } = res;
      if (code === 0) {
        this.accountInfo.imgUrl = imgUrl;
      }
    },
    /* 图片 格式和 大小 限定 */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG或者PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /* 用户信息的接口 */
    async GetAccountInfo() {
      let { accountInfo } = await getAccountInfo();

      console.log(accountInfo);

      this.accountInfo = accountInfo;
    },
    /* 保存头像 */
    async beforeAvatarUpload2() {
      console.log(this.accountInfo.imgUrl);

      let { code } = await editAvatarImg({ imgUrl: this.accountInfo.imgUrl });

      if (code === 0) {
        console.log("1");
        //告诉头部 头像更改了
        this.$bus.$emit("updateAvatar");
      }
    }
  },
  created() {
    this.GetAccountInfo(); //一进入页面就调用 用户信息接口
  },
  filters: {
    // 过滤时间
    filterTime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.personcente {
  .tatle {
    margin: 0 0 20px 0;
  }
  p {
    min-height: 20px;
    padding: 20px 0;
    border-bottom: 1px solid #f1f1f1;
    color: #454648;
    // display: flex;
  }

  .descride-bottom {
    margin-top: 20px;
    margin-right: 30px;
  }
  .standard-inp {
    width: 180px;
  }
  .avatar-uploader {
    width: 178px;
    height: 178px;
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-col {
    display: flex;
    align-items: center;

    .el-button {
      margin-top: 70px;
    }
  }
}
</style>