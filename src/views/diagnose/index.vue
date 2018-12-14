<template>
  <div style="height:calc(100vh - 86px)">
    <el-container style="height:100%">
      <el-main style direction="vertical">
        <div style="position:relative;overflow:hidden;height:100%">
          <el-carousel :autoplay="autoplay" height="calc(100vh - 81px)">
            <el-carousel-item v-for="img in indexCarousel" :key="img.id" style="height:100%">
              <img :src="img.path">
            </el-carousel-item>
          </el-carousel>
          <div class="lrButton">
            <img src="@/assets/sign.png">
            <el-button
              id="login"
              type="primary"
              @click="loginFormVisible = true"
              v-if="!this.$store.state.commonStore.isUserLogin"
            >登录</el-button>
            <el-button
              id="register"
              @click="registerFormVisible = true"
              v-if="!this.$store.state.commonStore.isUserLogin"
            >注册</el-button>
          </div>
        </div>
      </el-main>
    </el-container>

    <el-dialog
      title="登录"
      :visible.sync="loginFormVisible"
      width="400px"
      @close="resetForm('loginForm')"
    >
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:11.25%">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
        <el-form-item style="margin-left:7.5%">
          <el-button type="text" @click="toRegister()">未有账号去注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="注册"
      :visible.sync="registerFormVisible"
      width="400px"
      @close="resetForm('registerForm')"
    >
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input minlength="8" maxlength="16" type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:11.25%">
          <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
        <el-form-item style="margin-left:7.5%">
          <el-button type="text" @click="toLogin()">已有账号去登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>



<script>
import axion from "@/utils/http_url.js";
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
      autoplay: false,
      // screenHeight: document.documentElement.clientHeight - 81+'px', //减去header的60px
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
        password: [
          {
            required: true,
            message: "密码不得为空",
            trigger: "blur"
          }
        ]
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
          { required: true, message: "密码不得为空", trigger: "blur" },
          {
            message: "密码必须是强密码",
            trigger: "blur",
            pattern: "^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{8,16}$"
          }
        ],
        confirmPassword: [
          {
            required: true,
            validator: confirmPasswordRule,
            trigger: "blur"
          }
        ]
      },
      registerFormVisible: false,
      roleId: 1,
      indexCarousel: ""
    };
  },
  components: {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "loginForm") {
            axion
              .login(this.loginForm.phone, this.loginForm.password, this.roleId)
              .then(response => {
                if (response != null) {
                  if (response.data.returnCode == 200) {
                    let token = response.data.returnData.token;
                    let phone = response.data.returnData.phone;
                    this.$store.commit("add_token", {
                      token: token,
                      phone: phone
                    });
                    this.$message({
                      message: "登录成功",
                      type: "success",
                      duration: 1000
                    });
                    this.loginFormVisible = false;
                    this.$router.push("netTreatRoom");
                    this.$store.state.commonStore.isUserLogin = true;
                  } else if (response.data.returnCode == 400) {
                    this.$store.commit("remove_token");
                    this.$store.state.errorTokenVisible = true;
                    this.$store.state.errorTokenMessage =
                      response.data.returnType;
                  }
                }
              });
          }
          if (formName == "registerForm") {
            axion
              .register({
                phone: this.registerForm.phone,
                password: this.registerForm.password,
                roleId: this.roleId
              })
              .then(response => {
                if (response != null) {
                  if (response.data.returnCode == 200) {
                    this.$message({
                      message: "注册成功",
                      type: "success",
                      duration: 1000
                    });
                    this.registerFormVisible = false;
                    this.$router.push("/");
                  } else if (response.data.returnCode == 400) {
                    this.$store.commit("remove_token");
                    this.$store.state.errorTokenVisible = true;
                    this.$store.state.errorTokenMessage =
                      response.data.returnType;
                  }
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toRegister() {
      this.loginFormVisible = false;
      this.registerFormVisible = true;
    },
    toLogin() {
      this.loginFormVisible = true;
      this.registerFormVisible = false;
    },
    listIndexCarousel() {
      axion.listIndexCarousel().then(response => {
        if (response != null) {
          this.indexCarousel = response.data.returnData;
        }
      });
      axion.authenticationTest();
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      this.listIndexCarousel();
    });
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

.lrButton {
  position: absolute;
  top: 40%;
  left: 35%;
  z-index: 10;
  width: 30%;
  /* min-width: 500px; */
  height: 110px;
  text-align: center;
}

.lrButton img {
  width: 100%;
}
#login {
  margin-top: 10px;
  z-index: 10;
  width: 40%;
  height: 40px;
}

#register {
  margin-top: 10px;
  margin-left: 5%;
  z-index: 10;
  width: 40%;
  height: 40px;
}
</style>

