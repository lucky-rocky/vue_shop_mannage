<template>
  <div class="pagenation">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryData.pagenum"
      :page-sizes="[2, 3, 4, 6, 8]"
      :page-size="queryData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagenation',
  components: {},
  props: {
    queryData: {
      type: Object,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    handleSizeChange(val) {
      this.queryData.pagesize = val
      this.$emit('queryDataChange')
    },
    handleCurrentChange(val) {
      this.queryData.pagenum = val
      this.$emit('queryDataChange')
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
