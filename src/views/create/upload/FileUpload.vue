<template>
<!--    调用该组件需要在外部组件中创建方法getUploadObject，并将这个方法传递到这个组件中-->
  <div class="el-button-clear">
    <el-upload
        action="#"
        class="file-upload"
        :on-preview="preview"
        :http-request="uploadImage"
        :before-remove="beforeRemove"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :file-list="uploadObject"
        :show-file-list="false"
        :limit="limit"
        multiple>
      <el-button size="middle" type="primary" >点击上传</el-button>
    </el-upload>
    <el-button class="clear" size="middle" type="primary" @click="clearData">点击清空</el-button>
  </div>

</template>

<script>
export default {
  name: "FileUpload",

  data() {
    return {
      uploadObject: [],
    }
  },
  // 从外层传入出去的获取uploadObject的组件
  props: ['limit'],

  mounted() {
    this.getUploadData()
  },

  methods: {
    preview(file, fileList) {
      console.log(file, fileList)
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

          if (!error && data.statusCode === 200) {
            let url = 'https://' + data.Location
            let fileName = data.Location.split('/')[1]
            this.uploadObject.push({
              name: decodeURIComponent(fileName),
              url: url
            })
            // 上传成功之后，将数据发送到上层
            this.sendUploadObject('emitUploadObject');
          }
        })
      }
    },

    beforeRemove(file){
      console.log(file, '-----')
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
          this.uploadObject = this.uploadObject.filter(item => {
            return item.name !== file.name
          })

          // 删除成功之后，将数据发送到上层
          this.sendUploadObject('emitUploadObject')
        }
      })

    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    getUploadData() {
      this.$axios.get('/sys/upload').then(res => {
        this.uploadData = res.data.data
      })
    },

    sendUploadObject(event){
      // 发送当前的uploadObject出去
      this.$emit(event, this.uploadObject)
    },
    // 清除数据
    clearData() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除cos中存储的对象
        let currKey = this.uploadObject.map(item => {
          return {
            Key: item.name
          }
        })
        this.$cos.deleteMultipleObject({
          Bucket: this.uploadData.Bucket,
          Region: this.uploadData.Region,
          Objects: currKey
        }, (error) => {
          if (!error) {
            this.uploadObject = []
            // 删除当前数组中的对象
            this.sendUploadObject('emitUploadObject')
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        });
      });
    },

    // 更新前校验
    beforeUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt20M = file.size / 1024 / 1024 < 20;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt20M;
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 400px;
}
.el-button-clear > * {
  display: inline-block;;
}


</style>
