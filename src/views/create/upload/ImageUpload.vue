<template>
  <!--    调用该组件需要在外部组件中创建方法getUploadObject，并将这个方法传递到这个组件中-->
  <div class="el-button-clear">
    <el-upload
        action="#"
        class="image-upload"
        :http-request="uploadImage"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :show-file-list="false"
        drag
        >
      <img alt="" :src="filePath" v-if="!fileObj.url" class="el-img-upload">
      <img alt="" v-else v-bind:src="fileObj.url">
      <div class="el-upload__text"><i class="el-icon-circle-plus-outline"></i>点击上传/拖拽图片</div>
      <div class="el-upload__tip" slot="tip">{{ slotTip }}</div>
    </el-upload>
  </div>

</template>

<script>
export default {
  name: "ImageUpload",

  data() {
    return {
      fileObj: {},
    }
  },
  // 从外层传入数据 ['filePath', "imageFlag", 'outUrl', 'slotTip']
  props: {
    filePath: {
      type: String,
      default: ''
    },
    imageFlag: {
      type: Boolean,
      require: true
    },
    outUrl: {
      type: String,
      default: ''
    },
    slotTip: {
      type: String,
      default: ''
    },
  },

  mounted() {
    this.getUploadData()
  },

  methods: {
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
          if (!error && data.statusCode === 200) {
            let url = 'https://' + data.Location
            let fileName = data.Location.split('/')[1]
            this.fileObj = {
              name: decodeURIComponent(fileName),
              url: url
            }
            console.log(this.fileObj)
            // 上传成功之后，将数据发送到上层
            this.sendFileObj('emitURLObj');
          }
        })
      }
    },

    handleRemove(file) {
      this.$cos.deleteObject({
        Bucket: this.uploadData.Bucket,
        Region: this.uploadData.Region,
        Key: file.name
      }, (error, data) => {
        if (!error && data.statusCode === 204) {
          // 204表示成功删除
          // filter 之后会产生一个新的数组而不是在原来的基础上进行过滤
          this.fileObj = {}

          // 删除成功之后，将数据发送到上层
          this.sendFileObj('emitURLObj')
        }
      })

    },

    getUploadData() {
      this.$axios.get('/sys/upload').then(res => {
        this.uploadData = res.data.data
      })
    },

    sendFileObj(event){
      // 发送当前的uploadObject出去
      this.$emit(event, this.fileObj)
    },

    // 更新前校验
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('图片只能是 JPG 格式!');
      }
      if (!isLt20M) {
        this.$message.error('上图片大小不能超过 2MB!');
      }
      return isLt20M;
    }
  }
}
</script>

<style scoped>
.el-upload__tip{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
