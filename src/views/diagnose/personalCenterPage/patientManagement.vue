<template>
  <div>
    <el-container>
      <el-header style="padding:20px">
        <div class="title-line">
          就诊人详情
          <span v-if="!isDelete">
            <i class="el-icon-delete" style="float:right;cursor:pointer" @click="wantToDelete()">
              <span style="margin-right:5px;">删除就诊人</span>
            </i>
            <i class="el-icon-plus" style="float:right;cursor:pointer" @click="insertPatient()">
              <span style="margin-right:25px;">添加就诊人</span>
            </i>
          </span>
          <span v-if="isDelete">
            <i class="el-icon-close" style="float:right;cursor:pointer" @click="cancelDelete()">
              <span style="margin-right:5px;">取消</span>
            </i>
            <i class="el-icon-delete" style="float:right;cursor:pointer" @click="toConfirmDelete()">
              <span style="margin-right:25px;">确认删除</span>
            </i>
          </span>
        </div>
      </el-header>
      <el-main style="padding-top:5px;min-height:600px">
        <el-table
          :data="patientTable"
          style="width: 100%;"
          stripe
          ref="patientTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" v-if="isDelete"></el-table-column>
          <el-table-column prop="realName" label="就诊人姓名"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
        </el-table>
      </el-main>
      <el-footer style="text-align:center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="pageNo"
          :pager-count="11"
          :page-size="pageSize"
          @current-change="listPatient()"
          v-if="isPatientExist"
        ></el-pagination>
      </el-footer>
    </el-container>
    <el-dialog title="提示" :visible.sync="isConfirmDelete" width="30%">
      <span>是否确认删除就诊人？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDelete()">确 定</el-button>
        <el-button @click="isConfirmDelete = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axion from "@/utils/http_url";
export default {
  data() {
    return {
      patientTable: [],
      isDelete: false,
      isConfirmDelete: false,
      multipleSelection: [],
      pageNo: 1,
      pageSize: 8,
      total: 5,
      isPatientExist:false
    };
  },
  methods: {
    wantToDelete() {
      this.isDelete = true;
    },
    cancelDelete() {
      this.isDelete = false;
    },
    toConfirmDelete() {
      this.isConfirmDelete = true;
    },
    confirmDelete() {
      this.isConfirmDelete = false;
      axion.deletePatient(this.multipleSelection).then(response => {
        if (response != null) {
          if (response.data.returnCode == 200) {
            this.$message({
              message: "就诊人删除成功",
              type: "success",
              duration: 2000
            });
            this.isDelete = false;
            this.listPatient();
          } else if (response.data.returnCode == 400) {
            this.$message({
              message: "就诊人删除失败",
              type: "error",
              duration: 2000
            });
          }
        }
      });
    },
    insertPatient() {
      this.$router.push("/personalCenter/insertPatient");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    listPatient() {
      axion.listPatient(this.pageNo, this.pageSize).then(response => {
        this.patientTable = response.data.returnData.list;
        this.total = response.data.returnData.total;
        if(this.total != 0){
            this.isPatientExist = true;
        }
       else{
         this.isPatientExist = false;
       }
      });
    }
  },
  mounted() {
    this.$nextTick(function generate() {
      axion.userAuthorizationTest();
      this.listPatient();
    });
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
</style>

