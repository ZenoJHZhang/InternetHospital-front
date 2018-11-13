<template>
<div>
  <el-container>
    <el-main style="" direction='vertical' >
      <div style="position:relative;overflow:hidden">
        <el-carousel :height="screenHeight" autoplay interval='5000' indicator-position='none' arrow='never'>
          <el-carousel-item v-for="img in imgs" :key="img.key">
            <img :src="img.path">
          </el-carousel-item>
        </el-carousel>
        <div class="lrButton">
          <img src="../../assets/sign.png">
          <el-button id="login" type="primary" @click="loginFormVisible = true">登录</el-button>
          <el-button id="register" @click="registerFormVisible = true">注册</el-button>
        </div>
      </div>
    </el-main>
  </el-container>

  <el-dialog title="登录" :visible.sync="loginFormVisible" width="400px" @close="resetForm('loginForm')">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm" label-position="left">
      <el-form-item label="手机号" prop="phone" >
        <el-input v-model="loginForm.phone" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type='password' v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:11.25%">
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
      <el-form-item style="margin-left:7.5%">
        <el-button type="text">未有账号去注册</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog title="注册" :visible.sync="registerFormVisible" width="400px" @close="resetForm('registerForm')">
    <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px" class="demo-ruleForm" label-position="left">
      <el-form-item label="手机号" prop="phone" >
        <el-input v-model="registerForm.phone" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type ='password' v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type ='password' v-model="registerForm.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:11.25%">
        <el-button type="primary">注册</el-button>
      </el-form-item>
      <el-form-item style="margin-left:7.5%">
        <el-button type="text">已有账号去登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>



<script>
export default {
  data() {
    var confirmPasswordRule = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      screenHeight: document.documentElement.clientHeight - 81+'px', //减去header的60px
      imgs: [
        { path: require("../../assets/home1.jpg") },
        { path: require("../../assets/home2.jpg") },
        { path: require("../../assets/home3.jpg") }
      ],
      loginForm: {
        phone: "",
        password: ""
      },
      loginRules: {
        phone: [
          { required: true, message: "手机号不得为空", trigger: "blur" },
          {
            pattern:
              "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$",
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "密码不得为空", trigger: "blur" }]
      },
      loginFormVisible: false,
      registerForm: {
        phone: "",
        password: "",
        confirmPassword: ""
      },
      registerRules: {
        phone: [
          { required: true, message: "手机号不得为空", trigger: "blur" },
          {
            pattern:
              "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$",
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不得为空", trigger: "blur" }
        ],
        confirmPassword: [
          {
            required: true,
            validator: confirmPasswordRule,
            trigger: "blur"
          }
        ]
      },
      registerFormVisible: false
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    makeLoginAlbe() {
      this.loginAble = false;
    }
  }
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-main {
  padding: 0;
}

.lrButton{
  position: absolute;
  top: 40%;
  left: 35%;
  z-index: 10;
  width:30%;
  min-width: 500px;
  height: 110px;
  text-align: center
}

#login {
  margin-top: 10px;
  z-index: 10;
  width: 175px;
  height: 40px;
}

#register {
  margin-top: 10px;
  margin-left: 20px;
  z-index: 10;
  width: 175px;
  height: 40px;
}
</style>

