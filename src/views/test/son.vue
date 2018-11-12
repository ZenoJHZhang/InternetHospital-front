<!--子组件-->
<template>
  <el-dialog :visible.sync="$store.state.father.show">{{$store.state.father.text}}</el-dialog>
</template>

<script>
export default {}
</script>