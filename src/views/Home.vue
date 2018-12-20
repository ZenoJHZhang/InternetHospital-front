<template>
  <div>
    <el-container direction="vertical" v-if="!this.$store.state.commonStore.isMobile && !this.$store.state.payStore.isPay">
      <menu-bar></menu-bar>
      <router-view></router-view>
    </el-container>
    <error-token></error-token>
    <img v-if="this.$store.state.commonStore.isMobile && !this.$store.state.payStore.isPay" src="@/assets/app.png" :style="imgWidth">
  </div>
</template>

<script>
import menuBar from "@/components/bar/meunBar";
import errorToken from "@/components/common/errorToken.vue";
export default {
  name: "home",
  data() {
    return {
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      imgWidth: {
        height: "auto",
        width: ""
      }
    };
  },
  components: {
    menuBar,
    errorToken
  },
  methods: {
    judgeMobile() {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
        if (this.screenWidth <= 1200) {
          this.$store.state.commonStore.isMobile = true;
          this.imgWidth.width = this.screenWidth + "px";
        } else {
          this.$store.state.commonStore.isMobile = false;
        }
      })();
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.judgeMobile();
      window.onresize = () => {
        this.judgeMobile();
      };
    });
  }
};
</script>




