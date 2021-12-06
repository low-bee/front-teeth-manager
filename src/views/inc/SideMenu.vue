<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo">
    <el-menu-item index="0">
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <!--            <i class="el-icon-location"></i>-->
        <span>设计病例</span>


      </template>
      <router-link to="/patient-manage">
        <el-menu-item index="2">
          <span slot="title">病例管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/keep-patient-manage">
        <el-menu-item index="3">
          <span slot="title">保持器病例</span>
        </el-menu-item>
      </router-link>
    </el-submenu>

    <el-menu-item index="4">
      <!--          <i class="el-icon-menu"></i>-->
      <span slot="title">病例统计</span>
    </el-menu-item>
    <el-menu-item index="5">
      <!--          <i class="el-icon-document"></i>-->
      <span slot="title">互动</span>
    </el-menu-item>
    <el-menu-item index="6">
      <!--          <i class="el-icon-setting"></i>-->
      <span slot="title">优秀病例库</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",

}
</script>

<style scoped>
  .el-menu-item {
    height: 100%;
  }
</style>
