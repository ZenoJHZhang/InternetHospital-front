<template>
<div>
    <el-container>
        <el-header height='18vmax' style="padding:0">
            <el-carousel height="18vmax">
                <el-carousel-item v-for="img in imgs" :key="img.key">
                    <img :src="img.path">
                </el-carousel-item>
            </el-carousel>
        </el-header>
        <el-container style="backgroundColor:#eeeeee;padding-top:20px;padding-left:12%;padding-right:12%;height:100%;padding-bottom:50px">
            <el-aside style="height:100%;" width='70%'>
                <el-container>
                    <el-header style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:10px;">
                        <treatment-process style="padding:10px"></treatment-process>
                    </el-header>
                    <el-main style="backgroundColor:white;width:100%;height:330px;margin-bottom:20px">
                        <consultation-department></consultation-department>
                    </el-main>
                    <el-footer style="backgroundColor:white;width:100%;height:100%;padding:20px">
                        <expert-appointment></expert-appointment>
                    </el-footer>
                </el-container>
            </el-aside>
            <el-main style="backgroundColor:white;margin-left:15px;height:50%">
                <help-center></help-center>
            </el-main>
        </el-container>
    </el-container>
    <el-footer style="height:200px;backgroundColor:#a33238"></el-footer>
</div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import consultationDepartment from "@/components/diagnose/consultationDepartment";
import expertAppointment from "@/components/diagnose/expertAppointment";
import helpCenter from "@/components/diagnose/helpCenter";
export default {
  data() {
    return {
      imgs: [
        { path: require("@/assets/diagnose/default_carousel_picture.png") },
        { path: require("@/assets/diagnose/96ddbddd-cdd7-40b4-a0ca-a57504885a01.png") }
      ]
    };
  },
  components: {
    treatmentProcess,
    consultationDepartment,
    expertAppointment,
    helpCenter
  },
  methods: {},
  mounted() {
    this.$store.state.treatmentProcessStore.active = 0;
  }
};
</script>

<style scoped>
img {
  width: 100vw;
}
</style>
