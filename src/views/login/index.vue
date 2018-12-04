<template>
  <div>
    <el-button type="primary" @click="handleGoIndex">主要按钮</el-button>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      handleGoIndex () {
        this.$router.replace('/statistical')
      }
    }
  }
</script>
<style lang="postcss" scoped="">
  div {
    width: 100%;
    /*height: 100vh;*/
    background: #07D2D6;
    text-align: center;
    padding-top: 20%;
    /*padding-bottom: 50%;*/
  }
</style>
