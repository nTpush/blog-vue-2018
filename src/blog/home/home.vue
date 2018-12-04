<template>
  <div class="article-main-box">
    <!--动态切换网页title-->
    <h2 v-title="webTitle" v-if="webShow" style="position: absolute; top: -100px">通过指令设置页面标题</h2>
    <!--文章详情-->
    <ArticleTemp ref="detail"
                 :showMd="showMd"
                 :articleDetail="articleDetail"
                 @handleLeft="handleLeft"
                 @handleRight="handleRight"
                 @handleChangeTitle="handleChangeTitle"
    ></ArticleTemp>
    <!--用户信息-->
    <UserTemp></UserTemp>
    <!--网页主体-->
    <div class="article-main-box-list" ref="articles">
      <!--功能菜单-->
      <el-row type="flex" class="row-button-box">
        <!--showMe按钮-->
        <el-col :span="12"><div class="show-me">
           <button
                @click="handleShowUser"
                :class="{'animation-stop': !showMe, 'animation-start': showMe}">
            {{showMe? 'show Me!' : 'close'}}<i class="el-icon-arrow-right"></i>
          </button>
        </div></el-col>
        <!--搜索功能(暂无)-->
        <el-col :span="12" style="text-align: right"><div>
          <!--<i class="el-icon-menu text-sha"></i> &emsp;-->
        </div></el-col>
      </el-row>
      <!--文章简介列表-->
      <div class="article-introduction">
        <ul>
          <li v-for="(item, index) in tableData" :key="index"
              :class = "{'articles-li-img': item.type !== '' && Number(item.type) === 0 ,
                         'articles-li-font': !(item.type !== '' && Number(item.type) === 0)}"
            @click.self="handShowArticle(item.id)">
            <!--创建日期-->
            <div class="created_at">{{ item.created_at }}</div>
            <!--标题-->
            <div class="title" v-if="!(item.type !== '' && Number(item.type) === 0)">{{ item.title }}</div>
            <!--缩略图-->
            <img v-lazy="item.path" alt="" v-if="item.type !== '' && Number(item.type) === 0" class="thumbnail"  @click.self="handShowArticle(item.id)">
            <!--简介-->
            <span class="introduction" v-if="!item.resource_path_id || Number(item.type) !== 0" @click.self="handShowArticle(item.id)">
              {{ item.summary }}
            </span>
            <!--分类标签-->
            <div @click.self="handShowArticle(item.id)"
                 class="tags"
                 :style="{'height':item.type !== '' && Number(item.type) === 0 ? '5px' : '50px'}">
              <span v-for="(item, key) in item.mate_id" :key="key">
                 <el-tag  disable-transitions
                         size="mini"
                         v-for="(item1, key1) in $store.getters.mates" :key="key1"
                         v-if="Number(item) === Number(item1.id)"
                         style="margin-right: 5px; margin-bottom: 5px"
                         :type="types[Math.floor(Math.random () * 5)]"
                >{{ item1.name }}</el-tag>
              </span>
            </div>
            <!--包含资源-->
            <span class="type" v-if="!item.resource_path_id || Number(item.type) !== 0">
               <a target="_blank" :href="item.path" v-if="item.type !== '' && Number(item.type) === 0">
              <img src="@/assets/imgages/image.png" alt="图片">
              </a>
              <a target="_blank" :href="item.path" v-if="item.type !== '' && Number(item.type) === 1">
                <img src="@/assets/imgages/video.png" alt="视频">
              </a>
              <a target="_blank" :href="item.path" v-if="item.type !== '' && Number(item.type) === 2">
                <img src="@/assets/imgages/music.png" alt="音乐">
              </a>
              <!--<a target="_blank" :href="item.path" v-if="item.type !== '' && Number(item.type) === 3">-->
                <img src="@/assets/imgages/md.png" alt="md" v-if="item.type !== '' && Number(item.type) === 3">
              <!--</a>-->
              <a target="_blank" :href="item.path" v-if="item.type !== '' && Number(item.type) === 99">
               <img src="@/assets/imgages/other.png" alt="其他">
              </a>
              <img src="@/assets/imgages/null.png" alt="其他" v-if="item.type === ''">
            </span>
          </li>
          <!--还有更多-->
          <li>
            <img src="@/assets/imgages/more.png" alt="" style="width: 50px">
          </li>
        </ul>
      </div>
    </div>
    <!--网页装饰物-->
    <div class="article-main-box-ornament">
      <div class="dec1 one">“</div>
      <div class="dec2 two">
        <span>TOP</span>
      </div>
    </div>
    <!--网站说明信息-->
    <div class="article-main-box-description">
     <div class="contact-me">
       <ul>
         <li></li>
         <li></li>
         <li></li>
         <li></li>
       </ul>
     </div>
     <div class="circle"></div>
     <span>代码如诗，唯建作伴</span>@v1.0
   </div>
  </div>
