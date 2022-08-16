<template>
  <el-menu :collapse="isCollapse">
    <h3>{{ isCollapse ? "后台" : "通用管理后台" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item
        v-for="(subItem, subIndex) in item.children"
        :key="subItem.path"
        :index="subIndex.toString()"
        @click="clickMenu(subItem)"
      >
        {{ subItem.label }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "LeftNav",
  data() {
    return {
      menu: [],
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push(item.path);
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  },
  components: {},
};
</script>
<style scoped>
.el-menu {
  background-color: #545c64;
  height: 1000px;
}
.el-menu-item {
  background-color: #545c64;
}
.el-menu-item:hover {
  background-color: rgb(236, 245, 255);
}
span {
  color: rgb(3, 3, 3);
}
</style>


