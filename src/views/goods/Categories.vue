<template>
  <div class="categories">
    <bread :navs="navs"></bread>
    <el-card>
      <el-row>
        <el-button type="primary">添加商品</el-button>
      </el-row>

      <!-- table -->
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="cat_id"
          :tree-props="{ children: 'children' }"
        >
          <el-table-column label="#" type="index"
            ><template slot-scope="scope">
              {{ scope.row.index }}
            </template></el-table-column
          >
          <el-table-column prop="cat_name" label="分类名称" width="180">
          </el-table-column>
          <el-table-column label="是否有效" width="180">
            <template slot-scope="scope">
              {{ scope.cat_deleted ? '否' : '是' }}
            </template>
          </el-table-column>
          <el-table-column label="排序">
            <template slot-scope="scope">
              <el-tag :type="levelTag[scope.row.cat_level]"
                >{{ tagContent[scope.row.cat_level] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column>
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </el-table-column>
        </el-table>

        <pagenation
          :queryData="queryData"
          :total="total"
          @queryDataChange="getCate"
        ></pagenation>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getCate } from '@/api/categories'

export default {
  name: 'Categories',
  components: {
    bread: () => import('@/components/Bread'),
    pagenation: () => import('@/components/Pagenation')
  },
  props: {},
  data() {
    return {
      navs: [
        { path: '', title: '商品管理' },
        { path: '', title: '商品分类' }
      ],
      tableData: [],
      queryData: { pagenum: 1, pagesize: 6 },
      // for tag
      levelTag: ['', 'success', 'warning'],
      tagContent: ['一级', '二级', '三级'],
      total: 0
    }
  },
  created() {
    this.getCate()
  },
  mounted() {},
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    async getCate() {
      try {
        const { data, meta } = await getCate(this.queryData)
        if (meta.status !== 200) {
          return this.$message.error('failed')
        }
        const { result } = data
        this.total = data.total
        // add index for show
        result.forEach((item, i) => {
          result[i].index = i + 1
        })
        this.tableData = result
      } catch (error) {
        this.$message('error')
      }
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
