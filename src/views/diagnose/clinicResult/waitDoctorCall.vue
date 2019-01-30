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
          <el-main
            style="backgroundColor:white;width:100%;height:100%;padding:20px;padding-top:50px"
          >
            <el-container
              style="margin-left:10%;padding-left:200px;background-color:#eeeeee;padding-bottom:25px;padding-top:25px;width:80%"
            >
              <el-aside style="padding-top:45px;width:100px">
                <i class="el-icon-success"></i>
              </el-aside>
              <el-container style="padding-bottom:0px">
                <el-main>
                  <div style="font-size:30px;font-weight:700">挂号成功</div>
                </el-main>
                <el-footer height="50px">
                  <div style="margin-bottom:5px">开始叫号后，会有短信通知，请保持手机通讯畅通。</div>
                  <div>请在收到短信通知后，访问此页面，谢谢。</div>
                </el-footer>
              </el-container>
            </el-container>
          </el-main>
          <el-footer height="100%" style="backgroundColor:white;padding:20px;padding-top:0">
            <video-test></video-test>
          </el-footer>
        </el-container>
        <el-container
          style="backgroundColor:white;width:100%;height:400px;padding:20px;padding-left:20%;padding-right:20%"
        >
          <el-main>
            <div>
              <div class="lineClass">
                <div class="detailClass">
                  <label style="color:black">就诊人：</label>
                  <span style="color: #fe9e20;">{{userReservation.patientName}}</span>
                </div>
                <div class="detailClass">
                  <label style="color:black">就诊时间：</label>
                  <span
                    style="color: #fe9e20;"
                  >{{userReservation.clinicDate}} {{userReservation.clinicTime}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div class="detailClass">
                  <label style="color:black">科室：</label>
                  <span style="color: #fe9e20;">{{userReservation.departmentName}}</span>
                </div>
                <div class="detailClass">
                  <label style="color:black">医生：</label>
                  <span style="color: #fe9e20;">{{userReservation.doctorName}}</span>
                </div>
              </div>
              <div class="lineClass">
                <div class="detailClass">
                  <label style="color:black">当前叫号：</label>
                  <span style="color: #fe9e20;">{{userReservation.callNo==0?'还未开始叫号':userReservation.callNo}}</span>
                </div>
                <div class="detailClass">
                  <label style="color:black">就诊序号：</label>
                  <span style="color: #fe9e20;">{{userReservation.regNo}}</span>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-main>
      <!-- <el-button @click="pushClinicState()">下一个</el-button> -->
    </el-container>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import videoTest from "@/components/diagnose/videoTest";
import axion from "@/utils/http_url";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  data() {
    return {
      userReservationId: "",
      userReservation: {
        regNo: "",
        callNo: "",
        patient: {}
      },
      stompClient: ""
    };
  },
  components: {
    treatmentProcess,
    videoTest
  },
  methods: {
    getUserReservationDetail() {
      let userReservationUuId = sessionStorage.getItem("userReservationUuId");
      axion.getUserReservationDetail(userReservationUuId).then(response => {
        if (response != null) {
          this.userReservation = response.data.returnData;
          this.callPassed();
        }
      });
    },
    isCall() {
      if (this.userReservation.regNo == this.userReservation.callNo) {
        this.$notify({
          title: "就诊提示",
          message:
            "感谢您的耐心等待，已经轮到您就诊，请点击视频就诊按钮，及时就诊。",
          type: "success"
        });
      }
    },
    callWaited() {
      if (this.userReservation.regNo > this.userReservation.callNo) {
        this.$notify({
          title: "就诊提示",
          message:
            "您的号为" +
            this.userReservation.regNo +
            "号，现在叫到" +
            this.userReservation.callNo +
            "号，请耐心等待。",
          type: "info"
        });
      }
    },
    callPassed() {
      if (this.userReservation.regNo < this.userReservation.callNo) {
        this.$notify({
          title: "就诊提示",
          message:
            "很抱歉，您的号已经过了，请重新挂号或联系管理员，电话为15868154079",
          type: "warning"
        });
      }
    },
    nextPatient() {
      this.stompClient.send("/app/nextPatient", {}, this.userReservationId); //用户加入接口
    },
    pushClinicState() {
      let value = {
        userReservationId: this.userReservationId,
        token: localStorage.getItem("token")
      };
      this.stompClient.send("/app/pushClinicState", {}, JSON.stringify(value));
    },
    connect() {
      // let socket = new SockJS("http://localhost:8080/myWebSocket");
      let socket = new SockJS("https://www.woniuyiliao.cn/api/myWebSocket");
      let headers = {
        Authorization: localStorage.getItem("token")
      };
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        headers,
        frame => {
          this.stompClient.subscribe(
            "/topic/userReservation",
            msg => {
              let o = JSON.parse(msg.body);
              this.userReservation.callNo = o.callNo;
              this.isCall();
              this.callWaited();
              this.callPassed();
            },
            {}
          );
        },
        err => {
          // 连接发生错误时的处理函数
          console.log("失败");
          console.log(err);
        }
      );
    },
    isUserReservationIdExist() {
      if (this.userReservationId == null) {
        this.$router.push("netTreatRoom");
        this.$message({
          message: "请先选择专科科室或专家医生",
          type: "warning",
          duration: 2000
        });
      }
    }
  },
  created() {
    this.isUserReservationIdExist();
    this.connect();
  },
  destroyed() {
    this.stompClient.disconnect();
  },
  mounted() {
    this.$nextTick(function generate() {
      this.getUserReservationDetail();
      this.$store.state.treatmentProcessStore.active = 3;
    });
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  left: 30%;
  top: 20%;
  color: #a71820;
  font-size: 28px;
  font-weight: 700;
}
.detail {
  position: absolute;
  left: 30%;
  top: 45%;
  color: #a71820;
}
.button {
  position: absolute;
  left: 30%;
  top: 65%;
}
.el-icon-success {
  width: 50px;
  font-size: 50px;
  color: #a71820;
}
.detailClass {
  display: inline-block;
  width: 50%;
}
.detailClass span {
  margin-left: 5%;
}
.lineClass {
  margin-bottom: 50px;
}
</style>


