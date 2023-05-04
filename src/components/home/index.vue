<template>
  <div>
    <!-- 退出登录 -->
    <el-button type="danger" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    logout() {
      /*  清除本地 token */
      window.sessionStorage.clear()
      /* 路由跳转到登录页面 */
      this.$router.push('/login')
    }
  }
}
</script>

<style></style>