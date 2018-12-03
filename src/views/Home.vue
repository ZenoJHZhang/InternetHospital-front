<template>
  <div>
    <div style="text-align:center"  v-if="!isMobile" >
      <el-container direction="vertical">
        <menu-bar></menu-bar>
        <router-view></router-view>
      </el-container>
    </div>
    <div v-if="isMobile">
      <img src="@/assets/index/app.png">
    </div>
  </div>
</template>

<script>
import menuBar from "@/components/bar/meunBar";
export default {
  name: "home",
  data() {
    return {
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      isMobile: true
    };
  },
  components: {
    menuBar
  },
  method: {},
  mounted() {
    this.$nextTick(function generate() {
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          this.screenWidth = window.screenWidth;
          if (this.screenWidth <= 1200) {
            this.isMobile = true;
          } else {
            this.isMobile = false;
          }
        })();
      };
    });
  }
};
</script>
<style scoped>
img{
  width: 100vm;
  height: auto
}
</style>



