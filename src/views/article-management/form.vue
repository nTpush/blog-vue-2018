<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="文章标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入文章标题"></Input>
        </FormItem>
      <FormItem label="文章作者" prop="author">
        <Input v-model="formValidate.author" placeholder="请输入文章标题"></Input>
      </FormItem>
        <FormItem label="文章分类" prop="class_id">
            <Select v-model="formValidate.class_id" placeholder="请选择文章分类">
                <Option :value="item.id.toString()" v-for="(item, key) in $store.getters.classes" :key="item.id">{{item.name}}</Option>
            </Select>
        </FormItem>
      <FormItem label="是否上传资源" prop="isUpload" :labelWidth="100">
        <RadioGroup v-model="isUpload" @on-change="handleIsUpload">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
   <div class="div-box" v-if="Number(isUpload)">
     <FormItem label="资源类型" prop="type" >
       <RadioGroup v-model="formValidate.type" @on-change="handleClickUpload">
         <Radio :label="item==='其他' ? '99' : index.toString()" v-for="(item, index) in uploadNames" :key="index">{{item}}</Radio>
         <!--<Radio label="1">视频</Radio>-->
         <!--<Radio label="2">音乐</Radio>-->
         <!--<Radio label="3">其他</Radio>-->
       </RadioGroup>
     </FormItem>
     <FormItem :label="uploadName" prop="resources" v-show="formValidate.type">
       <!--formValidate.type-->
       <Upload :action="httpUrl + '/api/upload'"
               :on-success="handleSuccess"
               :data = "data"
               :format="allowTypes[data.type]"
               :max-size="allowSize[data.type]"
               :on-format-error="handleFormatError"
               :on-exceeded-size="handleMaxSize"
               ref="resource"
               :show-upload-list="false"
               style="float: left"
               multiple
       >
         <Button icon="ios-cloud-upload-outline">Upload files</Button>
       </Upload>
       <div v-if="formValidate.resource_path_id">
         &emsp;您上传的资源为：<a :href="resource_path" target="_blank"  >
           <img src="@/assets/imgages/image.png" alt="图片" v-if="Number(formValidate.type) === 0">
           <img src="@/assets/imgages/video.png" alt="音乐" v-if="Number(formValidate.type) === 1">
           <img src="@/assets/imgages/music.png" alt="视频" v-if="Number(formValidate.type) === 2">
           <img src="@/assets/imgages/md.png" alt="md" v-if="Number(formValidate.type) === 3">
           <img src="@/assets/imgages/other.png" alt="其他" v-if="Number(formValidate.type) === 99">
         </a>
       </div>
     </FormItem>
   </div>

        <FormItem label="是否置顶" prop="is_top">
            <RadioGroup v-model="formValidate.is_top">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="所属标签" prop="mate_id">
            <CheckboxGroup v-model="formValidate.mate_id">
                <Checkbox :label="item.id.toString()" v-for="(item, key) in $store.getters.mates" :key="item.id">{{item.name}}</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="文章摘要" prop="summary">
            <Input v-model="formValidate.summary" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入文章摘要"></Input>
        </FormItem>
        <FormItem label="文章内容" v-if="!(Number(formValidate.type) === 3)">
          <mavon-editor ref=md @imgAdd="$imgAdd"
                        @imgDel="$imgDel"
                        :value="formValidate.content"
                        @save="$save"
                        @change="$changValue"></mavon-editor>
        </FormItem>

        <FormItem style="text-align: right">
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
import root from '@/service/root.js'
export default {
  props: {
    defaultFormData: Object,
    default: function () {
      return {
      }
    }
  },
  data () {
    return {
      // 文件支持类型
      allowTypes: [
        ['jpg', 'jpeg', 'png'],
        ['mp4', 'avi', 'swf'],
        ['mp3', 'wav'],
        ['md'],
        []
      ],
      allowSize: [
        12048,
        10240,
        20480,
        20000,
        20480
      ],
      data: {
        type: 3
      },
      isUpload: 0,
      uploadName: '资源上传',
      uploadNames: ['图片', '视频', '音乐', 'md', '其他'],
      resource_path: '',
      formValidate: {
        type: '',
        title: '',
        class_id: '',
        is_top: '2',
        mate_id: [],
        summary: '',
        content: '',
        author: '',
        resource_path_id: ''
      },
      ruleValidate: {
        title: [
            { required: true, message: '文章标题不能为空！', trigger: 'blur' }
        ],
        class_id: [
            { required: true, message: '请选择文章分类！', trigger: 'change' }
        ],
        is_top: [
            { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        mate_id: [
            { required: true, type: 'array', min: 1, message: '请选择所属标签！', trigger: 'change' },
            { type: 'array', max: 5, message: '最多选择5个标签', trigger: 'change' }
        ],
        summary: [
            { required: true, message: '请输入文章摘要！', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      httpUrl: ''
    }
  },
  methods: {
    // ------------------------------------------------------ start -- upload 方法
    handleFormatError (file) {
      this.$Notice.warning({
        title: '请上传正确格式的文件',
        desc: `文件：${file.name} 只支持【 ${this.allowTypes[this.data.type].toString().replace(/,/g, ' , ')} 】的类型`
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: `文件：${file.name} 只支持【 ${this.allowSize[this.data.type] / 1000} 】M的大小`
      })
    },
    /*
     * 上传成功
     */
    handleSuccess (res, file) {
      if (res) {
        this.formValidate.resource_path_id = res.body.resourcePathId
        this.resource_path = res.body.resourcePath
        this.$Message.success('上传成功!')
      }
    },
    // ------------------------------------------------------ start -- upload 方法

    handleIsUpload (val) {
      this.formValidate.type = ''
    },
    /**
     * 显示资源类型
     **/
    handleClickUpload (val) {
      this.uploadName = val === '99' ? '其他上传' : `${this.uploadNames[val]}上传`
      this.formValidate.resource_path_id = ''
      this.data.type = val
    },
    /*
     * 数据提交
     */
    handleSubmit (name) {
      console.log(this.main, 10086)
      this.$refs[name].validate((valid) => {
        if (valid) {
            // 将数据传递给中间层
          this.$emit('getFormData', this.formValidate)
        } else {
          this.$Message.warning('表单内容不完整，请重新提交')
        }
      })
    },
    /*
     * 清空操作
     */
    handleReset (name) {
      this.formValidate.content = ''
      this.formValidate.resource_path_id = ''
      this.isUpload = null
      this.$refs[name].resetFields()
    },

    // ------------------------------------------------------ start -- mavon-editor 方法
    $imgAdd (pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      this.$http.image('/api/upload', formdata).then(res => {
        this.$refs.md.$img2Url(pos, `${res}`)
      })
    },
    $imgDel (val) {
      console.log(8, val)
    },
    $changValue (val, render) {
//      console.log(val)
//      console.log(render, '0')
      this.formValidate.content = val
    },
    $save () {
      console.log('保存')
    }
  // ------------------------------------------------------ end

  },
  watch: {
    /**
     * 设置表的初始值
     * @param defaultData
     */
    defaultFormData (defaultData) {
      console.log(defaultData, '10086')
      this.isUpload = defaultData.type === '' ? '0' : '1'
      this.resource_path = defaultData.path
      this.$http.get(`/api/article/${defaultData.id}`).then(res => {
        this.formValidate = {...defaultData, ...res}
      })
    }
  },
  created () {
    this.httpUrl = root.httpUrl
  }
}
</script>
<style lang="postcss" scoped="">
  .div-box {
    border-radius: 5px;
    background: #F7F7F7;
    transition: all 1s;
    border-left: 5px solid #ccc;
    padding-bottom: 1px;
    padding-top: 5px;
  }
  .div-box img {
    width: 25px;
    vertical-align: middle;
  }
</style>
