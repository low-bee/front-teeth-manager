<template>
  <div v-if="flag">
    <el-checkbox-group v-model="array">
      <el-checkbox v-for="i in 8"
                   :label="i"
                   :key="i"
                   class="tooth">{{ i }}
      </el-checkbox>
      <el-divider class="divider-vertical" direction="vertical"></el-divider>
      <el-checkbox v-for="i in 8"
                   :label="i"
                   :key="i+8"
                   class="tooth">{{ 9 - i }}
      </el-checkbox>
    </el-checkbox-group>

    <el-divider class="divider-horizontal"></el-divider>
    <el-checkbox-group v-model="array" >
      <el-checkbox v-for="i in 8"
                   :label="i"
                   :key="i+16"
                   class="tooth">{{ i }}
      </el-checkbox>
      <el-divider class="divider-vertical" direction="vertical"></el-divider>
      <el-checkbox v-for="i in 8"
                   :label="i"
                   :key="i+24"
                   class="tooth">{{ 9 - i }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "ToothAbstract",
  props: {
    flag: Boolean,
    array: Array
  }
}
</script>

<style scoped>
  .divider-vertical {
    height: 40px;
  }

  .divider-horizontal {
    height: 1px;
    width: 700px;
    margin-top: 1px;
    margin-bottom: 1px;
  }

  .tooth {
    margin-right: 10px;
  }
</style>
