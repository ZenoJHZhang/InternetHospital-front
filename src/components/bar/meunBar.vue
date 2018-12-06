<template>
<div>
  <div class="head">
    <span v-if="this.$store.state.commonStore.isUserLogin" style="margin-left:65%">你好,{{this.$store.state.phone}}</span>
    <span v-if="this.$store.state.commonStore.isUserLogin" id="logout" @click="logout()">退出</span>
  </div>
  <el-container>
  <el-header style="height:66px;padding-top:0"> 
    <el-container style="padding-top:5px">
      <el-aside width="25%"> <img id="logo" src="@/assets/index/logo.png"></el-aside>
      <el-main style="padding-left:20%;height:61px;overflow:hidden">  
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router background-color=#F2F2F2>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/netTreatRoom">网络诊间</el-menu-item>
            <el-menu-item index="/receptionDepartment">专科门诊</el-menu-item>
            <el-menu-item index="/e">专家预约</el-menu-item>
            <el-menu-item index="/d">个人中心</el-menu-item>
            <el-menu-item index="/f">获得帮助</el-menu-item>  
        </el-menu>
      </el-main>
    </el-container>
  </el-header>
  </el-container>
</div>
</template>

<style scoped>
#logo {
  float: right;
  height: 80%;
}
.el-menu-item {
  padding-left: 2.5%;
  padding-right: 2.5%;
  font-size: 14px;
}
.el-main {
  padding: 0;
}
.el-header {
  background-color: #f2f2f2;
}
span {
  font-size: 12px;
  color: white;
}
.head {
  background-color: black;
  height: 20px;
}
#logout {
  margin-left: 40px;
  cursor: pointer;
}
</style>

<script>
export default {
  name: "meunBar",
  data() {
    return {
      phone: ""
    };
  },
  methods: {
    logout() {
      this.$store.commit("remove_token");
      this.$message({
        message: "登出成功",
        type: "warning",
        duration: 1000
      });
      this.$router.push("/");
      this.$store.state.commonStore.isUserLogin = false;
    },
    getLoginDetail() {
      this.$store.state.phone = localStorage.getItem("phone");
      let token = localStorage.getItem("token");
      if (this.$store.state.phone != null && token != null) {
        this.$store.state.commonStore.isUserLogin = true;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getLoginDetail();
    });
  }
};
</script>