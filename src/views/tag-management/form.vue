<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标签名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入分类标题"></Input>
        </FormItem>

        <FormItem label="是否启用" >
              <RadioGroup v-model="formValidate.status">
                <Radio :label="Number(1)">是</Radio>
                <Radio :label="Number(0)">否</Radio>
              </RadioGroup>
        </FormItem>

         <FormItem style="text-align: right">
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
  props: {
    defaultFormData: Object,
    default: function () {
      return {
      }
    }
  },
  data () {
    return {
      formValidate: {
        name: '',
        status: '1'
      },
      ruleValidate: {
        name: [
            { required: true, message: '文章标题不能为空！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
     /*
     * 数据提交
     */
    handleSubmit (name) {
      console.log(this.main, 10086)
      this.$refs[name].validate((valid) => {
        if (valid) {
            // 将数据传递给中间层
          this.$emit('getFormData', this.formValidate)
        } else {
          this.$Message.warning('表单内容不完整，请重新提交')
        }
      })
    },
    /*
     * 清空操作
     */
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  watch: {
    /**
     * 设置表的初始值
     * @param defaultData
     */
    defaultFormData (defaultData) {
      console.log(defaultData, '10086')
      this.isUpload = defaultData.type === '' ? '0' : '1'
      this.resource_path = defaultData.path
      this.$http.get(`/api/tag-m/${defaultData.id}`).then(res => {
        this.formValidate = {...defaultData, ...res}
      })
    }
  },
  created () {
  }
}
</script>
<style lang="postcss" scoped="">
  .div-box {
    border-radius: 5px;
    background: #F7F7F7;
    transition: all 1s;
    border-left: 5px solid #ccc;
    padding-bottom: 1px;
    padding-top: 5px;
  }
  .div-box img {
    width: 25px;
    vertical-align: middle;
  }
</style>
