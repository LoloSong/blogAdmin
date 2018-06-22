<template>
  <el-scrollbar class="scrollbar">
    <el-menu
      class="menu"
      mode="vertical"
      background-color="#2d3a4b"
      text-color="#bfcbd9"
      :default-active="$route.path"
      active-text-color="#409EFF"
    >
      <template v-for="route in routes">
        <!-- Dashboard -->
        <router-link v-if="route.path === '/'" :to="route.path" :key="route.name">
          <el-menu-item index="/dashboard">主页</el-menu-item>
        </router-link>
        <!-- 一级路由 -->
        <router-link v-if="!route.name && route.children && !route.hidden" :to="`${route.path}/${route.children[0].path}`" :key="route.name">
          <el-menu-item :index="`${route.path}/${route.children[0].path}`">{{route.children[0].name}}</el-menu-item>
        </router-link>
        <!-- 二级路由 -->
        <el-submenu v-else-if="route.name && route.children && !route.hidden" :key="route.name" :index="route.path">
          <template slot="title">{{route.name}}</template>
          <template v-for="child in route.children">
            <router-link :key="child.name" :to="`${route.path}/${child.path}`">
              <el-menu-item :index="`${route.path}/${child.path}`">{{child.name}}</el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  data () {
    return {
      routes: []
    }
  },
  created () {
    this.routes = this.$store.getters.routers
  }
}
</script>

<style lang="scss">
  .scrollbar {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .menu {
    border: none;
  }
</style>
