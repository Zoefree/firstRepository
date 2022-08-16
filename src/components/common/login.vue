<template>
<div class="bgc">
  <div class="login">
<div class="headimg">
  <img src="../../assets/images/我的.png" alt="">
</div>
<el-form ref="formref" :rules="rules" label-width="80px" class="formall" :model="forms">
  <!-- 用户 -->
  <el-form-item label="" prop="name">
    <el-input class="user" placeholder="用户" 
    prefix-icon="el-icon-user-solid" v-model="forms.username" >
    </el-input>
  </el-form-item>
  <!-- 密码 -->
  <el-form-item label="" class="psd" prop="region">
    <el-input prefix-icon="el-icon-lock" placeholder="密码" 
    v-model="forms.password" type="password">

    </el-input>
  </el-form-item>
  <!-- 登录按钮 -->
  <el-form-item label="" class="log">
   <el-button type="primary" @click="login">登录</el-button>
   <el-button type="info" @click="resetLoginForm">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</div>
</template>
<script>
// import Mock from 'mockjs'
import { getMenu } from '../../../api/data.js'
export default {
name: 'Login',
data(){
  return {
    forms:{
    },
     rules: {
          username: [
            // 表单验证
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ],
          }
  }
},
methods:{
resetLoginForm(){
  this.$refs.formref.resetFields()
},
login(){
  // const token = Mock.Random.guid()
  // this.$store.commit('setToken',token)
  // this.$router.push('/home')
  getMenu(this.forms).then(({data:res}) =>{
    // console.log('res:',res);
    if(res.code === 20000){
      this.$store.commit('clearMenu')
      this.$store.commit('setMenu',res.data.menu)
      this.$store.commit('setToken',res.data.token)
      this.$store.commit('addMenu',this.$router)
      this.$router.push({name:'home'})

    }else{
      this.$message.warning(res.data.message)
    }
  })
}
},
components: {
}
}
</script>
<style scoped>
.user{
  margin-top: 54px;
  margin-left: -35px;
}
.psd{
  margin-left: -35px;
  margin-right: 35px;
}
.log{
  margin-left:50px;
}
.bgc{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
}
.login{
  width: 420px;
  height: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: white;
}
.headimg{
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background-color: antiquewhite;
  left: 50%;
  transform: translate(-50%,-50%);
  overflow: hidden;
}
.headimg img{
  width: 100px;
}
</style>