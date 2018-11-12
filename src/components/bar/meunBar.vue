<template>
<el-container>
  <el-header> 
    <el-container>
      <el-aside width="800px"> <img id="logo" src="../../assets/logo.png"></el-aside>
      <el-main>     
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/about">处理中心</el-menu-item>
            <el-menu-item index="/c">处理中心</el-menu-item>
            <el-menu-item index="/e">处理中心</el-menu-item>
            <el-menu-item index="/d">处理中心</el-menu-item>
            <el-menu-item index="/f">处理中心</el-menu-item>  
        </el-menu>
      </el-main>
    </el-container>
    <!-- <el-col :span="2" :offset="11"><el-button type="text" id="login"  @click="loginFormVisible = true">登录</el-button></el-col>
    <el-col :span="2"><el-button type="text" id="register" @click="registerFormVisible = true">注册</el-button></el-col> -->
  </el-header>
  <el-dialog title="登录" :visible.sync="loginFormVisible" width="400px" :close-on-click-modal="closeOnClickModal" @close="resetForm('loginForm')">
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
  <el-dialog title="注册" :visible.sync="registerFormVisible" width="400px" :close-on-click-modal="closeOnClickModal" @close="resetForm('registerForm')">
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
</el-container>
</template>

<style scoped>
#login {
  margin-top: 20px;
  color: #afa9a9;
  font-size: 14px;
}
#register {
  margin-top: 20px;
  color: #afa9a9;
  font-size: 14px;
}
#logo {
  margin-top: 20px;
  height: 30px;
  width: 10%;
}
.el-menu-item {
  padding-left: 2.5%;
  padding-right: 2.5%;
  font-size: 12px;
}
</style>

<script>
import sliderValidation from "../common/sliderValidation";
export default {
  name: "meunBar",
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
      activeIndex: "1",
      activeIndex2: "1",
      closeOnClickModal: false,
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
  components: {
  
  },
  methods: {
    handleSelect(key, keyPath) {},
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