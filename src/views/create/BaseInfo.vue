<template>
  <div class="base-info">
    <h1>患者信息</h1>
    <el-form :model="BaseInfoForm" :rules="rules" ref="baseInfoForm" label-width="100px" class="demo-baseInfoForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="BaseInfoForm.name"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="BaseInfoForm.gender">
          <el-radio label="男" :value="1"></el-radio>
          <el-radio label="女" :value="2"></el-radio>
          <el-radio label="无性别" :value="3"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="BaseInfoForm.age"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="BaseInfoForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="desc">
        <el-input type="textarea" v-model="BaseInfoForm.desc"></el-input>
      </el-form-item>

      <h1>所属医院</h1>
      <el-form-item label="所属医院" prop="hospital">
        <!--      v-model 绑定的类型要和value中的类型一致，否则会出现类型不一致警告-->
        <el-select v-model="hospital" placeholder="请选择所属医院">
          <el-option label="请选择" value="" disabled></el-option>
          <el-option v-for="(hospital,index) in BaseInfoForm.hospitals"
                     :label="hospital"
                     :value="hospital"
                     :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属医院" prop="hospital">
        <el-select v-model="address" placeholder="请选择地址">
          <el-option label="请选择" value="" disabled></el-option>
          <el-option v-for="(addr,index) in BaseInfoForm.address" :label="addr" :value="addr" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",

  data() {
    return {
      //  医院
      hospital: '',
      // 医生地址
      address: '',

      // 表单信息
      BaseInfoForm: {
        name: '',
        gender: null,
        age: null,
        phone: '',
        desc: '',
        address: [],
        hospitals: []
      },

      // 表单校验规则
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        age: [
          {require: true, message: '请输入年龄', trigger: 'blur'},
          {min: 0, max: 150, trigger: 'blur'}
        ]

      }
    };
  },

  mounted() {
    this.getUserInfo()
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getUserInfo() {
      this.$axios.get('/sys/userInfo').then(res => {
        this.BaseInfoForm.hospitals = res.data.data.detail.map(item => {
          return item.hospital;
        })

        this.BaseInfoForm.address = res.data.data.detail.map(item => {
          return item.address;
        })

        this.$store.commit("resetUserInfo", res.data.data)
      })
    }
  }

}
</script>

<style scoped>
.base-info {
  width: 800px;
  margin-left: 100px;
}
</style>
