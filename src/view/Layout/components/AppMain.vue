<template>
  <div class="appMain">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .appMain{
    box-sizing: border-box;
    position: absolute;
    top: 50px;
    bottom: 0;
    margin: auto;
    padding: 30px;
    width: 100%;
    background: #f1f2f7;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.28s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
