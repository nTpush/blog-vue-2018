<template>
  <div class="box">
    <div class="my-info">
      <!--基本信息-->
     <div class="my-info-base">
       <p class="portrait">
         <img src="@/assets/imgages/me.png" alt="">
       </p>
       <p class="name">温柔、遇见</p>
       <p class="title">当才华撑不起野心时，就静下来学习。</p>
     </div>
      <!--统计信息-->
     <div class="my-info-statistical">
       <ul>
         <li>
           <h2>88</h2>
           <p>文章</p>
         </li>
         <li>
           <h2>88</h2>
           <p>分类</p>
         </li>
         <li>
           <h2>88</h2>
           <p>评论</p>
         </li>
       </ul>
     </div>
      <!--分割线-->
      <div class="my-info-cut-line"></div>
      <!--联系我的方式-->
      <div class="my-info-contact-me">
        <ul>
          <li><Icon type="ios-send" class="icon" />QQ</li>
          <li><Icon type="ios-chatbubbles" class="icon" />微信</li>
          <li><Icon type="logo-github" class="icon" />Github</li>
          <li><Icon type="md-mail" class="icon" />Email</li>
        </ul>
      </div>
      <!--版权信息-->
      <div class="my-info-copyright-information">
        <p>© 温柔、遇见 2017-2018</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped="">
  @import '../less/base';
  @import '../less/user';
</style>
