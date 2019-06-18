<template>
  <div class="table-list" ref="tableList">
      <div class="table-top" ref="tableTop" v-if="showTop">
        <slot name="tableTop"></slot>
      </div>
      <div class="table-box">
        <el-table 
          :data="tableData"
          size="small"
          header-row-class-name="common-table-header"
          :height="tableHeight"
          :row-key="rowKey"
        >
          <el-table-column
            v-for="(item, index) in  columns" 
            :prop="item.dataIndex"
            :label="item.label"
            :key="index"
          >
            <template slot-scope="scope">
              <slot :name="item.slotScope" :row="scope.row" v-if="item.slotScope"></slot>
              <span v-else>{{ scope.row[item.dataIndex] }}</span>
            </template>
          </el-table-column>

          <!-- 空数据 -->
          <div slot="empty">
            暂无数据啊
          </div>
        </el-table>
      </div>
      <div class="pager" ref="tablePager">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          background
        ></el-pagination>
      </div>
    </div>
</template>
  <script>
  import { Table, TableColumn, Pagination } from 'element-ui';
  export default {
    name: "common-table",
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElPagination: Pagination,
    },
    props: ["tableData", "columns", "showTop", "rowKey"],
    data(){
      return {
        tableHeight: 0
      }
    },
    methods: {
      setTableHeight(){
        this.$nextTick(() => {
          const Height = this.$refs.tableList.clientHeight - 32;
          const topHeight = this.showTop ? this.$refs.tableTop.clientHeight + 20 : 0;
          const pagerHeight = this.$refs.tablePager.clientHeight + 16;
          this.tableHeight = Height - topHeight - pagerHeight;
        })
      }
    },
    mounted(){
      this.setTableHeight();
    }

  }
</script>
<style lang="less">
  @import '../../styles/common.less';
</style>