<template>
  <!--文章详情-->
  <div class="view article-detail" v-if="show">
    <!--功能按钮-->
   <div class="article-detail-buttons">
     <!--上一篇-->
     <button class="left" @click="handleLeft"><i class="el-icon-arrow-left"></i></button>
     <!--下一篇-->
     <button class="right" @click="handleRight"><i class="el-icon-arrow-right"></i></button>
   </div>
    <!--文章内容-->
    <div class="article-detail-content">
      <button @click="detailClose" class="close">
        close
      </button>
      <!--基本信息-->
      <div class="base-info">
        <!--标题-->
        <div class="title">{{ articleDetail.title }}</div>
        <!--标签和日期-->
        <div class="mate-and-date">
          <!--标签-->
          <div class="mate">
            <div v-for="(item, key) in articleDetail.mate_id" :key="key">
              <el-tag  disable-transitions
                       size="mini"
                       v-for="(item1) in $store.getters.mates" :key="item1.id"
                       v-if="Number(item) === Number(item1.id)"
                       style="margin-right: 5px; margin-bottom: 5px"
                       :type="key%2===0 ? 'success' : 'primary'"
              >{{ item1.name }}</el-tag>
            </div>
          </div>
          <!--日期-->
          <span class="date">{{ articleDetail.author }} <b>·</b> {{ articleDetail.created_at }}</span>
      </div>
        <!--<p class="info">作者：{{articleDetail.author}}</p>-->
      </div>
      <!--主要内容-->
      <div class="main-info" >
        <!--<div style="height: 1000px; width: 10px; background: red"></div>-->
        <!--loading-->
        <div v-if="!showMd">
          <Spin fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>内容准备中...</div>
          </Spin>
        </div>
        <!--文章-->
        <!--{{}}-->
        <VueMarkdown :class="{md: Number(articleDetail.type) === 3, md1: !(Number(articleDetail.type) === 3)}" v-highlight v-if="showMd">{{ articleDetail.content }}</VueMarkdown>
        <!--评论-->
        <div class="commit">
          评论
        </div>
      </div>
    </div>
    <!--<div contenteditable="true" style="width: 200px; height: 399px;"></div>-->
  </div>
</template>
<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    components: {
      VueMarkdown
    },
    props: {
      articleDetail: Object,
      showMd: Boolean
    },
    data () {
      return {
        show: false
      }
    },
    methods: {
      handleLeft () {
        this.$emit('handleLeft')
      },
      handleRight () {
        this.$emit('handleRight')
      },
      detailShow () {
        this.show = true
      },
      detailClose () {
        this.$emit('handleChangeTitle', 'Hello——欢迎访问我的博客')
        this.show = false
        // 取消路由标记
        let path = this.$router.path
        let routeParams = { path }
        this.$router.push(routeParams)
      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>
<style lang="less" scoped="">
  @import '../less/base';
  @import '../less/article';
  /*@import '../less/style1';*/
</style>
