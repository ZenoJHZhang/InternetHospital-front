<template>
  <div id="payPwd">
    <div style="text-align: center;margin-bottom:100px;margin-top:50px;font-weight:600">请输入支付密码</div>
    <input
      ref="pwd"
      type="password"
      maxlength="6"
      v-model="msg"
      style="position: absolute;z-index: -1;left:-100%;opacity: 0;"
    >
    <ul class="pwd-wrap" @click="focus">
      <li>
        <i v-if="msgLength > 0"></i>
      </li>
      <li>
        <i v-if="msgLength > 1"></i>
      </li>
      <li>
        <i v-if="msgLength > 2"></i>
      </li>
      <li>
        <i v-if="msgLength > 3"></i>
      </li>
      <li>
        <i v-if="msgLength > 4"></i>
      </li>
      <li>
        <i v-if="msgLength > 5"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      msgLength: 0,
      id:""
    };
  },
  watch: {
    msg(curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.msg = this.msg.replace(/[^\d]/g, "");
      } else {
        this.msgLength = curVal.length;
        if (this.msgLength == 6) {
          this.$store.state.payStore.isClinicPayDialogVisible = false;
          this.$router.push("reservationResult");
          this.$notify({
            title: "支 付 成 功",
            message: "谢谢",
            type: "success"
          });
        }
      }
    }
  },
  methods: {
    focus() {
      this.$refs.pwd.focus();
    }
  }
};
</script>
<style scoped >
html,
body {
  width: 100%;
  height: 100%;
  background: #fbf9fe;
}
#payPwd .pwd-wrap {
  width: 90%;
  height: 44px;
  padding-bottom: 1px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #ddd;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  cursor: pointer;
}
.pwd-wrap li {
  list-style-type: none;
  text-align: center;
  line-height: 44px;
  -webkit-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  border-right: 1px solid #ddd;
}
.pwd-wrap li:last-child {
  border-right: 0;
}
.pwd-wrap li i {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #000;
  display: inline-block;
}
</style>