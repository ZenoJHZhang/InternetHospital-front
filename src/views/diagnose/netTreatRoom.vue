<template>
<el-container>
<el-header style="height:350px">
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../assets/default_carousel_picture.png">
      </el-carousel-item>
    </el-carousel>
</el-header>
<el-main>FOR THE BEST LIFE</el-main>
</el-container>
</template>



<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img{
  width: 100%;
}
.el-main{
  padding: 0;
}
</style>

