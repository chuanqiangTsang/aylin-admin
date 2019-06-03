<template>
  <div class="add-dialog">
    <el-dialog
      :visible="value"
      @close="close"
      title="新增商品规规格"
      width="600px"
    >
      <div class="attr-table">
        <div class="attr-group" v-for="(item, index) in attrGroup" :key="index">
          <div class="group-name">
            <el-input 
              type="text"
              v-model="item.groupName"
              placeholder="请输入属性组名称"
              size="small"
            ></el-input>

            <el-button type="danger" size="small" @click="deleteGroup(index)">删除属性组</el-button>
          </div>
          <el-table
            :data="item.tableData"
            size="mini"
          >
            <!-- <el-table-column
              prop="attrName"
              label="属性名"
            >
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.attrName" size="small" placeholder="请输入属性名" />
              </template>
            </el-table-column> -->
            <el-table-column
              prop="attrVal"
              label="属性值"
            >
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.attrVal" size="small" placeholder="请输入属性值" />
              </template>
            </el-table-column>
            
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="deleteRow(index,scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="add-line">
            <el-button type="text" @click="addNewLine(index)">+ 新增属性</el-button>
          </div>
        </div>
        <div class="add-attr-group">
          <el-button type="text" size="small" @click="addAttrGroup">+ 添加属性组</el-button>
        </div>
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
    Dialog, Button, Table, TableColumn, Input
  } from 'element-ui';
  export default {
    name: 'add-attr',
    components:{
      ElDialog: Dialog,
      ElButton: Button,
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElInput: Input
    },
    props: ['value'],
    data(){
      return {
        attrGroup: [
          {
            groupName: '',
            tableData: [
              {
                attrName: '',
                attrVal: ''
              }
            ]
          }
        ]
      }
    },
    methods: {
      close(){
        this.$emit('input', false);
      },
      confirm(){
        this.$emit('confirm', this.attrGroup);
      },
      addAttrGroup(){
        this.attrGroup.push({
          groupName: '',
          tableData:[
            {
              attrName: '',
              attrVal: ''
            }
          ]
        })
      },
      deleteGroup(index){
        this.attrGroup.splice(index, 1);
      },
      addNewLine(index){
        this.attrGroup[index].tableData.push({
          attrName: '',
          attrVal: ''
        })
      }, 
      deleteRow(index ,scope){
        const { $index } = scope;
        this.attrGroup[index].tableData.splice($index, 1);
      }
    }
  }
</script>
<style lang="less">
  .add-dialog {
    .attr-table {
      max-height: 360px;
      overflow: auto;
      .attr-group {
        padding: 8px;
        box-sizing: border-box;
        margin-bottom: 16px;
        .group-name {
          button {
            margin-left: 16px;
          }
        }
      }
      .el-input {
        width: 200px;
      }
      .add-line {
        text-align: center;
      }
      .add-attr-group {
        text-align: center;
      }
    }
  }
</style>