import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  objBase,
  modelBase
} from './config'

const errorMsg = '服务器内部错误'
const errorMsg401 = '用户登录失败'
const errorFn = err => {
  // if (err.returnCode == 500) {
  //   Message.error(err.returnType)
  // }
  // if (err.returnCode == 401) {
  //   Message.error(err.returnType)
  // }
  // return err
}
const codeerror = d => {
  if (d.data != null && d.data.code == 401) {
    Message.error(d.data.msg)
  }
  return d
}
/*const imgpost = (_url, obj) => axios({
  
  method: 'post',
  url: url + _url,
  data: obj,
  headers: {
    "Accept": "application/json;charset=utf-8",
    "Content-Type": undefined
  },
  processData: false,
  contentType: false
}).then(codeerror).catch(errorFn)*/
const post = (_url, obj) => axios.post(_url, obj, objBase).then(codeerror).catch(errorFn)
const post2 = (_url, body) => axios.post(_url, body, modelBase).then(codeerror).catch(errorFn)
const get = (_url) => axios.get(_url, objBase).then(codeerror).catch(errorFn)
const postimg =  (_url, obj) => axios.post(_url, obj,{ baseURL: baseURL,headers:{'Content-Type':'multipart/form-data'}}).then(codeerror).catch(errorFn)

/**登录 */
const login = (phone,password,roleId)  => get('/user/login?phone='+phone+'&password='+password+'&roleId='+roleId)
const register = (phone,password,roleId) => post('/user/register',phone,password,roleId)
/** 分页获取当日诊该时段普通诊室信息及其排班信息 */
const listDepartmentSchedule = (date,timeInterval,pageNo,pageSize) => get('/department/scheduleOfDay?date='+date+'&timeInterval='+timeInterval+'&pageNo='+pageNo+'&pageSize='+pageSize)
/** 分页获取当日，该时段该科室内的排班医生 */
const listExpertDoctor = (departmentName,scheduleTime,timeInterval,pageNo,pageSize) => get('/schedule/listExpertDoctor?departmentName='
+departmentName+'&scheduleTime='+scheduleTime+'&timeInterval='+timeInterval+'&pageNo='+pageNo+'&pageSize='+pageSize)
/** 获取所有的专家科室 */
const listExpertDepartment = () =>get("/department/listExpertDepartment");

const test = () =>get("/test");
export default {
  test,
  login,
  register,
  listDepartmentSchedule,
  listExpertDoctor,
  listExpertDepartment,
  test
}