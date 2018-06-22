<template>
  <div class="articleCreate" v-loading="articleLoading">
    <el-form :model="article" :rules="createRules" ref="articleCreate">
      <el-row>
          <el-col :span="10" :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input class="title" v-model="article.title" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3">
            <el-form-item label="文章分类" label-width="90px" prop="category">
              <el-select placeholder="请选择" v-model="article.category">
                <el-option v-for="category in categoryData" :key="category._id" :label="category.category" :value="category.category"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row class="describeWrap">
        <el-form-item label="内容描述" prop="describe">
          <el-input class="describe" v-model="article.describe" placeholder="请在此处输入描述内容"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12" class="inputWrap">
          <!-- 编辑区 -->
          <el-form-item prop="content">
            <el-input class="inputMarkdown" type="textarea" v-model="article.content" placeholder="请在此处编辑文章" :rows="25" resize="none"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="showWrap">
          <!-- 展示区 -->
          <div class="showMarkdown" v-html="markedToHtml" v-highlight></div>
        </el-col>
      </el-row>
      <el-row class="btnGroup">
        <el-button type="primary" @click="editArticle">修改并发布</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import api from '@/api/api'
import marked from 'marked'

const OK = 0

export default {
  data () {
    return {
      categoryData: [],
      articleLoading: false,
      article: {
        title: '',
        category: '',
        content: '',
        describe: ''
      },
      createRules: {
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        category: [{ required: true, message: '请选择分类', trigger: 'change' }],
        describe: [{ required: true, message: '请输入描述', trigger: 'change' }]
      }
    }
  },
  async mounted () {
    this.articleLoading = true
    NProgress.start()
    await this.getOneArticle()
    await this.getcategoryData()
    this.articleLoading = false
    NProgress.done()
  },
  methods: {
    async getOneArticle () {
      // ajax获取数据
      let articleID = this.$route.params.articleID
      let json = await api.getOneArticle(articleID)
      this.article = {
        title: json.data.title,
        category: json.data.category,
        content: json.data.content,
        describe: json.data.describe
      }
    },
    async getcategoryData () {
      // ajax获取数据
      let json = await api.getcategory()
      this.categoryData = json.data
    },
    editArticle () {
      this.$refs.articleCreate.validate((valid) => {
        if (valid) {
          this.$MessageBox.confirm('确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(async () => {
            let data = await api.editArticle({
              articleID: this.$route.params.articleID,
              contentToMarked: this.markedToHtml,
              ...this.article
            })
            if (data.code === OK) {
              this.$message({
                type: 'success',
                message: data.msg
              })
              setTimeout(() => {
                this.$router.back(-1)
              }, 500)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    },
    cancle () {
      this.$router.back(-1)
    }
  },
  computed: {
    markedToHtml () {
      return marked(this.article.content, {
        gfm: true,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.articleCreate {
  margin-top: 20px;
  .describeWrap {
    padding: 0 10px;
  }
  .inputWrap {
    padding: 0 10px;
  }
  .showWrap {
    padding: 0 10px;
    .showMarkdown {
      overflow: auto;
      padding: 10px;
      height: 537px;
      background: #fff;
    }
  }
  .btnGroup {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
