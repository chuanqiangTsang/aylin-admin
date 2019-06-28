<template>
  <div class="add-cate">
     <content-top title="商品分类">
        <template slot="right">
           <el-button type="text" @click="addNewCate" size="mini">+ 添加新类目</el-button>
        </template>
     </content-top>
       <common-table
        :tableData="tableData"
        :columns="columns"
        :total="total"
        rowKey="id"
        @page-change="pageChange"
      >

        <template slot="status" scope="scope">
          <el-checkbox v-model="scope.row.active" @change="onStatusChange(scope)"></el-checkbox>
        </template>

        <template slot="operation" scope="scope">
          <el-button v-if="!scope.row.isChild" type="primary" icon="plus" size="mini" @click="addSubCate(scope)">添加子类目</el-button>
          <i class="op-icon el-icon-edit-outline" @click="edit(scope)"></i>
          <i class="op-icon del el-icon-delete-solid" @click="del(scope)"></i>
        </template>
       </common-table>

     <CateDialog v-model="visible" :data="cateData" @ok="onCateOk" :parentCate.sync="parentCate"/>
  </div>
</template>
<script>
  import ContentTop from '@/components/global/content-top.vue';
  import CateDialog from './dialog/add-cate.vue';
  import CommonTable from '@/components/global/common-table.vue';
  import productApi from '@/apis/product';
  import { 
    Button, Checkbox, MessageBox
  } from 'element-ui';
  export default {
    name: 'add-cate',
    components: {
      ContentTop,
      CateDialog,
      CommonTable,
      ElButton: Button,
      ElCheckbox: Checkbox
    },
    data(){
      return {
        visible: false,
        parentCate: '',
        parentId: '', // 父级id，添加子类用
        tableData: [],
        columns: [
           {
            dataIndex: 'index',
            label:"序号",
            align: 'center',
            width: 60
          },
          {
            dataIndex: 'cateName',
            label: "分类名称"
          },
          {
            dataIndex: 'active',
            label: '状态',
            slotScope: 'status'
          },
          {
            dataIndex: 'operation',
            label: '操作',
            slotScope: 'operation'
          }
        ],
        cateData: '',
        total: 50, // 总条数,
        curPage: 1
      }
    },
    mounted(){
      this.getCategory();
    },
    methods: {

      /** 
       * 获取分类
      */
     async getCategory(parentId){
       const params = {
         page: this.curPage,
         parentId
       }
       const res = await productApi.getCategory(params);
       if (res.errcode === 0) {
         const { list, total } = res.data;
         list.forEach((item, index) => {
           item.index = index + 1;
         });

         this.tableData = list;
         this.total = total;
       }
     },

     async onStatusChange(scope){ 
       const  { id, active } = scope.row;
       const params = { id, status: active }
       const res = await productApi.updateStatus(params);
       if (res.errcode === 0) {
         this.$message.success('更新状态成功');
       } else {
         this.$message.error('更新状态失败');
       }
     },

      addNewCate(){
        this.visible = true;
      },
      addSubCate(scope){
        const { row } = scope;
        this.parentCate = row.cateName;
        this.parentId = row.id;
        this.visible = true;
      },
      edit(scope){
        this.cateData = {};
        const { row } = scope;
        this.cateData = row;
        this.visible = true;
        window.console.log(this.cateData);
      },
      del(scope){
        MessageBox.confirm('确定删除这个类目吗？','提示',{
          type: 'warning'
        }).then(async () => {
          const { id } = scope.row;
          const res = await productApi.delete(id);
          if (res.errcode === 0) {
            this.$message.success('删除成功');
            this.getCategory();
          } else {
            this.$message.error('删除失败');
          }
        })
      }, 
      async handleUpdate(params){
        const res = await productApi.update(params);
        if (res.errcode === 0) {
          this.$message.success('更新成功');
          this.getCategory();
        } else {
          this.$message.success('更新失败');
        }
      },
      async handleAddSubCate(data){
        const { cateName, orderNum } = data;
        const { parentId } = this;
        const params = {
          cateName,
          orderNum,
          parentId: parentId
        };

        const res = await productApi.addSubCate(params);
        if (res.errcode === 0) {
          this.$message.success('添加子类成功');
          setTimeout(() => {
            this.getCategory();
          }, 500);
        } else {
          this.$message.error('添加子类失败');
        }
      },
      async onCateOk(data){
        if(data.id) { // 修改
          const { id, cateName, orderNum } = data;
          const params = {
            id,
            cateName,
            orderNum
          } 
          this.handleUpdate(params);
        } else if(data.isAddSubCate) { // 添加子类
          this.handleAddSubCate(data);
        } else { // 新增
          const res = await productApi.addCategory(data);
          if (res.errcode === 0) {
            this.getCategory();
          }
        }
      },
      pageChange(page){
        this.curPage = page;
        this.getCategory();
      }
    }
  }
</script>
<style lang="less">
   @import '../../styles/common.less';
   .add-cate {
     text-align: left;
     height: 100%;
     .el-input {
        width: 360px;
      }
      .order-tip {
        margin-left: 8px;
        color: red;
        font-size: 12px;
      }
      .op-icon {
        font-size: 18px;
        margin-left: 24px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        &.del {
          color: #F56C6C;
        }
      }
   }
</style>