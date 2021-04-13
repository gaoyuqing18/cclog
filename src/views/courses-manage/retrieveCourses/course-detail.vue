<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
            <div>课程名</div>
            <div>课程描述</div>
            <div>课程图片</div>
            </div>
            <div slot="right" class="demo-split-pane">
                <div style="width:100%;overflow:hidden;">
                    <Button @click="createNew"
                            style="float:right;margin-bottom:10px;"
                            icon="ios-plus-outline"
                            type="primary">添加章节</Button>
                </div>
                <Table stripe
                    :columns="columns"
                    :data="tableData"></Table>
                <Modal v-model="showModal"
               title='编辑/添加章节'
               @on-visible-change='handleBeforeClose'
               width="360">
            <Form ref="newData"
                  :model="newData"
                  :rules="ruleValidate"
                  :label-width="80">
                <FormItem label="章节名称"
                          prop="chapterName">
                    <Input v-model="newData.chapterName"
                           placeholder="请输入章节名称"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary"
                        :loading="loading"
                        @click="handleSubmit">确认</Button>
                <Button type="dashed"
                        @click="handleCancel">取消</Button>
            </div>
        </Modal>
            </div>
        </Split>
    </div>
</template>
<script>
   import { getAllChapters, editChaters, delChaters, addChaters} from '@/libs/api';

    export default {
        data () {
            return {
                split1: 0.3,
                tableData: [],
                showModal: false,
                newData: {
                    // status: 1
                },
                courseId: '',
                teacherId: '',
                loading: false,
                ruleValidate: {
                    chapterName: [{ required: true, message: '请填写章节名称', trigger: 'change' }]
                },
                columns: [
                {
                    title: '章节名称',
                    align: 'center',
                    key: 'chapterName'
                },
                {
                    title: '题目',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', '题目');
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'address',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editorRow(params.row);
                                        }
                                    }
                                },
                                '编辑'
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.handelCategoryStatus(params.row.chapterId, 0);
                                        }
                                    }
                                },
                                '删除'
                            )
                        ]);
                    }
                }
            ]
            }
        },
         methods: {
        getList() {
            getAllChapters(this.courseId).then(res => {
                if (res.data.data) {
                   this.tableData = res.data.data.chapters;
                }
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
                    this.loading = true;
                    let params = {
                        "chapterName": this.newData.chapterName,
                        "chapterId": this.newData.chapterId
                    }
                    console.log(params,'params')
                    this.isCreate &&
                        addChaters(this.teacherId,this.courseId,params).then(
                            res => {
                                this.handleCancel();
                                if (res.data.code == 200) this.$Message.success(res.data.desc);
                                this.getList();
                            },
                            err => {
                                this.handleCancel();
                                this.$Message.error(err.data.desc);
                            }
                        );
                    !this.isCreate &&
                        editChaters(this.teacherId,this.courseId,params).then(
                            res => {
                                this.handleCancel();
                                if (res.data.code == 200) this.$Message.success(res.data.desc);
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
            this.loading = false;
            this.showModal = false;
        },
        handleBeforeClose(bool) {
            if (bool) {
                this.$refs.newData.resetFields();
            }
        },
        handelCategoryStatus(chapterId) {
            delChaters(this.teacherId,this.courseId, {chapterId}).then(
                res => {
                    if (res.data.code == 200) this.$Message.success(res.data.desc);
                    this.getList();
                },
                err => {
                    this.$Message.error(err.data.desc);
                }
            );
        }
    },
    created() {
        this.courseId = this.$route.params.id
        this.teacherId = JSON.parse(localStorage.userInfo).userId
        this.getList();
    },
    mounted() {
    },
    watch: {}
    }
</script>
<style>
    .demo-split{
        height: 500px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>
