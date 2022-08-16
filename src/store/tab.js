import Cookie from 'js-cookie'
// import router from '../router'
export default{
  state:{
    isCollapse:false,
    tabsList:[
    {
      path:'/',
      name:'home',
      label:'首页',
      icon:'home'
    }
    ],
    currentMenu:null,
    menu:[]
  },
  //改变state 的方法
  mutations: {
    setMenu(state,val){
     state.menu = val
     Cookie.set('menu',JSON.stringify(val))
    },
    clearMenu(state){
      state.menu =[]
      Cookie.remove('menu')
    },
    addMenu(state,router){
      if(!Cookie.get('menu')){
        return
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      //动态添加路由
      const menuArray = []
      menu.forEach(item =>{
        if(item.children){
          item.children = item.children.map(item =>{
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        }else {
          item.component = ()=>import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      //路由的动态添加
      menuArray.forEach(item =>{
        router.addRoute('Main',item)
      })
    },

    closeTag(state,val){//对比传入的name和state中的name是否一致
     const result = state.tabsList.findIndex(item => item.name === val.name)
     state.tabsList.splice(result,1)
    },
    collapseMenu(state){
      state.isCollapse = !state.isCollapse  
    },
    selectMenu(state,val){
      if(val.name !=='home'){
        state.currentMenu = val
//findIndex() 方法返回数组中通过测试的第一个元素的索引（作为函数提供）。
//findIndex() 方法对数组中存在的每个元素执行一次函数
//如果找到函数返回 true 值的数组元素，则 findIndex() 返回该数组元素的索引（并且不检查剩余值）
//否则返回 -1    findIndex() 不会改变原始数组
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if(result === -1){
          state.tabsList.push(val)
        }
      }else{
        state.currentMenu = null
      }
    }
  }



}