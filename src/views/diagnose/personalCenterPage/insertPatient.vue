<template>
  <div>
    <el-container>
      <el-header style="padding:20px">
        <div class="title-line">添加就诊人</div>
      </el-header>
      <el-main style="padding-top:50px">
        <el-form
          :model="insertPatient"
          label-width="150px"
          style="width:50%;margin-left:25%"
          label-position="left"
          :rules="insertPatientRules"
          ref="insertPatient"
        >
          <el-form-item label="就诊人姓名" style="margin-bottom:50px" prop="realName">
            <el-input v-model="insertPatient.realName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" style="margin-bottom:50px" prop="idCard">
            <el-input v-model="insertPatient.idCard"></el-input>
          </el-form-item>
          <el-form-item label="手机号" style="margin-bottom:50px" prop="phone">
            <el-input v-model="insertPatient.phone"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:40px">
            <el-button type="primary" @click="submitForm('insertPatient')">立即创建</el-button>
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

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
</style>


<script>
import axion from "@/utils/http_url";
export default {
  data() {
    return {
      insertPatient: {
        realName: "",
        idCard: "",
        phone: ""
      },
      insertPatientRules: {
        realName: [
          { required: true, message: "请输入就诊人姓名", trigger: "blur" },
          {
            pattern: "^[\\u4E00-\\u9FA5\\uf900-\\ufa2d·s]{2,6}",
            min: 2,
            max: 6,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            pattern:
              "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]",
            message: "身份证号不符合规范",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不得为空", trigger: "blur" },
          {
            pattern:
              "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$",
            message: "手机号格式错误",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axion.insertPatient(this.insertPatient).then(response => {
            if (response != null) {
                this.$message({
                  message: "添加就诊人成功",
                  type: "success",
                  duration: 2000
                });
                this.$router.push("/personalCenter/patientManagement")
            }
          });
        } else {
          return false;
        }
      });
    },
    cancel(){
      this.$router.push("/personalCenter/patientManagement")
    }
  }
};
</script>
