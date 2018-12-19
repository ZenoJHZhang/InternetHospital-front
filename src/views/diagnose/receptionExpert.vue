<template>
  <div>
    <el-container>
      <el-header style="height:205px;padding:0px">
        <div class="headerImg"></div>
      </el-header>
      <el-container
        style="backgroundColor:#eeeeee;padding-top:20px;padding-left:12%;padding-right:12%;height:100%;padding-bottom:50px"
      >
        <el-main style="height:100%;" width="70%">
          <el-container>
            <el-header
              style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:10px;"
            >
              <treatment-process style="padding:10px"></treatment-process>
            </el-header>
            <el-footer style="backgroundColor:white;width:100%;height:100%;padding:20px">
             <expert-appointment></expert-appointment>
            </el-footer>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import expertAppointment from "@/components/diagnose/expertAppointment";
export default {
  components: {
    treatmentProcess,
    expertAppointment
  },
  mounted(){
     this.$store.state.treatmentProcessStore.active = 0;
  }
};
</script>

<style scoped>
.headerImg {
  background: url("../../assets/expertAppointment.png") center;
  height: 100%;
  background-size: cover;
}

</style>
