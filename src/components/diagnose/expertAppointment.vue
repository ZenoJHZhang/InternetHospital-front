<template>
<div>
    <div class="title-line">专家预约<i class="fas fa-hand-point-right" style="float:right;">更多</i></div>
    <el-form ref="treatRoomForm">
        <el-form-item>
            <label class="title-label">科室筛选</label>
            <el-radio-group v-model="expertreatRoomNameRadio" v-for="room in expertreatRoom" :key="room.id" size="medium">
                <el-radio-button :label="room.departmentName"></el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <label class="title-label">就诊日期</label>
            <el-radio-group v-model="expertreatRoomDateRadio" v-for="t in 5" :key="t" size="medium">
                <el-radio-button :label="month+'月'+(strDate+t)+'日'"></el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <label class="title-label">就诊时段</label>
            <el-radio-group v-model="expertreatRoomTimeRadio" size="medium">
                <el-radio-button label="上午"></el-radio-button>
                <el-radio-button label="下午"></el-radio-button>
                <el-radio-button label="晚上"></el-radio-button>
            </el-radio-group>
        </el-form-item>
        <no-comment v-if="!this.$store.state.expertAppointmentStore.isExpert"></no-comment>
        <el-form-item v-if="this.$store.state.expertAppointmentStore.isExpert">
            <li class="expertLi" v-for="expert in experts" :key="expert.id">
              <img class="expertImg" :src='expert.expertImg'>
              <div class="expertName"><span>{{expert.expertName}}</span></div>
              <div class="expertDepartment">{{expert.expertDepartment}}</div>
              <div class="expertMajor">{{expert.expertMajor}}</div>
              <el-button size="small" :disabled="!expert.expertNumber>0" @click="reservation()">预约（{{expert.expertNumber}}个号源）</el-button>
            </li>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import noComment from "../../components/common/noComment";
export default {
  data() {
    return {
      strDate: "",
      month: "",
      expertreatRoomNameRadio: "示例专家科室",
      expertreatRoomDateRadio: "",
      expertreatRoomTimeRadio: "上午",
      expertreatRoom: [
        {
          departmentName: "示例专家科室"
        },
        {
          departmentName: "外科专家科室"
        }
      ],
      experts: [
        {
          id: 1,
          expertName: "ZJH",
          expertDepartment: "示例专家科室",
          expertMajor: "吃",
          expertNumber: 0,
          expertImg: require("../../assets/diagnose/expert.png")
        },
        {
          id: 2,
          expertName: "ZJH",
          expertDepartment: "示例专家科室",
          expertMajor: "吃饭",
          expertNumber: 20,
          expertImg: require("../../assets/diagnose/expert.png")
        },
        {
          id: 3,
          expertName: "ZJH",
          expertDepartment: "示例专家科室",
          expertMajor: "吃饭",
          expertNumber: 50,
          expertImg: require("../../assets/diagnose/expert.png")
        },
        {
          id: 4,
          expertName: "ZJH",
          expertDepartment: "示例专家科室",
          expertMajor: "吃饭",
          expertNumber: 50,
          expertImg: require("../../assets/diagnose/expert.png")
        },
        {
          id: 5,
          expertName: "ZJH",
          expertDepartment: "示例专家科室",
          expertMajor: "吃饭",
          expertNumber: 50,
          expertImg: require("../../assets/diagnose/expert.png")
        },
        {
          id: 6,
          expertName: "ZJH",
          expertDepartment: "示例专家科室",
          expertMajor: "吃饭",
          expertNumber: 50,
          expertImg: require("../../assets/diagnose/expert.png")
        }
      ]
    };
  },
  methods: {
    getDateFormat() {
      var date = new Date();
      this.month = date.getMonth() + 1;
      this.strDate = date.getDate();
      this.expertreatRoomDateRadio =
        this.month + "月" + (this.strDate + 1) + "日";
    },
    isExpertJudge() {
      if (this.experts.length > 0) {
        this.$store.state.expertAppointmentStore.isExpert = true;
      }
    },
    reservation() {
      this.$router.push("/reservationData");
    }
  },
  mounted() {
    this.$nextTick(function getDate() {
      this.getDateFormat();
      this.isExpertJudge();
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
