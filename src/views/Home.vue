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
          <el-avatar size="medium" :src="user.user.avatarPath"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">{{ user.user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
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
import {mapState} from 'vuex'
import {getInfo} from "@/api/login";
export default {
  name: "Home",
  components: {
    SideMenu
  },
  data() {
    return {
      userInfo: {}
    }
  },
  mounted() {
    getInfo().then(res => {
      this.userInfo = res;
      console.log(this.userInfo);
    })
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
            this.$router.push('/login');
      },
      () => {
        this.$message.error('退出失败')
      })
    },
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
