import axios from 'axios'
import {
  objBase,
  modelBase
} from './config'


const post = (_url, obj) => axios.post(_url, obj, objBase)
const post2 = (_url, body) => axios.post(_url, body, modelBase)
const get = (_url) => axios.get(_url, objBase)
/**token认证，防止token被篡改或过期 */
const authenticationTest = () => get("/authenticationTest")
/**普通用户权限认证 */
const userAuthorizationTest = () =>get("/userAuthorizationTest")
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
/**获取首页轮播图 */
const listIndexCarousel = () => get("/img/listIndexCarousel");
/**获得网络诊室页面轮播图 */
const listNetTreatmentRoomCarousel = () => get("/img/listNetTreatmentRoomCarousel");
/**获取用户就诊人列表 */
const listPatient = (pageNo,pageSize)  => get("/patient/listPatient?&pageNo="+pageNo+'&pageSize='+pageSize);
/**添加就诊人 */
const insertPatient = (patient) => post2("/patient/insertPatient",patient);
const deletePatient = (patientList) => post2("/patient/deletePatient",patientList);
export default {
  login,
  register,
  listDepartmentSchedule,
  listExpertDoctor,
  listExpertDepartment,
  authenticationTest,
  userAuthorizationTest,
  listIndexCarousel,
  listNetTreatmentRoomCarousel,
  listPatient,
  insertPatient,
  deletePatient
}