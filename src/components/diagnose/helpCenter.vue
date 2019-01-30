<template>
<div>
  <div class="title-line">帮助中心</div>
  <ul>
    <li class="border-right"><i class="fas fa-poll-h fa-3x"></i><div>服务条款</div></li>
    <li><i class="fas fa-poll-h fa-3x"></i><div>使用指南</div></li>
    <li class="border-right"><i class="fas fa-briefcase-medical fa-3x"></i><div>预约挂号问题</div></li>
    <li><i class="fas fa-file-medical fa-3x"></i><div>就诊相关问题</div></li>
    <li class="border-right no-border-bottom"><i class="fas fa-user fa-3x"></i><div>账号相关问题</div></li>  
    <li class="no-border-bottom"><i class="fas fa-ellipsis-h fa-3x"></i><div>其他问题</div></li>  
  </ul>
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
ul {
  list-style-type: none;
  color: #b2363d;
  text-align: center;
  padding: 0;
}
li {
  float: left;
  width: 48%;
  padding: 20px 0;
  border-bottom: 1px dashed #e5e5e5;
}
.border-right {
  border-right: 1px dashed #e5e5e5;
}
.no-border-bottom {
  border-bottom: none;
}
li div {
  color: black;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
  font-size: 14px;
}
</style>
