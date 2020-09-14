<template>
  <div>
    <!-- dialog -->
    <el-dialog
      :title="isEdit ? '编辑' : '添加'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="handelDialogClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, queryRoleById, editRole } from '@/api/roles'
export default {
  name: 'AddAndEditDiglog',
  components: {},
  props: {
    // dialogVisible传递时请用.sync修饰符
    dialogVisible: {
      type: Boolean,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    editId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      ruleForm: { roleName: '', roleDesc: '' },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [{ required: false }]
      }
    }
  },
  created() {},
  mounted() {
    // console.log(this.editId) //=>Number:30
    if (this.editId) {
      this.queryRoleById()
    }
  },
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    handelDialogClose() {
      this.$refs.ruleForm.resetFields()
    },

    handleClose(done) {
      this.$refs.ruleForm.resetFields()
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('update:dialogVisible', false)
        })
        .catch(_ => {})
    },

    handelCancel() {
      this.$emit('update:dialogVisible', false)
    },

    handleConfirm() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return this.$message.error('填写内容不合法,请修改后再提交')
        }
        try {
          // 添加
          if (!this.isEdit) {
            return this.addRole()
          }
          // 编辑
          this.editRole()
        } catch (error) {
          this.$message.error('添加失败请检查填写信息无误后,稍后提交')
        }
      })
    },

    // add
    async addRole() {
      // if (Math.random() > 0.1) {
      //   JSON.parse('sdlfjlksadjflksjdflk')
      // }
      const res = await addRole(this.ruleForm)
      const { data, meta } = res
      if (meta.status !== 201) {
        return this.$message.error('添加角色失败')
      }
      // TODO: 刷新还是操作数组 推荐给到数组(变异方法),性能优化,但是有个问题,返回roleId,要求的是Id,需要处理
      this.$emit('success', data)
      this.$message.success('添加角色成功')
      this.$emit('update:dialogVisible', false)
    },

    // queryRoleById
    async queryRoleById() {
      try {
        const { data, meta } = await queryRoleById(this.editId)
        // console.log(meta)
        if (meta.status !== 200) {
          return this.$message.error('角色查询失败')
        }
        // TODO: 查询成功时,将数据给到表单,不给提示
        // console.log(data)
        this.ruleForm.roleName = data.roleName
        this.ruleForm.roleDesc = data.roleDesc
      } catch (error) {
        this.$message('获取编辑角色信息错误')
      }
    },

    // edit
    async editRole() {
      try {
        const { data, meta } = await editRole(this.editId, this.ruleForm)
        if (meta.status !== 200) {
          return this.$message.error('角色编辑失败')
        }
        // TODO：编辑成功,刷新父组件,或者改变父组件中的数组
        this.$emit('success', data)
        this.$message.success('编辑角色成功')
        this.$emit('update:dialogVisible', false)
      } catch (error) {
        this.$message('编辑时出错')
      }
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped></style>
