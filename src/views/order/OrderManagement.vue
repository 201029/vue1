<template>
  <div class="ordermanagement">
    <h1 class="tatle">订单管理</h1>
    <div class="box-content">
      <!-- :model="ruleForm"  :rules="rules" -->
      <!-- 搜索 -->
      <el-form size="small" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单号" prop="orderNo">
              <el-input v-model="searchcontent.orderNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货人" prop="consignee">
              <el-input v-model="searchcontent.consignee"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="searchcontent.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态" prop="orderState">
              <el-select placeholder="订单状态" v-model="searchcontent.orderState">
                <el-option label="已处理" value="已处理"></el-option>
                <el-option label="派送中" value="派送中"></el-option>
                <el-option label="未处理" value="未处理"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <span class="titm">时间</span>
            <el-date-picker
              v-model="searchcontent.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-button @click="search" size="small" type="primary" icon="el-icon-search">搜索</el-button>
            <!-- <el-button @click="Delete" size="small" type="primary" icon="el-icon-delete">清空</el-button> -->
          </el-col>
        </el-row>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" max-height="600">
        <!-- fixed -->
        <el-table-column fixed="left" prop="orderNo" label="订单号" width="80"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="160"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="80"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="160"></el-table-column>
        <el-table-column prop="remarks" label="用户配注" width="100"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="80"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="80"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="props">
            <!-- <el-button @click="details(props.row)" type="text" size="small">查看</el-button> -->
            <el-button @click="detailsModify(props.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 模态框 用于 查看详情 -->
      <!-- <el-dialog class="detailsBox" title="详情列表 " center :visible.sync="dialogFormVisible">
       <div>
          <p>订单号: {{this.rowdetails.orderNo}}</p>
          <p>下单时间: {{this.rowdetails.orderTime}}</p>
        </div>
        <div>
          <p>手机号: {{this.rowdetails.phone}}</p>
          <p>收货人: {{this.rowdetails.consignee}}</p>
        </div>
        <div>
          <p>配送地址: {{this.rowdetails.deliverAddress}}</p>
          <p>送达时间: {{this.rowdetails.deliveryTime}}</p>
        </div>
        <div>
          <p>用户配注: {{this.rowdetails.remarks}}</p>
          <p>订单金额: {{this.rowdetails.orderAmount}}</p>
        </div>

        <div>
          <p>订单状态: {{this.rowdetails.orderState}}</p>
        </div>
      </el-dialog>-->

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//引入接口函数
import { OrderList } from "../../api/order";
//时间格式化
import moment from "moment";

export default {
  data() {
    return {
      //分页
      currentPage: 1, //当前页数
      total: 4, //总页数
      pageSize: 5, //当前页有几条数据
      dialogFormVisible: false, //用于详情模态框的显示和隐藏
      rowdetails: {}, //用于详情
      /* 搜索 */
      searchcontent: {
        orderNo: "", //订单号
        consignee: "", //收货人
        phone: "", //手机号
        orderState: "", //订单状态
        date: [] //时间
      },

      /* 数据  来自后台*/
      tableData: []
    };
  },
  methods: {
    /* 查看 */
    /*   details(row) {
      console.log(row);
      this.rowdetails = row;
      console.log(this.rowdetails);
      this.dialogFormVisible = true;
    }, */
    /* 模糊查询的  搜索*/
    search() {
      this.currentPage = 1; //当前页
      this.getorderlist(); // 调用获取列表函数

      this.searchcontent = {
        orderNo: "", //订单号
        consignee: "", //收货人
        phone: "", //手机号
        orderState: "", //订单状态
        date: [] //时间
      };
    },
    /* 清空 */
    /*  Delete() {
      this.searchcontent = {
        orderNo: "", //订单号
        consignee: "", //收货人
        phone: "", //手机号
        orderState: "", //订单状态
        date: [] //时间
      };
      this.getorderlist(); // 调用获取列表函数
    }, */
    /* 获取表格内容 分页 和 模糊查询的 */
    async getorderlist() {
      //收集参数
      let parmas = {
        currentPage: this.currentPage, //当前页数
        pageSize: this.pageSize,
        orderNo: this.searchcontent.orderNo, //订单号
        consignee: this.searchcontent.consignee, //收货人
        phone: this.searchcontent.phone, //手机号
        orderState: this.searchcontent.orderState, //订单状态
        date: JSON.stringify(this.searchcontent.date) //时间
      };

      let { total, data } = await OrderList(parmas);

      //判定这一页是否有数据  和当前页数 是不是不等于一
      if (!data.length && this.currentPage !== 1) {
        this.currentPage--; //是的话  页数减一
        this.getAccount(); //  调用数据列表
      }

      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD hh:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD hh:mm:ss");
      });

      this.tableData = data;
      this.total = total;
    },
    /* 分页和数据联动 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorderlist();
    },
    //查看和修改 跳转页面
    detailsModify(row) {
      console.log(row);

      //把这个页面你点击的内容运用本地存储中的临时存储 把数据 存储到本地 然后详细页面可以取出来使用  vue中 本地存储要挂载到 window 上
      window.sessionStorage.setItem("detailsModify", JSON.stringify(row));

      //跳转到详细和修改页面
      this.$router.push("/home/orderdetail");
    }
  },
  created() {
    this.getorderlist(); // 进入页面 就调用获取订单数据的函数
  }
};
</script>

<style lang="less" scoped>
.ordermanagement {
  min-height: 400px;
  background: #fff;
  padding-top: 20px;

  .tatle {
    font-size: 18px;
    margin: 0 0 10px 40px;
  }
  .titm {
    margin-right: 10px;
  }
  .el-input {
    width: 220px;
    height: 20px;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }

  .detailsBox {
    div {
      width: 100%;
      display: flex;
      min-height: 30px;

      p {
        flex: 0 0 50%;
        text-align: left;
        color: #333;
        font-size: 16px;
        font: 500;
      }
    }
  }
}
</style>