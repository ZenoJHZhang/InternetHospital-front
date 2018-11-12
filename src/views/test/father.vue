<!--父组件中引入子组件-->
<template>
  <div>
    <a href="javascript:;" @click="$store.state.father.show = true,$store.state.father.text = 'hhhh'">点击</a>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
import dialog from './son.vue'
export default {
  components:{
    "t-dialog":dialog
  }
}
</script>