<template>
  <div class="login-container">
    <div class="form">
      <h2>系统登录</h2>
      <el-form :rules="rules" ref="form" :model="formData">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" required>
          <el-input prefix-icon="el-icon-info" v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit">确定</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {  Form, FormItem, Input, Button } from 'element-ui';
  import systemApi from '@/apis/system'

  import utils from '@/utils';

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
        formData: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {validator: utils.validator.validateUserName}
          ],
          password: [
            { required: true, message: '请输入密码' }
          ]
        }
      }
    },
    methods: {
      submit(){
        this.$refs.form.validate( async (valid) => {
          if(valid){
            const { username, password } = this.formData;
            const params = { username,  password }
            const res = await systemApi.login(params);
            if (res.errcode === 0) {
              // 保存token
              const { token, exp } = res.data;
              localStorage.setItem('token', token);
              // 保存过期时间
              const now = new Date().getTime();
              const expTime = now + exp*1000;
              localStorage.setItem('exp', expTime);
              this.$router.push({
                name: 'product'
              }) 
            } else {
              this.$message.error('用户名或密码错误');
            }
          }
        })
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



