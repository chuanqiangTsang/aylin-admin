<template>
  <div class="add-cate">
     <ContentTop title="商品分类" />
       <common-table
        :tableData="tableData"
        :columns="columns"
        :showTop="true"
        rowKey="id"
      >
        <template slot="tableTop">
           <el-button type="primary" @click="addNewCate">添加新类目</el-button>
        </template>

        <template slot="status" scope="scope">
          <el-checkbox v-model="scope.row.status"></el-checkbox>
        </template>

        <template slot="operation" scope="scope">
          <el-button v-if="!scope.row.isChildren" type="primary" icon="plus" size="mini" @click="addSubCate(scope)">添加子类目</el-button>
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
  import ProductApi from '@/apis/product';
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
        tableData: [
          {
            index: 0,
            id: 1,
            cateName: '男装',
            status: true,
            orderNum: 10,
            hasChildren: true,
            children: []
          },
          {
            index: 0,
            id: 2,
            cateName: '女装',
            status: false,
            orderNum: 9
          }
        ],
        columns: [
           {
            dataIndex: 'index',
            label:"序号"
          },
          {
            dataIndex: 'cateName',
            label: "分类名称"
          },
          {
            dataIndex: 'status',
            label: '状态',
            slotScope: 'status'
          },
          {
            dataIndex: 'operation',
            label: '操作',
            slotScope: 'operation'
          }
        ],
        cateData: ''
      }
    },
    methods: {
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
        const { row } = scope;
        this.cateData = row;
        this.visible = true;
        window.console.log(this.cateData);
      },
      del(scope){
        MessageBox.confirm('确定删除这个类目吗？','提示',{
          type: 'warning'
        }).then(() => {
          const { row } = scope;
          const index = row.index;
          this.tableData.splice(index, 1);
        })
      },  
      async onCateOk(data){
        if(data.id) { // 修改
          const index = this.tableData.findIndex(item => item.id === data.id);
          this.tableData[index] = data;
        } else if(data.isAddSubCate) { // 添加子类
          const index = this.tableData.findIndex(item => item.id === this.parentId);
          this.tableData[index].children.push({
              index: 89,
              id: 9090,
              cateName: data.cateName,
              status: true,
              orderNum: data.orderNum,
              hasChildren: false,
          });

          window.console.log(this.tableData);
        } else { // 新增
          const res = ProductApi.addCategory(data);
          
          this.tableData.push(data);
        }
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