<template>
  <div>
    <el-container style="padding:0">
      <el-main
        style="backgroundColor:#eeeeee;padding-left:15%;padding-right:15%;padding-top:50px;min-height:calc(100vh - 81px)"
      >
        <el-container>
          <el-header
            style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:20px;"
          >
            <treatment-process style="padding:10px"></treatment-process>
          </el-header>
          <el-main
            style="backgroundColor:white;width:100%;height:100%;padding:20px;padding-top:100px"
          >
            <el-container style="padding-left:30%;">
              <el-aside style="padding-top:30px;width:100px">
                <i class="el-icon-warning"></i>
              </el-aside>
              <el-container style="padding-bottom:0px;">
                <el-main>
                  <div style="font-size:30px;font-weight:700">已过号</div>
                </el-main>
                <el-footer height="50px">很抱歉，您已过号，请重新预约或联系管理员。</el-footer>
              </el-container>
            </el-container>
          </el-main>
          <el-footer
            style="backgroundColor:white;width:100%;height:100%;
            padding:20px;padding-top:50px;text-align:center;padding-bottom:100px"
          >
            <el-button style="margin-right:50px" @click="dialogVisible = true">联系管理员</el-button>
            <el-button @click="applyRefundVisible = true">申请退款</el-button>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog title="请联系我" :visible.sync="dialogVisible" width="30%">
      <div style="margin-left:10%">
        <a
          target="_blank"
          href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=6tPS2dvc39zf2Kqbm8SJhYc"
          style="text-decoration:none;"
        >
          <img
            src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_mailme_02.png"
          >
        </a>
      </div>
      <div style="margin-top:20px;margin-left:10%;font-weight:600">将在两小时之内回复，感谢您的谅解。</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="applyRefundVisible" title="提示" width="30%">
      <div
        style="margin-left:10px;margin-bottom:10px;color:red;font-weight:700"
      >最大退款金额: ￥{{userReservation.clinicPrice}}</div>
      <el-form ref="form" :inline="true" :model="form" :rules="rules">
        <el-form-item label="请填写申请退款原因" prop="reason">
          <el-input
            v-model="form.reason"
            placeholder="申请退款原因"
            type="textarea"
            :autosize="{ minRows: 2}"
          />
        </el-form-item>
        <br>
        <el-form-item label="请填写申请退款金额" prop="refundAmount">
          <el-input v-model="form.refundAmount" placeholder="申请退款金额"/>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button @click="applyRefundVisible = false">取 消</el-button>
          <el-button type="primary" @click="applyRefund('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import axion from "@/utils/http_url";
export default {
  data() {
    return {
      userReservationId: "",
      userReservation: {},
      stompClient: "",
      dialogVisible: false,
      userReservationUuId: "",
      reason: "",
      refundAmount: 0,
      applyRefundVisible: false,
      form: {},
      rules: {
        reason: [
          { required: true, message: "请填写申请退款原因", trigger: "blur" }
        ],
        refundAmount: [
          { required: true, message: "请填写申请退款金额", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    treatmentProcess
  },
  methods: {
    connectAdmin() {},
    getUserReservationDetail() {
      this.userReservationUuId = sessionStorage.getItem("userReservationUuId");
      axion
        .getUserReservationDetail(this.userReservationUuId)
        .then(response => {
          if (response != null) {
            this.userReservation = response.data.returnData;
          }
        });
    },
    applyRefund(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 正数
          const reg = /^([1-9][0-9]*(\.\d{1,2})?)|(0\.\d{1,2})$/;
          if (!reg.test(this.form.refundAmount)) {
            this.$message({
              message: "退款金额需大于0",
              type: "error"
            });
          } else if (
            this.form.refundAmount > this.userReservation.clinicPrice
          ) {
            this.$message({
              message: "退款金额不得大于付款金额",
              type: "error"
            });
          } else {
            axion
              .applyRefund({
                userReservationUuId: this.userReservationUuId,
                reason: this.form.reason,
                refundAmount: this.form.refundAmount
              })
              .then(response => {
                if (response != null) {
                  this.applyRefundVisible = false;
                  this.$router.push("/personalCenter")
                  this.$message({
                    message: "申请退款成功，请耐心等待",
                    type: "success"
                  });
                }
              });
          }
        } else {
          return false;
        }
      });
    }
  },
  created() {},
  destroyed() {},
  mounted() {
    this.$nextTick(function generate() {
      this.getUserReservationDetail();
      this.$store.state.treatmentProcessStore.active = 4;
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
.el-icon-warning {
  width: 50px;
  font-size: 50px;
  color: #e08e13;
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


