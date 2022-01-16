<template>
<!--
  element 居中显示 类似于 ---- a --- b --- c ---
-->
    <el-row type="flex" class="row-bg" justify="center">

      <el-col :span="6" :xl="6" :lg="7">
        <h3>欢迎来到病例管理系统！</h3>
<!--
  最后此处应该是一个 二维码，链接到微信小程序
-->
        <el-image :src="require('@/assets/logo.png')"></el-image>
        <p>欢迎登录病例管理系统</p>
        <p>扫描上方二维码可以进入到小程序</p>
      </el-col>

      <el-col :span="1">
        <el-divider direction="vertical"></el-divider>
      </el-col>
<!--
  右端的登录表单，绑定了loginForm字段
-->
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
            <!--
              此处显示验证码，每次都会去getCaptcha获取验证码的图片
             -->
            <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
          </el-form-item>
          <el-form-item prop="submit-but" style="width: 380px">
          <!--
            点击触发submitForm，首先会触发rules的验证规则
          -->
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
<!--  </div>-->
</template>

<script>
import Element from "element-ui";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'user',
        password: 'chuanzhi',
        code: '',
        token: '',
        key: ''
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
          { min: 5, max: 5, message: '长度为5位', trigger: 'blur' }
        ],
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      // 根据规则验证
      this.$refs[formName].validate((valid) => {
        // 如果验证通过，就发送登录请求

        if (valid) {
          this.$axios.post(
              '/login',
              this.loginForm
          ).then( res => {

            // 会获取到headers里面的authorization字段
            const JWT = res.headers['authorization']
            // 放到vuex中
            this.$store.commit("SET_TOKEN", JWT)
            // 跳转到index页面
            this.$router.push('/')
          })
        } else {
          Element.Message({
            type: "error",
            message: "服务器出现错误！"
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      // 固定写法，重设表单
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      // 获取验证码
      this.$axios.get('/captcha').then(res => {
        // 获取到验证码之后，将key赋给给loginForm
        this.loginForm.key = res.data.data.key
        // 将返回的图片给当前的图片对象
        this.captchaImg = res.data.data.base64Img
        this.loginForm.code = ""
      })
    },

    // 后端封装结果，返回的结果需要处理
    // Result code
  },
  mounted() {
    // 挂载时调用 getCaptcha() 方法
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
