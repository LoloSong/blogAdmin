<template>
  <div class="navbar">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <router-link :to="item.path" class="no-redirect">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="user">
        <span class="user-name">{{name}}</span>
        <img class="user-avatar" :src="avatar">
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item @click.native="logout">LogOut</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ])
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      // 处理特殊的dashboard一级路由
      this.levelList = matched
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background: #2d3a4b;
  .breadcrumb {
    position: absolute;
    left: 0;
    top: 0;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    color: #fff;
    .no-redirect{
      color: #fff;
    }
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .user {
      cursor: pointer;
      .user-name {
        position: absolute;
        right: 50px;
        color: #fff;
      }
      .user-avatar {
        margin-top: 5px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
  }
}
.logout {
  display: block;
}
</style>
