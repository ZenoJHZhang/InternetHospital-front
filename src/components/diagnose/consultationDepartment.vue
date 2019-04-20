<template>
  <div>
    <div class="title-line">
      今日接诊科室
      <i
        class="fas fa-hand-point-right"
        style="float:right;cursor:pointer"
        @click="getDepartmentDetail()"
      >
        <span style="margin-left:5px;">查看详情</span>
      </i>
    </div>
    <label class="title-label">就诊时段</label>
    <el-radio-group v-model="timeInterval" size="medium" @change="listDepartmentSchedule()">
      <el-radio-button label="上午"></el-radio-button>
      <el-radio-button label="下午"></el-radio-button>
      <el-radio-button label="晚上"></el-radio-button>
    </el-radio-group>
    <no-comment
      v-if="!this.$store.state.consultationDepartmentStore.isDepartment"
      style="margin-top:75px"
      title="暂无科室"
    ></no-comment>
    <el-carousel
      v-if="this.$store.state.consultationDepartmentStore.isDepartment"
      :interval="4000"
      type="card"
      height="200px"
      style="width:100%;margin-top:65px"
      :autoplay="false"
      indicator-position="none"
    >
      <el-carousel-item v-for="department in departments" :key="department.id">
        <img class="department-img-style" :src="department.imgPath">
        <div class="department-message-style">{{department.departmentName}}</div>
        <el-button type="primary" :key="department.id" @click="toReservation(department)">挂号</el-button>
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
      pageNo: 0,
      pageSize: 0,
      timeInterval: "上午"
    };
  },
  components: {
    noComment
  },
  methods: {
    listDepartmentSchedule() {
      let today = dateUtil.getDay(0, "-");
      axion
        .listDepartmentSchedule(
          today,
          this.timeInterval,
          this.pageNo,
          this.pageSize
        )
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
      let nowHour = new Date().getHours();
      let hour;
      if (this.timeInterval === "上午") {
        hour = 12;
      } else if (this.timeInterval === "下午") {
        hour = 17;
      } else {
        hour = 21;
      }
      if (department.scheduleTime ===  dateUtil.getDay(0, "-") && nowHour > hour) {
        this.$message({
          message: "挂号时段已过",
          type: "warning"
        });
      } else {
        department.timeInterval = this.timeInterval;
        sessionStorage.setItem(
          "treatmentInformation",
          JSON.stringify(department)
        );
        this.$router.push("reservationData");
      }
    },
    getDepartmentDetail() {
      axion.authenticationTest();
      this.$router.push("receptionDepartment");
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
.title-label {
  color: #ada0a5;
  font-size: 15px;
  width: 10%;
  padding-right: 5%;
  font-weight: 600;
  border-right: 2px solid #ada0a5;
  margin-right: 3%;
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
