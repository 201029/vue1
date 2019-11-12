<template>
  <div class="home">
    <el-container>
      <LeftNav></LeftNav>

      <!-- 右边导航 -->

      <!-- 左边内容 -->
     
        <RightContent></RightContent>
      
    </el-container>
  </div>
</template>

<script>
import LeftNav from "../components/assembly/LeftNav.vue";
import RightContent from "../components/assembly/RightContent.vue";

export default {
  components: {
    LeftNav, //首页导航
    RightContent //
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
    background: #304156;

    
  }
}
</style>