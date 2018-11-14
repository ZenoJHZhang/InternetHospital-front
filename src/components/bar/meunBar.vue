<template>
<el-container>
  <el-header style="height:81px"> 
    <el-container style="padding-top:20px">
      <el-aside width="20%" style="padding-left:10%"> <img id="logo" src="../../assets/index/logo.png"></el-aside>
      <el-main style="padding-left:25%;height:61px;overflow:hidden">  
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router background-color=#F2F2F2>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/netTreatRoom">网络诊间</el-menu-item>
            <el-menu-item index="/c">处理中心</el-menu-item>
            <el-menu-item index="/e">处理中心</el-menu-item>
            <el-menu-item index="/d">处理中心</el-menu-item>
            <el-menu-item index="/f">处理中心</el-menu-item>  
        </el-menu>
      </el-main>
    </el-container>
  </el-header>
</el-container>
</template>

<style scoped>
#logo {
  height: auto;
  width: 100%;
  min-width: 80px;
}
.el-menu-item {
  padding-left: 2.5%;
  padding-right: 2.5%;
  font-size: 14px;
}
.el-main{
  padding: 0
}
.el-header{
  background-color: #F2F2F2
}
</style>

<script>
export default {
  name: "meunBar"
};
</script>