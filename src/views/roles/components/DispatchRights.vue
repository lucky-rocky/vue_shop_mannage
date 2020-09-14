<template>
  <div class="disPatch">
    <!-- dialog -->
    <el-dialog
      title="分配权限"
      :visible.sync="dispatchDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        check-on-click-node
        :default-checked-keys="defaultArray"
        :props="defaultProps"
        ref="tree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllRights, dispatchRoleRights } from '@/api/rights'
export default {
  name: 'Dispatch',
  components: {},
  props: {
    dispatchDialogVisible: {
      type: Boolean,
      required: true
    },
    dispatchRoleRightsData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      treeData: [],
      defaultArray: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      ridsIds: [] // for submit
    }
  },
  created() {
    this.getAllRights()
    this.getDefault(this.dispatchRoleRightsData.children)
  },
  mounted() {},
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('update:dispatchDialogVisible', false)
        })
        .catch(_ => {})
    },

    handelCancel() {
      this.$emit('update:dispatchDialogVisible', false)
    },

    handleConfirm() {
      this.dispatchRoleRights()
    },

    async getAllRights() {
      try {
        const { data, meta } = await getAllRights('tree')
        if (meta.status !== 200) {
          return this.$message.error('failed')
        }
        // TODO: give the treeData data, no msg
        this.treeData = data
        console.log(data)
      } catch (error) {
        this.$message('获取权限时出错')
      }
    },

    // get default checked array
    // push it witch hasnot children
    getDefault(arr) {
      arr.forEach(item => {
        if (!item.children) {
          return this.defaultArray.push(item.id)
        }
        this.getDefault(item.children)
      })
    },
    getRidsIds(arr) {
      arr.forEach(item => {
        this.ridsIds.push(item.id)
      })
    },

    // diapatch rights
    async dispatchRoleRights() {
      try {
        const ridsArray = this.$refs.tree.getCheckedNodes(false, true)
        this.getRidsIds(ridsArray)
        const rids = this.ridsIds.join(',')
        const { meta } = await dispatchRoleRights(
          this.dispatchRoleRightsData.id,
          rids
        )
        if (meta.status !== 200) {
          return this.$message.error('failed')
        }
        this.$emit('refresh')
        this.$emit('update:dispatchDialogVisible', false)
        this.$message.success('success')
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
