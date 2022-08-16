// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import http from 'axios'
import axios from 'axios'
import store  from './store'
import  { 
  Button,
  Main,
  Container,
  Header,
  Aside,
  Message,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  CollapseItem,
  Collapse,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Tag,
  Form,
  FormItem,
  Input,
  Option,
  Select,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox
  } 
  from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import '../api/mock.js'
// 设置默认根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios  //可以直接通过this访问到http属性
Vue.prototype.$axios = axios
// element UI配置
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(FormItem)
Vue.use(Form)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm //将$message挂载到vue的原型对象中
Vue.use(Menu)
Vue.use(Submenu)
// Vue.use(MessageBox)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Option)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(CollapseItem)
Vue.use(Collapse)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
 
//axios是绑定到原型中  不是一个插件
Vue.prototype.$http = http
/* eslint-disable no-new */

// 挂载路由导航守卫
router.beforeEach((to,from,next) =>{
  //to 将要访问的路径 from代表从哪个路径跳转而来 
  //next 表示一个放行函数
     store.commit('getToken')
// 获取token
const token = store.state.user.token
if(!token && to.name !== 'login') {
//  next ({name:'login'})
next ('/login')
}else if(token && to.name === 'login'){
  next({name:'home'})
}else {
  next()
}
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  created(){
    store.commit('addMenu',router)
  },
  template: '<App/>'
})
