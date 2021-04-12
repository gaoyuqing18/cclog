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
                            type="primary">新增分类</Button>
                </div>
                <Table stripe
                    :columns="columns"
                    :data="tableData"></Table>
            </div>
        </Split>
    </div>
</template>
<script>
   import { getAllChapters} from '@/libs/api';


    export default {
        data () {
            return {
                split1: 0.3,
                tableData: [],
                // showModal: false,
                newData: {
                    status: 1
                },
                loading: false,
                ruleValidate: {
                    name: [{ required: true, message: '请填写章节名称', trigger: 'change' }]
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
                        return h('span', params.row.articles.length || '-');
                    }
                }
            ]
            }
        },
         methods: {
        getList() {
            getAllChapters(1).then(res => {
                console.log(res.data.data)
                res.data.data = {
                    chapters: [
                        {
                        chapterId: "1",
                        chapterName: "qqwe",
                        courseId: "1"
                        },
                        {
                        chapterId: "6",
                        chapterName: "aaaaaaaaaaaaaaaaa",
                        courseId: "1"
                        },
                        {
                        chapterId: "7",
                        chapterName: "第2章",
                        courseId: "1"
                        },
                        {
                        chapterId: "17",
                        chapterName: "来看看",
                        courseId: "1"
                        }
                    ],
                    courseValueObject: {
                        courseCoverPic: "asd",
                        courseId: "1",
                        courseInfo: "123",
                        courseName: "1",
                        courseState: "0",
                        maxNumOfPeople: "100"
                    }
                }
                this.tableData = res.data.data.chapters;
            });
        },
        createNew() {
            // this.showModal = true;
            this.isCreate = true;
            this.newData = {};
        },
        editorRow(row) {
            // this.showModal = true;
            this.newData = { ...row };
            this.isCreate = false;
        },
        handleSubmit() {
            this.$refs.newData.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.newData.link = this.newData.link || this.newData.name;
                    let {_id, name, link ,status} = this.newData
                    let params = {_id, name, link ,status}
                    this.isCreate &&
                        addCategory(params).then(
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
            // this.showModal = false;
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
        this.getList();
    },
    mounted() {},
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
