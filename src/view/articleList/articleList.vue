<template>
  <div class="articleList">
    <el-button class="create_btn" type="primary" size="small" @click="createArticle" v-if="auth">创建文章</el-button>
    <el-table :data="articleList" style="width: 100%" border :default-sort="{prop: 'date', order: 'descending'}" v-loading="articleListLoading" element-loading-text="拼命加载中">
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column prop="title" label="文章标题" min-width="200" align="center"></el-table-column>
      <el-table-column prop="created" label="创建时间" min-width="104" sortable align="center"></el-table-column>
      <el-table-column prop="updated" label="更新时间" min-width="104" sortable align="center"></el-table-column>
      <el-table-column prop="views" label="阅读次数" width="104" sortable align="center"></el-table-column>
      <el-table-column prop="category" label="分类" min-width="90" sortable align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center" v-if="auth">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editArticle(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" layout="prev,pager,next" :total="pageTotal" @current-change="changePage" :background="true"></el-pagination>
  </div>
</template>

<script>
import { auth } from '@/utils/auth'
import { formatTime } from '@/utils/utils'
import NProgress from 'nprogress'
import api from '@/api/api'

const OK = 0

export default {
  data () {
    return {
      auth: auth(['admin']),
      articleList: [],
      articleListLoading: false,
      pageTotal: 0,
      page: 1,
      limit: 10
    }
  },
  mounted () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      // ajax获取数据
      this.articleListLoading = true
      NProgress.start()
      let json = await api.getArticleList({
        page: this.page,
        limit: this.limit
      })
      if (json.code === OK) {
        this.pageTotal = json.data.articleCount
        json.data.list.forEach((val) => {
          val.created = formatTime(val.created)
          val.updated = formatTime(val.updated)
        })
        this.articleList = json.data.list
      } else {
        console.error(json)
      }
      this.articleListLoading = false
      NProgress.done()
    },
    createArticle () {
      this.$router.push({path: '/article/CreateArticle'})
    },
    editArticle (row) {
      this.$router.push({path: `/article/editArticle/${row._id}`})
    },
    deleteArticle (row) {
      this.$MessageBox.confirm('此操作将永久删除该文章, 是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let data = await api.deleteArticle(row._id)
        if (data.code === OK) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.dialogShow = false
          NProgress.start()
          this.articleListLoading = true
          await this.getArticleList()
          NProgress.done()
          this.articleListLoading = false
        } else {
          this.$message({
            type: 'info',
            message: data.msg
          })
        }
      }).catch(() => {})
    },
    changePage (page) {
      this.page = page
      this.getArticleList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .create_btn {
    margin-bottom: 10px;
  }
  .pagination {
    margin-top: 10px;
    float: right;
  }
</style>
