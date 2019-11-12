<template>
  <div class="commodityadd">
    <h1 class="tatle">添加商品</h1>
    <div class="box-content">
      <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="merchandise.goodsname"></el-input>
        </el-form-item>

        <!-- 商品分类 -->

        <el-form-item label="商品分类" prop="goodscategory">
          <el-cascader v-model="merchandise.goodscategory" :options="options" placeholder="请选择商品分类"></el-cascader>
        </el-form-item>

        <!-- 分类 -->
        <!--  <el-form-item label="商品分类">
          <el-select v-model="merchandise.goodscategory" placeholder="请选择商品分类">
            <el-option label="热菜" value="热菜"></el-option>
            <el-option label="饮品" value="饮品"></el-option>
            <el-option label="火锅" value="火锅"></el-option>
          </el-select>
        </el-form-item>-->

        <!-- 商品特色 -->
        <el-form-item label="商品特色">
          <el-checkbox-group v-model="merchandise.goodsfeature">
            <el-checkbox label="新品上市" name="goodsfeature"></el-checkbox>
            <el-checkbox label="主打产品" name="goodsfeature"></el-checkbox>
            <el-checkbox label="限时优惠" name="goodsfeature"></el-checkbox>
            <el-checkbox label="传统手艺" name="goodsfeature"></el-checkbox>
            <br />
            <el-checkbox label="本地特色" name="goodsfeature"></el-checkbox>
            <el-checkbox label="原汁原味" name="goodsfeature"></el-checkbox>
            <el-checkbox label="食品新鲜" name="goodsfeature"></el-checkbox>
            <el-checkbox label="第二单半价" name="goodsfeature"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 商品图片 -->
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:8088/goods/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="merchandise.imgUrl"
              :src="'http://127.0.0.1:8088/upload/goods/' + merchandise.imgUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="是否促销">
          <el-radio-group v-model="merchandise.isPromotion">
            <el-radio label="促销"></el-radio>
            <el-radio label="不促销"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-radio-group v-model="merchandise.goodsstandard">
            <el-radio label="单规格" border></el-radio>
            <el-radio label="多规格" border></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 单规格的内容  -->
        <!-- 包装费 -->
        <el-form-item v-show="flag" label="包装费">
          <el-input-number v-model="merchandise.packingexpense" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <!-- 起送价 -->
        <el-form-item v-show="flag" label="起送价">
          <el-input-number v-model="merchandise.goodsPrice" :min="10" :max="30" label="描述文字"></el-input-number>
        </el-form-item>

        <!-- 多规格 表格-->
        <div v-show="!flag" class="table-box">
          <el-button
            @click="dialogFormVisible=true"
            size="mini"
            plain
            type="primary"
            icon="el-icon-plus"
          >添加</el-button>
          <el-table :data="tableData" border style="width:642px">
            <el-table-column prop="goodsstandard" label="规格" width="180"></el-table-column>
            <el-table-column prop="packingexpense" label="包装费" width="180"></el-table-column>
            <el-table-column prop="goodsPrice" label="起送价" width="180"></el-table-column>
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
        </div>

        <!-- 编辑 弹出 模态框 用于添加  -->
        <el-dialog width="440px" title="多规格" :visible.sync="dialogFormVisible">
          <el-form style="width: 300px;" :model="tableadd">
            <!-- 规格 -->
            <el-form-item label="规格" label-width="120px">
              <el-input class="standard-inp" v-model="tableadd.goodsstandard" autocomplete="off"></el-input>
            </el-form-item>

            <!-- 包装费 -->
            <el-form-item label="包装费" label-width="120px">
              <el-input-number
                controls-position="centered"
                v-model="tableadd.packingexpense"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number>
            </el-form-item>

            <!-- 起送价 -->
            <el-form-item label="起送价" label-width="120px">
              <el-input-number
                controls-position="centered"
                v-model="tableadd.goodsPrice"
                :min="10"
                :max="30"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
            <el-button size="small" @click="tableAdd" type="primary">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 商品描述 -->
        <el-form-item label="商品描述" class="descride-bottom">
          <el-input v-model="merchandise.goodsdesc" class="input" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="goodsEstablish" type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* 引入调用接口的函数 */
import { goodsAdd } from "../../api/goods";

