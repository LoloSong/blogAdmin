<template>
  <div class="friend">
    <el-button class="create_btn" type="primary" size="small" v-if="auth" @click="addFriend">添加链接</el-button>
    <el-table :data="friendData" style="width: 100%" border :default-sort="{prop: 'date', order: 'descending'}" v-loading="friendDataLoading" element-loading-text="拼命加载中">
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column prop="created" label="创建时间" min-width="150" sortable align="center"></el-table-column>
      <el-table-column prop="updated" label="更新时间" min-width="150" sortable align="center"></el-table-column>
      <el-table-column prop="friendName" label="链接名称" min-width="100" align="center"></el-table-column>
      <el-table-column prop="friendUrl" label="链接地址" min-width="300" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center" v-if="auth">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editFriend(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteFriend(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="formTitle" :visible.sync="dialogShow">
      <el-form :model="formInfo" label-width="120px" ref="formInfo" :rules="formRule">
        <el-form-item label="名称" prop="frindName">
          <el-input v-model="formInfo.frindName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="frindUrl">
          <el-input v-model="formInfo.frindUrl"></el-input>
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
      friendData: [],
      friendDataLoading: true,
      formInfo: {
        id: 0,
        frindName: '',
        frindUrl: ''
      },
      formRule: {
        frindName: [
          { required: true, message: '请输入友情链接名称', trigger: 'blur' }
        ],
        frindUrl: [
          { required: true, message: '请输入友情链接地址', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getFriendData()
  },
  methods: {
    async getFriendData () {
      // ajax获取数据
      this.friendDataLoading = true
      NProgress.start()
      let json = await api.getfriend()
      json.data.forEach((item) => {
        item.created = formatTime(item.created)
        item.updated = formatTime(item.updated)
      })
      this.friendData = json.data
      this.friendDataLoading = false
      NProgress.done()
    },
    addFriend () {
      this.dialogShow = true
      this.formTitle = '新增'
    },
    editFriend (row) {
      this.dialogShow = true
      this.formTitle = '编辑'
      this.formInfo.id = row._id
      this.formInfo.frindName = row.friendName
      this.formInfo.frindUrl = row.friendUrl
    },
    deleteFriend (row) {
      this.$MessageBox.confirm('此操作将永久删除, 是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let data = await api.deleteFriend(row._id)
        if (data.code === OK) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.dialogShow = false
          NProgress.start()
          this.friendDataLoading = true
          await this.getFriendData()
          NProgress.done()
          this.friendDataLoading = false
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
          this.friendDataLoading = true
          let data
          let friendName = this.formInfo.frindName
          let friendUrl = this.formInfo.frindUrl
          let id = this.formInfo.id
          if (this.formTitle === '新增') {
            data = await api.addFriend({friendName, friendUrl})
          } else {
            data = await api.editFriend({id, friendName, friendUrl})
          }
          if (data.code === 0) {
            await this.getFriendData()
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
          this.friendDataLoading = false
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
