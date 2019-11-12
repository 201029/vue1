<template>
  <div class="index-box">
    <div>
      <el-row>
        <el-col :span="6">
          <div class="bg-purple" v-for="(item,index) in topLogoTetx" :key="index">
            <div class="left-icon">
              <i class="iconfont" :class="item.icon" :style="item.Color"></i>
            </div>

            <div class="right-tetx">
              <p>{{item.tetx}}</p>
              <span>12342134</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="box">
      <div id="myChart" :style="{width: '1000px', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topLogoTetx: [
        { icon: "icon-dingdan", Color: "color:#1296db", tetx: "总订单" },
        { icon: "icon-ico-jnljxse", Color: "color:#d4237a", tetx: "总销售额" },
        {
          icon: "icon-icon_ icon2",
          Color: "color:#1296db",
          tetx: "今日订单数"
        },
        { icon: "icon-qian icon2", Color: "color:#1afa29", tetx: "今日销售额" }
      ]
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["总订单", "总销售额", "今日订单数", "今日销售额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2019-10-20 6:00:00",
            "2019-10-20 9:00:00",
            "2019-10-20 12:00:00",
            "周五2019-10-20 15:00:00",
            "2019-10-20 18:00:00",
            "2019-10-20 21:00:00",
            "2019-10-20 24:00:00"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "总订单",
            type: "line",
            stack: "总量",
            data: [120, 132, 141, 164, 290, 330, 410]
          },
          {
            name: "总销售额",
            type: "line",
            stack: "总量",
            data: [2200, 2820, 2910, 3340, 3900, 4300, 6100]
          },
          {
            name: "今日订单数",
            type: "line",
            stack: "总量",
            data: [150, 220, 201, 104, 0, 300, 400]
          },
          {
            name: "今日销售额",
            type: "line",
            stack: "总量",
            data: [3020, 3302, 3001, 3034, 3000, 3300, 320]
          }
        ]
      }),
        //鼠标事件
        myChart.on("click", function(params) {
          console.log(params);
        });
    }
  }
};
</script>

<style lang="less" >
.index-box {
  background: #f1f1f1;
  .el-col {
    display: flex;
    justify-items: flex-end;
  }
  .bg-purple {
    width: 270px;
    height: 126px;
    background: #fff;
    box-shadow: 0 0 3px 2px #ccc;
    margin: 0 5px 0 5px;
    display: flex;
    border-radius: 12px;
    .left-icon {
      width: 120px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      i {
        font-size: 100px;
      }
      .icon2 {
        font-size: 80px;
        //  line-height: 100px;
      }
    }
    .right-tetx {
      width: 200px;
      padding: 20px 0;
      line-height: 40px;
      text-align: center;
      p {
        font-size: 26px;
        color: #cfcfcf;
      }
      span {
        font-size: 22px;
        color: #313131;
      }
    }

    &:hover {
      box-shadow: 0 0 10px 2px #ccc;
    }
  }

  //图表

  .box {
    width: 100%;
    background: #fff;
    margin-top: 30px;
    padding: 0 auto;
  }
}
</style>