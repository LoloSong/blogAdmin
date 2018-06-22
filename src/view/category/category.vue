<template>
  <div class="category">
    <el-button class="create_btn" type="primary" size="small" v-if="auth" @click="addCategory">添加分类</el-button>
    <el-table :data="categoryData" style="width: 100%" border :default-sort="{prop: 'date', order: 'descending'}" v-loading="categoryDataLoading" element-loading-text="拼命加载中">
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column prop="created" label="创建时间" min-width="110" sortable align="center"></el-table-column>
      <el-table-column prop="updated" label="更新时间" min-width="110" sortable align="center"></el-table-column>
      <el-table-column prop="category" label="分类名称" min-width="200" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center" v-if="auth">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editCategory(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteCategory(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="formTitle" :visible.sync="dialogShow">
      <el-form :model="formInfo" label-width="120px" ref="formInfo" :rules="formRule">
        <el-form-item label="分类名称" prop="category">
          <el-input v-model="formInfo.category"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogShow=false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import { auth } from '@/utils/auth'
import { formatTime } from '@/utils/utils'
import api from '@/api/api'

const OK = 0

export default {
  data () {
    return {
      auth: auth(['admin']),
      dialogShow: false,
      formTitle: '',
      categoryData: [],
      categoryDataLoading: true,
      formInfo: {
        id: 0,
        category: ''
      },
      formRule: {
        category: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getcategoryData()
  },
  methods: {
    async getcategoryData () {
      // ajax获取数据
      this.categoryDataLoading = true
      NProgress.start()
      let json = await api.getcategory()
      json.data.forEach((item) => {
        item.created = formatTime(item.created)
        item.updated = formatTime(item.updated)
      })
      this.categoryData = json.data
      this.categoryDataLoading = false
      NProgress.done()
    },
    addCategory () {
      this.dialogShow = true
      this.formTitle = '新增'
    },
    editCategory (row) {
      this.dialogShow = true
      this.formTitle = '编辑'
      this.formInfo.id = row._id
      this.formInfo.category = row.category
    },
    deleteCategory (row) {
      this.$MessageBox.confirm('此操作将永久删除该分类, 是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let data = await api.deleteCategory(row._id)
        if (data.code === OK) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.dialogShow = false
          NProgress.start()
          this.categoryDataLoading = true
          await this.getcategoryData()
          NProgress.done()
          this.categoryDataLoading = false
        } else {
          this.$message({
            type: 'info',
            message: data.msg
          })
        }
      }).catch(() => {})
    },
    async submit () {
      this.$refs.formInfo.validate(async (valid) => {
        if (valid) {
          this.dialogShow = false
          NProgress.start()
          this.categoryDataLoading = true
          let data
          if (this.formTitle === '新增') {
            data = await api.addCategory(this.formInfo.category)
          } else {
            data = await api.editCategory(this.formInfo.id, this.formInfo.category)
          }
          if (data.code === 0) {
            await this.getcategoryData()
            this.$notify({
              title: '成功',
              message: data.msg,
              type: 'success'
            })
          } else {
            this.$notify({
              title: '失败',
              message: data.msg,
              type: 'error'
            })
          }

          NProgress.done()
          this.categoryDataLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.create_btn {
  margin-bottom: 10px;
}
</style>
