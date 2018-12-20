<template>
  <div>
    <el-container style="padding:0">
      <el-main style="backgroundColor:#eeeeee;padding-left:15%;padding-right:15%;padding-top:50px">
        <el-container>
          <el-header
            style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:20px;"
          >
            <treatment-process style="padding:10px"></treatment-process>
          </el-header>
          <el-main style="backgroundColor:white;width:100%;height:100%;padding:20px;"></el-main>
          <el-footer height="100%" style="backgroundColor:white;width:100%;padding:20px;">
            <div class="vidioDiv">
              <img src="@/assets/vidioOpen.jpg" style="width:90%">
              <span class="title">视频就诊</span>
              <span class="detail">收到短信后，请点击视频就诊按钮，打开视频，进行就诊。</span>
              <span class="button">
                <el-button type="primary">视频就诊</el-button>
              </span>
            </div>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import axion from "@/utils/http_url";
export default {
  data() {
    return {};
  },
  components: {
    treatmentProcess
  },
  mounted() {
    this.$nextTick(function generate() {
      this.$store.state.treatmentProcessStore.active = 3;
    });
  }
};
</script>

<style scoped>
.vidioDiv {
  text-align: center;
  position: relative;
}
.title {
  position: absolute;
  left: 30%;
  top: 20%;
  color: #a71820;
  font-size: 28px;
  font-weight: 700;
}
.detail {
  position: absolute;
  left: 30%;
  top: 45%;
  color: #a71820;
}
.button {
  position: absolute;
  left: 30%;
  top: 65%;
}
</style>


