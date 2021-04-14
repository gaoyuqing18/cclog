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
               width="360">
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
            <div slot="footer">
                <Button type="primary"
                        :loading="loading"
                        @click="handleSubmit">确认</Button>
                <Button type="ghost"
                        @click="handleCancel">取消</Button>
            </div>
        </Modal>
    </div>
    <image-floow data="tableData"> 
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
            tableData: [],
            showModal: false,
            teacherId: '',
            newData: {
                status: 1
            },
            loading: false,
            ruleValidate: {
                courseName: [{ required: true, message: '请填写课程名称', trigger: 'change' }],
                courseInfo: [{ required: true, message: '请填写课程描述', trigger: 'change' }]
            }
        };
    },
    methods: {
        getList() {
            getAllCourse(this.teacherId).then(res => {
                this.tableData = res.data;
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
        handleSubmit() {
            this.$refs.newData.validate(valid => {
                if (valid) {
                    // this.loading = true;
                    // let {_id, name, link ,status} = this.newData
                    // let params = {_id, name, link ,status}
                    this.isCreate &&
                        addCourse(params).then(
                            res => {
                                this.handleCancel();
                                this.$Message.success(res.data.desc);
                                this.getList();
                            },
                            err => {
                                this.handleCancel();
                                this.$Message.error(err.data.desc);
                            }
                        );
                    !this.isCreate &&
                        editCategory(params).then(
                            res => {
                                console.log(res)
                                this.handleCancel();
                                this.$Message.success(res.data.desc);
                                this.getList();
                            },
                            err => {
                                this.handleCancel();
                                this.$Message.error(err.data.desc);
                            }
                        );
                }
            });
        },
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
        this.getList();
    },
    mounted() {},
    watch: {}
};
</script>

<style lang="less">
</style>


