<template>
  <div class="aside">
    <h3 class="aside-title">产品管理</h3>
    <div class="menu">
      <el-menu
        :default-active="curPage"
        background-color="#001529"
        text-color="#fff"
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <span>商品管理</span>
          </template>
          <el-menu-item index="/product/list">商品列表</el-menu-item>
          <el-menu-item index="/product/add">新增商品</el-menu-item>
          <el-menu-item index="/product/add-category">商品分类</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>订单管理</span>
          </template>
          <el-menu-item index="/order/list">订单列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>  
  import { Menu, Submenu, MenuItem } from 'element-ui' 
  export default {
    name: "app-aside",
    components: {
      ElMenu: Menu,
      ElSubmenu: Submenu,
      ElMenuItem: MenuItem
    },
    computed: {
      curPage(){
        const { path } = this.$route;
        return path;
      }
    }
  }
</script>
<style lang="less">
  .aside {
    width: 200px;
    height: 100%;
    background: #001529;
    &-title {
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: rgba(255,255,255,.5);
    }
    .menu {
      /deep/.el-menu {
        border-right: none;
      }
    }
  }
</style>