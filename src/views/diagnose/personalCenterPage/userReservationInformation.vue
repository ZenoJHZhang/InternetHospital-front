<template>
  <div>
    <el-container>
      <el-header style="padding:20px">
        <div class="title-line">问诊信息</div>
      </el-header>
      <el-main style="padding-top:5px;min-height:600px">
        <el-table
          ref="filterTable"
          :data="userReservationList"
          style="width: 100%"
          @row-click="handleSelectionChange"
        >
          <el-table-column prop="patientName" label="就诊人姓名"></el-table-column>
          <el-table-column prop="departmentName" label="科室"></el-table-column>
          <el-table-column prop="doctorName" label="医生"></el-table-column>
          <el-table-column prop="clinicDate" label="就诊日期"></el-table-column>
          <el-table-column prop="timeInterval" label="就诊时段"></el-table-column>
          <el-table-column prop="payStateDescription" label="就诊状态" style="color:red"></el-table-column>
        </el-table>
      </el-main>
      <el-footer style="text-align:center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pageNo"
          :pager-count="11"
          :page-size="pageSize"
          @current-change="listUserReservation()"
          v-if="isUserReservationExist"
        ></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axion from "@/utils/http_url";
export default {
  data() {
    return {
      userReservationList: [],
      pageNo: 1,
      pageSize: 8,
      isUserReservationExist: false
    };
  },
  methods: {
    listUserReservation() {
      axion.listUserReservation(this.pageNo, this.pageSize).then(response => {
        if (response != null) {
          this.userReservationList = response.data.returnData.list;
          this.total = response.data.returnData.total;
          if (this.total != 0) {
            this.isUserReservationExist = true;
          } else {
            this.isUserReservationExist = false;
          }
        }
      });
    },
    handleSelectionChange(val) {
      sessionStorage.setItem("userReservationUuId", val.uuId);
      let status = val.status;
      //已预约待支付
      if (status == "1") {
        this.$router.push("reservationResult");
      }
      //已付款等待视频
      else if (status == "4") {
        this.$router.push("waitDoctorCall");
      } else if (status == "5") {
        this.$router.push("overCallNumber");
      } else if (
        status == "11" ||
        status == "13" ||
        status == "14" ||
        status == "14" ||
        status == "17" ||
        status == "18"
      ) {
        this.$router.push("allUserReservationDetail");
      }
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.listUserReservation();
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
</style>

