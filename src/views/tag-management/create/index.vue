<template>
    <div>
        <o-form ref="createFormRef" @getFormData="getFormData" ></o-form>
    </div>
</template>
<script>
import oForm from '@/views/tag-management/form.vue'
export default {
  components: {
    oForm
  },
  methods: {
    // 传递初始值
    getFormData (data) {
      this.$emit('submitFormData', data)
      this.$http.post('/api/tag-m', data).then(res => {
        this.$emit('handleRefresh')
        this.$refs['createFormRef'].handleReset('formValidate')
        this.$Message.success('操作成功!')
      })
      console.log(data, '初始值-创建')
    },
    // 清空
    handleResetMid () {
    }
  }
}
</script>
