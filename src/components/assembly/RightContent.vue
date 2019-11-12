<template>
  <el-container class="RightContent">
    <!-- 头部 -->
    <Righttop />

    <el-main>
      <!-- 路由出口 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
/* 引入组件 */
import Righttop from "./Righttop";

export default {
  components: {
    Righttop
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less"  >
.RightContent {
  width: 100%;
  height: 100%;
  background: #effef4 !important;
  display: flex;
  flex-direction: column;
  // overflow: auto;

  .el-main {
    // height: 100%;
    // overflow: none !;
    // flex-basis: none !important;
    // overflow: none !important;
    background: #effef4;
  }
}
</style>