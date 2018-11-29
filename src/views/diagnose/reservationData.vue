<template>
  <div>
    <el-container style="padding:0">
      <el-header style="height:100%;padding:0px">
        <img src="@/assets/diagnose/specialistClinic.png">
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
              <div>
                <label>就诊时段：</label>
                <el-select
                  v-model="timeSelected"
                  placeholder="请选择就诊时段"
                  v-if="!isExpert"
                  style="margin-left:10px"
                >
                  <el-option
                    v-for="item in timeHas"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span v-if="isExpert">{{treatmentInformation.timeInterval}}</span>
              </div>
            </div>
          </el-main>
          <el-footer style="backgroundColor:white;width:100%;height:100%;padding:20px;">
            <div class="title-line">个人信息</div>
            <el-form
              ref="patientInformationForm"
              :model="patientInformationForm"
              label-width="100px"
              label-position="left"
              style="margin-left:20px;width:80%"
            >
              <el-form-item label="姓名:">
                <el-select
                  v-model="patintSelectValue"
                  placeholder="请选择就诊人"
                  style="width:25%"
                  @change="wantInsertPatinet(patintSelectValue)"
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
              <el-form-item label="初/复诊:">
                <el-radio v-model="patientInformationForm.accentVisit" label="初诊"></el-radio>
                <el-radio v-model="patientInformationForm.accentVisit" label="复诊"></el-radio>
              </el-form-item>
              <el-form-item label="疾病描述:">
                <el-input
                  type="textarea"
                  :rows="5"
                  style="width:100%"
                  placeholder="请详细描述疾病、症状、发病时间、已服用的药物……"
                  v-model="patientInformationForm.accentDetail"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-upload
                  action="http://localhost:8080/userReservation/insertReservationImg"
                  
                  list-type="picture-card"
                  :before-upload="beforeImgUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item style="text-align:center ">
                <el-button type="info">上一步</el-button>
                <el-button type="primary">提交申请</el-button>
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
      patientInformationForm: {
        patientName: "",
        accentVisit: "初诊",
        IdCard: "",
        phone: "",
        accentDetail: ""
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
      patintSelectValue: "",
      isExpert: "",
      timeSelected: "",
      timeHas: [],
      insertPatinetVisiable: false
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
    insertReservationimg(file) {
      console.log(file);
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.$store.state.treatmentProcessStore.active = 1;
      this.treatmentInformation = JSON.parse(sessionStorage.getItem('treatmentInformation'));
      if (this.treatmentInformation == null) {
        this.$router.push("netTreatRoom");
      }
      if (this.treatmentInformation.deptType == 0) {
        this.isExpert = false;
        if (this.treatmentInformation.morningHas == 1) {
          this.timeHas.push({
            value: "早上"
          });
        }
        if (this.treatmentInformation.afternoonHas == 1) {
          this.timeHas.push({
            value: "下午"
          });
        }
        if (this.treatmentInformation.nightHas == 1) {
          this.timeHas.push({
            value: "晚上"
          });
        }
      }
      if (this.treatmentInformation.deptType == 1) {
        this.isExpert = true;
        this.timeHas.push({
          value: this.treatmentInformation.timeInterval
        });
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

