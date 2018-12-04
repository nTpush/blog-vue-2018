<template>
    <div>
        <o-form ref="EditFormRef" :defaultFormData="defaultFormData" @getFormData="getFormData"></o-form>
    </div>
</template>
<script>
  import oForm from '@/views/article-management/form.vue'
  export default {
    components: {
      oForm
    },
    props: {
      defaultFormData: Object,
      default: function () {
        return {
        }
      }
    },
    methods: {
      getFormData (data) {
        let formData = data
        formData.resource_path_id = formData.type ? formData.resource_path_id : ''
        delete formData.path
        this.$http.put('/api/article/' + data.id, data).then(res => {
          this.$emit('handleRefresh')
          this.$refs['EditFormRef'].handleReset('formValidate')
          this.$Message.success('操作成功!')
        })
      },
    // 清空
      handleResetMid () {
        this.$refs['EditFormRef'].handleReset('formValidate')
      }
    }
  }
</script>
