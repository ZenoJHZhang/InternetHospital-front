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
            <div class="title-line">{{title}}</div>
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
                  <label style="color:black">预约日期：</label>
                  <span style="color: #fe9e20;">{{userReservation.clinicDate}}</span>
                </div>
                <div class="detailClass">
                  <label style="color:black">预约时段：</label>
                  <span style="color: #fe9e20;">{{userReservation.clinicTime}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div class="detailClass">
                  <label style="color:black">费用：</label>
                  <span style="color: #fe9e20;">￥{{userReservation.clinicPrice}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div class="longDetailClass">
                  <label style="color:black">疾病描述：</label>
                  <span>{{userReservation.conditionDesc}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div>
                  <label style="color:black">
                    病情图片：
                    <span style="color: #fe9e20;">（点击查看大图）</span>
                  </label>
                  <user-reservation-img-water-fall
                    :userReservationId="userReservation.id"
                    v-if="userReservation.imgPathList.length !== 0"
                  ></user-reservation-img-water-fall>
                </div>
              </div>
            </div>
            <no-comment
              style="margin-top:50px;margin-bottom:50px;text-align:center"
              v-if="userReservation.imgPathList.length === 0"
              title="暂无图片"
            ></no-comment>
            <div style="text-align:center">
              <el-button style="margin-right:50px" @click="cancelClinic()">取 消</el-button>
              <el-button type="primary" @click="toPay()">去 支 付</el-button>
            </div>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog
      title="请扫描二维码进行支付"
      :visible.sync=" this.$store.state.payStore.isClinicPayDialogVisible"
      width="20%"
      @close="close()"
    >
      <div style="text-align:center">
        <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isClinicPayDialogVisibleFalse">取 消</el-button>
        <el-button type="primary" @click="confirmPay()">支 付 完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import axion from "@/utils/http_url";
import userReservationImgWaterFall from "@/components/common/userReservationImgWaterFall";
import QrcodeVue from "qrcode.vue";
import noComment from "@/components/common/noComment";
export default {
  data() {
    return {
      userReservationId: "",
      userReservation: {
        patient: {}
      },
      title: "",
      sex: "",
      payDialogVisible: false,
      value: "",
      size: 200,
      userReservationUuId: "",
      outTradeNo: "",
      time: ""
    };
  },
  components: {
    treatmentProcess,
    userReservationImgWaterFall,
    QrcodeVue,
    noComment
  },
  methods: {
    getUserReservationDetail() {
      let userReservationUuId = sessionStorage.getItem("userReservationUuId");
      if (userReservationUuId == null) {
        this.$router.push("netTreatRoom");
        this.$message({
          message: "请先选择专科科室或专家医生",
          type: "warning",
          duration: 2000
        });
      } else {
        axion.getUserReservationDetail(userReservationUuId).then(response => {
          if (response != null) {
            this.userReservation = response.data.returnData;
            if (this.userReservation.patient.sex == 0) {
              this.sex = "女";
            } else {
              this.sex = "男";
            }
            if (this.userReservation.type == 1) {
              this.title = "普通挂号";
            } else if (this.userReservation.type == 2) {
              this.title = "普通预约";
            } else {
              this.title = "专家预约";
            }
            this.outTradeNo = this.userReservation.outTradeNo;
            this.time = setInterval(this.getPayStatus, 1000);
          }
        });
      }
    },
    toPay() {
      this.$store.state.payStore.isClinicPayDialogVisible = true;
      axion
        .createPayQrCode({
          amount: this.userReservation.clinicPrice,
          userReservationUuId: this.userReservationUuId
        })
        .then(response => {
          if (response.data.returnCode === 200) {
            let data = response.data.returnData;
            if (data === -1) {
              this.$notify({
                title: "很抱歉",
                message: "支付超时",
                type: "error"
              });
            } else {
              this.value = data.qrCode;
            }
          }
        });
    },
    close() {
      this.$store.state.payStore.isClinicPayDialogVisible = false;
    },
    confirmPay() {
      axion.tradeOrder({
        outTradeNo: this.outTradeNo
      });
    },
    isClinicPayDialogVisibleFalse() {
      this.$store.state.payStore.isClinicPayDialogVisible = false;
    },
    getPayStatus() {
      axion
        .getPayStatus({
          userReservationUuId: this.userReservationUuId
        })
        .then(response => {
          if (response.data.returnCode === 200) {
            let payStatus = response.data.returnData;
            if (payStatus === 2) {
              clearInterval(this.time);
              this.$router.push("waitDoctorCall");
              this.$notify({
                title: "谢谢",
                message: "支付成功",
                type: "success"
              });
            } else if (payStatus === 7) {
              clearInterval(this.time);
              this.$notify({
                title: "很抱歉",
                message: "支付超时",
                type: "error"
              });
              this.$router.push("/personalCenter");
            }
          }
        });
    },
    cancelClinic() {
      this.$router.push("/netTreatRoom");
      sessionStorage.removeItem("treatmentInformation");
      sessionStorage.removeItem("userReservationUuId");
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.userReservationUuId = sessionStorage.getItem("userReservationUuId");
      this.getUserReservationDetail();
      this.$store.state.treatmentProcessStore.active = 2;
    });
  },
  destroyed() {
    clearInterval(this.time);
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
.longDetailClass {
  display: inline-block;
  width: 90%;
}
.longDetailClass span {
  width: 100% !important;
  word-wrap: break-word;
  word-break: break-all;
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

