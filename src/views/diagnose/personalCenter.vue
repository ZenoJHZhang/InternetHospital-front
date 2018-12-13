<template>
  <div>
    <el-container>
      <el-header style="height:205px;padding:0px">
        <div class="headerImg"></div>
      </el-header>
      <el-container
        style="backgroundColor:#eeeeee;padding-top:20px;padding-left:12%;padding-right:12%;height:100%;padding-bottom:50px;"
      >
        <el-aside style="padding:20px;" width="20%">
          <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router>
            <el-menu-item index="/personalCenter">
              <i class="el-icon-menu"></i>
              <span slot="title">问诊信息</span>
            </el-menu-item>
            <el-menu-item index="/personalCenter/patientManagement">
              <i class="el-icon-document"></i>
              <span slot="title">就诊人管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="min-height:700px;backgroundColor:white;margin-top:20px">
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer style="height:200px;backgroundColor:#a33238"></el-footer>
    </el-container>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import expertAppointment from "@/components/diagnose/expertAppointment";
import axion from "@/utils/http_url";
export default {
  components: {
    treatmentProcess,
    expertAppointment
  },
  mounted() {
    this.$nextTick(function generate() {
      if (localStorage.getItem("token") == null) {
        this.$router.push("/");
        this.$store.commit("remove_token");
        this.$store.state.errorTokenVisible = true;
        this.$store.state.errorTokenMessage = "请登录！";
      } else {
        axion.userAuthorizationTest();
      }
    });
  }
};
</script>

<style scoped>
.headerImg {
  background: url("../../assets/personalCenter.png") center;
  height: 100%;
  background-size: cover;
}
</style>
