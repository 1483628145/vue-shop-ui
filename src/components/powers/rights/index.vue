<template>
  <div>
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 下面卡片视图 -->
    <el-card shadow="always">
      <!-- 用户列表 -->
      <el-table :data="userRightInfo" border stripe>
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column label="权限名称" prop="authName">
        </el-table-column>
        <el-table-column label="路径" prop="path">
        </el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scpoe">
            <el-tag v-if="scpoe.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scpoe.row.level === '1'" type="success">二级</el-tag>
            <el-tag v-else-if="scpoe.row.level === '2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <!-- <el-pagination :current-page="pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination> -->
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'rights',
  data() {
    return {
      userRightInfo: [],
      /* 分页器 */
      pagenum: 10,
      pagesize: 5,
      total: 0
    }
  },
  methods: {
    async getRightList() {
      const { data: res } = await this.$axios.get('/rights/list')
      console.log(res)
      this.userRightInfo = res.data
      res.length = this.total
    }
  },
  mounted() {
    this.getRightList()
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
</style>