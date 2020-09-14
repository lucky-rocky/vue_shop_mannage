<template>
  <div class="login">
    <!-- 背景无限轮播 -->
    <!-- <div class="login_bg">
      <ul>
        <li></li>
      </ul>
    </div> -->

    <el-card shadow="hover">
      <!-- 登录logo -->
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>

        <el-form-item class="fr">
          <el-button type="primary" @click="onLogin">登录</el-button>
          <el-button type="info" @click="onFormReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      ruleForm: { username: 'admin', password: '123456' },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    // reset
    onFormReset() {
      this.$refs.ruleForm.resetFields()
    },

    // to login
    onLogin() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) {
          return this.$message.error('用户名或密码不合法')
        }
        // validate seccess
        try {
          const res = await login('login', this.ruleForm)
          const { data, meta } = res
          if (meta.status !== 200) {
            return this.$message.error('用户名或密码错误')
          }
          // 将token存入本地实现持久化,之后使用vuex实现全局化
          this.$store.commit('setUserToken', data.token)
          // TODO:  跳转
          this.$router.push('/home')
          this.$message.success('登录成功')
        } catch (error) {
          this.$message.error('未知出错')
        }
      })
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.login {
  background-image: url('../../assets/login_bg.jpg');
  background-size: cover;
  width: 100%;
  height: 100%;
  background-color: red;
  position: relative;
  .el-card {
    padding-top: 50px;
    width: 400px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: visible;
  }
  .logo {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00ffec66;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .fr {
    float: right;
  }
}
</style>
