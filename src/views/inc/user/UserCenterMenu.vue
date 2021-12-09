<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1"><router-link to="/user/info">个人中心</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/user/address">地址管理</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/user/security">安全设置</router-link></el-menu-item>
    <el-menu-item index="4"><router-link to="/user/habit">临床偏好</router-link></el-menu-item>
    <el-menu-item index="5"><router-link to="/user/medicine">多点执医</router-link></el-menu-item>
    <el-menu-item index="6"><router-link to="/user/information">消息推送</router-link></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "UserCenterMenu",
  methods: {
  }
}
</script>

<style scoped>

</style>
