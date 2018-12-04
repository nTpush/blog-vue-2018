<template>
  <Menu :theme="theme3" :active-name="$route.path" class="menu">
    <MenuGroup :title="item.name" v-for="(item, key) in MENUS" :key="key">
        <MenuItem :name="item1.path" @click.native="$router.push(item1.path)" v-for="(item1, key1) in item.menus" :key="key1">
          <Icon :type="item1.type" />
          {{item1.name}}
        </MenuItem>
    </MenuGroup>

    <!-- <MenuGroup title="内容管理">
        <MenuItem name="/article-management" @click.native="$router.push('/article-management')">
          <Icon type="md-document" />
          文章管理
        </MenuItem>
      <MenuItem name="/comment-management" @click.native="$router.push('/comment-management')">
        <Icon type="md-chatbubbles" />
        评论管理
      </MenuItem>
    </MenuGroup> -->
    <!--<MenuGroup title="统计分析">-->
      <!--<router-link to="/user-retention">-->
      <!--<MenuItem name="3">-->
        <!--<Icon type="md-heart" />-->
        <!--用户留存-->
      <!--</MenuItem>-->
      <!--</router-link>-->
      <!--<router-link to="/churn-user">-->
      <!--<MenuItem name="4">-->
        <!--<Icon type="md-leaf" />-->
        <!--流失用户-->
      <!--</MenuItem>-->
      <!--</router-link>-->
    <!--</MenuGroup>-->
    <!-- <MenuGroup title="静态资源">
        <MenuItem name="/file-upload" @click.native="$router.push('/file-upload')">
          <Icon type="md-cloud-upload" />
          文件上传
        </MenuItem>
        <MenuItem name="/recycle-bin" @click.native="$router.push('/recycle-bin')">
          <Icon type="md-trash" />
          回收站
        </MenuItem>
    </MenuGroup> -->
  </Menu>
</template>
<script>
  import { MENUS } from './menus'
  export default {
    data () {
      return {
        theme3: 'light',
        MENUS: []
      }
    },
    created () {
      this.MENUS = MENUS
    }
  }
</script>
<style>
  .menu a{
    color: #222 !important;
  }
</style>
