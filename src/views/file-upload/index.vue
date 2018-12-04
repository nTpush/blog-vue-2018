<template>
  <div>
    <Upload
      :format="['zip']"
      :on-format-error="handleFormatError"
      :on-success="handleSuccess"
      type="drag"
      :action="httpUrl + '/api/blog/oss'">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>

      <el-table-column
        prop="row"
        label="文件名称"
        >
        <template slot-scope="scope">
            <p>{{ scope.row.path.split('/')[1] }}</p>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.status === 1">当应用前版本</p>
          <p v-if="scope.row.status === 2">可申请恢复</p>
          <p v-if="scope.row.status === 3">文件已删除，不可恢复</p>
        </template>
      </el-table-column>

      <el-table-column
        prop="created_at"
        label="上传日期"
        width="200">
      </el-table-column>

      <!--暂时不支持任何操作-->
      <!--<el-table-column-->
        <!--fixed="right"-->
        <!--label="操作"-->
        <!--width="150">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button @click="handleClick(scope.row)"  size="small">退回</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <!--<TreeFile :treeFiles="treeFiles.dir"></TreeFile>-->
    <!--<ul>-->
      <!--<li v-for="item in treeFiles.file">-->
        <!--{{item}}-->
      <!--</li>-->
    <!--</ul>-->

    <!---->
  </div>
</template>
<script>
    import root from '@/service/root.js'
    import TreeFile from '@/views/file-upload/TreeFile.vue'
    export default {
      components: { TreeFile },
      data () {
        return {
          httpUrl: '',
          treeFiles: {},
          tableData: []
        }
      },
      methods: {
        handleClick (row) {
          console.log(row)
        },
        handleFormatError (file) {
          this.$Notice.warning({
            title: '请上传正确格式的文件',
            desc: `文件：${file.name} 只支持【 .zip 】的类型`
          })
        },
        handleSuccess (res, file) {
          this.$Message.success('文件上传成功')
          this.handleDefaultDistList()
        },
        handleDefaultDistList () {
          this.$http.get('/api/blog/dist-list').then(res => {
            this.tableData = res
            console.log(res, 'd')
          })
        }
      },
      created () {
        this.httpUrl = root.httpUrl
        this.handleDefaultDistList()
        this.$http.get('/api/blog/disk-list').then(res => {
          this.treeFiles = res
          console.log(res, 'd')
        })
      }
    }
</script>
