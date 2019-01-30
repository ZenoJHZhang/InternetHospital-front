<template>
  <div>
    <el-container>
      <el-header style="height:205px;padding:0px">
        <div class="headerImg"></div>
      </el-header>
      <el-container style="backgroundColor:#eeeeee;padding-top:20px;padding-left:12%;padding-right:12%;height:100%;padding-bottom:50px;">
      <el-main style="backgroundColor:white;width:70%;margin-bottom:20px;height:100%;padding:10px;">
        <el-tabs :tab-position="tabPosition" style="height: 200px;"  type="border-card">
          <el-tab-pane label="就诊相关问题"><service-terms></service-terms></el-tab-pane>
        </el-tabs>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import serviceTerms from "./helpCenterPage/serviceTerms"
export default {
  data() {
    return {
      tabPosition: "left"
    };
  },
  components:{
    serviceTerms
  }
};
</script>

<style scoped>
.headerImg {
  background: url("../../assets/helpCenter.png") center;
  height: 100%;
  background-size: cover;
}
</style>