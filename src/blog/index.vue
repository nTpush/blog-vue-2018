<template>
  <div>
      <router-view/>
  </div>
</template>
<style lang="postcss" scoped>
  :root {
    --color-main: #fff;
  }
  div {
    width: 100%;
    height: 100vh;
    background: var(--color-main);
    /*position: absolute;*/
    /*left: -100%;*/
  }


</style>
