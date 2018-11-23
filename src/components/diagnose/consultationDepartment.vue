<template>
<div>
    <div class="title-line">今日接诊科室<i class="fas fa-hand-point-right" style="float:right"> 更多</i></div>
    <no-comment v-if="!this.$store.state.consultationDepartmentStore.isDepartment"></no-comment>
    <el-carousel v-if="this.$store.state.consultationDepartmentStore.isDepartment" :interval="4000" type="card" height="200px" style="width:100%" :autoplay="false" indicator-position='none'	>      
            <el-carousel-item v-for="department in departments" :key="department.id">
                <img class="department-img-style" :src="require('../../assets/diagnose/'+department.img_path)" >
                <div class="department-message-style">{{department.department_name}}</div>
                <el-button  type="primary" :key="department.id" @click="toReservation(department)">挂号({{department.time_message}})</el-button>
            </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
import noComment from "../../components/common/noComment";
import axion from "../../utils/http_url";
export default {
  data() {
    return {
      departments: "",
      treatmentInformation:""
    };
  },
  components: {
    noComment
  },
  methods: {
    listDepartmentSchedule() {
      let date = new Date();
      this.month = date.getMonth() + 1;
      this.strDate = date.getDate();
      this.year = date.getFullYear();
      let today = this.year + "-" + this.month + "-" + this.strDate;
      axion.listDepartmentSchedule("2018-11-21").then(response => {
        this.departments = response.data.returnData.list;
        if (this.departments.length > 0) {
          this.$store.state.consultationDepartmentStore.isDepartment = true;
        }
      });
    },
    toReservation(department) {
      this.$router.push({ name: "reservationData", params: {treatmentInformation:department } });
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.listDepartmentSchedule();
    });
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
  padding-left: 0;
  padding-right: 0;
}
.department-img-style {
  width: 40%;
  height: 55%;
  padding-left: 30%;
}
.department-message-style {
  width: 40%;
  text-align: center;
  margin-left: 30%;
  margin-top: 10px;
  font-weight: 600;
}
</style>
