<template>
  <div id="content">
    <vue-waterfall-easy
      :height="400"
      :maxCols="3"
      :gap="50"
      :imgWidth="200"
      :loadingDotCount="0"
      :imgsArr="imgsArr"
      @click="clickFn"
    ></vue-waterfall-easy>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
import axion from "@/utils/http_url";
export default {
  components: {
    vueWaterfallEasy
  },
  name: "userReservationImgWaterFall",
  data() {
    return {
      imgsArr: []
    };
  },
  props: {
    userReservationId:Number
  },
  methods: {
    initImgsArr() {
      //初始化图片数组的方法，把要加载的图片装入
      let arr = [];
      axion
        .listUserReservationImg(this.userReservationId)
        .then(response => {
          if (response != null) {
            if (response.data.returnData == null) {
              this.$store.state.userReservationStore.isClinicPayDialogVisible = false;
            } else {
              this.$store.state.userReservationStore.isClinicPayDialogVisible = true;
              response.data.returnData.forEach(e => {
                e.src = e.path;
                arr.push(e);
              });
            }
          }
        });
      return arr;
    },
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        window.open(value.src);
      }
    }
  },
  mounted() {
    this.imgsArr = this.initImgsArr(); //初始化第一次（即页面加载完毕时）要加载的图片数据
  }
};
</script>

<style>
#content {
  bottom: 0;
  width: 100%;
}
.vue-waterfall-easy {
  position: relative;
  width: 100%;
}
.img-box {
  display: inline-block;
  width: 30%;
  box-sizing: border-box;
  transition: left 1s, top 1s;
}
.img-inner-box {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.img-wraper {
  width: 100%;
  background: yellow;
}
.vue-waterfall-easy-container .vue-waterfall-easy-scroll {
  overflow-y: auto !important;
}
</style>

