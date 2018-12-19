<template>
  <div id="content">
    <vue-waterfall-easy
      :height="600"
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
  methods: {
    initImgsArr(n, m) {
      //初始化图片数组的方法，把要加载的图片装入
      var arr = [];
      for (var i = n; i < m; i++) {
        arr.push({
          id: i,
          src: `http://47.100.241.49/image/department/ff74c676-984e-4c7c-972f-28b94a3be1bb.png`,
          link: "https:/",
        });

        //src为加载的图片的地址、link为超链接的链接地址、
        //info为自定义的图片展示信息，请根据自己的情况自行填写
      }
      return arr;
    },
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        console.log("img clicked", index, value);
      }
    }
  },
  mounted() {
    this.imgsArr = this.initImgsArr(0, 100); //初始化第一次（即页面加载完毕时）要加载的图片数据
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
}
.img-wraper {
  width: 100%;
  background: yellow;
}
.vue-waterfall-easy-container .vue-waterfall-easy-scroll {
  overflow-y: auto !important;
}
</style>

