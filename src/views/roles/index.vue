<template>
  <div class="roles">
    <!-- nav -->
    <bread :navs="navs"></bread>
    <!-- card -->
    <el-card>
      <el-row>
        <el-button type="primary" class="addRole" @click="handleAdd"
          >添加角色</el-button
        >
      </el-row>
      <!-- table -->
      <template>
        <el-table :data="tableData" style="width: 100%" stripe border>
          <el-table-column type="expand" width="50">
            <template slot-scope="scope">
              <expand :roleData="scope.row"></expand>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#" width="50"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"> </el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handelEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  icon="el-icon-edit"
                  @click="handelDelete(scope.row)"
                  >删除</el-button
                >
                <el-button
                  size="small"
                  type="warning"
                  icon="el-icon-edit"
                  @click="handelDispatchRights(scope.row)"
                  >分配权限</el-button
                >
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>

    <add-edit-dialog
      :dialogVisible.sync="dialogVisible"
      :isEdit="isEdit"
      @success="handleSuccess($event)"
      :editId="editId"
      v-if="dialogVisible"
    ></add-edit-dialog>

    <dispatch-dialog
      :dispatchDialogVisible.sync="dispatchDialogVisible"
      v-if="dispatchDialogVisible"
      :dispatchRoleRightsData="dispatchRoleRightsData"
      @refresh="getRoles"
    ></dispatch-dialog>
  </div>
</template>

<script>
import { getRoles, deleteRole } from '@/api/roles'
export default {
  name: 'Roles',
  components: {
    bread: () => import('@/components/Bread'),
    'add-edit-dialog': () => import('./components/Add_edit_dialog'),
    expand: () => import('./components/Expand'),
    'dispatch-dialog': () => import('./components/DispatchRights')
  },
  props: {},
  data() {
    return {
      navs: [
        { path: '', title: '权限管理' },
        { path: '', title: '权限列表' }
      ],
      tableData: [],
      // add and edit dialog attr
      dialogVisible: false,
      isEdit: false,
      editId: null,
      // dispatch rights dialog
      dispatchDialogVisible: false,
      dispatchRoleRightsData: {}
    }
  },
  created() {},
  mounted() {
    this.getRoles()
  },
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    async getRoles() {
      try {
        const res = await getRoles('roles')
        const { data, meta } = res
        if (meta.status !== 200) {
          return this.$message.error('请求失败')
        }
        // TODO: 给到表单数据
        this.tableData = data
      } catch (error) {
        this.$message('请求错误')
      }
    },

    // add
    handleAdd() {
      this.editId = null
      this.isEdit = false
      this.dialogVisible = true
    },

    // edit
    handelEdit(row) {
      console.log(row.id)
      this.editId = row.id
      this.isEdit = true
      this.dialogVisible = true
    },

    // add or edit successed => change the array
    handleSuccess(data) {
      if (!this.editId) {
        data.id = data.roleId
        delete data.roleId
        this.tableData.push(data)
        return false
      }

      // isEdit = true
      this.tableData.forEach((item, i) => {
        if (item.id === data.roleId) {
          this.tableData[i].id = data.roleId
          this.tableData[i].roleName = data.roleName
          this.tableData[i].roleDesc = data.roleDesc
        }
      })
    },

    // delete
    async handelDelete(row) {
      const res = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      if (res === 'confirm') {
        return this.deleteRole(row.id)
      } else {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async deleteRole(id) {
      try {
        const { meta } = await deleteRole(id)
        if (meta.status !== 200) {
          return this.$message.error('删除失败')
        }
        // TODO:改变数组(在数组中删除)
        const index = this.tableData.findIndex(item => {
          return item.id === id
        })
        this.tableData.splice(index, 1)
        this.$message.success('删除成功')
      } catch (error) {
        this.$message('删除时出错')
      }
    },

    // handelDispatchRights
    handelDispatchRights(row) {
      this.dispatchRoleRightsData = row
      this.dispatchDialogVisible = true
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.addRole {
  margin-bottom: 20px;
}
</style>
