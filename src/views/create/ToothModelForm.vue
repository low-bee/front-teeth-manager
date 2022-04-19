<template>
<div class="inline-input">
  <el-input
      v-model="filename"
      disabled>
  </el-input>
  <FileUpload v-on:emitUploadObject="setUploadData" :limit="2"/>
  <ThreeTest></ThreeTest>
</div>
</template>

<script>
import FileUpload from "@/views/create/upload/FileUpload";
import ThreeTest from "@/components/ThreeTest";
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
    FileUpload,
    ThreeTest
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
    width: 200px;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .el-upload {
    width: 50px;
    height: 50px;
  }
  .inline-input > *{
    float: left;
  }

</style>
