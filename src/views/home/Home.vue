<template>
  <div id="home">
    <!-- 顶部 -->
    <el-menu
      class="el-menu-demo home-header"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item>
        <img src="../../assets/login_bg.jpg" alt />
      </el-menu-item>
      <el-menu-item index="1" class="noChange">管理系统</el-menu-item>
      <el-menu-item index="3" class="noChange loginOut" @click="loginOut"
        >退出登录</el-menu-item
      >
    </el-menu>
    <el-container class="home-container">
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 左边侧边栏 -->
        <el-row class="tac">
          <el-menu
            :default-active="active_style"
            class="el-menu-vertical-demo user"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#3791fa"
            :collapse="isCollapse"
            :collapse-transition="false"
            unique-opened
            router
          >
            <!-- 点击折叠 -->
            <div class="open_close" @click="open_close">{{ text }}</div>
            <!-- 一级菜单 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuList"
              :key="item.id"
            >
              <template slot="title">
                <i :class="icons[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item-group>
                <el-menu-item
                  :index="'/' + cItem.path"
                  v-for="cItem in item.children"
                  :key="cItem.id"
                  @click="changeActive"
                >
                  <i class="el-icon-menu"></i>
                  <span>{{ cItem.authName }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-aside>
      <!-- 右边主体 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { token } from '@/config'
import { removeItem } from '@/utils/storage'
import { getMenusList } from '@/api/home'
export default {
  name: 'home',
  data() {
    return {
      isCollapse: false,
      menuList: [],
      text: '<<<',
      active_style: '',
      icons: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      }
    }
  },
  methods: {
    loginOut() {
      removeItem(token)
      this.$router.push('/login')
    },
    open_close() {
      if (!this.isCollapse) {
        // 折叠
        this.text = '>>>'
        this.isCollapse = true
      } else {
        this.text = '<<<'
        this.isCollapse = false
      }
    },
    changeActive() {
      this.active_style = location.hash.slice(1)
    }
  },
  async mounted() {
    const res = await getMenusList('/menus')
    console.log(res)
    this.menuList = res.data
    this.changeActive()
  }
}
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin: 0;
  padding: 0;
  overflow: hidden;
  .home-container {
    height: 100%;
  }
  .home-header {
    position: relative;
    color: #fff;
    border-bottom: none;
    background-color: #363c44;
    .noChange {
      color: #fff !important;
      border-bottom: none !important;
    }
    .loginOut {
      position: absolute;
      right: 0;
    }
    img {
      height: 100%;
    }
  }
  .tac {
    height: 100%;
  }
  .home_aside {
    height: 100%;
    width: 100%;
    border-right: 0;
  }
  .user {
    height: 100%;
    border-right: 0;
  }
  .main {
    padding: 0;
    border: none;
    background-color: #ccc;
  }
  .open_close {
    background-color: #495163;
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    font-size: 18px;
    display: inline-block;
    width: 100%;
  }
}
</style>
