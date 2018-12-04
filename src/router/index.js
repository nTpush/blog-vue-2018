import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'
import Blog from '@/blog/index.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: '登录',
    redirect: '/blog',
    component: () => import('@/blog/home/home.vue')
  },
  {
    path: '/admin',
    name: 'Index',
    component: Index,
    redirect: '/login',
    children: [{
      path: '/statistical',
      name: '统计',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/article-management',
      name: '文章管理',
      component: () => import('@/views/article-management/index.vue')
    },
    {
      path: '/class-management',
      name: '分类管理',
      component: () => import('@/views/class-management/index.vue')
    },
    {
      path: '/tag-management',
      name: '标签管理',
      component: () => import('@/views/tag-management/index.vue')
    },
    {
      path: '/churn-user',
      name: 'ChurnUser',
      component: () => import('@/views/churn-user/index.vue')
    },
    {
      path: '/comment-management',
      name: 'CommentManagement',
      component: () => import('@/views/comment-management/index.vue')
    },
    {
      path: '/user-retention',
      name: 'UserRetention',
      component: () => import('@/views/user-retention/index.vue')
    },
    {
      path: '/file-upload',
      name: '文件上传',
      component: () => import('@/views/file-upload/index.vue')
    },
    {
      path: '/recycle-bin',
      name: '回收站',
      component: () => import('@/views/recycle-bin/index.vue')
    }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/blog/home/home.vue')
  },
  {
    path: '/a',
    name: 'Index',
    component: () => import('@/animation/A.vue')
  },
  {
    path: '/b',
    name: 'Index',
    component: () => import('@/animation/B.vue')
  },
  {
    path: '/c',
    name: 'Index',
    component: () => import('@/animation/C.vue')
  },
  {
    path: '/d',
    name: 'Index',
    component: () => import('@/animation/D.vue')
  }
  ]
})
