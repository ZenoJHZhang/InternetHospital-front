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
            <el-container style="padding-left:35%">
              <el-aside style="padding-top:30px;width:100px">
                <i class="el-icon-success"></i>
              </el-aside>
              <el-container style="padding-bottom:0px">
                <el-main>
                  <div style="font-size:30px;font-weight:700">挂号成功</div>
                </el-main>
                <el-footer height="50px">开始叫号后，会有短信通知，请保持手机通讯畅通</el-footer>
              </el-container>
            </el-container>
          </el-main>
          <el-footer
            height="100%"
            style="backgroundColor:white;width:100%;padding:20px;padding-top:0"
          >
            <div class="vidioDiv">
              <img src="@/assets/vidioOpen.jpg" style="width:90%">
              <span class="title">视频就诊</span>
              <span class="detail">收到短信后，请点击视频就诊按钮，打开视频，进行就诊。</span>
              <span class="button">
                <el-button type="primary">视频就诊</el-button>
              </span>
            </div>
          </el-footer>
        </el-container>
        <el-container
          style="backgroundColor:white;width:100%;height:250px;padding:20px;padding-left:20%;padding-right:20%"
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
                  <label style="color:black">当前叫号：</label>
                  <span style="color: #fe9e20;">{{userReservation.callNo}}</span>
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
      <el-button @click="pushClinicState()">下一个</el-button>
    </el-container>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
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
    treatmentProcess
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
              this.callPassed();
            }
          });
      }
    },
        isCall(){
      if (this.userReservation.regNo > this.userReservation.callNo) {
        this.$notify({
          title: "就诊提示",
          message:
           "感谢您的耐心等待，已经轮到您就诊，请点击视频就诊按钮，及时就诊。",
          type: "success"
        });
      }
    },
    callWaited(){
      if (this.userReservation.regNo > this.userReservation.callNo) {
        this.$notify({
          title: "就诊提示",
          message:
            "您的号为"+this.userReservation.regNo+","+现在叫到+this.userReservation.callNo+",请耐心等待。",
          type: "warning"
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
      this.stompClient.send(
        "/app/nextPatient",
        {},
        sessionStorage.getItem("userReservationId")
      ); //用户加入接口
    },
    pushClinicState() {
      let value = {
        userReservationId: sessionStorage.getItem("userReservationId"),
        token: localStorage.getItem("token")
      };
      this.stompClient.send("/app/pushClinicState", {}, JSON.stringify(value));
    },
    connect() {
      let socket = new SockJS("http://localhost:8080/myWebSocket");
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
              o.forEach(e => {
                if (e.id == sessionStorage.getItem("userReservationId")) {
                  this.userReservation.callNo = e.callNo;
                  this.isCall();
                  this.callWaited();
                  this.callPassed();
                }
              });
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
    }
  },
  created() {
    this.connect();
  },
  mounted() {
    this.$nextTick(function generate() {
      this.$store.state.treatmentProcessStore.active = 3;
      this.getUserReservationDetail();
    });
  }
};
</script>

<style scoped>
.vidioDiv {
  text-align: center;
  position: relative;
}
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


