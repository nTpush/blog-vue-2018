<template>
  <div>
    <el-row>
      <!--<el-button icon="el-icon-search" circle></el-button>-->
      <el-button type="primary" icon="el-icon-edit" circle @click="handleCreate"></el-button>
      <!--<el-button type="success" icon="el-icon-check" circle></el-button>-->
      <!--<el-button type="info" icon="el-icon-message" circle></el-button>-->
      <!--<el-button type="warning" icon="el-icon-star-off" circle></el-button>-->
      <!--<el-button type="danger" icon="el-icon-delete" circle></el-button>-->
    </el-row>
    <el-row class="type">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="index"></el-table-column>

        <el-table-column
          label="名称"
          >
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span >{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status">开启</el-tag>
            <el-tag type="info" v-else>关闭</el-tag>
            <!--<i class="el-icon-time"></i>-->
          </template>
        </el-table-column>


        <el-table-column
          label="创建日期"
          align="center"
          width="130">
          <template slot-scope="scope">
            <span >{{ scope.row.created_at ? scope.row.created_at.split(' ')[0] : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditEle(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteEle(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: right; margin-top: 10px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageParams.total"
        :page-size="pageParams.pageSize"
        @current-change="handlePageList"
      >
      </el-pagination>
    </el-row>
    <Modal v-model="modal11" fullscreen title="分 类 添 加">
      <div>
        <CreateForm ref="createRef" @handleRefresh="handleClose"></CreateForm>
      </div>
    </Modal>

    <Modal v-model="modal12" fullscreen title="文 章 编 辑">
      <div>
        <EditForm ref="editRef" @handleRefresh="handleClose" :defaultFormData="defaultFormData"></EditForm>
      </div>
    </Modal>

    <Modal v-model="sureDel" draggable scrollable title="请输入正确的指令" @on-ok="handleSureDel">
      <div>
        <Input v-model="delCode" placeholder="7位密码" type="password" :maxlength="7"  />
      </div>
    </Modal>
  </div>
</template>
<!--<editForm ref="editRef" :defaultFormData="defaultFormData"  @submitFormData="submitFormData"></editForm>-->
<script>
  import CreateForm from '@/views/class-management/create/index.vue'
  import EditForm from '@/views/class-management/edit/index.vue'
  export default {
    components: {
      CreateForm,
      EditForm
    },
    data () {
      return {
        modal11: false,
        modal12: false,
        tableData: [],
        defaultFormData: {},
        pageParams: {
          total: 100,
          pageSize: 15
        },
        AllData500: [],
        sureDel: false,
        delCode: '',
        delId: ''
      }
    },
    methods: {
      /**
       * 创建
       */
      handleCreate () {
        this.$refs['createRef'].handleResetMid()
        setTimeout(() => {
          this.modal11 = true
        }, 300)
      },
      handleClose () {
        this.modal11 = this.modal12 = false
        this.defaultList()
      },
      /**
       * 创建完成
       */
      handleSuccess () {
        this.getDefaultList()
        this.showCreate = this.showEdit = false
        this.$Message.success('操作成功!')
      },
      /**
       * 数据提交 - 创建
       * @param data
       */
      submitFormData (data) {
        console.log(data)
      },

      handleEditEle (index, row) {
//        this.$refs['editRef'].handleResetMid()
        this.defaultFormData = row
        setTimeout(() => {
          this.modal12 = true
        }, 300)
      },
      /**
       * 删除
       * @param index
       * @param row
       */
      handleDeleteEle (index, row) {
        this.sureDel = true
        this.delCode = ''
        this.delId = row.id
      },
      handleSureDel () {
        if (this.delCode) {
          this.$http.delete('/api/class-m/' + this.delId + '-' + this.delCode).then(res => {
            if (res) {
              this.defaultList()
              this.$Message.success('操作成功!')
            }
          })
        } else {
          this.$Notice.info({
            title: 'Notification title',
            desc: '指令不能为空'
          })
        }
      },
      defaultList () {
        this.$http.get('/api/class-m').then(res => {
          this.AllData500 = res
          console.log(res, '333')
          this.pageParams.total = this.AllData500.length
          let index = this.$route.query.p ? this.$route.query.p : 1
          this.tableData = this.AllData500.slice((index - 1) * 15, (index - 1) * 15 + 15)
        })
      },
      handlePageList (index) {
        let path = this.$router.path
        let routeParams = {
          path
        }
        if (index !== 1) {
          routeParams.query = {
            p: index
          }
        }
        this.$router.push(routeParams)
        this.tableData = this.AllData500.slice((index - 1) * 15, (index - 1) * 15 + 15)
      }
    },
    created () {
      this.defaultList()
      this.$store.dispatch('GetClassOrMate')
    }
  }
</script>
<style lang="postcss" scoped="">
  .type img {
    width: 30px;
    vertical-align: middle;
  }
  .mate {
    display: inline-block;
  }
</style>
