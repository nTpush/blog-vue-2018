<template>
    <div>
        <o-form ref="EditFormRef" :defaultFormData="defaultFormData" @getFormData="getFormData"></o-form>
    </div>
</template>
<script>
  import oForm from '@/views/tag-management/form.vue'
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
        let obj = {name: data.name, status: data.status}
        this.$http.put('/api/tag-m/' + data.id, obj).then(res => {
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
