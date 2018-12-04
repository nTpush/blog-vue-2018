<template>
  <div>
    评论管理
    <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">Preview</span>
    {{currentPage}} / {{pageCount}}
    // 下一页
    <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">Next</span>
    <pdf
      :src="'http://new-practice.local/api/test'"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler">
    ></pdf>
  </div>
</template>
<script>
  import pdf from 'vue-pdf'
  export default {
    components: {
      pdf
    },
    data () {
      return {
        src: '',
        currentPage: 0, // pdf文件页码
        pageCount: 0, // pdf文件总页数
        fileType: 'pdf'// 文件类型
      }
    },
    methods: {
      // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
      changePdfPage (val) {
        // console.log(val)
        if (val === 0 && this.currentPage > 1) {
          this.currentPage--
          // console.log(this.currentPage)
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
          // console.log(this.currentPage)
        }
      },

      // pdf加载时
      loadPdfHandler (e) {
        this.currentPage = 1 // 加载的时候先加载第一页
      }
    },
    created () {
      var url = 'http://new-practice.local/api/test'
      var xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function () {
        var fileName = 'a.pdf'
        var blob = this.response
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      }
      xhr.open('get', url)
      xhr.send()
    }
  }
</script>
