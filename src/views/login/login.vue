<template>
  <div class="login-container">
    <div class="form">
      <h2>系统登录</h2>
      <el-form>
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-info" v-model="password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit">确定</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {  Form, FormItem, Input, Button } from 'element-ui';
  import LoginApi from '@/apis/login'
  export default {
    name: 'login',
    components: {
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElButton: Button
    },
    data(){
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async submit(){
        const res = await LoginApi.getTest();
        if(res.errcode === 0){
          // 保存token
          window.localStorage.setItem('token', res.data);
          this.$router.push({
            name: 'home'
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .login-container {
    background: #2d3a4b;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
     .form {
      width: 360px;
      height: 360px;
      h2 {
        color: white;
        font-size: 24px;
        margin-bottom: 20px;
      }
      /deep/.el-form-item__label {
        color: white;
        text-align: left;
      }
    }
  }
</style>



