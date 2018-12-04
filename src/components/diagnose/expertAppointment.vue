<template>
  <div>
    <div class="title-line">
      专家预约
      <i class="fas fa-hand-point-right" style="float:right;" v-if="this.$store.state.commonStore.isComponent"><span style="margin-left:5px" >查看详情</span></i>
    </div>
    <el-form ref="treatRoomForm">
      <el-form-item>
        <label class="title-label">科室筛选</label>
        <el-radio-group
          v-model="expertreatRoomNameRadio"
          v-for="room in expertreatRooms"
          :key="room.id"
          size="medium"
          @change="listExpertDoctor()"
        >
          <el-radio-button :label="room.departmentName"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <label class="title-label">就诊日期</label>
        <el-radio-group
          v-model="expertreatRoomDateRadio"
          v-for="t in dateList"
          :key="t.value"
          size="medium"
          @change="listExpertDoctor()"
        >
          <el-radio-button :label="t.value"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <label class="title-label">就诊时段</label>
        <el-radio-group
          v-model="expertreatRoomTimeRadio"
          size="medium"
          @change="listExpertDoctor()"
        >
          <el-radio-button label="上午"></el-radio-button>
          <el-radio-button label="下午"></el-radio-button>
          <el-radio-button label="晚上"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <no-comment v-if="!this.isExpertDoctor" style="height:220px;margin-top:80px"></no-comment>
      <el-form-item v-if="this.isExpertDoctor">
        <li class="expertLi" v-for="t in scheduleDoctors" :key="t.id">
          <img class="expertImg" :src="require('@/assets/diagnose/'+t.doctorDto.imgPath)">
          <div class="expertName">
            <span>{{t.doctorDto.doctorName}}</span>
          </div>
          <div class="expertMajor">{{t.doctorDto.goodat}}</div>
          <el-button
            size="small"
            :disabled="!t.timeIntervalNumber>0"
            @click="reservation(t)"
          >预约（{{t.timeIntervalNumber}}个号源）</el-button>
        </li>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import noComment from "@/components/common/noComment";
import axion from "@/utils/http_url";
import dateUtil from "@/utils/dateUtil";
export default {
  data() {
    return {
      expertreatRoomNameRadio: "",
      expertreatRoomDateRadio: "",
      expertreatRoomTimeRadio: "上午",
      expertreatRooms: "",
      scheduleDoctors: "",
      pageNo: 1,
      pageSize: 5,
      isExpertDoctor: true,
      treatmentInformation: {
      },
      dateList: []
    };
  },
  methods: {
    listExpertDepartment() {
      axion.listExpertDepartment().then(response => {
        if (response != null) {
          this.expertreatRooms = response.data.returnData;
          this.expertreatRoomNameRadio =
            response.data.returnData[0].departmentName;
          axion
            .listExpertDoctor(
              response.data.returnData[0].departmentName,
              this.expertreatRoomDateRadio,
              this.expertreatRoomTimeRadio,
              this.pageNo,
              this.pageSize
            )
            .then(response => {
              if (response != null) {
                this.scheduleDoctors = response.data.returnData.list;
                if (response.data.returnData.list.length > 0) {
                  this.isExpertDoctor = true;
                } else {
                  this.isExpertDoctor = false;
                }
              }
            });
        }
      });
    },
    getDateFormat() {
      this.expertreatRoomDateRadio = dateUtil.getDay(1, "-");
      for (let i = 0; i < 5; i++) {
        let date = dateUtil.getDay(i + 1, "-");
        this.dateList.push({
          value: date
        });
      }
    },
    reservation(treatRoom) {
      if (localStorage.getItem("token") == null) {
        this.$router.push("/");
        this.$message({
          message: "请登录！",
          type: "error",
          duration: 1000
        });
      } else {
        this.treatmentInformation.departmentName =
          treatRoom.department.departmentName;
        this.treatmentInformation.departmentId = treatRoom.department.id;
        this.treatmentInformation.price = treatRoom.department.price;
        this.treatmentInformation.deptType = treatRoom.department.deptType;
        this.treatmentInformation.scheduleTime = treatRoom.scheduleTime;
        this.treatmentInformation.morningHas = treatRoom.doctorMorningHas;
        this.treatmentInformation.afternoonHas = treatRoom.doctorAfternoonHas;
        this.treatmentInformation.nightHas = treatRoom.doctorNightHas;
        this.treatmentInformation.doctorId = treatRoom.doctorDto.id;
        this.treatmentInformation.doctorName = treatRoom.doctorDto.doctorName;
        this.treatmentInformation.goodat = treatRoom.doctorDto.goodat;
        this.treatmentInformation.timeInterval = this.expertreatRoomTimeRadio;
        this.treatmentInformation.scheduleDoctorId = treatRoom.id;
        this.treatmentInformation.hospitalId = treatRoom.doctorDto.hospitalId;
        this.treatmentInformation.userReservationType = 3;
        sessionStorage.setItem(
          "treatmentInformation",
          JSON.stringify(this.treatmentInformation)
        );
        this.$router.push("reservationData");
      }
    },
    listExpertDoctor() {
      axion
        .listExpertDoctor(
          this.expertreatRoomNameRadio,
          this.expertreatRoomDateRadio,
          this.expertreatRoomTimeRadio,
          this.pageNo,
          this.pageSize
        )
        .then(response => {
          if (response != null) {
            this.scheduleDoctors = response.data.returnData.list;
            if (response.data.returnData.list.length > 0) {
              this.isExpertDoctor = true;
            } else {
              this.isExpertDoctor = false;
            }
          }
        });
    }
  },
  mounted() {
    this.$nextTick(function getDate() {
      this.getDateFormat();
      this.listExpertDepartment();
    });
  },
  components: {
    noComment
  },
  computed: {}
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
.title-label {
  color: #ada0a5;
  font-size: 15px;
  width: 10%;
  padding-right: 5%;
  font-weight: 600;
  border-right: 2px solid #ada0a5;
  margin-right: 3%;
}
.el-radio-group {
  margin-left: 2%;
}
.el-radio-button__inner {
  border: none;
}
.expertImg {
  width: 60%;
}
.expertLi {
  margin-top: 15px;
  width: 180px;
  text-align: center;
  list-style-type: none;
  float: left;
}
.expertName span {
  display: inline-block;
  border-bottom: 1px solid #a71820;
}
.expertName {
  color: #a71820;
  height: 40px;
}
.expertDepartment {
  font-size: 14px;
  height: 30px;
}
.expertMajor {
  color: #999;
  font-size: 12px;
  height: 20px;
  line-height: 18px;
  margin: 8px 0 10px;
}
</style>
