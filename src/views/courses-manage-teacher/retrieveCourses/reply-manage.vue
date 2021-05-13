<template>
    <div>
       <div class="demo-split-pane">
                <div style="width:100%;overflow:hidden;">
                    <Button @click="createNew"
                            style="float:right;margin-bottom:10px;"
                            icon="ios-plus-outline"
                            type="primary">添加回复</Button>
                </div>
                <Table stripe
                    :columns="columns"
                    :data="tableData"
                    :height="500">
                    >
                </Table>
                <Modal v-model="showModal"
                    title='添加回复'
                    @on-visible-change='handleBeforeClose'
                    width="360">
                    <Form ref="newData"
                        :model="newData"
                        :rules="ruleValidate"
                        :label-width="80">
                        <FormItem label="回复"
                                prop="content">
                            <Input v-model="newData.content"
                                placeholder="请输入回复"></Input>
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
    </div>
</template>

<script>
      import { commentDetail, replyComment} from '@/libs/api';

export default {
    data() {
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
                    content: [{ required: true, message: '请填写回复', trigger: 'change' }]
                },
                columns: [
                {
                    title: '回复',
                    align: 'center',
                    key: 'content'
                },
                {
                    title: '回复Id',
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '评论Id',
                    align: 'center',
                    key: 'commentId'
                },
                {
                    title: '评论人',
                    align: 'center',
                    key: 'userId'
                },
                {
                    title: '回复时间',
                    align: 'center',
                    key: 'replyTime'
                }
            ]
            }
    },
    methods: {
        getList() {
            commentDetail(this.courseId, this.commentId).then(res => {
                if (res.data.data) {
                   this.tableData = res.data.data.slaveCommentList;
                }
            });
        },
        createNew() {
            this.showModal = true;
            this.isCreate = true;
            this.newData = {};
        },
        handleSubmit() {
            this.$refs.newData.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.newData.commentId = this.commentId
                    this.isCreate &&
                        replyComment(this.courseId,this.newData).then(
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
                    this.$Message.error(err.message);
                }
            );
        }
        
    },
    created() {
        this.teacherId = JSON.parse(localStorage.userInfo).userId
        this.courseId = this.$route.params.courseId
        this.commentId = this.$route.params.commentId
        this.getList();
    },
}
</script>

<style lang="less" scoped>
.demo-split-pane {
    margin-top: 15px;

}

</style>