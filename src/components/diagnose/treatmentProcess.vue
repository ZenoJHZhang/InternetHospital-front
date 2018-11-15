<template>
<div>
    <div class="title-line">就诊流程</div>
    <el-steps :active="active" align-center>
        <el-step title="选择科室医生" icon="fas fa-user-md fa-2x"></el-step>
        <el-step title="填写问诊信息" icon="fas fa-pencil-alt fa-2x"></el-step>
        <el-step title="支付挂号费用" icon="fab fa-alipay fa-2x"></el-step>
        <el-step title="等待医生叫号" icon="fas fa-bell fa-2x"></el-step>      
        <el-step title="问诊结束" icon="fas fa-hand-holding-heart fa-2x"></el-step>       
        <el-step title="查看问诊信息" icon="fas fa-notes-medical fa-2x"></el-step>            
    </el-steps>
 </div>
</template>

<script>
export default {
  data() {
    return {
        active:this.$store.state.treatmentProcess.active
    };
  }
};
</script>

<style scoped>
.title-line {
  border-bottom: 1px solid #e5e5e5;
  height: 40px;
  line-height: 40px;
  color: #a71820;
  font-size: 1;
  font-family: "microsoft yahei";
  font-weight: 700;
  margin-bottom: 20px;
}

.icon {
    width: 0.3em;
    height: 0.3em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>

