<template>
<div class="inline-input">
  <el-input
      v-model="filename"
      disabled>
  </el-input>
  <FileUpload v-on:emitUploadObject="setUploadData" :limit="2"/>
</div>
</template>

<script>
import FileUpload from "@/views/create/upload/FileUpload";
export default {
  name: "ToothModel",

  data() {
    return {
      uploadObject: [],
      filename: ''
    }
  },

  computed: {

  },

  watch: {
    uploadObject( newVal) {
      this.filename =  newVal.map(item => {
        return item.name
      }).join(",")
    }
  },

  components: {
    FileUpload
  },

  methods: {
    setUploadData(uploadData){
      this.uploadObject = uploadData
    }
  }
}
</script>

<style scoped>
  .el-input {
    width: 400px;
    float: left;
  }
  .el-upload {
    width: 100px;
    height: 100px;
  }
  .inline-input > *{
    float: left;
  }

</style>
