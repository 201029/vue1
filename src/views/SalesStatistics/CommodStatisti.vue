<template>
  <div class="commdstatisti">
    <h1>商品统计</h1>
    <div>
      <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="时间范围" prop=" ">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-button type="primary">搜索</el-button>
      </el-form>
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
      value: "" //时间
    };
  },
  //
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
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.commdstatisti {
  min-height: 400px;
  background: #fff;
  box-shadow: 0 0 10px 3px #ccc;
  padding: 30px;

  h1 {
    margin: 0 0 30px 30px;
    font-size: 24px;
  }

  .el-form {
    display: flex;
    .el-button {
      // width: 50px;
      height: 40px;
      // text-align: center;
      // line-height: 20px;
      margin-left: 20px;
      padding: 0 4px;
    }
  }
}
</style>