export default {
  data() {
    return {
      //添加商品 的内容
      merchandise: {
        goodsname: "", //商品名称
        goodscategory: "", // 商品分类
        goodsfeature: [], //特色
        // imgUrl: "1572179056600.jpg", //图片
        imgUrl: "", //图片
        isPromotion: "促销", //是否促销
        goodsstandard: "单规格", //商品规格
        goodsdesc: "", //商品描述
        packingexpense: "", // 包装费
        goodsPrice: "" // 起送价
      },
      /* 多规格 表格*/
      tableData: [
        {
          goodsstandard: "默认", //规格
          packingexpense: "0", // 包装费
          goodsPrice: "20" // 起送价
        }
      ],
      /* 表格添加 */
      tableadd: {
        goodsstandard: "默认", //规格
        packingexpense: "0", // 包装费
        goodsPrice: "20" // 起送价
      },
      /* 用于模态框的显示和隐藏 */
      dialogFormVisible: false,
      dialogVisible: false,
      /* 商品分类选择框的内容 */
      options: [
        {
          value: "饮品",
          label: "饮品",
          children: [
            {
              value: "热饮",
              label: "热饮",
              children: [
                {
                  value: "咖啡",
                  label: "咖啡"
                },
                {
                  value: "奶茶",
                  label: "奶茶"
                },
                {
                  value: "果珍",
                  label: "果珍"
                }
              ]
            },
            {
              value: "凉饮",
              label: "凉饮",
              children: [
                {
                  value: "凉茶",
                  label: "凉茶"
                },
                {
                  value: "果汁",
                  label: "果汁"
                },
                {
                  value: "啤酒",
                  label: "啤酒"
                },
                {
                  value: "汽水",
                  label: "汽水"
                }
              ]
            }
          ]
        },
        {
          value: "美食",
          label: "美食",
          children: [
            {
              value: "小吃",
              label: "小吃",
              children: [
                {
                  value: "串串",
                  label: "串串"
                },
                {
                  value: "烤肉",
                  label: "烤肉"
                },
                {
                  value: "火锅",
                  label: "火锅"
                },
                {
                  value: "冒菜",
                  label: "冒菜"
                }
              ]
            },
            {
              value: "夜宵",
              label: "夜宵",
              children: [
                {
                  value: "烧烤",
                  label: "烧烤"
                },
                {
                  value: "海鲜",
                  label: "海鲜"
                }
              ]
            }
          ]
        },
        {
          value: "早餐",
          label: "早餐",
          children: [
            {
              value: "稀饭",
              label: "稀饭",
              children: [
                {
                  value: "生鲜",
                  label: "生鲜"
                },
                {
                  value: "老火",
                  label: "老火"
                }
              ]
            },
            {
              value: "面条",
              label: "面条",
              children: [
                {
                  value: "小面",
                  label: "小面"
                },
                {
                  value: "刀削",
                  label: "刀削"
                }
              ]
            }
          ]
        },
        {
          value: "其他",
          label: "其他",
          children: [
            {
              value: "日餐",
              label: "日餐",
              children: [
                {
                  value: "寿司",
                  label: "寿司"
                }
              ]
            },
            {
              value: "法餐",
              label: "法餐",
              children: [
                {
                  value: "牛排",
                  label: "牛排"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    /* 表格添加 */
    tableAdd() {
      /* 在开头添加模态框的表单内容 */
      this.tableData.unshift(this.tableadd);
      /* 清空表单 这样不会数据共享 */
      this.tableadd = {
        goodsstandard: "默认", //规格
        packingexpense: "0", // 包装费
        goodsPrice: "20" // 起送价
      };
      /* 用于模态框的隐藏 */
      this.dialogFormVisible = false;
    },
    /* 删除 */
    deleteTableCon(index) {
      console.log(index);
      this.tableData.splice(index, 1);
    },
    /* 商品的添加 */
    async goodsEstablish() {
      /* 获取内容 */
      let {
        goodsname, //商品名称
        goodscategory, // 商品分类
        goodsfeature, //特色
        imgUrl, //图片
        isPromotion, //是否促销
        goodsstandard, //商品规格
        packingexpense, // 包装费
        goodsPrice, // 起送价
        goodsdesc //商品描述
      } = this.merchandise;

      // let cate = goodscategory.join('/')

      console.log(goodscategory);
      /* 准备接口参数 */
      let params = {
        goodsname,

        goodscategory: goodscategory.join("/"),  //数组转成字符串
        // goodscategory,

        goodsfeature: JSON.stringify(goodsfeature),
        imgUrl,
        isPromotion,
        standard:
          goodsstandard === "单规格"
            ? JSON.stringify([{ goodsstandard, packingexpense, goodsPrice }]) //单规格
            : JSON.stringify(this.tableData), //多规格
        packingexpense,
        goodsPrice,
        goodsdesc
      };

      console.log(this.merchandise);
      console.log(params.goodscategory);

      let { code } = await goodsAdd(params);

      if (code === 0) {
        //添加后 跳转到 商品列表
        this.$router.push("/home/commoditylist");
      }
    },
    /* 上传图片后 马上显示在页面上 */
    handleAvatarSuccess(res, file) {
      console.log(res); // 可以获取到图片上传后的数据
      let { code, imgUrl } = res;
      if (code === 0) {
        this.merchandise.imgUrl = imgUrl;
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
    }
  },
  computed: {
    // 单规格和多规格的显示和隐藏
    flag() {
      return this.merchandise.goodsstandard === "单规格" ? true : false;
    }
  }
};
</script>
 
 

<style lang="less" scoped>
.commodityadd {
  min-height: 400px;
  background: #fff;
  padding-top: 20px;

  .tatle {
    margin: 20px 0 40px 40px;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 20px;
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
  }
  .standard-inp {
    width: 180px;
  }
  .avatar-uploader {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
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
}
</style>