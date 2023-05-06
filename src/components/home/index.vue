<template>
  <el-container class="home-con">
    <el-header>
      <div class="title">
        <!-- 标题 -->
        <span>后台管理系统</span>
      </div>
      <!-- 退出登录 -->
      <el-button type="info" @click="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单 -->
        <el-menu background-color="#243137" text-color="#fff" router>
          <el-submenu :index="'' + i1.path" v-for="i1 in menuList" :key="i1.id">
            <!-- 一级菜单 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ i1.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group v-for="i2 in i1.children" :key="i2.id">
              <el-menu-item :index="'/home/' + i2.path">{{ i2.authName }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: []
    }
  },
  methods: {
    logout() {
      /*  清除本地 token */
      window.sessionStorage.clear()
      /* 路由跳转到登录页面 */
      this.$router.push('/login')
    },
    /* 获取菜单列表 */
    async getMenuList() {
      const { data: res } = await this.$axios.get('menus')
      this.menuList = res.data
      // console.log(this.menuList)
    }
  },
  mounted() {
    this.getMenuList()

  },
}
</script> 

<style lang="less" scoped>
.home-con {
  color: #fff;
  height: 100%;
}

.el-header {
  display: flex;
  background-color: #243137;
  justify-content: space-between;
}

.title {
  color: #fff;
  font-size: 25px;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #243137;
}

.el-main {
  color: black;
}
</style>