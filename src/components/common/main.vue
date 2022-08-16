<template>
<div>
  <el-container style="height:100%">
  <el-aside width="auto"> 
    <LeftNav/>
    </el-aside>
  <el-container>
    <el-header>
    <Header/>
    </el-header>
    <commen-tags></commen-tags>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container> 
</el-container>
<!-- 退出按钮逻辑  只要销毁本地的token即可
  <el-button type="info" @click="handlequit">退出</el-button>
-->
</div>
</template>
<script>
// import {getMenu} from '../../../api/data.js'
// import {getData, getMenu} from '../../../api/data.js'
import LeftNav from './leftnav.vue'
import Header from './header.vue'
import CommenTags from '../common/commentags.vue'
export default {
name: 'Main',
methods:{
  handlequit(){
    //清空token
    window.sessionStorage.clear()
    //跳转到登录页
    this.$router.push('/login')
  }
},
components: {
  Header,
  LeftNav,
  CommenTags
},
mounted(){
//   getMenu().then(res =>{
//     console.log(res);
//   })

}
}
</script>
<style scoped>
 .el-header{
  display: flex;
  background-color: black;
}
.el-main{
  background-color: aliceblue;
  
}
</style>
