<template>
  <div>
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 下面卡片视图 -->
    <el-card shadow="always">
      <!-- 添加角色按钮 -->
      <el-button type="primary" class="addUserBut" @click="addRoles">添加角色</el-button>
      <!-- 角色表格 -->
      <el-table :data="rolesList" border stripe>

        <!-- 展开列表 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 一级权限 -->
            <el-row v-for="i1 in scope.row.children" :key="i1.id">
              <el-col :span="5">
                <el-tag closable>
                  {{ i1.authName }}
                </el-tag>
                <p>====================</p>
              </el-col>
              <!-- 二三级权限 -->
              <el-col :span="19">
                <el-row v-for="i2 in i1.children" :key="i2.id">
                  <!-- 二级权限 -->
                  <el-col :span="4">
                    <el-tag closable>
                      {{ i2.authName }}
                    </el-tag>
                    <p>====================</p>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :sapn="20">
                    <el-row v-for="i3 in i2.children" :key="i3.id">
                      <el-tag closable>
                        {{ i3.authName }}
                      </el-tag>
                      <p>====================</p>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

          </template>
        </el-table-column>

        <!-- 一级列表 -->
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button type="primary" icon="el-icon-edit" @click="getRolesById(scope.row.id)">编辑</el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" @click="deleteRoles(scope.row.id)">删除</el-button>
            <!-- 分配权限 -->
            <el-button type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <!-- 对话框 -->
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addRolesdialog" width="30%">
      <el-form ref="addRolesform" :model="addRolesForm" :rules="addRolesFormrules">
        <el-form-item label="用户名称" prop="roleName">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="用户描述">
          <el-input type="textarea" v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addRolesdialog = false">取 消</el-button>
        <el-button type="primary" @click="addRolesBut">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色对话框 -->
    <el-dialog title="修改角色" :visible.sync="updateRolesdialog" width="30%">
      <el-form ref="updateRolesform" :model="addRolesForm" :rules="addRolesFormrules">
        <el-form-item label="用户名称" prop="roleName">
          <el-input v-model="updateRolesform.roleName"></el-input>
        </el-form-item>
        <el-form-item label="用户描述">
          <el-input type="textarea" v-model="updateRolesform.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="updateRolesdialog = false">取 消</el-button>
        <el-button type="primary" @click="updateRolesBut">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除角色对话框 -->
    <el-dialog title="确认删除角色？" :visible.sync="deleteRolesdialog" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteRolesdialog = false">取 消</el-button>
        <el-button type="primary" @click="deletePolesBut">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'roles',
  data() {
    return {
      /* 所有角色数据 */
      rolesList: [],
      /* 添加用户对话框 */
      addRolesdialog: false,
      // 添加角色表单信息
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      /* 表单验证 */
      addRolesFormrules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
      },
      /* 修改表单 */
      updateRolesform: {
        roleName: '',
        roleDesc: '',
        roleId: 0
      },
      // 添加用户对话框
      updateRolesdialog: false,
      // 删除角色对话框
      deleteRolesdialog: false
    }
  },
  methods: {
    // 获取角色列表
    async getRolesList() {
      const { data: res } = await this.$axios.get('roles')
      console.log(res)
      if (res.meta.status === 200) {
        this.rolesList = res.data
      } else {
        this.$message.error('获取列表数据失败')
      }
    },
    /* 添加角色 */
    addRoles() {
      this.addRolesdialog = true
    },
    // 添加角色
    async addRolesBut() {
      const { data: res } = await this.$axios.post('/roles', { roleName: this.addRolesForm.roleName, roleDesc: this.addRolesForm.roleDesc })
      // console.log(res)
      this.addRolesdialog = false
      this.getRolesList()
    },
    /* 编辑按钮 查询角色信息 */
    async getRolesById(id) {
      const { data: res } = await this.$axios.get(`/roles/${id}`)
      console.log(res)
      this.updateRolesdialog = true
      // 将查询数据和表单绑定
      this.updateRolesform = res.data
    },
    /* 修改角色信息 */
    async updateRolesBut() {
      const { data: res } = await this.$axios.put(`/roles/${this.updateRolesform.roleId}`, { roleName: this.updateRolesform.roleName, roleDesc: this.updateRolesform.roleDesc })
      this.getRolesList()
      if (res.meta.status === 200) {
        this.$message.success('修改成功')
        this.updateRolesdialog = false
      } else {
        this.$message.error('修改失败！')
      }
      // console.log(res)
    },
    /* 删除角色对话框 */
    deleteRoles(id) {
      this.deleteRolesdialog = true
      this.updateRolesform.roleId = id
    },
    /* 删除角色按钮 */
    async deletePolesBut() {
      // console.log(this.updateRolesform.roleId)
      const { data: res } = await this.$axios.delete(`/roles/${this.updateRolesform.roleId}`)
      // console.log(res)
      if (res.meta.status === 200) {
        this.$message.success('删除成功!')
        this.getRolesList()
        this.deleteRolesdialog = false
      } else {
        this.$message.error('删除失败！')
      }
    }
  },
  mounted() {
    /* 获取列表数据 */
    this.getRolesList()
  },
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 15px;
}

.el-card {
  margin-top: 20px;
}

.addUserBut {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>