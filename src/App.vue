<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="Router"/>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'aa'  // 默认动态路由变化为slide-right
    }
  },
  watch: {
    '$route' (to, from) {
      var toDepth = to.path.split('/').length
      var fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'aa' : 'bb'
    }
  }
}
</script>
<style scoped="">
  .Router {
    position: absolute;
    width: 100%;
    height: 100vh;
    /* overflow: hidden; */
    opacity: 1;
    transition: all 1s ease;
  }
  .aa-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) rotate(10deg);
  }
  .aa-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0) rotate(-10deg);
  }
  .bb-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0) rotate(-10deg);
  }
  .bb-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) rotate(10deg);
  }
@media(min-width:768px){
 .Router {
   overflow: hidden;
 }
}
@media(min-width:992px){

}
@media(min-width:1200px){

}
</style>
