<template>
<div class="box">
    <div class="colle" @click="collapseMenu">
      <img src="../../assets/images/管理1.png" width="30px" />
    </div>
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" 
        :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="headermy">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../../assets/images/我的.png" alt=""/>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "Header",
  methods: {
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },
  computed:{
    ...mapState({
    //将store中的tabslist数据注入  
    //state.tab.tabsList state中找tab文件再找tabsList数据
      tags: state => state.tab.tabsList
    })
  },
  components: {},
};
</script>
<style scoped>
.headermy {
  background-color: aliceblue;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  right: 10px;
  position: absolute;
}
.headermy img{
  width: 60px;
}
.bread{
  margin-left: 15px;
  margin-top: 15px;
}
.colle{
  margin-top: 10px;
}
.box{
  width: 100%;
  display: flex;
}
</style>