<template>
  <el-dialog title="提示" :visible.sync="this.$store.state.errorTokenVisible" width="30%" :show-close="false">
    <span>{{this.$store.state.errorTokenMessage}}</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="pageReverse()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    methods:{
        pageReverse(){
            this.$store.state.errorTokenVisible = false;
        }
    }
}
</script>
