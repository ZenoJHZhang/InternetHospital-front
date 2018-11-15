<template>
<div>
    <div class="title-line">今日接诊科室<i class="fas fa-hand-point-right" style="float:right"> 更多</i></div>
    <no-comment></no-comment>
    <el-carousel v-if="isDepartments" :interval="4000" type="card" height="200px" style="width:100%" :autoplay="false" indicator-position='none'	>      
            <el-carousel-item v-for="department in departments" :key="department.key">
                <img class="department-img-style" :src="department.path">
                <div class="department-message-style">{{department.message}}</div>
                <el-button type="primary" :key="department.id">挂号({{department.time}})</el-button>
            </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
import noComment from '../../components/common/noComment'
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
      ],
      isDepartments:false
    };
  },
  components:{
    noComment
  }
};
</script>


<style scoped>
.title-line {
  border-bottom: 1px solid #e5e5e5;
  height: 40px;
  line-height: 40px;
  color: #a71820;
  font-size: 16px;
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
  width: 30%;
  margin-left: 35%;
  margin-top: 20px;
  font-size: 12px;
  padding-left: 0 ;
  padding-right: 0;
}
.department-img-style {
  width: 40%;
  height: 100px;
  padding-left: 30%;
}
.department-message-style {
  width: 40%;
  text-align: center;
  margin-left: 30%;
  margin-top: 10px;
  font-weight: 600;
}
.no-comment{
  
}
</style>