</template>
<script>
  import ArticleTemp from '@/blog/home/article.vue'
  import UserTemp from '@/blog/home/user.vue'
  import { getBrowserInfo } from '@/Help.js'
  export default {
    components: {
      ArticleTemp, UserTemp
    },
    data () {
      return {
        firefox: '',
        keywords: '',
        AllData500: [],
        tableData: [],
        articleDetail: {},
        scrollIndex: 1,
        firstBo: true,
        showMe: true,
        showMd: true, // 解决md组件的缓存问题
        webTitle: 'Hello——欢迎访问我的博客',
        webShow: true,
        types: ['success', 'info', 'warning', 'danger', '']
      }
    },
    methods: {
      // 上一篇
      handleLeft () {
        let nowindex = this.$route.query.i
        nowindex -= 1
        if (nowindex <= -1) {
          this.$Notice.info({
            title: '这已经是第一篇喽'
          })
        } else {
          this.showMd = false
          this.handShowArticle(this.AllData500[nowindex].id)
          setTimeout(() => {
            this.showMd = true
          }, 1000)
        }
      },
      // 下一篇
      handleRight () {
        let nowindex = this.$route.query.i
        nowindex += 1
        if (nowindex >= this.AllData500.length) {
          this.$Notice.info({
            title: '没有更多了'
          })
        } else {
          this.showMd = false
          this.handShowArticle(this.AllData500[nowindex].id)
          setTimeout(() => {
            this.showMd = true
          }, 1000)
        }
      },
      // showMe
      handleShowUser () {
        if (this.showMe) {
          this.showMe = false
          $('.article-main-box').animate({left: 390}, 50)
        } else {
          this.showMe = true
          $('.article-main-box').animate({left: 0}, 50)
        }
      },
      // 横向滚动
      MouseWheel (e) {
        this.showMe = true
        $('.article-main-box').animate({left: 0}, 50)
        let articles = this.$refs.articles
        e = e || window.event
        if (e.stopPropagation) {
          e.stopPropagation()
        } else {
          e.cancelBubble = true
        }
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
        if (this.firefox) {
          if (e.detail > 0) {
            $('.article-introduction').scrollLeft($('.article-introduction').scrollLeft() - 60)
          } else {
            $('.article-introduction').scrollLeft($('.article-introduction').scrollLeft() + 60)
          }
        } else {
          if (e.wheelDelta > 0) {
            $('.article-introduction').scrollLeft($('.article-introduction').scrollLeft() - 60)
          } else {
            $('.article-introduction').scrollLeft($('.article-introduction').scrollLeft() + 60)
          }
        }
        // 滚动懒加载。滚动到底部增加3篇
        // console.log($(document).width(), $('.article-introduction ul').width(), $('.article-introduction').scrollLeft())
        if ($('.article-introduction').scrollLeft() >= $('.article-introduction ul').width() - $(window).width()) {
          if (this.tableData.length >= this.AllData500.length) {
            if (this.firstBo) {
              this.firstBo = false
              this.$Notice.info({
                title: '客官！文章都在了'
              })
            }
          } else {
            this.scrollIndex ++
            console.log(this.scrollIndex, 'index')
            this.tableData.push(...(this.AllData500.slice((this.scrollIndex - 1) * 3, (this.scrollIndex - 1) * 3 + 3)))
            console.log(this.tableData, '9999', this.AllData500)
            $('.article-introduction ul').css({
              width: this.tableData.length * 558 + 'px'   // 根据文章列表计算长度
            })
          }
        }
      },
      // 纵向滚动
      MouseWhellDefault (e) {
        let scrollTop = document.documentElement.scrollTop
        let heightU = document.documentElement.scrollHeight
        let heightW = document.documentElement.clientHeight
        if (scrollTop >= heightU - heightW) {
          if (this.tableData.length >= this.AllData500.length) {
            if (this.firstBo) {
              this.firstBo = false
              this.$Notice.info({
                title: '客官！文章都在了'
              })
            }
          } else {
            this.scrollIndex ++
            this.tableData.push(...(this.AllData500.slice((this.scrollIndex - 1) * 3, (this.scrollIndex - 1) * 3 + 3)))
          }
        }
      },
      /**
       * >768 横向滚动
       * @param articles
       */
      moreThen768 (articles) {
        if (window.innerWidth > 768) {
          console.log(this.tableData.length, ' 99')
          $('.article-introduction').scrollLeft($('.article-introduction').scrollLeft())
          $('.article-introduction ul').css({
            width: this.tableData.length * 558 + 'px'   // 根据文章列表计算长度
          })
          this.firefox ? window.removeEventListener('DOMMouseScroll', null, false) : (window.onscroll = null)
          this.firefox ? articles.addEventListener('DOMMouseScroll', this.MouseWheel, false) : (articles.onmousewheel = this.MouseWheel)
        } else {
          this.showMe = true
          $('.article-main-box').animate({left: 0}, 50)
          $('.article-introduction').scrollLeft(0)
          $('.article-introduction ul').css({
            width: '100%'
          })
          this.firefox ? articles.addEventListener('DOMMouseScroll', null, false) : (articles.onmousewheel = null)
          this.firefox ? window.removeEventListener('DOMMouseScroll', this.MouseWhellDefault, false) : (window.onscroll = this.MouseWhellDefault)
        }
      },
      defaultList () {
        let articles = this.$refs.articles
        this.$http.get('/api/blog/articles').then(res => {
          this.AllData500 = res.data
//          this.pageParams.total = this.AllData500.length
          // .slice((index - 1) * 15, (index - 1) * 15 + 15)  // 前端分页
          this.tableData = this.AllData500.slice(0, 3)
          if (window.innerWidth > 768) {
            $('.article-introduction ul').css({
              width: this.tableData.length * 558 + 'px'   // 根据文章列表计算长度
            })
          } else {
            $('.article-introduction ul').css({
              width: '100%'
            })
          }
          // 如果存在id则执行该函数
          if (this.$route.query.id) {
            this.handShowArticle(this.$route.query.id)
          }
        })
      },
      /**
       * 显示文章
       */
      handShowArticle (id) {
        // 路由标记
        let path = this.$router.path
        let routeParams = { path }
        this.webShow = false
        var dataIndex = this.AllData500.findIndex(value => value.id === id)
        routeParams.query = {
          id,
          i: dataIndex
        }
        this.$router.push(routeParams)
        // 搜索文章内容
        console.log(this.tableData, '文章列表')
        var defaultData = this.AllData500.find(value => value.id === id)
        this.$http.get(`/api/article/${id}`).then(res => {
          setTimeout(() => {
            this.webShow = true
            this.webTitle = `【 ${this.articleDetail.title} 】`
          }, 100)
          this.articleDetail = {...defaultData, ...res}
          // 显示弹框
          this.$refs['detail'].detailShow()
          console.log(this.articleDetail, '9')
        })
      },
      // 返回原来的title
      handleChangeTitle (title) {
        this.webTitle = title
        this.webShow = false
        setTimeout(() => {
          this.webShow = true
        }, 100)
      }
    },
    mounted () {
      this.firefox = navigator.userAgent.indexOf('Firefox') !== -1
      let articles = this.$refs.articles
      // todo 节流优化
      window.onresize = () => {
        this.moreThen768(articles)
      }
      this.moreThen768(articles)
    },
    created () {
      // 判断浏览器内核
      if (getBrowserInfo() !== '谷歌') {
        this.$Notice.warning({
          duration: 5,
          title: '温馨提示',
          desc: `HI！您的浏览器是：${getBrowserInfo()} ， 切换谷歌浏览器可获得最佳体验哦！`
        })
      }
      this.$store.dispatch('GetClassOrMate')
      this.defaultList()
      this.$http.get('/api/blog/log').then(res => {
        console.log(res, '9')
      })
    },
    computed: {
    }
  }
</script>

<style lang="less" scoped="">
  @import '../less/base';
  @import '../less/home';
</style>
