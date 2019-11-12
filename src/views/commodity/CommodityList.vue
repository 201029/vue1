<template>
  <div class="commoditylist">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称 :">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>

            <el-form-item label="图片 :">
              <span>
                <img
                  width="100"
                  height="100"
                  style="border-radius: 4px"
                  :src="serveApi + props.row.imgUrl"
                />
              </span>
            </el-form-item>

            <el-form-item label="商品描述 :">
              <span>{{ props.row.goodsdesc }}</span>
            </el-form-item>

            <el-form-item label="商品 ID :">
              <span>{{ props.row.id }}</span>
            </el-form-item>

            <el-form-item label="商品分类 :">
              <span>{{ props.row.goodscategory }}</span>
            </el-form-item>

            <el-form-item label="是否促销 :">
              <span>{{ props.row.isPromotion }}</span>
            </el-form-item>

            <el-form-item label="商品特色 :">
              <span>{{ props.row.goodsfeature | filterFeature}}</span>
            </el-form-item>

            <el-form-item label="商品规格 :">
              <span>{{ props.row.standard | filterStandard}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID " prop="id"></el-table-column>
      <el-table-column label="商品名称 " prop="goodsname"></el-table-column>
      <el-table-column label="描述 " prop="goodsdesc"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editList(scope.row)" size="mini">编辑</el-button>
          <el-button @click="delList(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="paging">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/* 引入接口调用的函数 */
import { goodslist, goodsDel } from "../../api/goods";
export default {
  data() {
    return {
      // serveApi: "http://172.16.11.202:8088/upload/goods/", //图片路径
      serveApi: "http://127.0.0.1:8088/upload/goods/", //图片路径
      //分页
      currentPage: 1, // 当前页
      pageSize: 4, // 每页条数
      total: 4, //总条数
      tableData: [
        /*  {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        } */
      ]
    };
  },
  methods: {
    /* 渲染页面的数据 */
    async goodsList() {
      let { data, total } = await goodslist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      
      //判定这一页是否有数据  和当前页数 是不是不等于一
      if (!data.length && this.currentPage !== 1) {
        this.currentPage--; //是的话  页数减一
        this.goodsList(); //  调用数据列表
      }

      this.tableData = data;
      this.total = total;
    },
    //页码发送改变
    handleCurrentChange(val) {
      this.currentPage = val; //把当前的页码赋值
      this.goodsList(); //调用渲染列表的函数
    },
    //每页条数发生改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.goodsList(); // 发生改变自动调用一次请求账号列表接口
    },
    /* 删除 */
    async delList(row) {
      console.log(row.id);
      {
        this.$confirm("你就这么忍心删除人家吗,嘤嘤嘤..", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            //获取参数  发送参数给工具函数 这样 工具函数就可以发送axios
            let { code, msg } = await goodsDel({ id: row.id });
            if (code === 0) {
              this.goodsList(); // 删除成功自动调用一次请求账号列表接口
            }
          })
          .catch(() => {
            //取消提示
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    /* 编辑 */
    editList(row) {
      /* console.log(
        JSON.stringify(row.goodscategory)
      ) */
      //把这个页面你点击的内容运用本地存储中的临时存储 把数据 存储到本地 然后详细页面可以取出来使用  vue中 本地存储要挂载到 window 上
      window.sessionStorage.setItem("editList", JSON.stringify(row));

      //跳转到修改商品的页面
      this.$router.push("/home/commodityedit");
    }
  },
  created() {
    this.goodsList(); //进入页面就 调用渲染列表的函数
  },
  //
  filters: {
    //用于商品特色的格式修改
    filterFeature(f) {
      return JSON.parse(f).join(" / ");
    },
    //单规格和多规格的格式修改
    filterStandard(s) {
      let arr = JSON.parse(s);
      return arr
        .map(v => `${v.goodsstandard} ${v.goodsPrice} ${v.packingexpense}`)
        .join(" / ");
    }
  }
};
</script>

<style lang="less" scoped>
.commoditylist {
  min-height: 400px;
  background: #fff;
  padding-top: 20px;

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    padding: 0 20px;
  }

  .paging {
    text-align: center;
    margin-top: 30px;
  }
}
</style>