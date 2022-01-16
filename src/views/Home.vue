<template>
  <!--
    element 页面布局
  -->
  <el-container>
    <!--    侧边栏 -->
    <el-aside width="200px">
      <SideMenu/>
    </el-aside>

    <el-container>
      <el-header>
        <strong>病例管理系统</strong>
        <div class="header-avatar">
          <!--
            用户的小头像
          -->
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">{{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/user-center">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
            <el-link href="" target="_blank">网站1</el-link>
            <el-link href="" target="_blank">网站2</el-link>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <!--
            显示子路由Index
        -->
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "@/views/inc/SideMenu";

export default {
  name: "Home",
  components: {
    SideMenu
  },
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      console.log(22222)

      this.$axios.get("/sys/userInfo").then(res => {
        if (res.code === 200) {
          this.userInfo = res.data.data
        } else {
          console.log(res)
        }
      })
    },
    logout() {
      this.$axios.post("/logout").then(res => {
        if (res.data.data.flag === true) {
          // 清除本地和session中的信息
          localStorage.clear()
          sessionStorage.clear()
          // 清除状态栏中的信息
          this.$store.commit("resetState")
          this.$router.push("/login")
        } else {
          console.log("退出失败！")
        }
      })

    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
}

.el-main {

}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.header-avatar {
  float: right;
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.el-dropdown {
  margin-right: 5px;
}

body > .el-container {
  margin-bottom: 40px;
}

</style>
