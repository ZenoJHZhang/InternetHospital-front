<template>
  <div>
    <el-container style="padding:0">
      <el-header style="height:100%;padding:0px">
        <img src="@/assets/specialistClinic.png">
      </el-header>
      <el-main style="backgroundColor:#eeeeee;padding-left:15%;padding-right:15%;padding-top:50px">
        <el-container>
          <el-header
            style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:20px;"
          >
            <treatment-process style="padding:10px"></treatment-process>
          </el-header>
          <el-main style="backgroundColor:white;width:100%;height:100%;padding:20px;">
            <div class="title-line">问诊信息</div>
            <div class="reservationStyle">
              <div>
                <span>
                  <label style="color:black">科室：</label>
                  <span>{{treatmentInformation.departmentName}}</span>
                </span>
                <span v-if="isExpert">
                  <label style="color:black">医生：</label>
                  <span>{{treatmentInformation.doctorName}}</span>
                </span>
                <span v-if="isExpert">
                  <label style="color:black">擅长：</label>
                  <span>{{treatmentInformation.goodat}}</span>
                </span>
              </div>
              <div>
                <label>挂号费：</label>
                <span>￥{{treatmentInformation.price}}</span>
              </div>
              <div>
                <label>时间：</label>
                <span>{{treatmentInformation.scheduleTime}}</span>
              </div>
              <el-form ref="userReservation" :rules="treatmentInformationRules">
                <label>就诊时段：</label>
                <span>{{treatmentInformation.timeInterval}}</span>
              </el-form>
            </div>
          </el-main>
          <el-footer style="backgroundColor:white;width:100%;height:100%;padding:20px;">
            <div class="title-line">个人信息</div>
            <el-form
              ref="userReservation"
              :model="userReservation"
              label-width="100px"
              label-position="left"
              style="margin-left:20px;width:80%"
              :rules="treatmentInformationRules"
            >
              <el-form-item label="姓名:" prop="patientId">
                <el-select
                  v-model="userReservation.patientId"
                  placeholder="请选择就诊人"
                  style="width:25%"
                  @change="wantInsertPatinet(userReservation.patientId)"
                >
                  <el-option
                    v-for="item in beChoicedPatient"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.name }}</span>
                  </el-option>
                </el-select>
                <el-button type="primary" style="margin-left:12%" v-if="insertPatinetVisiable">添加就诊人</el-button>
              </el-form-item>
              <el-form-item label="初/复诊:" prop="accentVisit">
                <el-radio v-model="userReservation.accentVisit" label="初诊"></el-radio>
                <el-radio v-model="userReservation.accentVisit" label="复诊"></el-radio>
              </el-form-item>
              <el-form-item label="疾病描述:" prop="accentDetail">
                <el-input
                  type="textarea"
                  :rows="5"
                  style="width:100%"
                  placeholder="请详细描述疾病、症状、发病时间、已服用的药物……"
                  v-model="userReservation.accentDetail"
                ></el-input>
              </el-form-item>
              <el-form-item label="病情图片：">
                <el-upload
                  action="http://47.100.241.49:8080/userReservation/insertReservationImg"
                  list-type="picture-card"
                  :before-upload="beforeImgUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item style="text-align:center ">
                <el-button type="info">上一步</el-button>
                <el-button type="primary" @click="insertUserReservation()">提交申请</el-button>
              </el-form-item>
            </el-form>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
export default {
  data() {
    return {
      treatmentInformation: {},
      userReservation: {
        accentVisit: "初诊"
      },
      /**选择就诊人 */
      beChoicedPatient: [
        {
          id: 1,
          name: "ZJH"
        },
        {
          id: 2,
          name: "ZJH2"
        },
        {
          id: 0,
          name: "需要添加就诊人"
        }
      ],
      isExpert: "",
      timeSelected: "",
      insertPatinetVisiable: false,
      treatmentInformationRules: {
        patientId: [
          { required: true, message: "请选择就诊人", trigger: "change" }
        ],
        accentVisit: [
          { required: true, message: "请填写疾病描述", trigger: "blur" }
        ],
        accentDetail: [
          { required: true, message: "请填写疾病描述", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    treatmentProcess
  },
  methods: {
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    wantInsertPatinet(id) {
      if (id == 0) {
        this.insertPatinetVisiable = true;
      } else {
        this.insertPatinetVisiable = false;
      }
    },
    insertUserReservation() {
      this.$refs.userReservation.validate(valid => {
        if (valid) {
          this.userReservation.doctorId = this.treatmentInformation.doctorId;
          this.userReservation.doctorName = this.treatmentInformation.doctorName;
          this.userReservation.departmentId = this.treatmentInformation.departmentId;
          this.userReservation.departmentName = this.treatmentInformation.departmentName;
          this.userReservation.deptType = this.treatmentInformation.deptType;
          this.userReservation.hospitalId = this.treatmentInformation.hospitalId;
          this.userReservation.price = this.treatmentInformation.price;
          this.userReservation.scheduleDoctorId = this.treatmentInformation.scheduleDoctorId;
          this.userReservation.scheduleTime = this.treatmentInformation.scheduleTime;
          this.userReservation.timeInterval = this.treatmentInformation.timeInterval;
          console.log(this.userReservation);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.$store.state.treatmentProcessStore.active = 1;
      this.treatmentInformation = JSON.parse(
        sessionStorage.getItem("treatmentInformation")
      );
      if (this.treatmentInformation == null) {
        this.$router.push("netTreatRoom");
      }
    });
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
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
span {
  color: #a1a1a1;
  margin-right: 8%;
}
.reservationStyle {
  margin-left: 20px;
  margin-top: 30px;
  font-size: 15px;
}
.reservationStyle div {
  margin-bottom: 20px;
}
</style>

