<template>
  <div>
    <ul>
      <li v-for="(item, key) in treeFiles" @click="changeStatus(key)">
        >> 目录 {{ item.dir }}
          <ol>
            <li v-for="item1 in item.file.file">
              {{ item1 }}
            </li>
          </ol>
        <TreeFile v-if="item.file.dir" :treeFiles="item.file.dir"></TreeFile>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TreeFile',
    props: ['treeFiles'],
    data () {
      return {

      }
    },
    methods: {
      changeStatus (index) {
        console.log(index)
        if (this.scopesDefault[index] === true) {
          this.$set(this.scopesDefault, index, false)
        } else {
          this.$set(this.scopesDefault, index, this.scopes[index])
        }
      },
      scope () {
        this.list.forEach((item, index) => {
          this.scopesDefault[index] = false
          if ('cList' in item) {
            this.scopes[index] = true
            console.log(item, index)
          } else {
            this.scopes[index] = false
          }
        })
        console.log(this.scopesDefault)
      }
    }
  }
</script>
