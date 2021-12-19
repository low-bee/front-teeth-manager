<template>
  <div class="image-box">
<!--   面相照上传 -->
    <h1>面部照上传</h1>
    <div class="face">
        <ImageUpload :filePath="require('@/assets/FrontFace.png')"
                     :imageFlag="!(imageURLObject && imageURLObject.frontFace.length > 0)"
                     :outURL="imageURLObject.frontFace"
                     v-on:emitURLObj="setFrontFaceURL"
                     :slotTip="'面向正位'"
        ></ImageUpload>
        <ImageUpload :filePath="require('@/assets/FrontSmileFace.png')"
                     :imageFlag="!(imageURLObject && imageURLObject.frontSmileFace.length > 0)"
                     :outURL="imageURLObject.frontSmileFace"
                     v-on:emitURLObj="setFrontSmileFace"
                     :slotTip="'面向微笑'"
        ></ImageUpload>

        <ImageUpload :filePath="require('@/assets/SideFace.png')"
                     :imageFlag="!(imageURLObject && imageURLObject.sideFace.length > 0)"
                     :outURL="imageURLObject.sideFace"
                     v-on:emitURLObj="setSideFace"
                     :slotTip="'面向侧位'"
        ></ImageUpload>
      </div>

<!--   口内照上传 -->
    <h1>口腔内照上传(必选)</h1>
    <div class="intraoral-image">
      <ImageUpload :filePath="require('@/assets/upTooth.png')"
                   :imageFlag="!(imageURLObject && imageURLObject.upTooth.length > 0)"
                   :outURL="imageURLObject.upTooth"
                   v-on:emitURLObj="setUpToothURL"
                   :slotTip="'上牙列'"
      ></ImageUpload>

      <ImageUpload :filePath="require('@/assets/downTooth.png')"
                   :imageFlag="!(imageURLObject && imageURLObject.downTooth.length > 0)"
                   :outURL="imageURLObject.downTooth"
                   v-on:emitURLObj="setDownToothURL"
                   :slotTip="'下牙列'"
      ></ImageUpload>

      <ImageUpload :filePath="''"
                   :imageFlag="!(imageURLObject && imageURLObject.leftTooth.length > 0)"
                   :outURL="imageURLObject.leftTooth"
                   v-on:emitURLObj="setLeftToothURL"
                   :slotTip="'左侧口腔内像'"
      ></ImageUpload>

      <ImageUpload :filePath="''"
                   :imageFlag="!(imageURLObject && imageURLObject.rightTooth.length > 0)"
                   :outURL="imageURLObject.rightTooth"
                   v-on:emitURLObj="setRightToothURL"
                   :slotTip="'右侧口腔内像'"
      ></ImageUpload>

      <ImageUpload :filePath="''"
                   :imageFlag="!(imageURLObject && imageURLObject.frontTooth.length > 0)"
                   :outURL="imageURLObject.frontTooth"
                   v-on:emitURLObj="setFrontToothURL"
                   :slotTip="'前侧口腔内像'"
      ></ImageUpload>
    </div>
<!--   X光照上传 -->
    <h1>X光片</h1>
    <div class="x-image">

      <ImageUpload :filePath="''"
                   :imageFlag="!(imageURLObject && imageURLObject.xSurfaceFault.length > 0)"
                   :outURL="imageURLObject.xSurfaceFault"
                   :slotTip="'曲面断层'"
                   v-on:emitURLObj="setXSurfaceFaultURL"
      ></ImageUpload>

      <ImageUpload :filePath="''"
                   :imageFlag="!(imageURLObject && imageURLObject.xHeadSide.length > 0)"
                   :outURL="imageURLObject.xHeadSide"
                   :slotTip="'头颅侧位'"
                   v-on:emitURLObj="setXHeadSide"
      ></ImageUpload>

    </div>

<!--   其他照片上传-->
    <h1>其他照片上传</h1>
    <div class="other">

    </div>
<!--    上传CBCT-->
    <div class="inline-input">
      <el-input
          v-model="filename"
          placeholder="上传CBCT"
          disabled>
      </el-input>
    <FileUpload v-on:emitUploadObject="setUploadData" :limit="1"/>
    </div>
  </div>

</template>

<script>
import ImageUpload from "@/views/create/upload/ImageUpload";
import FileUpload from "@/views/create/upload/FileUpload";
export default {
  name: "ImageForm",
  components: {
    ImageUpload,
    FileUpload
  },
  data(){
    return {
      uploadObject: [],
      filename: '',

      uploadUrl: '',
      imageURLObject :{
        frontFace: '',
        frontSmileFace: '',
        sideFace: '',


        upTooth: '',
        downTooth: '',
        rightTooth: '',
        leftTooth: '',
        frontTooth: '',

        xSurfaceFault: '',
        xHeadSide: '',

        otherImages: [],


      }
    }
  },

  watch: {
    uploadObject( newVal) {
      this.filename =  newVal.map(item => {
        return item.name
      }).join(",")
    }
  },

  methods: {
    onUpdate(res) {
      this.imageURLObject.frontFace = res.data.imageUrl;
    },
    setFrontFaceURL(fileObj) {
      console.log(fileObj.url)
      this.imageURLObject.frontSmileFace = fileObj.url
    },
    setFrontSmileFace(fileObj) {
      this.imageURLObject.frontSmileFace = fileObj.url
    },
    setSideFace(fileObj) {
      this.imageURLObject.sideFace = fileObj.url
    },
    setUpToothURL(fileObj) {
      this.imageURLObject.upTooth = fileObj.url
    },
    setDownToothURL(fileObj) {
      this.imageURLObject.downTooth = fileObj.url
    },
    setLeftToothURL(fileObj) {
      this.imageURLObject.leftTooth = fileObj.url
    },
    setRightToothURL(fileObj) {
      this.imageURLObject.rightTooth = fileObj.url
    },
    setFrontToothURL(fileObj) {
      this.imageURLObject.frontTooth = fileObj.url
    },
    setXSurfaceFaultURL(fileObj) {
      this.imageURLObject.xSurfaceFault = fileObj.url
    },
    setXHeadSide(fileObj) {
      this.imageURLObject.xHeadSide = fileObj.url
    },

    setUploadData(obj) {
      this.uploadObject = obj
    }
  }
}
</script>

<style scoped>
.face > * {
  display: inline-block;
}

.intraoral-image > * {
  display: inline-block;
}

.x-image > * {
  display: inline-block;
}

.el-input {
  width: 400px;
}
.inline-input > * {
  display: inline-block;;
}
  /*.intraoral-image {*/
  /*  display: flex;*/
  /*}*/
  /*.x-image{*/
  /*  display: flex;*/
  /*}*/
  /*.upload-demo{*/
  /*}*/
  /*.el-upload__tip{*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*}*/
  /*.el-icon-upload{*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*}*/

  /*.el-img-upload{*/
  /*  width: 150px;*/
  /*  height: 150px;*/
  /*}*/

</style>
