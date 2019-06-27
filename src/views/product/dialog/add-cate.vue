<template>
  <div class="add-cate-dialog">
    <el-dialog
      :visible="value"
      @close="close"
      :title="title"
      width="600px"
    >
      <div class="right-content">
       <el-form :model="formData" label-position="right" label-width="90px" inline>
         <el-form-item v-if="parentCate">
           <span slot="label">父级分类：</span>
          <span>{{ parentCate }}</span>
        </el-form-item>

         <el-form-item >
           <span slot="label"><i class="required">*</i> 类目名称</span>
          <el-input v-model="formData.cateName" placeholder="请输入类目名称"></el-input>
        </el-form-item>

        <el-form-item label="排序序号">
          <el-input v-model="formData.orderNum" placeholder="请输入排序序号"></el-input>
          <el-tooltip class="item" effect="dark" content="序号越大越靠前" placement="right">
            <i class="el-icon-question order-tip-icon"></i>
          </el-tooltip>
        </el-form-item>
       </el-form>
     </div>

     <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
  import { 
    Form, FormItem, Input, Dialog, Button, Tooltip
  } from 'element-ui';
  export default {
    name: 'add-cate',
    components: {
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElDialog: Dialog,
      ElButton: Button,
      ElTooltip: Tooltip
    },
    props: ['value', 'data', 'parentCate'],
    computed: {
      title(){
        if(!this.parentCate){
          return '新增商品分类'
        } else {
          return '新增商品子类'
        }
      }
    },
    data(){
      return {
        formData: {
          cateName: '',
          orderNum: 0
        }
      }
    },
    mounted(){
      window.console.log('mounted');
    },
    watch:{
      data(val){
        if (val) { // 弹窗展示
          this.formData = val;
        }
      }
    },
    methods: {
      reset(){
        this.formData = {
          cateName: '',
          orderNum: 0
        }
      },
      close(){
        this.$emit('input', false);
        this.$emit('update:parentCate', '');
        // setTimeout(this.reset, 500);
        // this.reset();
      },
      confirm(){
        if (this.parentCate) {
          this.formData.isAddSubCate = true;
        }
        this.$emit('ok', this.formData);
        this.close();
      }
    }
  }
</script>
<style lang="less">
   @import '../../../styles/common.less';
   .add-cate-dialog {
     .el-input {
        width: 360px;
      }
      .order-tip-icon {
        width: 24px;
        height: 24px; 
        line-height: 24px;
        font-size: 18px;
        display: inline-block;
        margin-left: 8px;
      }
   }
</style>