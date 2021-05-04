<template>
  <div>
    <div>
        <div style="width:100%;overflow:hidden;">
            <Button @click="createNew"
                    style="float:right;margin-bottom:10px;"
                    icon="ios-plus-outline"
                    type="primary">创建课程</Button>
        </div>
        <Modal v-model="showModal"
               title='创建课程'
               @on-visible-change='handleBeforeClose'
               width="500"
               footer-hide>
            <Alert style="margin: 20px 0">请先填写：课程名称、课程描述后上传图片</Alert>
            <Form ref="newData"
                  :model="newData"
                  :rules="ruleValidate"
                  :label-width="80">
                <FormItem label="课程名称" prop="courseName">
                    <Input v-model="newData.courseName" placeholder="请输入课程名称"></Input>
                </FormItem>
                <FormItem label="课程描述" prop="courseInfo">
                    <Input v-model="newData.courseInfo" placeholder="请输入课程描述"></Input>
                </FormItem>
            </Form>
            
            <Upload
                multiple
                type="drag"
                :action="uploadUrl"
                :data="newData"
                :before-upload="getCourseUrl"
                >
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>Click or drag files here to upload</p>
                </div>
            </Upload>
            <div v-if="file !== null">Upload file: {{ file.name }} </div>
            <!-- <div slot="footer">
                <Button type="primary"
                        :loading="loading"
                        @click="handleSubmit">确认</Button>
                <Button type="dashed"
                        @click="handleCancel">取消</Button>
            </div> -->
        </Modal>
    </div>
    <image-floow :data="tableData"> 
    </image-floow>

  </div>
</template>

<script>
import { addCourse, getAllCourse} from '@/libs/api';
import imageFloow from '~cpmponents/imagefloow.vue';

export default {
    components: {
       imageFloow
    },
    data() {
        return {
            file: null,
            tableData: [],
            showModal: false,
            teacherId: '',
            newData: {
                status: 1
            },
            uploadUrl: '',
            loading: false,
            ruleValidate: {
                courseName: [{ required: true, message: '请填写课程名称', trigger: 'change' }],
                courseInfo: [{ required: true, message: '请填写课程描述', trigger: 'change' }]
            }
        };
    },
    methods: {
        getCourseUrl(file) {
            this.file = file
            console.log(file.name)
            // return false
        },
        uploadImg(satus) {
            console.log(status, 'status')
        },
        getList() {
            getAllCourse(this.teacherId).then(res => {
                this.tableData = res.data.data;
            });
        },
        createNew() {
            this.showModal = true;
            this.isCreate = true;
            this.newData = {};
        },
        editorRow(row) {
            this.showModal = true;
            this.newData = { ...row };
            this.isCreate = false;
        },
        // handleSubmit() {
        //     this.$refs.newData.validate(valid => {
        //         if (valid) {
        //             this.loading = true;
        //             this.loadingStatus = true;
        //             setTimeout(() => {
        //                 this.file = null;
        //                 this.loadingStatus = false;
        //                 this.$Message.success('创建成功')
        //                 this.handleCancel();
        //                 this.getList();
        //             }, 1500)
        //         }
        //     });
        // },
        handleCancel() {
            this.$refs['newData'].resetFields();
            this.newData = { status: 1 };
            this.loading = false;
            this.showModal = false;
        },
        handleBeforeClose(bool) {
            if (bool) {
                this.$refs.newData.resetFields();
            }
        },
        handelCategoryStatus(id, status) {
            editCategory({ _id: id, status: status }).then(
                res => {
                    this.$Message.success(res.data.desc);
                    this.getList();
                },
                err => {
                    this.$Message.error(err.data.desc);
                }
            );
        }
    },
    created() {
        this.teacherId = JSON.parse(localStorage.userInfo).userId
        this.uploadUrl = `/cms/exercise/teacher/${this.teacherId}/courseManager/addCourse`
        this.getList();
    },
    mounted() {},
    watch: {}
};
</script>

<style lang="less">
.ivu-upload{
    width: 80%;
    margin-top: 30px;
    margin-left: 30px;
}
</style>


