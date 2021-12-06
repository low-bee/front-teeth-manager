<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
  >
    <el-menu-item index="1" @click="flag=!flag">
      <i :class="flag ? 'el-icon-star-off' : 'el-icon-star-o' "></i>
      关注({{ listNum.keepLive }})
    </el-menu-item>
    <el-menu-item index="2">动画({{ listNum.animationAwaitDeal }})</el-menu-item>
    <el-menu-item index="3">治疗中({{ listNum.treating }})</el-menu-item>
    <el-menu-item index="4">加工后续待处理({{ listNum.dealWith }})</el-menu-item>
    <el-menu-item index="5">待提交({{ listNum.awaitCommit }})</el-menu-item>
    <el-menu-item index="6">已完成({{ listNum.completed }})</el-menu-item>
    <el-menu-item index="7">已归档({{ listNum.archived }})</el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "PatientManage",

  data(){
    return {
      listNum: {
        keepLive: 0,
        animationAwaitDeal: 0,
        treating: 0,
        dealWith: 0,
        awaitCommit: 0,
        completed: 0,
        archived: 0
      },
      flag: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      this.$axios.get("/patient/list", {
        params: {
          paramsList: "keepLive,animationAwaitDeal,treating,dealWith,awaitCommit,completed,archived"
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
