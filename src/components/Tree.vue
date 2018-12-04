<template>
  <Tree :data="data1" @on-select-change="handleClick" ></Tree>
</template>
<script>
  export default {
    data () {
      return {
        data1: [
          {
            title: 'parent 1',
            expand: true,
            children: [
              {
                title: 'parent 1-1',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-1-1'
                  },
                  {
                    title: 'leaf 1-1-2'
                  }
                ]
              },
              {
                title: 'parent 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1'
                  },
                  {
                    title: 'leaf 1-2-1'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleClick (a) {
        console.log(a, 9999)
      }
    }
  }
</script>
