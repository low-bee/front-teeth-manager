<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  #app {
    /*使用 flex 布局*/
    display: flex;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  a {
    text-decoration: None;
  }
</style>
