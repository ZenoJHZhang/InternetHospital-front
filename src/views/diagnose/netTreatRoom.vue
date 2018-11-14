<template>
<div>
    <el-container>
        <el-header height='380px' style="padding:0">
            <el-carousel height="350px" indicator-position="outside">
                <el-carousel-item v-for="img in imgs" :key="img.key">
                    <img :src="img.path">
                </el-carousel-item>
            </el-carousel>
        </el-header>
        <el-container style="backgroundColor:#eeeeee;padding-top:20px;padding-left:16%;padding-right:16%">
            <el-aside style="height:1000px;" width='840px'>
                <el-container>
                    <el-header style="backgroundColor:white;width:840px;margin-bottom:20px" height='140px'>
                        <treatment-process></treatment-process>
                    </el-header>
                    <el-main style="backgroundColor:white;width:840px;height:330px">
                        <consultation-department></consultation-department>
                    </el-main>
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
      consultationDepartment
  },
  methods: {}
};
</script>

<style scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

</style>
