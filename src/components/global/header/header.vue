<template>
  <div class="header">
    <div class="logo">
      <h2>LOGO</h2>
    </div>
    <div class="user">
      <el-dropdown trigger="click">
        <div class="avatar">
          <span class="circle"></span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-user"></i> 个人信息</el-dropdown-item>
          <el-dropdown-item divided> <div @click="logout"> <i class="el-icon-remove"></i> 退出登录</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
  import systemApi from '@/apis/system';

  export default {
    name: "app-header",
    components: {
      ElDropdown: Dropdown,
      ElDropdownMenu: DropdownMenu,
      ElDropdownItem: DropdownItem
    },
    methods: {
      async logout(){
        const res = await systemApi.logout();
        console.log(res);
        if (res.errcode === 0) {
          localStorage.removeItem('token');
          localStorage.removeItem('exp');
          this.$router.push({
            name: 'login'
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      h2 {
        font-size: 24px;
        color: red;
      }
    }
    .user {
      .avatar {
        .circle {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: red;
          vertical-align: middle;
        }
      }
    }
  }
</style>