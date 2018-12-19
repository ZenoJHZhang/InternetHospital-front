<template>
  <div>
    <el-container style="padding:0">
      <el-main style="backgroundColor:#eeeeee;padding-left:15%;padding-right:15%;padding-top:50px">
        <el-container>
          <el-header
            style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:20px;"
          >
            <treatment-process style="padding:10px"></treatment-process>
          </el-header>
          <el-main style="backgroundColor:white;width:100%;height:100%;padding:20px;">
            <div class="title-line">专家预约</div>
            <div class="reservationStyle">
              <div class="lineClass">
                <div class="detailClass">
                  <label style="color:black">姓名：</label>
                  <span style="color: #fe9e20;">{{userReservation.patientName}}</span>
                </div>
                <div class="detailClass">
                  <label style="color:black">性别：</label>
                  <span>{{sex}}</span>
                </div>
                <div class="detailClass">
                  <label style="color:black">年龄：</label>
                  <span>{{userReservation.patient.age}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div>
                  <label style="color:black">身份证号：</label>
                  <span>{{userReservation.patient.idCard}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div class="detailClass">
                  <label style="color:black">科室：</label>
                  <span>{{userReservation.departmentName}}</span>
                </div>
                <div class="detailClass">
                  <label style="color:black">医生：</label>
                  <span>{{userReservation.doctorName}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div class="detailClass">
                  <label style="color:black">费用：</label>
                  <span style="color: #fe9e20;">￥{{userReservation.clinicPrice}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div class="detailClass">
                  <label style="color:black">疾病描述：</label>
                  <span>{{userReservation.conditionDesc}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div>
                  <label style="color:black">病情图片：</label>
                  <user-reservation-img-water-fall></user-reservation-img-water-fall>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import axion from "@/utils/http_url";
import userReservationImgWaterFall from "@/components/common/userReservationImgWaterFall";
export default {
  data() {
    return {
      userReservationId: '',
      userReservation: {
                  patient: {
      
        }
      },
      title: "",
      sex: ""
    };
  },
  components: {
    treatmentProcess,
    userReservationImgWaterFall
  },
  methods: {
    getUserReservationDetail() {
      this.userReservationId = sessionStorage.getItem("userReservationId");
      if (this.userReservationId == null) {
        this.$router.push("netTreatRoom");
        this.$message({
          message: "请先选择专科科室或专家医生",
          type: "warning",
          duration: 2000
        });
      } else {
        axion
          .getUserReservationDetail(this.userReservationId)
          .then(response => {
            if (response != null) {
              this.userReservation = response.data.returnData;
              if (this.userReservation.patient.sex == 0) {
                this.sex = "女";
              } else {
                this.sex = "男";
              }
            }
          });
      }
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.getUserReservationDetail();
      this.$store.state.treatmentProcessStore.active = 2;
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
.reservationStyle {
  margin-left: 10%;
  margin-top: 30px;
  font-size: 16px;
}
.detailClass {
  display: inline-block;
  width: 30%;
}
.detailClass span {
  margin-left: 5%;
}
.lineClass {
  margin-bottom: 50px;
}
.imgClass {
  height: 100%;
}
.imgClass img {
  padding: 30px;
}
</style>

