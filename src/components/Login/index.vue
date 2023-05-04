<template>
  <div class="login_main">
    <div class="main">
      <!-- 头像区域 -->
      <div class="logo">
        <img src="@/assets/img/cxk_logo1.jpg">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="formRef" class="form_box" :model="from" :rules="Fromrules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-a-003_wode" v-model="from.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-mima" v-model="from.password" type="password"></el-input>
        </el-form-item>
        <!-- 登录和重置 -->
        <div class="buts">
          <el-button type="success" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      from: {
        username: 'admin',
        password: '123456'
      },
      Fromrules: {
        username: [
          { required: false, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 重置表单 清除内容和验证 */
    reset() {
      this.from.userName = 'admin'
      this.from.passWord = '123456'
    },
    async login() {
      // this.$axios('http://www.baidu.com', 'GET')
      /* 发起请求 */
      const { data: res } = await this.$axios.post('login', this.from)
      // console.log(res)
      if (res.meta.status === 200) {
        // console.log('success')
        this.$message.success('登录成功')
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      } else {
        // console.log('faile')
        this.$message.error('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_main {
  height: 100%;

  .main {
    width: 450px;
    height: 300px;
    background-color: #eee;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .logo {
      height: 130px;
      width: 130px;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #eee;

      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
  }

  .form_box {
    position: absolute;
    bottom: 0px;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .buts {
    display: flex;
    justify-content: end;
  }
}
</style>