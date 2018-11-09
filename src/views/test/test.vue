<template>
  <div>
    <el-button @click="test()">This is a test page</el-button>
  </div>
</template>

<script>
import axion from "@/utils/http_url.js"; //接口文件
export default {
  data() {
    return {
    };
  },
  methods: {
    test() {
      axion
        .test({
          name: 'zjh'
        })
        .then(data => {
          console.log(data)
        });
    }
  }
};
</script>