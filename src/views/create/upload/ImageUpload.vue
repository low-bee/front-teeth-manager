<template>
  <div style="width:230px">
    <!--
      show-file-list: 是否显示上传的文件列表

      action:用来指定文件要上传的地址，由于我们需要定制上传动作
             这里设为#
      :http-request：自定义上传行为（重点）

      on-success: 上传成功之后的回调
      before-upload： 上传之前的检查
    -->
    <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="upload"
    >
      <img alt="" v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-progress v-if="showProgress" :percentage="percentage" />
  </div>
</template>

<script>
// 下面的代码是固定写法
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: 'AKID72i7G8qHRKxOYR3PUIq9BxSgdIgogHbf', // 腾讯云份识别ID自己扫码查询
  SecretKey: 'pNdcLo0vYv1qOXQ2NQDjxvd4E6i37uQh' // 身份秘钥
})
export default {
  name: 'UploadImg',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showProgress: false,
      percentage: 20 // 上传进度条
    }
  },
  methods: {

    upload(res) {
      console.log('上传的文件是', res.file)
      if (!res.file) {
        return
      }
      this.showProgress = true // 显示进度条
      // 1. 把图片上传到腾讯云COS
      // 执行上传操作

      cos.putObject({
        Bucket: 'tooth-1302193597', /* 存储桶 */
        Region: 'ap-beijing', /* 存储桶所在地域，必须字段 */
        Key: res.file.name, /* 文件名 */
        StorageClass: 'STANDARD', // 上传模式, 标准模式
        Body: res.file, // 上传文件对象
        onProgress: (progressData) => {
          console.log('上传的进度', JSON.stringify(progressData))
          this.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        console.log(err)
        console.log(data)

        // 上传成功之后
        if (data.statusCode === 200) {
          // 2. 显示图片
          this.imageUrl = `https:${data.Location}`
          // 3. 通知父组件
          this.$emit('input', `https:${data.Location}`)
        }
        this.showProgress = false
      })
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
      this.$store.commit("uploadAvatar", this.imageUrl)
    },

    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG || !isJPG) {
        this.$message.error('上传头像图片只能是 PNG/JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
