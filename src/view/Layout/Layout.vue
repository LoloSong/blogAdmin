<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
import Sidebar from './components/Sidebar'
export default {
  components: {
    Navbar,
    AppMain,
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .sidebar-container {
    overflow: hidden;
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: absolute;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background: #2d3a4b;
  }
  .main-container {
    position: absolute;
    left: 180px;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
</style>
