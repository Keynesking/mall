//书写请求的拦截器
// 对axios进行封装，书写拦截器
import axios from "axios"

// 获取axios的实例（instance实例）：
const instance = axios.create({
    baseURL: "http://kumanxuan1.f3322.net:8001",
    timeout: 5000
})

// 请求拦截器     技术要点   (intercept拦截)
instance.interceptors.request.use(config => {
    // 这个函数什么时候执行???  这个函数在请求发出去之前就执行，拦截了请求
    // console.log("config是:",  config);  //config本次请求的一些信息，包含请求头，请求方式等。。。
    // 可以做一些请求前的准备工作
    // 例如： 可以获取token值，检测用户有没有登录，如果登录了，可以在请求头中携带登录凭证token
    // let token = 
    // if(token){
    //     请求头中携带登录凭证token
    // }
    let token = localStorage.getItem("token")
    if(token){
        config.headers["X-Nideshop-Token"] = token
    }
    return config   // return 后面的config需要书写，才能正常发出请求
}, err => {
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
    // 这个函数什么时候执行???  这个函数在接收到响应之后，执行组件中的then之前
    // console.log("res是：", res );
    return res.data  // return 后面的值返回到哪里??  return 后面的值被then方法的res接收了
}, err => {
    return Promise.reject(err)
})
export default instance  //   import xxx from "xxx"
//export  xxx      import {xxx，xxx2} from "xxxx"