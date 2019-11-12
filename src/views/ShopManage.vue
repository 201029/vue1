<template>
  <div class="shopmanage">
    <h1 class="tatle">店铺管理</h1>

    <div>
      <el-form size="medium" :disabled="isDisabled" ref="form" :model="form" label-width="80px">

        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="form.shopname"></el-input>
        </el-form-item>

        <!-- 详细地址 -->
        <el-form-item label="详细地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

        <!-- 联系电话 -->
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <!-- 店铺简介 -->
        <el-form-item label="店铺简介">
          <el-input v-model="form.shopdesc"></el-input>
        </el-form-item>

        <!-- 店铺标语 -->
        <el-form-item label="店铺标语">
          <el-input v-model="form.slogan"></el-input>
        </el-form-item>

        <!-- 店铺分类 -->
        <el-form-item label="店铺分类">
          <el-select v-model="form.category" placeholder="请选择店铺分类">
            <el-option label="快餐" value="快餐"></el-option>
            <el-option label="中餐" value="中餐"></el-option>
            <el-option label="火锅" value="火锅"></el-option>
            <el-option label="串串香" value="串串香"></el-option>
            <el-option label="冒菜" value="冒菜"></el-option>
          </el-select>
        </el-form-item>

        <!-- 店铺特点 -->
        <el-form-item label="店铺特点">
          <el-checkbox-group v-model="form.feature">
            <el-checkbox label="品牌保证 " name="品牌保证"></el-checkbox>
            <el-checkbox label="蜂鸟专送" name="蜂鸟专送"></el-checkbox>
            <el-checkbox label="新店开铺" name="新店开铺"></el-checkbox>
            <el-checkbox label="外卖保" name="外面保"></el-checkbox>
            <br />
            <el-checkbox label="准时到达" name="准时到达"></el-checkbox>
            <el-checkbox label="开发票" name="开发票"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 配送费 -->
        <el-form-item label="配送费">
          <el-input-number v-model="form.packingexpense" :min="1" :max="30" label="描述文字"></el-input-number>
        </el-form-item>

        <!-- 起送价 -->
        <el-form-item label="起送价">
          <el-input-number v-model="form.minprice" :min="1" :max="30" label="描述文字"></el-input-number>
        </el-form-item>

        <!-- 营业时间 -->
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="form.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm:ss"
          ></el-time-picker>
        </el-form-item>

        <!-- 店铺头像 -->
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if=" form.dialogImageUrl1" :src="serveApi + form.dialogImageUrl1" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 营业执照 -->
        <el-form-item label="营业执照">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if=" form.dialogImageUrl2" :src="serveApi + form.dialogImageUrl2" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--  餐饮服务 许可证-->
        <el-form-item label="餐饮服务 许可证">
          <el-upload
            class="avatar-uploader"
            :action="uploadImgApi"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if=" form.dialogImageUrl3" :src="serveApi + form.dialogImageUrl3" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 优惠活动 -->
        <el-form-item label="优惠活动">
          <el-select @change="specialOfferadd" v-model="form.specialOffer" placeholder="请选择优惠活动">
            <el-option label="满减优惠" value="满减优惠"></el-option>
            <el-option label="特惠大酬宾" value="特惠大酬宾"></el-option>
            <el-option label="新用户立减" value="新用户立减"></el-option>
            <el-option label="进店领券" value="进店领券"></el-option>
          </el-select>
        </el-form-item>

        <!-- 优惠活动 表格 -->
        <el-table :data="form.tableData" border style="width:642px">
          <el-table-column prop="title" label="活动标题" width="180"></el-table-column>
          <el-table-column prop="name" label="活动名称" width="180"></el-table-column>
          <el-table-column prop="detail" label="活动详情" width="180"></el-table-column>
          <el-table-column @click="dialogFormVisible=true" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="deleteTableCon(scope.$index)"
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <el-button @click="modify" type="primary">修改</el-button>
      <el-button @click="Preservation" type="primary">保存</el-button>
    </div>

    <!-- 编辑 弹出 模态框 用于添加 -->
    <el-dialog width="660px" title="添加活动" :visible.sync="dialogFormVisible">
      <el-form :model="Addfrom" :rules="rules" ref="Addfrom" style="width: 337px;">
        <el-form-item label="请输入活动详情" label-width="140px" prop="detail">
          <el-input v-model="Addfrom.detail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm">取 消</el-button>
        <el-button @click="addDetail" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入调用接口的函数
import { shopinfo, shopedit } from "../api/shop";

