// 依赖js-cookie  先安装
import Cookie from 'js-cookie'
export default{
  state:{
    token:''
  },
  mutations: {
    setToken(state,val){
      state.token = val
      Cookie.set('token',val)//设置cookie值
    },
    clearToken(state){
      state.token = ''
      Cookie.remove('token')
    },
    getToken(state){
     state.token = state.token || Cookie.get('token')//容错
    }
  }
}