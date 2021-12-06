<template>
  <div>
    <h2> 你好! {{ userInfo.username }}医生</h2>
    <el-form :model="changePassword" :rules="rules" ref="changePasswordForm" label-width="100px" class="demo-changePasswordForm">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="changePassword.oldPassword" type="text"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="changePassword.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="changePassword.confirmPassword" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('changePasswordForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserCenter",
  data() {

    var validatePass = (rule, value, callback) => {
      if (value === ''){
        callback( new Error('请再次输入密码！'))
      } else if (value !== this.changePassword.newPassword){
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback();
      }
    }

    return {
      userInfo: {},

      changePassword: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入原始密码', trigger: 'blur' }
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
  },

  methods: {
    getUserInfo() {
      this.$axios.get('/sys/userInfo').then(res => {
        this.userInfo = res.data.data
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

</style>
