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
          <el-table-column prop="clinicDate" label="就诊日期"></el-table-column>
          <el-table-column prop="timeInterval" label="就诊时段"></el-table-column>
          <el-table-column
            prop="payStateDescription"
            label="就诊状态"
            :filters="filterCondition"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="judgeType(scope.row.payStateDescription)"
                disable-transitions
              >{{scope.row.payStateDescription}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer style="text-align:center">        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pageNo"
          :pager-count="11"
          :page-size="pageSize"
          @current-change="listUserReservation()"
          v-if="isUserReservationExist"
        ></el-pagination></el-footer>
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
      filterCondition: [
        { text: "已预约未支付", value: "已预约未支付" },
        { text: "已付款等待视频", value: "已付款等待视频" }
      ]
      ,isUserReservationExist:false
    };
  },
  methods: {
    listUserReservation() {
      axion.listUserReservation(this.pageNo, this.pageSize).then(response => {
        if (response != null) {
          this.userReservationList = response.data.returnData.list;
                  this.total = response.data.returnData.total;
        if(this.total != 0){
            this.isUserReservationExist = true;
        }
       else{
         this.isUserReservationExist = false;
       }
        }
      });
    },
    handleSelectionChange(val) {
     this.$router.push({ name: 'waitDoctorCall', params: { userReservationId:val.id }}) 
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.payStateDescription === value;
    },
    judgeType(value) {
      if (
        value == "已付款等待视频" ||
        value == "完成就诊待评价" ||
        value == "已评价" ||
        value == "就诊中"
      ) {
        return "success";
      } else if (value == "已预约待支付" || value == "已付款已过号") {
        return "warning";
      } else {
        return "error";
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

