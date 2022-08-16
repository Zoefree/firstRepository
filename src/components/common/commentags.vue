<template>
<div>
  <el-tag size="small" v-for="(tag,index) in tags" :key="tag.name"
  :closable="tag.name !== 'home'" 
  :effect="$route.name === tag.name ? 'dark':'plain'"
  @click="changeMenu(tag)"
  @close="handleClose(tag,index)">
  {{ tag.label }}
  </el-tag>
</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
name: 'CommenTags',
data(){
  return {}
},
components: {
},
methods:{
   ...mapMutations({
  close:'closeTag'
   }),
  changeMenu(item){
    this.$router.push({name: item.name})
  },
  handleClose(tag,index){
    const length = this.tags.length - 1 //length是最后一个索引值 与index比
    this.close(tag)
    if (tag.name !== this.$route.name){
      return;//如果tag的名字和路由名称不一致  不必改变聚焦的焦点 dark
    }
    if (index === length){//如果是最后一个tag 路由焦点需要改为上一个tag的路由
      this.$router.push({
        name: this.tags[index-1].name
      })
    }else{
      this.$router.push({
        name: this.tags[index].name
      })
    }
    
  }
},
computed:{
  ...mapState({
    //映射 this.tags 为 store.state.tab.tabsList的值
       tags: state => state.tab.tabsList
  })
  }
}
</script>
<style scoped>
.el-tag{
cursor: pointer;
margin: 10px;
}
</style>