import axios from 'axios'
import config from '../config/index.js'
//对axios进行二次封装  主要是把项目的配置添加到axios请求中  
//通过配置来改变接口请求的地址  
//NODE_ENV是一个用户自定义的变量，在webpack中它的用途是判断生产环境或开发环境
// console.log('config',config,'config.dev：',config.dev,'config.pro：',config.pro);
const baseUrl = process.env.NODE_ENV === 'development' ? config.dev.assetsPublicPath  : config.pro.host
class httpRequest {
  //初始化对象
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  getInsideConfig() {//添加方法  定义axios的配置
    const config = {
      //配置初始值
      baseURL: this.baseUrl,
      header: {}
    }
    return config
  }

  //拦截器
  interceptors(instance) {
    // instance是axios的一个实例
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    })
  }

  request(options) {
    const instance = axios.create()
    //将调用拿到的对象、以及传入的对象做一个解构   
    // options = {...this.getInsideConfig(), ...options}
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)//调用拦截器
    return instance(options)
  }
}
export default new httpRequest(baseUrl)