<template>
  <div class="useraccountlist">
    <h1 class="tatle">账号列表</h1>

    <!--  @selection-change="handleSelectionChange" 这个可以获取到选中的所有数据 -->
    <el-table
      @selection-change="handleSelectionChange"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- 选择框 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <!-- 账号 -->
      <el-table-column prop="account" label="账号" width="260"></el-table-column>

      <!-- 用户组 -->
      <el-table-column prop="userGroup" label="用户组" width="260"></el-table-column>

      <!-- 创建日期 -->
      <el-table-column prop="ctime" label="创建日期" width="260"></el-table-column>

      <el-table-column label="操作">
        <!-- 这样 slot-scope="scope" 在 他的子元素 设置事件的是 可以 这样 scope.row 就可以在 事件函数里面 获事件触发的那个的数据了-->
        <template slot-scope="scope">
          <el-button size="mini" @click="EditCon(scope.row)" type="primary">编辑</el-button>
          <el-button @click="ConDelete(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑 弹出 模态框 用于编辑 回填 和 确认修改 -->
    <el-dialog width="460px" title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="EditFrom" style="width: 337px;">
        <el-form-item label="账号" label-width="120px">
          <el-input autocomplete="off" v-model="EditFrom.account"></el-input>
        </el-form-item>
        <el-form-item item label="用户组" label-width="120px">
          <el-select placeholder="请选择用户组" v-model="EditFrom.userGroup">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="高级管理员" value="高阶管理员"></el-option>
            <el-option label="中级管理员" value="中级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" @click="batchdel">批量删除</el-button>
      </el-col>
      <el-col :span="5">
        <el-button @click="cancelSelect" type="primary">取消选择</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//引入工具函数 用于调用axios
import {
  accountlist, //获取数据列表(分页)
  accountDel,  //单个删除
  batchdel, // 多个删除
  accountedit //编辑
} from "@/api/account";
//引入时间化
import moment from "moment";
export default {
  data() {
    return {
      tableData: [
        // { account: "王大虎", userGroup: "高阶管理员", ctime: "2016-05-02" }
      ],
      /*  列表数据 */
      total: 0, // 数据总条数
      currentPage: 1, // 当前页
      pageSize: 5, // 每页条数
      ids: [] /* 用于存放被选中的 用于批量删除 */,
      dialogFormVisible: false, //用于 切换 模态框 显示和隐藏
      EditFrom: {
        //修改的内容
        account: "", //账号
        userGroup: "" //用户组
      }
    };
  },
  methods: {
    // 取消选择
    cancelSelect() {
      this.$refs.multipleTable.clearSelection();
    },
    //写一个函数把  axios 给包起起来 因为他要多次调用  有
    async getAccount() {
      //请求列表  用accountlist  接收参数的同时 发送数据给 工具函数 这样 工具函数就会发送axios
      //然后接收后台传来的参数 用结构 {} 结出数据 然后赋值 给 this.total = total;   this.tableData = data;
      let { total, data } = await accountlist({
        pageSize: this.pageSize, //每页条数
        currentPage: this.currentPage // 当前页
      });

      //判定这一页是否有数据  和当前页数 是不是不等于一
      if (!data.length && this.currentPage !== 1) {
        this.currentPage--; //是的话  页数减一
        this.getAccount(); //  调用数据列表
      }
      //时间格式化
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD hh:mm:ss");
      });

      // /结构 {} 结出数据 然后赋值 就可以自动渲染页面了
      this.total = total;
      this.tableData = data;
    },
    //每页条数发生改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getAccount(); // 发生改变自动调用一次请求账号列表接口
    },
    // 当前页码发生改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getAccount(); // 发生改变自动调用一次请求账号列表接口
    },
    /* 单个删除 */
    ConDelete(row) {
      console.log(row.id);
      {
        this.$confirm("你就这么忍心删除人家吗,嘤嘤嘤..", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            //获取参数  发送参数给工具函数 这样 工具函数就可以发送axios
            let { code, msg } = await accountDel({ id: row.id });
            if (code === 0) {
             /*  this.$message({
                type: "success",
                message: msg
              }); */
              this.getAccount(); // 删除成功自动调用一次请求账号列表接口
            } /* else {
              this.$message.error(msg);
            } */
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
    /* 当前选中的  用于获取到选中的id*/
    handleSelectionChange(rews) {
      // console.log(rews); //选中的所有的数据
      this.ids = rews.map(rew => rew.id); //获取到选中的id 同时加入 ids 这个数组里面
      // console.log(this.ids);
    },
    /* 多个删除 */
    batchdel() {
      //判断 他 在点击批量删除的时候 是否有选择删除目标 没有 就不发ajax并给出提示
      if (!this.ids.length) {
        this.$message.error(
          "我知道你不想删除我,你要删除的话,你就狠心选择我吧--☹-- 哼.. "
        );
        return;
      }

      // 删除
      {
        this.$confirm("你就这么忍心删除人家吗,嘤嘤嘤..", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            //获取参数  发送参数给工具函数 这样 工具函数就可以发送axios
            //接收 id 数组  回头接收的是 id数组
            let { code, msg } = await batchdel({
              ids: JSON.stringify(this.ids)
            });

            if (code === 0) {
              /* this.$message({
                type: "success",
                message: msg
              }); */
              this.getAccount(); // 删除成功自动调用一次请求账号列表接口
            } /* else {
              this.$message.error(msg);
            } */
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
    /* 回填数据 用于编辑  */
    EditCon(row) {
      console.log(row);
      /* 方法一 浅拷贝  实现 数据 不共享*/
      // this.EditFrom = Object.assign({}, row);
      /* 方法二  ...  */
      this.EditFrom = { ...row };
      this.dialogFormVisible = true;
    },
    //编辑确认
    async EditConfirm() {
      /*获取数据 发送个工具函数  */
      let { code, msg } = await accountedit(this.EditFrom);
      //判断是否成功
    /*   if (code === 0) {
        //成功提示
        this.$message({
          type: "success",
          message: msg
        });
      } else {
        // 失败提示
        this.$message.error(msg);
      } */
      //隐藏 模态框
      this.dialogFormVisible = false;
      //编辑后调用一次账号列表
      this.getAccount();
    }
  },

  /* 钩子函数 这个是进入页面就自动加载 */
  created() {
    this.getAccount(); // 进入页面 自动调用一次请求账号列表接口
  }
};
</script>
  
<style lang="less" scoped>
.useraccountlist {
  width: 100%;
  height: auto;
  padding: 30px 0;
  background: #fff;
  box-shadow: 0 0 10px 2px #ccc;
  .tatle {
    font-size: 18px;
    margin-left: 40px;
    margin-bottom: 10px;
  }
  .el-table {
    text-align: center;
    margin-bottom: 30px;
  }

  .el-pagination {
    text-align: center;
  }
}
</style>