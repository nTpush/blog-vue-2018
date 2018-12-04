<template>
  <div class="hello">
    <el-container>
      <el-header><qHeader></qHeader></el-header>
      <el-container>
        <el-aside width="200px"><qMenu></qMenu></el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import qMenu from '@/components/Menu.vue'
  import qHeader from '@/components/Header.vue'
  export default {
    name: 'Index',
    components: {
      qMenu, qHeader
    },
    data () {
      return {

      }
    },
    methods: {
      init () {
        console.log(1)
      }
    },
    created () {
      console.log($)
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #318BF0;
    color: #f5f5f5;
    line-height: 60px;
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    width: 240px !important;
  }

  .el-main {
    background-color: #fff;
    height: calc(100vh - 60px) ;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
