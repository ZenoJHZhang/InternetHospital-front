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
        <el-container style="backgroundColor:#eeeeee;padding-top:20px;padding-left:12%;padding-right:12%">
            <el-aside style="height:1050px;" width='70%'>
                <el-container>
                    <el-header style="backgroundColor:white;width:100%;margin-bottom:20px" height='140px'>
                        <treatment-process></treatment-process>
                    </el-header>
                    <el-main style="backgroundColor:white;width:100%;height:330px;margin-bottom:20px">
                        <consultation-department></consultation-department>
                    </el-main>
                    <el-footer style="backgroundColor:white;width:100%;height:540px">
                        <expert-appointment></expert-appointment>
                    </el-footer>
                </el-container>
            </el-aside>
            <el-main style="backgroundColor:white;margin-left:15px"></el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import treatmentProcess from '../../components/diagnose/treatmentProcess'
import consultationDepartment from '../../components/diagnose/consultationDepartment'
import expertAppointment from '../../components/diagnose/expertAppointment'
export default {
  data() {
    return {
        imgs: [
            { path: require("../../assets/diagnose/default_carousel_picture.png") },
            { path: require("../../assets/diagnose/default_carousel_picture.png") }
        ],
    }
  },
  components: {
      treatmentProcess,
      consultationDepartment,
      expertAppointment
  },
  methods: {}
};
</script>

<style scoped>
img{
    width: 100vw ;
}

</style>
