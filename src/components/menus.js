export const MENUS = [{
  name: '内容管理',
  menus: [{
    id: 1,
    name: '文章管理',
    path: '/article-management',
    type: 'md-document'
  }, {
    id: 2,
    name: '评论管理',
    path: '/comment-management',
    type: 'md-chatbubbles'
  }, {
    id: 3,
    name: '分类管理',
    path: '/class-management',
    type: 'ios-card'
  }, {
    id: 4,
    name: '标签管理',
    path: '/tag-management',
    type: 'logo-buffer'
  }]
}, {
  name: '静态资源',
  menus: [{
    id: 6,
    name: '文件上传',
    path: '/file-upload',
    type: 'md-cloud-upload'
  }, {
    id: 7,
    name: '回收站',
    path: '/recycle-bin',
    type: 'md-trash'
  }]
}]
