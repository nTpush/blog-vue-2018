<template>
    <div>
        <el-button @click="handleLook" type="primary" size="small">查看</el-button>
        <el-button type="success" size="small" @click="handleEdit">编辑</el-button>
    </div>
</template>

<script>
    export default {
        props: {
            row: Object
        },
        data() {
            return {

            }
        },
        methods: {
            handleLook() {
                console.log(this.row, 'row')
            },
            handleEdit() {
                this.$emit('handleEdit', this.row)
            }
        },

    }
</script>