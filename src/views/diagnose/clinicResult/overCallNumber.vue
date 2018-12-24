<template>
  <div>
    <el-container style="padding:0">
      <el-main style="backgroundColor:#eeeeee;padding-left:15%;padding-right:15%;padding-top:50px">
        <el-container>
          <el-header
            style="backgroundColor:white;width:100%;margin-bottom:20px;height:100%;padding:20px;"
          >
            <treatment-process style="padding:10px"></treatment-process>
          </el-header>
          <el-main
            style="backgroundColor:white;width:100%;height:100%;padding:20px;padding-top:50px"
          >
            <el-container style="padding-left:30%;">
              <el-aside style="padding-top:30px;width:100px">
                <i class="el-icon-success"></i>
              </el-aside>
              <el-container style="padding-bottom:0px;">
                <el-main>
                  <div style="font-size:30px;font-weight:700">挂号成功</div>
                </el-main>
                <el-footer height="50px">开始叫号后，会有短信通知，请保持手机通讯畅通</el-footer>
              </el-container>
            </el-container>
          </el-main>
        </el-container>
      </el-main>
      <el-button @click="nextPatient()">下一个</el-button>
    </el-container>
  </div>
</template>

<style scoped>
.vidioDiv {
  text-align: center;
  position: relative;
}
.title {
  position: absolute;
  left: 30%;
  top: 20%;
  color: #a71820;
  font-size: 28px;
  font-weight: 700;
}
.detail {
  position: absolute;
  left: 30%;
  top: 45%;
  color: #a71820;
}
.button {
  position: absolute;
  left: 30%;
  top: 65%;
}
.el-icon-success {
  width: 50px;
  font-size: 50px;
  color: #a71820;
}
.detailClass {
  display: inline-block;
  width: 50%;
}
.detailClass span {
  margin-left: 5%;
}
.lineClass {
  margin-bottom: 50px;
}
</style>


