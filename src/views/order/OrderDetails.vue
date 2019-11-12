<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size:18px;font-weight:700">订单详细</span>
      <el-button
        style="float: right; padding: 10px"
        :type="!isEdit?  'primary':'success' "
        :icon="!isEdit? 'el-icon-search':'el-icon-edit' "
        @click="handleClick"
      >{{btnText}}</el-button>
    </div>

    <!-- 内容 -->
    <div>
      <!-- 订单号 -->
      <span class="han">
        <span>订单号:</span>
        <span v-if="!isEdit">{{rowdetails.orderNo}}</span>

        <span v-else>
          <el-input size="small" autocomplete="off" v-model="rowdetails.orderNo"></el-input>
        </span>
      </span>
      <el-divider></el-divider>
      <!--  下单时间: -->
      <span class="han">
        <span>下单时间:</span>
        <span v-if="!isEdit">{{rowdetails.orderTime}}</span>
        <span v-else>
          <el-date-picker v-model="rowdetails.orderTime" type="datetime" placeholder="选择下单时间"></el-date-picker>
        </span>
      </span>

      <el-divider></el-divider>
      <!-- 手机号: -->
      <span class="han">
        <span>手机号:</span>
        <span v-if="!isEdit">{{rowdetails.phone}}</span>
        <span v-else>
          <el-input autocomplete="off" v-model="rowdetails.phone"></el-input>
        </span>
      </span>

      <el-divider></el-divider>
      <!-- 收货人: -->
      <span class="han">
        <span>收货人:</span>
        <span v-if="!isEdit">{{rowdetails.consignee}}</span>
        <span v-else>
          <el-input autocomplete="off" v-model="rowdetails.consignee"></el-input>
        </span>
      </span>

      <el-divider></el-divider>
      <!--  配送地址: -->
      <span class="han">
        <span>配送地址:</span>
        <span v-if="!isEdit">{{rowdetails.deliverAddress}}</span>
        <span v-else>
          <el-input autocomplete="off" v-model="rowdetails.deliverAddress"></el-input>
        </span>
      </span>

      <el-divider></el-divider>
      <!-- 送达时间 -->
      <span class="han">
        <span>送达时间:</span>
        <span v-if="!isEdit">{{rowdetails.deliveryTime}}</span>
        <span v-else>
          <el-date-picker v-model="rowdetails.deliveryTime" type="datetime" placeholder="选择下单时间"></el-date-picker>
        </span>
      </span>

      <el-divider></el-divider>
      <!--  用户配注: -->
      <span class="han">
        <span>用户配注:</span>
        <span v-if="!isEdit">{{rowdetails.remarks}}</span>
        <span v-else>
          <el-input autocomplete="off" v-model="rowdetails.remarks"></el-input>
        </span>
      </span>

      <el-divider></el-divider>
      <!-- 订单金额: -->
      <span class="han">
        <span>订单金额:</span>
        <span v-if="!isEdit">{{rowdetails.orderAmount}}</span>
        <span v-else>
          <el-input autocomplete="off" v-model="rowdetails.orderAmount"></el-input>
        </span>
      </span>

      <el-divider></el-divider>
      <!--   订单状态: -->
      <span class="han">
        <span>订单状态:</span>
        <span v-if="!isEdit">{{rowdetails.orderState}}</span>
        <span v-else>
          <el-select placeholder="订单状态" v-model="rowdetails.orderState">
            <el-option label="未处理" value="未处理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
            <el-option label="已处理" value="已处理"></el-option>
          </el-select>
        </span>
      </span>
    </div>
  </el-card>
</template>

<script>
//引入接口函数
import { editOrder } from "../../api/order";

export default {
  data() {
    return {
      //数据
      rowdetails: {},
      //详细 还是 修改
      isEdit: false
    };
  },
  created() {
    // 获取本地数据
    this.rowdetails = JSON.parse(
      window.sessionStorage.getItem("detailsModify")
    );
    console.log(this.rowdetails);
  },
  //用于切换isEdit的true 和 false   进而 切换 文字 切换图标 切换按钮的颜色
  methods: {
    handleClick() {
      this.isEdit = !this.isEdit;

      if (!this.isEdit) {
        //如果点击的是保存就发送ajax  保存修改
        let { code } = editOrder(this.rowdetails);
        // 然后跳转的订单管理
        this.$router.push("/home/ordermanagement");
      }
    }
  },
  computed: {
    //切换文字 "编辑" "保存"
    btnText() {
      return this.isEdit === false ? "编辑" : "保存";
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  height: 1100px;
  font-size: 14px;
  .clearfix {
    margin-bottom: 10px;
  }
  .el-divider {
    margin: 10px 0;
  }
  .han {
    display: flex;
    padding: 0;
    margin: 0;
    span {
      line-height: 50px;
      margin-right: 20px;
    }
  }
}
</style>