<template>

  <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="100px" class="demo-userInfoForm">
    <!--    用户头 -->

    <div class="user-header">
      <div class="user-header-img">
      <div class="el-button-group">
        <el-button type="primary" plain v-if="!editable" @click="editable = !editable">编辑</el-button>
        <el-button type="primary" plain @click="submitForm('userInfoForm')" v-if="editable">保存</el-button>
      </div>
      <el-avatar :size="100" :src="$store.state.userInfo.avatar" v-if="!editable"></el-avatar>
      <el-upload
          v-if="editable"
          ref="upload"
          action="#"
          class="avatar-uploader"
          list-type="picture"
          :on-preview="preview"
          :show-file-list="false"
          :http-request="uploadImage"
          :on-remove="handleRemove"
      >
<!--        如果有图片的话-->
        <img alt="" v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </div>

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
                :disabled="!editable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="医院名称" prop="hospital">
      <el-input v-model="hospital" size="mini"
                :disabled="!editable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="省市区" prop="address">
      <el-input v-model="$store.state.userInfo.address" size="mini"
                :disabled="!editable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="详细地址" prop="detailed-address">
      <el-input v-model="$store.state.userInfo.addressDetail" size="mini"
                :disabled="!editable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="医生资格证书" prop="certification">
      <el-input v-model="$store.state.userInfo.certification" size="mini"
                :disabled="!editable"
                clearable></el-input>
    </el-form-item>

    <el-form-item label="医生简介" prop="abstract">
      <el-input v-model="$store.state.userInfo.abstract" size="mini"
                :disabled="!editable"
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
      editable: false,

      uploadData: {},

      //  图片url地址
      imageUrl: '',

      // 是否显示预览
      showDialog: false,

      hospital: this.$store.state.userInfo.hospital.join(","),
      // 表单名字
      userInfoForm: {
        username: 'test',
        gender: '',
        phone: '',
        email: '',
        telephone: '',
        hospital: '',
        address: '',
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
  components: {},
  mounted() {
    this.getUploadData()
  },
  computed: {
  },

  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/user/updateUserInfo", this.userInfoForm).then(res => {
            if (res.status === 200) {
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
    // 重设表单
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

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 预览图片
    preview(file) {
      this.imageUrl = file.url
      this.showDialog = true
    },
    // 发送http请求上传图片
    uploadImage(params) {
      if (params.file) {
        // 执行上传操作
        this.$cos.putObject({
          Bucket: this.uploadData.Bucket,
          Region: this.uploadData.Region,
          Key: params.file.name,
          Body: params.file,
          StorageClass: 'STANDARD',
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (error, data) => {
          console.log(error || data)
          if (!error && data.statusCode === 200) {
            this.imageUrl = 'https://' + data.Location
          }
        })
      }
    },

    handleRemove(file) {
      console.log(file)
      this.$cos.deleteObject({
        Bucket: this.uploadData.Bucket,
        Region: this.uploadData.Region,
        Key: file.name
      }, (error, data) => {
        if (!error && data.statusCode === 200) {
          this.message.success("删除成功")
        }
      })
    },
    clearUploadedImage() {
      this.$refs.upload.clearFiles()
    },

    getUploadData() {
      this.$axios.get('/sys/upload').then(res => {
        this.uploadData = res.data.data
      })
    }
  }
}
</script>


<style scoped>
.el-input {
  width: 300px;
}

/*.user-header {*/
/*  display: flex;*/
/*}*/


.el-button-group{
  float: right;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
