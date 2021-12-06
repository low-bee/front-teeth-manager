<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
  >
    <el-menu-item index="1" @click="flag=!flag"><i :class="flag ? 'el-icon-star-off' : 'el-icon-star-o' "></i>关注({{ listNum.keepLive }})</el-menu-item>
    <el-menu-item index="2">待提交({{ listNum.awaitCommit }})</el-menu-item>
    <el-menu-item index="3">生产中({{ listNum.committing }})</el-menu-item>
    <el-menu-item index="4">已完成({{ listNum.committed }})</el-menu-item>
    <el-menu-item index="5">已归档({{ listNum.archived }})</el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "KeepPatientManage",
  data() {
    return {
      listNum: {
        keepLive: 0,
        awaitCommit: 0,
        committing: 0,
        committed: 0,
        archived: 0
      },
      flag: true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios.get("/patient_keep/list", {
        params: {
          paramsList: "keepLive,awaitCommit,committing,committed,archived"
        }
      }).then( res => {
        this.listNum = res.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
