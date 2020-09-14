<template>
  <div class="expand">
    <el-row v-for="item in roleData.children" :key="item.id" class="rights">
      <div class="firstRights">
        <el-tag closable @close="handleDelete(item.id)">
          {{ item.authName }}</el-tag
        >
      </div>
      <div class="secondBox">
        <el-row
          class="secondRights"
          v-for="secondItem in item.children"
          :key="secondItem.id"
        >
          <div class="secondContent">
            <el-tag
              type="success"
              closable
              @close="handleDelete(secondItem.id)"
              >{{ secondItem.authName }}</el-tag
            >
          </div>
          <div class="thirdRights">
            <el-tag
              v-for="thirdItem in secondItem.children"
              :key="thirdItem.id"
              class="tag"
              closable
              type="warning"
              @close="handleDelete(thirdItem.id)"
              >{{ thirdItem.authName }}</el-tag
            >
          </div>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
import { deleteRoleRight } from '@/api/rights'
export default {
  name: 'Expand',
  components: {},
  props: {
    roleData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    console.log(this.roleData)
  },
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    async handleDelete(id) {
      try {
        const { data, meta } = await deleteRoleRight(this.roleData.id, id)
        if (meta.status !== 200) {
          return this.$message.erroe('failed')
        }
        // TODO:no msg
        // we can change a property of a object directly
        this.roleData.children = data
      } catch (error) {
        this.$message('出错')
      }
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.rights {
  display: flex;
  align-items: center;
  border-top: 1px solid #666;
  padding: 10px;
  &:last-child {
    border-bottom: 1px solid #666;
  }
  .firstRights {
    flex: 3;
  }
  .secondBox {
    flex: 8;
  }
  .secondRights {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #666;
    padding: 10px;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .secondContent {
      flex: 4;
    }
    .thirdRights {
      flex: 8;
    }
  }
  .tag {
    margin: 5px;
  }
}
</style>
