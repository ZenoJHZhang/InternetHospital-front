<template>
<div>
    <el-container style="padding:0">
        <el-header style="height:100%;padding:0px"><img src="../../assets/diagnose/specialistClinic.png"></el-header>
        <el-main style="backgroundColor:#eeeeee;padding-left:15%;padding-right:15%;padding-top:50px">
            <el-container>
               <el-header style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:20px;">
                        <treatment-process style="padding:10px"></treatment-process>
                </el-header>
                <el-main  style="backgroundColor:white;width:100%;height:100%;padding:20px;">
                    <div class="title-line">问诊信息</div>
                    <div class='reservationStyle'>
                        <div>
                            <label>科室：</label><span>示例专家科室</span>
                            <label>医生：</label><span>ZJH</span>
                            <label>擅长：</label><span>吃饭</span>
                        </div>
                        <div>
                            <label>挂号费：</label><span>￥1.00</span>
                        </div>
                        <div>
                            <label>时间：</label><span>2018-11-17(上午)</span>
                        </div>
                    </div>
                </el-main>
                <el-footer style="backgroundColor:white;width:100%;height:100%;padding:20px;">
                    <div class="title-line">个人信息</div>
                    <el-form ref="patientInformationForm" :model="patientInformationForm" label-width="100px" label-position='left' style="margin-left:20px;width:70%">
                        <el-form-item label="姓名:" >
                        <el-select v-model="value" placeholder="请选择" style="width:50%">
                            <el-option
                            v-for="item in beChoicedPatient"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.IdCard }}</span>
                            </el-option>
                        </el-select>
                            <el-button type="primary" style="margin-left:20px">添加就诊人</el-button>
                        </el-form-item>
                        <el-form-item label="初/复诊:" >
                            <el-radio v-model="patientInformationForm.accentRadio" label="初诊"></el-radio>
                            <el-radio v-model="patientInformationForm.accentRadio" label="复诊"></el-radio>
                        </el-form-item>
                        <el-form-item label="身份证号:" >
                            <el-input v-model="patientInformationForm.IdCard" style="width:50%"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:" >
                            <el-input v-model="patientInformationForm.IdCard" style="width:50%"></el-input>
                        </el-form-item>
                        <el-form-item label="疾病描述:" >
                            <el-input type="textarea" :rows="5" style="width:100%" placeholder="请详细描述疾病、症状、发病时间、已服用的药物……" v-model="patientInformationForm.accentDetail"></el-input>
                        </el-form-item>
                        <el-form-item label="详细病史:" >
                            <el-table stripe :data="accentHistory">
                                <el-table-column  prop="type" label="类型" width="150"></el-table-column>
                                <el-table-column  prop="detail" label="详情" width="500"></el-table-column>
                                <el-table-column  prop="choice" label="操作" width="150">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="handleClick(scope.row)">选择</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                        <el-form-item>
                            <el-upload
                                action=""
                                list-type="picture-card"
                                :before-upload="beforeImgUpload">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item style="text-align:center ">
                            <el-button type="info">上一步</el-button>
                            <el-button type="primary">提交申请</el-button>
                        </el-form-item>
                    </el-form>
                </el-footer>
            </el-container>
        </el-main>
    </el-container>
    <!-- <el-dialog title="提示" :visible.sync="accentHistoryDialogVisible" width="30%">
        <el-checkbox-group v-model="accentHistory[0].detail">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog> -->
</div>
</template>

<script>
import treatmentProcess from "../../components/diagnose/treatmentProcess";
export default {
  data() {
    return {
      patientInformationForm: {
        patientName: "",
        accentRadio: "初诊",
        IdCard: "",
        phone: "",
        accentDetail: ""
      },
      accentHistory: [
        { type: "既往史", detail: [], choice: "选择" },
        { type: "婚育史", detail: [], choice: "选择" },
        { type: "过敏史", detail: [], choice: "选择" },
        { type: "家族史", detail: [], choice: "选择" },
        { type: "个人习惯", detail: [], choice: "选择" }
      ],
      accentHistoryDialogVisible:false,
      /**选择就诊人 */
      beChoicedPatient: [
        {
          id: 1,
          name: "ZJH",
          IdCard: "330104199610093012"
        },
        {
          id: 2,
          name: "ZJH2",
          IdCard: "330104199610093013"
        }
      ],
      value: ""
    };
  },
  components: {
    treatmentProcess
  },
  methods: {
    beforeImgUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    log() {
      console.log(this.$refs.patientNameSelect);
    },
    handleClick(row){
        console.log(row)
    }
  },
  mounted() {
    this.$store.state.treatmentProcessStore.active = 1;
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
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
span {
  color: #a1a1a1;
  margin-right: 8%;
}
.reservationStyle {
  margin-left: 20px;
  margin-top: 30px;
  font-size: 15px;
}
.reservationStyle div {
  margin-bottom: 20px;
}
</style>

