<template>
  <div>
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下面卡片视图 -->
    <el-card shadow="always">
      <!-- 搜索框 -->
      <div style="margin-top: 15px;" class="input_user">
        <el-input placeholder="请输入用户名搜索" class="inputUser" v-model="queryInfo.query" clearable @clear="getUserTable">
          <el-button slot="append" icon="el-icon-search" @click="SearchInfo">搜索</el-button>
        </el-input>
      </div>
      <el-button type="primary" class="addUserBut" @click="addUserdialogVisible = true">
        添加用户
      </el-button>
      <!-- 用户列表 -->
      <el-table :data="userInfo" border stripe>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
        </el-table-column>
        <el-table-column prop="username" label="username">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="id" label="id">
        </el-table-column>
        <el-table-column label="状态">
          <!-- 表格中使用 scope拿到这个数组的遍历对象 -->
          <template slot-scope="scope">
            <el-switch @change=userState(scope.row) v-model="scope.row.mg_state" active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号">
        </el-table-column>
        <el-table-column prop="role_name" label="用户名">
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" circle @click="updateUserInfo(scope.row.id)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.row.id)"></el-button>
            <!-- 分配权限 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-star-off" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addUserdialogVisible" width="30%" @close="closeUserForm">
      <el-form :model="addUserForm" :rules="rules" ref="userFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="clearInput">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="updateUserdialogVisible" width="30%">
      <el-form :model="queryIduserName" :rules="rules" ref="updateUserFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="queryIduserName.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="queryIduserName.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="queryIduserName.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="updateUserdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUserBut(queryIduserName.id)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userInfo: [],
      total: 0,
      /* 添加用户对话框 */
      addUserdialogVisible: false,
      /* 修改用户对话框 */
      updateUserdialogVisible: false,
      /* 表单验证 */
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
        ],
      },
      /* 添加用户表单 */
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      /* 根据id查询到的数据 */
      queryIduserName: {
        id: '',
        username: '',
        mobile: '',
        email: ''
      }
    }
  },
  methods: {
    /* 请求接口拿user数据 */
    async getUserTable() {
      const { data: res } = await this.$axios.get('users', { params: this.queryInfo })
      // console.log(res)
      this.userInfo = res.data.users
      this.total = res.data.total
      // console.log(this.userInfo)
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this.getUserTable()
    },
    handleCurrentChange(newCount) {
      this.queryInfo.pagenum = newCount
      this.getUserTable()
    },
    /* 修改用户状态 */
    async userState(userInfo) {
      // console.log(userState)
      const { data: res } = await this.$axios.put(`/users/${userInfo.id}/state/${userInfo.mg_state}`)
    },
    SearchInfo() {
      this.getUserTable()
    },
    /* 清除表单 */
    clearInput() {
      this.dialogVisible = false
    },
    /* 关闭表单 清除表单内容和验证规则*/
    closeUserForm() {
      this.$refs.userFormRef.resetFields()
    },
    /* 添加用户按钮 */
    addUser() {
      this.addUserdialogVisible = false
      this.$refs.userFormRef.validate(async (valid) => {
        if (valid) {
          /* 发请求 添加用户 */
          const res = await this.$axios.post('users', this.addUserForm)
          /* 重新渲染页面 */
          this.getUserTable()
          this.$message.success('添加用户成功')
        } else {
          this.$message.error('添加用户失败')
          return false
        }
      })
    },
    /* 关闭修改表单-清除验证 */
    updateUserBut(id) {
      this.updateUserdialogVisible = false
      this.$refs.updateUserFormRef.validate(async (valid) => {
        if (valid) {
          /* 发请求 添加用户 */
          const res = await this.$axios.put(`/users/${id}`, { email: this.queryIduserName.email, mobile: this.queryIduserName.mobile })
          /* 重新渲染页面 */
          this.getUserTable()
          this.$message.success('修改用户成功')
        } else {
          this.$message.error('修改用户失败')
          return false
        }
      })
    },
    /* 根据id查询数据 */
    async updateUserInfo(id) {
      const { data: res } = await this.$axios.get(`/users/${id}`)
      this.updateUserdialogVisible = true
      this.queryIduserName = res.data
    },
    /* 是否删除提示框 */
    deleteUser(id) {
      this.$confirm('是否删除该用户？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        /* 点正确 请求接口删除用户 */
        const { data: res } = await this.$axios.delete(`/users/${id}`)
        // console.log(res)
        /* 判断是否 返回正确 正确则显示删除成功 */
        if (res.meta.status == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message.error('删除失败')
        }
        /* 重新请求数据 渲染到页面 */
        this.getUserTable()
      }).catch(() => {
        /* 点击取消 不做任何操作 */
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created() {
    this.getUserTable()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 15px;
}

.el-card {
  margin-top: 20px;
}

.input_user {
  width: 400px;
}

.addUserBut {
  float: left;
  margin-left: 30px;
  margin-top: 15px;
}

.input_user {
  float: left;
}

.Pagenation {
  margin-top: 20px;
  float: right;
}
</style>