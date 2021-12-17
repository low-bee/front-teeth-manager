<template>
  <div>
    <el-steps :active="currStep" simple>
      <el-step title="基本信息" icon="el-icon-edit">
        <router-link to="/create/base"></router-link>
      </el-step>
      <el-step title="照片上传" icon="el-icon-picture">
        <router-link to="/create/image"></router-link>
      </el-step>
      <el-step title="病历单提交" icon="el-icon-upload">
        <router-link to="/create/case"></router-link>
      </el-step>
      <el-step title="牙齿模型" icon="el-icon-picture">
        <router-link to="/create/tooth_model"></router-link>
      </el-step>
      <el-step title="预览并提交" icon="el-icon-picture">
        <router-link to="/create/submit"></router-link>
      </el-step>
    </el-steps>

    <router-view></router-view>

    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left" @click="prevPage" v-if="currStep > 0">上一步</el-button>
      <el-button type="primary" @click="nextPage" v-if="currStep < 4">下一步<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
      <el-button type="primary" icon="el-icon-document-checked" v-if="currStep !== 4">保存</el-button>
      <el-button type="primary" icon="el-icon-document-checked" v-else >提交</el-button>
    </el-button-group>
  </div>



</template>

<script>


export default {

  name: "Create",

  data() {
    return {
      currStep: 0
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$axios.get('/sys/userInfo').then(res => {
        this.userInfo = res.data.data
        this.$store.commit("resetUserInfo", res.data.data)
      })
    },

    nextPage() {
      this.currStep += 1;
      this.pageJump(this.currStep, this.$route.params.id);
    },
    prevPage() {
      this.currStep -= 1;
      this.pageJump(this.currStep, this.$route.params.id);
    },

    pageJump(step, id){
      console.log(step)
      if (step === 0){
        this.$router.push("/create/base/" + id);
      } else if (step === 1){
        this.$router.push("/create/image/" + id);
      } else if (step === 2){
        this.$router.push("/create/case/" + id);
      } else if (step === 3){
        this.$router.push("/create/tooth_model/" + id);
      } else if (step === 4){
        this.$router.push("/create/submit/" + id)
      }
    }

  }
}
</script>

<style scoped>

</style>
