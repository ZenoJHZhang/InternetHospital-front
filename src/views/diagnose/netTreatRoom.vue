<template>
  <div class="container" >
     <el-row :height = screenHeight>
       <el-col style="backgroundColor: black;">sdsdd</el-col>
     </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      screenHeight: document.documentElement.clientHeight - 81
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

<style scoped>
</style>

