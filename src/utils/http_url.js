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
  if (err.returnCode == 500) {
    Message.error(err.returnType)
  }
  if (err.returnCode == 401) {
    Message.error(err.returnType)
  }
  return err
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

/*测试*/
const test = (name) => post('/test',name)

/**登录 */
const login = (phone,password)  => get('/user/login?phone='+phone+'&password='+password)
const register = (phone,password) => post('/user/register',phone,password)
/** 获取当日诊室信息及其排班信息 */
const listDepartmentSchedule = (date) => get('/department/scheduleOfDay?date='+date)
export default {
  test,
  login,
  register,
  listDepartmentSchedule
}