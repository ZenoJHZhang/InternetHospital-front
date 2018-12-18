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
                    :label="item.realName"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.realName }}</span>
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
                  list-type="picture-card"
                  :before-upload="beforeImgUpload"
                  :http-request="uploadImg"
                  :on-remove="deleteImg"
                  action
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
    <div>{{imgIdMap}}</div>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import axion from "@/utils/http_url.js";
export default {
  data() {
    return {
      treatmentInformation: {},
      userReservation: {
        accentVisit: "初诊"
      },
      /**选择就诊人 */
      beChoicedPatient: [],
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
      },
      imgIdMap: new Map()
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
          this.userReservation.scheduleDepartmentId = this.treatmentInformation.scheduleDepartmentId;
          this.userReservation.scheduleTime = this.treatmentInformation.scheduleTime;
          this.userReservation.timeInterval = this.treatmentInformation.timeInterval;
          this.userReservation.imgIdList = [...this.imgIdMap.values()];
          this.userReservation.type = this.treatmentInformation.type;
          axion.insertUserReservation(this.userReservation).then(response => {
            if (response != null) {
              this.$router.push("reservationResult");
              this.$message({
                message: "提交就诊申请成功",
                type: "success",
                duration: 2000
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    deleteImg(data) {
      let id = this.imgIdMap.get(data.uid);
      this.imgIdMap.delete(data.uid);
      axion
        .deleteUserReservationImg({
          id: id
        })
        .then(response => {
          if (response != null) {
            if (response.data.returnCode == 200) {
              this.$message({
                message: "图片删除成功",
                type: "success",
                duration: 2000
              });
            } else if (response.data.returnCode == 400) {
              this.$message({
                message: "图片删除失败",
                type: "erro",
                duration: 2000
              });
            }
          }
        });
    },
    uploadImg(data) {
      let form = new FormData();
      let uid = data.file.uid;
      form.append("file", data.file);
      axion.insertUserReservationImg(form).then(response => {
        if (response != null) {
          if (response.data.returnCode == 200) {
            let id = response.data.returnData.id;
            this.imgIdMap.set(uid, id);
            this.$message({
              message: "图片上传成功",
              type: "success",
              duration: 2000
            });
          } else if (response.data.returnCode == 400) {
            this.$message({
              message: "图片上传失败",
              type: "erro",
              duration: 2000
            });
          }
        }
      });
    },
    listPatient() {
      axion.listPatient(0, 0).then(response => {
        if (response != null) {
          this.beChoicedPatient = response.data.returnData.list;
          if (response.data.returnData.total == 0) {
            this.insertPatinetVisiable = true;
          } else {
            this.beChoicedPatient.push({
              id: 0,
              realName: "需要添加就诊人"
            });
          }
        }
      });
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      if (localStorage.getItem("token") == null) {
        this.$router.push("/");
        this.$store.commit("remove_token");
        this.$store.state.errorTokenVisible = true;
        this.$store.state.errorTokenMessage = "请登录！";
      } else {
        axion.userAuthorizationTest();
        this.$store.state.treatmentProcessStore.active = 1;
        this.treatmentInformation = JSON.parse(
          sessionStorage.getItem("treatmentInformation")
        );
        if (this.treatmentInformation == null) {
          this.$router.push("netTreatRoom");
          this.$store.state.errorTokenVisible = true;
          this.$store.state.errorTokenMessage = "请先选择专科科室或专家医生！";
        }
      }
      this.listPatient();
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

