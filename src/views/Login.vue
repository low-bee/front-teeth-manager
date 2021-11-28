<template>
<!--  <div class="login-out">-->
    <el-row type="flex" class="row-bg" justify="center">

      <el-col :span="6" :xl="6" :lg="7">
        <h3>欢迎来到病例管理系统！</h3>
        <el-image :src="require('@/assets/logo.png')"></el-image>
        <p>欢迎登录病例管理系统</p>
        <p>扫描上方二维码可以进入到小程序</p>
      </el-col>

      <el-col :span="1">
        <el-divider direction="vertical"></el-divider>
      </el-col>

      <el-col :span="6">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username" style="width: 380px">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width: 380px">
            <el-input v-model="loginForm.code" style="width: 172px; float: left"></el-input>
            <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
          </el-form-item>
          <el-form-item prop="submit-but" style="width: 380px">
            <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
<!--  </div>-->
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, message: '最少4个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度为4位', trigger: 'blur' }
        ],
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post(
              '/login',
              this.loginForm
          ).then( res => {
            const JWT = res.headers['authorization']
            // 放到vuex中
            this.$store.commit("SET_TOKEN", JWT)
            this.$router.push('/index')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {
        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
      })
    },

    // 后端封装结果，返回的结果需要处理
    // Result code
  },
  mounted() {
    this.getCaptcha()
  }
}
</script>

<style scoped>


  .el-divider {
    height: 200px
  }

  .el-row {
    background-color: #FAFAFA;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
  }

  .el-image {
    height: 180px;
    width: 180px;
  }
  .captchaImg {
    height: 40px;
    width: 80px;
    /* 小圆角 */
    border-radius: 4px;
    margin-left: 8px;
  }

</style>
