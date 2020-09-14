<template>
  <el-container class="home">
    <!-- header -->
    <el-header>
      <div class="home_logo">
        <img src="../../assets/login_bg4.jpg" />
      </div>
      <p>欢迎你&nbsp;&nbsp;{{ username }}</p>
      <h1>后台管理系统</h1>
      <el-button class="fr" @click="logOut">退出登录</el-button>
    </el-header>

    <el-container>
      <!-- nav -->
      <el-aside :width="isCollapse ? '' : '200px'">
        <!-- toggle -->
        <div class="collapse" @click="isCollapse = !isCollapse">| | |</div>
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :router="true"
        >
          <el-submenu
            :index="menu.id + ''"
            v-for="menu in menuList"
            :key="menu.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{ menu.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="'/' + secondMenu.path"
                v-for="secondMenu in menu.children"
                :key="secondMenu.id"
                @click="setActiveMenu(secondMenu)"
              >
                <i class="el-icon-location"></i>
                <span slot="title">{{ secondMenu.authName }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- main -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { token } from '@/config'
import { removeItem } from '@/utils/storage'
import { getMenusList } from '@/api/home'
export default {
  name: 'Home',
  components: {},
  props: {},
  data() {
    return {
      username: 'mmm',
      isCollapse: false,
      activeMenu: '',
      menuList: []
    }
  },
  created() {},
  mounted() {
    // this.username = this.$route.query.username
    this.getMenusList()
    this.setActiveMenu()
  },
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    logOut() {
      removeItem(token)
      this.$router.push('/login')
      this.$message('登出成功')
    },

    // aside
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },

    // get menus
    async getMenusList() {
      try {
        const res = await getMenusList('menus')
        const { data, meta } = res
        // validate stateCode
        if (meta.status && meta.status !== 200) {
          return this.$message('获取菜单列表失败! 请重试')
        }
        // if (Math.random() > 0.1) {
        //   JSON.parse('sdlfjlksadjflksjdflk')
        // }
        this.menuList = data
        console.log(data)
      } catch (error) {
        // catch error
        this.$message('获取菜单列表失败!')
      }
    },

    setActiveMenu(secondMenu) {
      // console.log('/' + secondMenu.path)
      this.activeMenu = location.hash.slice(1)
    }
  },
  filter: {},
  computed: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    background-color: #666;
    display: flex;
    align-items: center;
    position: relative;
    .home_logo {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: rotate 10s linear infinite;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      font-size: 14px;
      color: #fff;
      margin-left: 10px;
    }
    h1 {
      font-size: 25px;
      position: absolute;
      left: 25%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin: 0px;
    }
    .fr {
      position: absolute;
      right: 0;
      margin-right: 20px;
    }
  }
  .el-container {
    .el-aside {
      background-color: #555 !important;
      .collapse {
        color: #fff;
        background-color: black;
        width: 100%;
        font-size: 12px;
        height: 25px;
        text-align: center;
        line-height: 25px;
      }
      .el-menu {
        border-right: 0;
      }
      /deep/.el-menu-item-group__title {
        padding: 0;
      }
    }
    .el-main {
      background-color: #ccc;
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
