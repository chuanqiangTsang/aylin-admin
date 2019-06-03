<template>
  <div class="add-product">
    <ContentTop title="新增商品" />
    <div class="right-content">
      <el-form :model="formData" label-position="right" label-width="90">
        <el-form-item label="商品名称">
          <el-input v-model="formData.produdctName" placeholder="请输入产品名称"></el-input>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="dds"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-input v-model="formData.category"></el-input>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-button type="primary" size="small" @click="addAttrs">添加</el-button>
        </el-form-item>
       
      </el-form>
    </div>
    <AttrDialog v-model="showAddAttr" @confirm="onAttrDialogConfirm" />
  </div>
</template>
<script>
  import ContentTop from '@/components/global/content-top.vue';
  import { 
    Form, FormItem, Input, Upload, Button
  } from 'element-ui';
  import AttrDialog from './dialog/add-attr.vue';
  export default {
    name: "add-product",
    components: {
      ContentTop,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElUpload: Upload,
      ElButton: Button,
      AttrDialog,
    },
    data(){
      return {
        formData: {
          produdctName: '',
          category: ''
        },
        showAddAttr: false
      }
    },
    methods: {
      addAttrs(){
        this.showAddAttr = true;
      },
      
      /**
       * 将属性转成sku组合 
      */ 
      onAttrDialogConfirm(data) {
        if(data.length === 0) return ;
       // todo 生成sku
      }
    }
  }
</script>
<style lang="less">
  @import '../../styles/common.less';
  .add-product {
    text-align: left;
    .el-input {
      width: 360px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    .avatar {
      width: 80px;
      height: 80px;
      display: block;
    }
  }
</style>