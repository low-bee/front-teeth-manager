<template>
  <div id="login-page">
    <div id="showpage">
      <div class="form-group">
        <label for="username">用户名</label>
        <input v-model="loginForm.username" type="text" class="form-control" id="username" placeholder="请输入用户名" >
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input v-model="loginForm.password" type="password" class="form-control" id="password" placeholder="请输入密码">
      </div>
      <button type="submit" id="sub-btn" class="btn-default" @click="login">登录</button>
      <br/>
      <p class="bg-warning" style="padding: 10px;">演示用户名和密码都是<code>demo</code>。</p>
    </div>
    <div id="user" style="display: none"><p>欢迎<strong id="uname"></strong>，您已登录，<a href="javascript:" id="logout">退出>></a></p></div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {

  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),

    login() {
      let _this = this;
      if (this.loginForm.username === '' || this.loginForm.password === ''){
        alert("账号或密码为空！")
      } else {
        this.axios({
          method: 'post',
          url: '/user/login',
          data: _this.loginForm
        }).then(res =>{
          console.log(res.data)
          _this.userToken = "Bearer " + res.data.data.body.token;
          _this.changeLogin({Authorization: _this.userToken});
          _this.$router.push('/home');
          alert('登陆成功');
        }).catch(error => {
          alert('账号或密码错误');
          console.log(error);
        })
      }

      // 第一次登录的时候，前端调用后端的登录接口，发送用户名和密码

      // 后端收到请求之后，验证用户名和密码，验证成功，就给前端返回一个token

      // 前端拿到token，将其存储到localStorage和vuex中，并跳转路由页面

      // 前端每次跳转路由，就判断localStorage中有没有token，没有就跳转到登录页面，有则跳转到对应的路由页面

      // 后端判断请求头中有无token，有token。就拿到token并且验证token，验证成功返回数据
      // 验证失败就返回403，请求头中没有token也范湖403

      // 如果拿到的状态码为403，就清除token信息并且跳转到登录界面

      //

    }
  },
  name: 'Login',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login-page {
  /*background-color: green;*/
  justify-content: center;
  height: 50%;
  width: 100%;
}
</style>
