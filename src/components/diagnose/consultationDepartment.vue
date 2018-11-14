<template>
<div>
    <div class="title-line">今日接诊科室</div>
    <el-carousel :interval="4000" type="card" height="200px" style="width:800px" :autoplay="false">        
            <el-carousel-item v-for="department in departments" :key="department.key">
                <img :src="department.path">
                <div class="department-message-style">{{department.message}}</div>
                <el-button type="primary" :key="department.id">挂号({{department.time}})</el-button>
            </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
export default {
  data() {
    return {
      departments: [
        {
          id: 1,
          message: "普通门诊科室",
          time: "上午/下午",
          path: require("../../assets/diagnose/defaultDept.png")
        },
        {
          id: 2,
          message: "骨科科室",
          time: "下午/晚上",
          path: require("../../assets/diagnose/defaultDept.png")
        },
        {
          id: 3,
          message: "外科科室",
          time: "上午",
          path: require("../../assets/diagnose/defaultDept.png")
        },
        {
          id: 4,
          message: "紧急门诊科室",
          time: "全天",
          path: require("../../assets/diagnose/defaultDept.png")
        }
      ]
    };
  }
};
</script>


<style scoped>
.title-line {
  border-bottom: 1px solid #e5e5e5;
  height: 40px;
  line-height: 40px;
  color: #a71820;
  font-size: 18px;
  font-family: "microsoft yahei";
  font-weight: 700;
  margin-bottom: 20px;
}
/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
.el-button {
  text-align: center;
  width: 150px;
  margin-left: 125px;
  margin-top: 20px;
}
img {
  width: 180px;
  height: 100px;
  padding-left: 110px;
}
.department-message-style {
  width: 250px;
  text-align: center;
  margin-left: 75px;
  margin-top: 10px;
  font-weight: 600;
}
</style>
