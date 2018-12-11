<template>
  <div>
    <div class="title-line">接诊科室</div>
    <div>
      <label class="title-label">选择日期</label>
      <el-radio-group
        v-model="date"
        v-for="t in dateList"
        :key="t.value"
        size="medium"
        @change="listDepartmentSchedule()"
        style="margin-bottom:15px"
      >
        <el-radio-button :label="t.value"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <label class="title-label">就诊时段</label>
      <el-radio-group v-model="timeInterval" size="medium" @change="listDepartmentSchedule()">
        <el-radio-button label="上午"></el-radio-button>
        <el-radio-button label="下午"></el-radio-button>
        <el-radio-button label="晚上"></el-radio-button>
      </el-radio-group>
    </div>
    <el-container>
      <el-main>
        <no-comment
          v-if="!this.$store.state.consultationDepartmentStore.isDepartment"
          style="margin-top:100px;padding-bottom:93.72px"
        ></no-comment>
        <br>
        <el-card
          v-for="department in departments"
          :key="department.id"
          class="departmentLi"
          shadow="hover"
        >
          <img class="department-img-style" :src="department.imgPath">
          <div class="department-message-style">{{department.departmentName}}</div>
          <el-button plain :key="department.id" @click="toReservation(department)">挂号</el-button>
        </el-card>
      </el-main>
      <el-footer style="text-align:center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pageNo"
          :pager-count="11"
          :page-size="pageSize"
          @current-change="listDepartmentSchedule"
          v-if="this.$store.state.consultationDepartmentStore.isDepartment"
        ></el-pagination>
      </el-footer>
    </el-container>
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
      pageSize: 1,
      total: 10,
      date: "",
      dateList: [],
      departments: "",
      timeInterval: "上午"
    };
  },
  components: {
    noComment
  },
  methods: {
    getDateFormat() {
      this.date = dateUtil.getDay(0, "-");
      for (let i = 0; i < 7; i++) {
        let date = dateUtil.getDay(i, "-");
        this.dateList.push({
          value: date
        });
      }
    },
    listDepartmentSchedule() {
      axion
        .listDepartmentSchedule(
          this.date,
          this.timeInterval,
          this.pageNo,
          this.pageSize
        )
        .then(response => {
          if (response != null) {
            this.departments = response.data.returnData.list;
            this.total = response.data.returnData.total;
            this.pageNo = response.data.returnData.pageNum;
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
          type: "info",
          duration: 2000
        });
      } else {
        axion.authorizationTest();
        department.timeInterval = this.timeInterval;
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
      this.getDateFormat();
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
  font-size: 1;
  font-family: "microsoft yahei";
  font-weight: 700;
  margin-bottom: 20px;
}
.el-radio-group {
  margin-left: 2%;
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
  width: 100%;
  margin-top: 20px;
  font-size: 12px;
  padding-left: 0;
  padding-right: 0;
}
.department-img-style {
  width: 100%;
  height: 55%;
}
.department-message-style {
  margin-top: 10px;
  font-weight: 600;
}
.departmentLi {
  margin-top: 50px;
  width: 16%;
  text-align: center;
  list-style-type: none;
  float: left;
  margin: 2.5%;
}
.el-card {
  padding: 2%;
  border: none;
}
</style>
