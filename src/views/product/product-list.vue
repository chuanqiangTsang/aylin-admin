<template>
  <div class="product-list">
    <ContentTop title="产品列表" />
    <common-table
      :tableData="tableData"
      :columns="columns"
      :showTop="true"
    >
      <template slot="tableTop">
        <el-input placeholder="请输入关键字"></el-input>
        <el-button @click="load">确定</el-button>
      </template>

      <template slot="operation" scope="scope">
        <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>

    </common-table>
  </div>
</template>

<script>
  import { Input, Button } from 'element-ui';
  import ContentTop from '@/components/global/content-top.vue';
  import CommonTable from '@/components/global/common-table.vue';
  export default {
    name: 'product-list',
    components: {
      ContentTop,
      CommonTable,      
      ElInput: Input,
      ElButton: Button
    },
    data(){
      return {
        tableData: [],
        columns: [
          {
            dataIndex: 'index',
            label:"序号"
          },
          {
            dataIndex: 'productName',
            label: "产品名称"
          },
          {
            dataIndex: "operation",
            label: '操作',
            slotScope: 'operation'
          }
        ]
      }
    },

    methods: {
      load(){
        let arr = []
          for(let i = 0; i < 3; i++) {
          arr.push({
            index: i + 1,
            productName: `商品名称${i+1}`
          })
        }
        this.tableData = arr;
      },

      edit(scope){
        const { row } = scope;
        window.console.log(row);
      }
    },
    mounted(){
      for(let i = 0; i < 25; i++) {
        this.tableData.push({
          index: i + 1,
          productName: `商品名称${i+1}`
        })
      }
    }
  }
</script>

<style lang="less">
  @import '../../styles/common.less';
  .product-list {
    height: 100%;
  }
</style>


