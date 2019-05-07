<template>
  <div>
    <el-container>
      <el-main style="backgroundColor:#eeeeee;padding-left:15%;padding-right:15%;padding-top:50px">
        <el-container>
          <el-header
            style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:20px;"
          >
            <treatment-process style="padding:10px"></treatment-process>
          </el-header>
          <el-main style="backgroundColor:white;width:100%;">
            <div>
              <div>
                <div class="title-line">{{ firstTitle }}</div>
                <div class="reservationStyle">
                  <div class="lineClass">
                    <div class="detailClass">
                      <label style="color:black">姓名：</label>
                      <span style="color: #fe9e20;">{{ userReservation.patientName }}</span>
                    </div>
                    <div class="detailClass">
                      <label style="color:black">性别：</label>
                      <span>{{ patient.sex == 1?'男':'女' }}</span>
                    </div>
                    <div class="detailClass">
                      <label style="color:black">年龄：</label>
                      <span>{{ patient.age }}</span>
                    </div>
                  </div>
                  <div v-if="!auditFlag" class="lineClass">
                    <div>
                      <label style="color:black">身份证号：</label>
                      <span>{{ patient.idCard }}</span>
                    </div>
                  </div>
                  <div v-if="!auditFlag" class="lineClass">
                    <div class="detailClass">
                      <label style="color:black">科室：</label>
                      <span>{{ userReservation.departmentName }}</span>
                    </div>
                    <div class="detailClass">
                      <label style="color:black">医生：</label>
                      <span>{{ userReservation.doctorName }}</span>
                    </div>
                  </div>
                  <div v-if="!auditFlag" class="lineClass">
                    <div class="detailClass">
                      <label style="color:black">预约日期：</label>
                      <span style="color: #fe9e20;">{{ userReservation.clinicDate }}</span>
                    </div>
                    <div class="detailClass">
                      <label style="color:black">预约时段：</label>
                      <span style="color: #fe9e20;">{{ userReservation.clinicTime }}</span>
                    </div>
                  </div>
                  <div class="lineClass">
                    <div class="detailClass">
                      <label style="color:black">挂号费：</label>
                      <span style="color: #fe9e20;">￥{{ userReservation.clinicPrice }}</span>
                    </div>
                    <div v-if="recipeFlag" class="detailClass">
                      <label style="color:black">处方费：</label>
                      <span style="color: #fe9e20;">￥{{ userReservation.recipePrice }}</span>
                    </div>
                  </div>
                  <div v-if="!auditFlag" class="lineClass">
                    <div style="width:100%">
                      <label style="color:black">疾病描述：</label>
                      <span>{{ userReservation.conditionDesc }}</span>
                    </div>
                  </div>
                  <div v-if="!auditFlag">
                    <div class="lineClass">
                      <div>
                        <label style="color:black">
                          病情图片：
                          <span style="color: #fe9e20;">（点击查看大图）</span>
                        </label>
                        <user-reservation-img-water-fall
                          v-bind:userReservationId="userReservation.id"
                          v-if="imgPathList.length !== 0"
                        />
                      </div>
                    </div>
                  </div>
                  <no-comment
                    v-if="imgPathList.length === 0"
                    style="margin-top:50px;margin-bottom:50px;text-align:center"
                    title="暂无图片"
                  />
                </div>
              </div>
              <div class="title-line">
                诊断详情
                <span v-if="diagnoseFlag">
                  <el-button
                    type="text"
                    style="float:right;margin-right:20%"
                    @click="diagnoseVisableFlag = !diagnoseVisableFlag"
                  >{{ diagnoseVisableFlag == true ?'收起':'展开' }}</el-button>
                </span>
              </div>
              <div v-if="diagnoseFlag">
                <div v-if="diagnoseVisableFlag" class="reservationStyle">
                  <div class="lineClass">
                    <div class="longDetailClass">
                      <label style="color:black">主诉：</label>
                      <span>{{ userReservation.diagnose.complain != ''?userReservation.diagnose.complain :'暂无主诉' }}</span>
                    </div>
                  </div>
                  <div class="lineClass">
                    <div class="longDetailClass">
                      <label style="color:black">现病史：</label>
                      <span>{{ userReservation.diagnose.presentHistory !='' ?userReservation.diagnose.presentHistory:'暂无现病史' }}</span>
                    </div>
                  </div>
                  <div class="lineClass">
                    <div class="longDetailClass">
                      <label style="color:black">既往史：</label>
                      <span>{{ userReservation.diagnose.pastHistory != ""? userReservation.diagnose.pastHistory:'暂无既往史：' }}</span>
                    </div>
                  </div>
                  <div class="lineClass">
                    <div class="longDetailClass">
                      <label style="color:black">过敏史：</label>
                      <span>{{ userReservation.diagnose.allergicHistory != ""? userReservation.diagnose.allergicHistory:'暂无过敏史：' }}</span>
                    </div>
                  </div>
                  <div class="lineClass">
                    <div class="longDetailClass">
                      <label style="color:black">初步诊断：</label>
                      <span>{{ userReservation.diagnose.firstDiagnose != ""? userReservation.diagnose.firstDiagnose:'暂无初步诊断：' }}</span>
                    </div>
                  </div>
                  <div class="lineClass">
                    <div class="longDetailClass">
                      <label style="color:black">诊断意见：</label>
                      <span>{{ userReservation.diagnose.advice != ""? userReservation.diagnose.advice:'暂无诊断意见：' }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!diagnoseFlag" style="font-weight:700">暂无诊断意见</div>

              <div style="margin-top:25px;margin-bottom:50px">
                <div class="title-line">
                  处方详情
                  <span v-if="recipeFlag">
                    <el-button
                      type="text"
                      style="float:right;margin-right:20%"
                      @click="recipeVisableFlag = !recipeVisableFlag"
                    >{{ recipeVisableFlag == true ?'收起':'展开' }}</el-button>
                  </span>
                </div>
                <div v-if="recipeFlag">
                  <div v-if="recipeVisableFlag ">
                    <el-table :data="userReservation.medicalList" style="width: 100%">
                      <el-table-column prop="name" label="药品名称"/>
                      <el-table-column prop="unit" label="规格" width="50"/>
                      <el-table-column prop="type" label="类型" width="50"/>
                      <el-table-column prop="price" label="单价" width="50"/>
                      <el-table-column prop="amount" label="数量" width="50"/>
                      <el-table-column prop="dosageDetail" label="每次服用剂量" width="120"/>
                      <el-table-column prop="times" label="用药频次"/>
                      <el-table-column prop="day" label="天数" width="80"/>
                      <el-table-column prop="method" label="用法"/>
                    </el-table>
                  </div>
                </div>
                <div v-if="!recipeFlag" style="font-weight:700">处方审核中</div>
              </div>
            </div>
            <div
              style="margin-bottom:80px"
              v-if="userReservation.status == 17 || userReservation.status == 18 || userReservation.status == 19 || userReservation.status == 14"
            >
              <div class="title-line">星级评价</div>
              <div class="block">
                <el-rate
                  v-model="starRate"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  :disabled="hasRated"
                  @change="starVisableFlag = true"
                ></el-rate>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
    <el-dialog title="提示" :visible.sync="starVisableFlag" width="30%">
      <span>确认评价</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="starVisableFlag = false">取 消</el-button>
        <el-button type="primary" @click="confirmStar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import treatmentProcess from "@/components/diagnose/treatmentProcess";
import noComment from "@/components/common/noComment";
import axion from "@/utils/http_url.js";
import userReservationImgWaterFall from "@/components/common/userReservationImgWaterFall";
import { constants } from "crypto";
export default {
  components: {
    noComment,
    userReservationImgWaterFall,
    treatmentProcess
  },
  data() {
    return {
      userReservation: {},
      firstTitle: "",
      diagnoseVisableFlag: true,
      recipeVisableFlag: true,
      recipeFlag: false,
      diagnoseFlag: false,
      imgPathList: [],
      patient: {},
      userReservationUuId: "",
      auditFlag: false,
      hasRated: false,
      starVisableFlag: false,
      starRate: 0
    };
  },
  watch: {
    userReservationUuId(newVar, oldVar) {
      if (newVar !== oldVar) {
        this.getAllDetailByUuId();
      }
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      if (this.auditFlag) {
        this.firstTitle = "患者信息";
      } else {
        this.firstTitle = "就诊信息";
      }
      this.userReservationUuId = sessionStorage.getItem("userReservationUuId");
      this.getAllDetailByUuId();
      this.$store.state.treatmentProcessStore.active = 5;
    });
  },
  methods: {
    getAllDetailByUuId() {
      axion
        .allUserReservationDetail({
          userReservationUuId: this.userReservationUuId
        })
        .then(response => {
          if (response.data.returnCode === 200) {
            this.userReservation = response.data.returnData;
            this.imgPathList = this.userReservation.imgPathList;
            this.patient = this.userReservation.patient;
            if (this.userReservation.diagnose !== null) {
              this.diagnoseFlag = true;
            } else {
              this.diagnoseFlag = false;
            }
            if (this.userReservation.medicalList !== null) {
              this.recipeFlag = true;
            } else {
              this.recipeFlag = false;
            }
            if (this.userReservation.isEvaluate === "1") {
              this.hasRated = true;
              this.starRate = Number(this.userReservation.evaluateStar);
            }
          }
        });
    },
    confirmStar() {
      axion
        .giveStar({
          doctorId: this.userReservation.doctorId,
          starRate: this.starRate,
          uuId: this.userReservationUuId
        })
        .then(response => {
          if (response.data.returnCode === 200) {
            this.$message({
              message: "评分成功",
              type: "success"
            });
            this.hasRated = true;
            this.starVisableFlag = false;
          }
        });
    }
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
.reservationStyle {
  margin-left: 5%;
  margin-top: 30px;
  font-size: 16px;
}
.detailClass {
  display: inline-block;
  width: 30%;
}
.detailClass span {
  margin-left: 5%;
}
.longDetailClass {
  display: inline-block;
  width: 90%;
}
.longDetailClass span {
  margin-left: 5%;
  width: 100% !important;
  word-wrap: break-word;
  word-break: break-all;
}
.lineClass {
  margin-bottom: 25px;
}
.imgClass {
  height: 100%;
}
.imgClass img {
  padding: 30px;
}
</style>
