<template>
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
        <el-form v-if="!register" :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-ruleForm">

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
        </el-form>

        <el-form v-if="register" :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="login-ruleForm">

          <el-form-item label="用户名" prop="username" style="width: 380px">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" style="width: 380px">
            <el-input v-model="registerForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPassword" style="width: 380px">
            <el-input v-model="registerForm.confirmPassword" type="password"></el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="code" style="width: 380px">
            <el-input v-model="registerForm.code" style="width: 172px; float: left"></el-input>
            <!--
              此处显示验证码，每次都会去getCaptcha获取验证码的图片
             -->
            <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
          </el-form-item>
        </el-form>

        <el-form>
          <el-form-item prop="submit-but" style="width: 380px">
            <!--
              点击触发submitForm，首先会触发rules的验证规则
            -->
            <el-button :loading="loading" type="primary" @click.native.prevent="submitForm()">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <el-button @click="resetForm()">重置</el-button>
            <el-button type="primary" @click="register=true">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>

    </el-row>
<!--  </div>-->
</template>

<script>
import Element from "element-ui";
import {getCodeImg} from "@/api/login";
import {encrypt} from "@/utils/rsaEncrypt";
import Cookies from 'js-cookie'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'user',
        password: '123456',
        code: '',
        token: '',
        uuid: ''
      },

      registerForm: {},
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
          // { min: 5, max: 5, message: '长度为5位', trigger: 'blur' }
        ],
      },
      captchaImg: null,
      cookiePass: "",
      loading: false,
      register: false,
      reset: false
    };
  },
  methods: {
    submitForm() {
      this.register = false;
      // 根据规则验证
      this.$refs.loginForm.validate((valid) => {
        // 如果验证通过，就发送登录请求
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid,
          rememberMe: false
        }
        console.log(user)
        if (user.password !== this.cookiePass){
          user.password = encrypt(user.password);
        }

        if (valid) {
          this.loading = true
          // 设置账号、密码、记得我等状态
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: 7 })
            Cookies.set('password', user.password, { expires: 7 })
            Cookies.set('rememberMe', user.rememberMe, { expires: 7 })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }

          // 向store中发送一个Login指令，开始登录
          this.$store.dispatch("Login", user).then(
              () => {
                this.loading = false
                this.$router.push({path: this.redirect || "/"})
              },
              () => {
                this.loading = false
              }
          )
        } else {
          Element.Message({
            type: "error",
            message: "服务器出现错误！"
          })
          return false;
        }
      });
    },
    resetForm() {
      // 固定写法，重设表单
      this.$refs.loginForm.resetFields((key) => {
        // 发送请求请求一个新的验证码，删除之前的验证码
      });
    },
    getCaptcha() {
      // 获取验证码
      getCodeImg().then( res => {
        this.captchaImg = res.base64Img
        this.loginForm.uuid  = res.key
        // 重置验证码
        this.loginForm.code = ""
      })
    },
    // 从cookie中获取用户名密码
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },

    // 注册
    handleRegister() {
      this.register = !this.register
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
