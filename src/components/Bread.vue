<template>
  <div class="bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(nav, i) in navs"
        :key="i"
        :to="{ path: nav.path }"
        >{{ nav.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Bread',
  components: {},
  props: {
    navs: {
      type: Array,
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
  methods: {},
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.bread {
  margin: 5px 0 5px 10px;
}
</style>
