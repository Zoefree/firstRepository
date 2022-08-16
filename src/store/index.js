import Vue from "vue";
import Vuex from 'vuex'
import tab from './tab.js'
import user from './user'
Vue.use(Vuex)
//new Vuex.Store()语法不要写错
export default new Vuex.Store({
  modules:{
       tab,
       user
  }
}
)