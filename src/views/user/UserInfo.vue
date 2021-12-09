<template>

  <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="100px" class="demo-userInfoForm">
<!--    用户头 -->
    <div class="user-header">
      <el-avatar :size="50" :src="$store.state.userInfo.avatar" v-if="disable"></el-avatar>
      <el-upload
          v-if="!disable"
          class="avatar-uploader"
          action="/image/post/avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
<!--        // 如果有图片的话-->
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button type="primary" plain v-if="disable" @click="disable = !disable">编辑</el-button>
      <el-button type="primary" plain @click="submitForm('userInfoForm')" v-if="!disable">保存</el-button>
    </div>

    <el-form-item label="姓名" prop="username">
      <el-input v-model="$store.state.userInfo.username"
                :disabled="true"
                size="mini"
      ></el-input>
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-input
          v-model="$store.state.userInfo.gender"
          size="mini"
          :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="手机" prop="phone-number">
      <el-input v-model="$store.state.userInfo.phone" size="mini"
                :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="$store.state.userInfo.email" size="mini"
                :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="固定电话" prop="telephone">
      <el-input v-model="$store.state.userInfo.telephone" size="mini"
                :disabled="disable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="医院名称" prop="hospital">
      <el-input v-model="hospital" size="mini"
                :disabled="disable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="省市区" prop="address">
      <el-input v-model="$store.state.userInfo.address" size="mini"
                :disabled="disable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="详细地址" prop="detailed-address">
      <el-input v-model="$store.state.userInfo.addressDetail" size="mini"
                :disabled="disable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="医生资格证书" prop="certification">
      <el-input v-model="$store.state.userInfo.certification" size="mini"
                :disabled="disable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="医生简介" prop="abstract">
      <el-input v-model="$store.state.userInfo.abstract" size="mini"
                :disabled="disable"
                clearable></el-input>
    </el-form-item>

  </el-form>

</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      // 是否是编辑模式
      disable: true,

      //  图片url地址
      imageUrl: '',

      hospital: this.$store.state.userInfo.hospital.join(","),
      // 表单名字
      userInfoForm: {
        username: 'test',
        gender: '',
        phone: '',
        email: '',
        telephone:'',
        hospital:'',
        address:'',
        detailed: '',
        certification: '',
        abstract: ''
      },
      rules: {
        username: [
          {required: false, message: '请输入用户名', trigger: 'blur'},
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/user/updateUserInfo", this.userInfoForm).then(res=> {
            if (res.status === 200){
              // 如果成功保存，输出一个成功提示然后进入userinfo
              this.$notify({
                title: '保存成功',
                message: res.msg,
                type: 'success'
              });
              this.$router.push('/patient-manage')
            }
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
    // 处理上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
      this.$store.commit("uploadAvatar", this.imageUrl)
    },

    // 校验图片的格式和大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG ) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>


<style scoped>
  .el-input{
    width: 300px;
  }
  .user-header {
    display: flex;
    justify-content: left;
  }
  .user-header > .el-avatar {
    position: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
