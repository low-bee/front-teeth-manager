<template>

  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="6">
      <!--      左边 -->
      <el-card class="box-card">
        <!--       个人照片-->
        <div class="flag" v-if="userInfo.flag">
          <span>已获得认证</span>
        </div>
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <div class="block">
          <el-avatar :size="100" :src="userInfo.avatar"></el-avatar>
        </div>
        <div style="padding: 14px;" class="clearfix">
          {{ userInfo.username }}医生
        </div>
        <!--        等级进度条-->
        <el-row>
          <el-col :span="3" class="level">
            <span>LV{{ userInfo.level }}</span>
          </el-col>
          <el-col :span="18">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="userInfo.percentage"></el-progress>
          </el-col>
        </el-row>

        <div class="statistics">
          <div class="statistics-left">
            <p style="color: rgb(234,135,92)">{{ userDeal.knockdown }}</p>
            <p>累计成交病例数</p>
          </div>
          <div class="statistics-right">
            <p style="color: rgb(234,135,92)">{{ userDeal.lastYearCompleted }}</p>
            <p>累计成交病例数</p>
          </div>
        </div>
      </el-card>

    </el-col>

    <el-col :span="0.5">
      <el-divider direction="vertical"></el-divider>
    </el-col>

    <el-col :span="13">
      <div class="right">
        <UserCenterMenu/>
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import UserCenterMenu from "@/views/inc/user/UserCenterMenu";
import {getUserDeal} from "@/api/user";
export default {
  name: "UserCenter",

  components: {
    UserCenterMenu
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== this.changePassword.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback();
      }
    }

    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',

      userInfo: {},

      userDeal: {
        knockdown: 0,
        lastYearCompleted: 0
      },

      changePassword: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入原始密码', trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入当前密码', trigger: 'blur'}
        ]
      }
    };
  },
  mounted() {
    this.getUserInfo();
    this.getUserDeal();
  },

  methods: {

    // 获取用户信息
    getUserInfo() {
      return this.$store.state.user.user;
    },
    // 获取用户年度和累计处理数量
    getUserDeal() {

      getUserDeal(this.userInfo.id).then(() => {

      })

      this.$axios.get("/user/userDealNum", {
        params: {
          currUser: this.userInfo.id
        }
      }).then(res => {
        this.userDeal = res.data.data
      })
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          // 提交Form表单
          this.$axios.post('/sys/user/updatePassword', this.changePassword).then(res => {
            _this.$alert(res.data.msg, "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.$refs[formName].resetFields()
                console.log(action)
              }
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.el-card {
  /*width: 400px;*/
  height: 600px;
}

.block {
  display: flex;
  align-items: center;
  justify-content: center;

}

.el-row {
  /*line-height: 160px;*/
}

.statistics {
  /*float: left;*/
}

.clearfix {
  box-sizing: inherit;
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  color: #27aac7;
}

.level {
  font-size: 18px;
  -webkit-box-align: center;
  align-items: center;
  display: inline-block;
  background-image: url(data:image/png;base64,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);
  background-size: 40%;
  background-repeat: no-repeat;
  padding-left: 24px;
  width: 60px;
  color: #fff;
}

.level > span {
  color: #fff;
  box-sizing: inherit;
  padding: 4px 5px;
  font-size: 12px;
  border-radius: 4px;
  background-color: #f9763d;
}

.flag {
  float: right;
  position: absolute;
  background-color: #f9763d;
  font-size: 12px;
  width: 70px;
  height: 30px;
  color: #ffffff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-divider {
  height: 700px
}

</style>
