<template>
  <div>
    <div class="title-line">
      今日接诊科室
      <i class="fas fa-hand-point-right" style="float:right">更多</i>
    </div>
    <no-comment
      v-if="!this.$store.state.consultationDepartmentStore.isDepartment"
      style="margin-top:50px"
    ></no-comment>
    <el-carousel
      v-if="this.$store.state.consultationDepartmentStore.isDepartment"
      :interval="4000"
      type="card"
      height="200px"
      style="width:100%"
      :autoplay="false"
      indicator-position="none"
    >
      <el-carousel-item v-for="department in departments" :key="department.id">
        <img class="department-img-style" :src="require('@/assets/diagnose/'+department.imgPath)">
        <div class="department-message-style">{{department.departmentName}}</div>
        <el-button
          type="primary"
          :key="department.id"
          @click="toReservation(department)"
        >挂号({{department.timeMessage}})</el-button>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import noComment from "@/components/common/noComment";
import axion from "@/utils/http_url";
export default {
  data() {
    return {
      departments: "",
      treatmentInformation: "",
      pageNo: 1,
      pageSize: 5
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
      axion
        .listDepartmentSchedule(today, this.pageNo, this.pageSize)
        .then(response => {
          if (response.status == 200) {
            this.departments = response.data.returnData.list;
            if (this.departments.length > 0) {
              this.$store.state.consultationDepartmentStore.isDepartment = true;
            }
          } else {
            this.$message.error("服务器异常，请稍后重试！");
          }
        });
    },
    toReservation(department) {
      sessionStorage.setItem(
        "treatmentInformation",
        JSON.stringify(department)
      );
      this.$router.push("reservationData");
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
