<template>
  <div>
    <div class="title-line">
      今日接诊科室
      <i class="fas fa-hand-point-right" style="float:right;">
        <span style="margin-left:5px">查看详情</span>
      </i>
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
import dateUtil from "@/utils/dateUtil";
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
      let today = dateUtil.getDay(0, "-");
      axion
        .listDepartmentSchedule(today, this.pageNo, this.pageSize)
        .then(response => {
          if (response != null) {
            this.departments = response.data.returnData.list;
            if (this.departments.length > 0) {
              this.$store.state.consultationDepartmentStore.isDepartment = true;
            } else {
              this.$store.state.consultationDepartmentStore.isDepartment = false;
            }
          }
        });
    },
    toReservation(department) {
      if (localStorage.getItem("token") == null) {
        this.$router.push("/");
        this.$message({
          message: "请登录！",
          type: "error",
          duration: 1000
        });
      } else {
        department.
        sessionStorage.setItem(
          "treatmentInformation",
          JSON.stringify(department)
        );
        this.$router.push("reservationData");
      }
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
