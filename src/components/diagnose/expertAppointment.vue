<template>
<div>
    <div class="title-line">专家预约</div>
    <el-form ref="treatRoomForm">
        <el-form-item>
            <label class="titleLabel">科室筛选</label>
                <el-radio-group v-model="expertreatRoomNameRadio" v-for="room in expertreatRoom" :key="room.id" size="medium">
                    <el-radio-button :label="room.departmentName"></el-radio-button>
                </el-radio-group>
        </el-form-item>
        <el-form-item>
            <label class="titleLabel">就诊日期</label>
                <el-radio-group v-model="expertreatRoomDateRadio" v-for="t in 5" :key="t" size="medium">
                    <el-radio-button :label="month+'月'+(strDate+t-1)+'日'"></el-radio-button>
                </el-radio-group>
        </el-form-item>
        <el-form-item>
            <label class="titleLabel">就诊时段</label>
                <el-radio-group v-model="expertreatRoomTimeRadio" size="medium">
                    <el-radio-button label="上午"></el-radio-button>
                    <el-radio-button label="下午"></el-radio-button>
                    <el-radio-button label="晚上"></el-radio-button>
                </el-radio-group>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      strDate: "",
      month: "",
      expertreatRoomNameRadio: "示例专家科室",
      expertreatRoomDateRadio: "11月15日",
      expertreatRoomTimeRadio: "上午",
      expertreatRoom: [
        {
          id: 1,
          departmentName: "示例专家科室",
          date: "11月15日",
          time: "上午"
        },
        {
          id: 2,
          departmentName: "外科专家科室",
          date: "11月16日",
          time: "上午/下午"
        },
        {
          id: 3,
          departmentName: "内科专家科室",
          date: "11月15日",
          time: "全天"
        }
      ]
    };
  },
  methods: {
    getDateFormat() {
      var date = new Date();
      var seperator1 = "-";
      this.month = date.getMonth() + 1;
      this.strDate = date.getDate();
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getDateFormat();
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
.titleLabel {
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
</style>
