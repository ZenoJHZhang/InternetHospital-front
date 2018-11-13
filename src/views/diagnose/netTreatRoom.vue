<template>
    <el-container>
        <el-aside>
            <el-steps :active="1">
                <el-step title="选择科室医生" icon="fas fa-user-md fa-2x"></el-step>
                <el-step title="填写问诊信息" icon="fas fa-pencil-alt fa-2x"></el-step>
                <el-step title="支付挂号费用" icon="far fa-sticky-note fa-2x"></el-step>
            </el-steps>
        </el-aside>
    </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
