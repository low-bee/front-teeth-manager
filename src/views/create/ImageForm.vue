<template>
  <div class="image-box">
<!--   面相照上传 -->
    <h1>面部照上传</h1>
    <div class="face">
        <el-upload
            class="upload-demo"
            drag
            action="/image/posts/"
            :on-success="onUpdate">
          <img alt="" src="../../assets/FrontFace.png" v-if="!(imageURLObject && imageURLObject.frontFace.length > 0)" class="el-img-upload">
          <img alt="" v-else :src="imageURLObject.frontFace">
          <div class="el-upload__text"><i class="el-icon-circle-plus-outline"></i>点击上传/拖拽图片</div>
          <div class="el-upload__tip" slot="tip">面向正位</div>
        </el-upload>

        <el-upload
            class="upload-demo"
            drag
            action="/image/posts/"
            :on-success="onUpdate">
          <img alt="" src="../../assets/FrontSmileFace.png" v-if="!(imageURLObject && imageURLObject.frontSmileFace.length > 0)" class="el-img-upload">
          <img alt="" v-else :src="imageURLObject.frontSmileFace">
          <div class="el-upload__text"><i class="el-icon-circle-plus-outline"></i>点击上传/拖拽图片</div>
          <div class="el-upload__tip" slot="tip">面向微笑</div>
        </el-upload>

        <el-upload
            class="upload-demo"
            drag
            action="/image/posts/"
            :on-success="onUpdate">
          <img alt="" src="../../assets/SideFace.png" v-if="!(imageURLObject && imageURLObject.sideFace.length > 0)" class="el-img-upload">
          <img alt="" v-else :src="imageURLObject.sideFace">
          <div class="el-upload__text"><i class="el-icon-circle-plus-outline"></i>点击上传/拖拽图片</div>
          <div class="el-upload__tip" slot="tip">面向侧位</div>
        </el-upload>
      </div>

<!--   口内照上传 -->
    <h1>口腔内照上传(必选)</h1>
    <div class="intraoral-image">
      <el-upload
          class="upload-demo"
          drag
          action="/image/posts/"
          :on-success="onUpdate">
        <i v-if="!(imageURLObject && imageURLObject.upTooth.length > 0)" class="el-icon-upload"></i>
        <img alt="" v-else :src="imageURLObject.upTooth">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上牙列</div>
      </el-upload>

      <el-upload
          class="upload-demo"
          drag
          action="/image/posts/"
          :on-success="onUpdate">
        <i v-if="!(imageURLObject && imageURLObject.downTooth.length > 0)" class="el-icon-upload"></i>
        <img alt="" v-else :src="imageURLObject.downTooth">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">下牙列</div>
      </el-upload>

      <el-upload
          class="upload-demo"
          drag
          action="/image/posts/"
          :on-success="onUpdate">
        <i v-if="!(imageURLObject && imageURLObject.rightTooth.length > 0)" class="el-icon-upload"></i>
        <img alt="" v-else :src="imageURLObject.rightTooth">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">右侧位口内像</div>
      </el-upload>

      <el-upload
          class="upload-demo"
          drag
          action="/image/posts/"
          :on-success="onUpdate">
        <i v-if="!(imageURLObject && imageURLObject.frontTooth.length > 0)" class="el-icon-upload"></i>
        <img alt="" v-else :src="imageURLObject.frontTooth">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">前侧位口内像</div>
      </el-upload>

      <el-upload
          class="upload-demo"
          drag
          action="/image/posts/"
          :on-success="onUpdate">
        <i v-if="!(imageURLObject && imageURLObject.leftTooth.length > 0)" class="el-icon-upload"></i>
        <img alt="" v-else :src="imageURLObject.leftTooth">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">左侧位口内像</div>
      </el-upload>
    </div>

<!--   X光照上传 -->
    <h1>X光片</h1>
    <div class="x-image">
      <el-upload
          class="upload-demo"
          drag
          action="/image/posts/"
          :on-success="onUpdate">
        <i v-if="!(imageURLObject && imageURLObject.xSurfaceFault.length > 0)" class="el-icon-upload"></i>
        <img alt="" v-else :src="imageURLObject.xSurfaceFault">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">曲面断层</div>
      </el-upload>

      <el-upload
          class="upload-demo"
          drag
          action="/image/posts/"
          :on-success="onUpdate">
        <i v-if="!(imageURLObject && imageURLObject.xHeadSide.length > 0)" class="el-icon-upload"></i>
        <img alt="" v-else :src="imageURLObject.xHeadSide">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">头颅侧位</div>
      </el-upload>

    </div>

<!--   其他照片上传-->
    <h1>其他照片上传</h1>
    <div class="other">

    </div>
<!--    上传CBCT-->


  </div>

</template>

<script>
export default {
  name: "ImageForm",
  data(){
    return {

      uploadUrl: '',
      imageURLObject :{
        frontFace: '',
        frontSmileFace: '',
        sideFace: '',


        upTooth: '',
        downTooth: '',
        rightTooth: '',
        frontTooth: '',
        leftTooth: '',

        xSurfaceFault: '',
        xHeadSide: '',

        otherImages: [],


      }
    }
  },

  methods: {
    onUpdate(res) {
      this.imageURLObject.frontFace = res.data.imageUrl;
    },

    getUoloadUrl() {
      this.$axios.get("/sys/upload").then(res => {
        this.uploadUrl = res.data.data
          }
      )
    }
  }
}
</script>

<style scoped>
  .face {
    display: flex;
    width: 1000px
  }

  .intraoral-image {
    display: flex;
  }
  .x-image{
    display: flex;
  }
  .upload-demo{
  }
  .el-upload__tip{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-icon-upload{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-img-upload{
    width: 150px;
    height: 150px;
  }

</style>
