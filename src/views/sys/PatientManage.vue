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

    <router-link to="/create/base">
      <el-button type="primary" style="float: right; display: flex;" @click="dealCreate">新建病例</el-button>
    </router-link>


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
    },
    dealCreate() {
      // 获取一个创建的id
      this.$axios.get('/create/id').then(res => {
        this.$router.push({
          // 使用创建的id + 路由名字进行跳转
          path: `/create/base/${res.data.data.id}`
        })
      })


    }
  }
}
</script>

<style scoped>

</style>