export default {
  data() {
    return {
      isDisabled: false, // 是否禁用表单
      serveApi: "http://127.0.0.1:8088/upload/shop/", //  回填图片 路径
      uploadImgApi: "http://127.0.0.1:8088/shop/upload/",// 上传图片路径
      rules: {
        detail: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      },
      /* 表单数据 */
      form: {
        shopname: "", //店铺名称
        address: "", //详细地址
        phone: "", //联系电话
        shopdesc: "", //店铺简介
        slogan: "", //店铺标语
        category: "", //店铺分类
        feature: [], //店铺特色
        packingexpense: 0, //配送费
        minprice: 20, //起送价
        date: [], //营业时间
        dialogImageUrl1: "", //店铺头像
        dialogImageUrl2: "", //营业执照
        dialogImageUrl3: "", //许可证
        specialOffer: "", //优惠活动
        // 优惠活动表格
        tableData: []
      },
      /* 添加活动的表单的内容 */
      Addfrom: {
        detail: ""
      },
      dialogFormVisible: false //用于模态框的显示和隐藏
    };
  },

  methods: {
    /* 上传图片后 马上显示在页面上  图片回填 */
    handleAvatarSuccess1(res, file) {
      console.log(res); // 可以获取到图片上传后的数据
      let { code, imgUrl } = res;
      if (code === 0) {
        this.form.dialogImageUrl1 = imgUrl;
      }
    },
    handleAvatarSuccess2(res, file) {
      console.log(res); // 可以获取到图片上传后的数据
      let { code, imgUrl } = res;
      if (code === 0) {
        this.form.dialogImageUrl2 = imgUrl;
      }
    },
    handleAvatarSuccess3(res, file) {
      console.log(res); // 可以获取到图片上传后的数据
      let { code, imgUrl } = res;
      if (code === 0) {
        this.form.dialogImageUrl3 = imgUrl;
      }
    },
    /* 图片 格式和大小 限定 */
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
    /* 表格 按索引删除 */
    deleteTableCon(index) {
      this.form.tableData.splice(index, 1);
    },
    /* 用于打开添加活动的详细页面 */
    specialOfferadd() {
      this.dialogFormVisible = true;
    },
    /* 点击活动添加的取消 */
    dialogForm() {
      this.dialogFormVisible = false;
      this.Addfrom = { detail: "" };
    },
    /* 添加活动详情的列表 */
    addDetail() {
      this.$refs.Addfrom.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          let title;
          //判断你点击的是哪个 然后根据你点击的哪个 给出标题 title
          switch (this.form.specialOffer) {
            case "满减优惠":
              title = "减";
              break;
            case "特惠大酬宾":
              title = "特";
              break;
            case "新用户立减":
              title = "新";
              break;
            case "进店领券":
              title = "领";
              break;
          }

          // 获取用户输入的值
          let newObj = {
            title,
            name: this.form.specialOffer,
            detail: this.Addfrom.detail
          };

          // 加入表格
          this.form.tableData.unshift(newObj);
          this.Addfrom = { detail: "" };
        } else {
          this.Addfrom = { detail: "" };
          return;
        }
      });
    },
    /* 保存 */
    async Preservation() {
      this.isDisabled = true;

      /* 获取数据 */

      let {
        shopname, //店铺名称
        address, //详细地址
        phone, //联系电话
        shopdesc, //店铺简介
        slogan, //店铺标语
        category, //店铺分类
        feature, //店铺特色
        packingexpense, //配送费
        minprice, //起送价
        date, //营业时间
        dialogImageUrl1, //店铺头像
        dialogImageUrl2, //营业执照
        dialogImageUrl3, //许可证
        specialOffer, //优惠活动
        tableData // 优惠活动表格
      } = this.form;

      console.log(
        shopname, //店铺名称
        address, //详细地址
        phone, //联系电话
        shopdesc, //店铺简介
        slogan, //店铺标语
        category, //店铺分类
        feature, //店铺特点
        packingexpense, //配送费
        minprice, //起送价
        date, //营业时间
        dialogImageUrl1, //店铺头像
        dialogImageUrl2, //营业执照
        dialogImageUrl3, //许可证
        specialOffer, //优惠活动
        tableData // 优惠活动表格
      );
      console.log(this.form);

      /* 数据格式处理 */
      let params = {
        shopname,
        address,
        phone,
        shopdesc,
        slogan,
        category,
        feature: JSON.stringify(feature),
        packingexpense,
        minprice,
        date: JSON.stringify(date),
        shopAvatar: dialogImageUrl1, // 店铺头像
        businessLicenseImg: dialogImageUrl2, // 营业执照
        cateringServiceLicenseImg: dialogImageUrl3, // 餐饮服务许可证
        tableData: JSON.stringify(tableData)
      };

      /* 发送ajax */
      await shopedit(params);
    },
    // 启用表单
    modify() {
      this.isDisabled = false;
    },
    /* 回填数据  */
    async getShopInfo() {
      let { data } = await shopinfo();
      console.log(data);
      for (let key in data) {
        console.log(key);
        console.log(data[key]);
        //时间  特点 活动表格
        if (key === "date" || key === "feature" || key === "tableData") {
          data[key] = JSON.parse(data[key]);
        }
      }
      // 赋值渲染
      this.form = { ...data };

      //渲染图片
      this.form.dialogImageUrl1 = data.shopAvatar;
      this.form.dialogImageUrl2 = data.businessLicenseImg;
      this.form.dialogImageUrl3 = data.cateringServiceLicenseImg;
    }
  },
  /* 进入页面就调用 */
  created() {
    this.getShopInfo();
  }
};
</script>

<style lang="less" scoped>
.shopmanage {
  min-height: 500px;
  background: #fff;
  box-shadow: 0 0 10px 3px #f1f1f1;
  // padding-top: 30px;
  padding: 30px 0 0 40px;
  .tatle {
    margin: 0 0 30px 30px;
    font-size: 18px;
    color: #333;
    font-family: 600;
  }

  .el-input {
    width: 400px;
    height: 20px;
  }

  .input {
    width: 400px;
  }

  .table-box {
    margin-left: 100px;
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
  .from-item {
    // margin-top: 30px;
    margin: 30px 0;
  }
}
</style>