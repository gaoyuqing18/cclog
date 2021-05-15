<template>
   <div>
       <div class="demo-split-pane">
                <Table stripe
                    :columns="columns"
                    :data="tableData"
                    :height="500">
                    >
                </Table>
            </div>
    </div>
</template>

<script>

import { retrieveStudentApply, rejectStuden, permitStudent} from '@/libs/api';

export default {
  data() {
    return {
        courseId: '',
        userId: '',
        tableData: [],
        showModal: false,
        newData: {
            // status: 1
        },
        teacherId: '',
        loading: false,
        columns: [
            {
                title: '题干描述',
                align: 'center',
                key: 'describe',
                width: 410,
                render: (h, params) => {
                    return h('span', params.row.question.describe)
                }
            },
            {
                title: '题目编号',
                align: 'center',
                key: 'tqNo',
                sortable: true,
                width: 200,
                render: (h, params) => {
                    return h('span', params.row.question.tqNo)
                }
            },
            {
                title: '难度系数',
                align: 'center',
                key: 'difficulty',
                sortable: true,
                width: 200,
                render: (h, params) => {
                    return h('span', params.row.question.difficulty)
                }
            },
            {
                title: '题目类型',
                align: 'center',
                key: 'type',
                width: 200,
                sortable: true,
                render: (h, params) => {
                    return h('span', this.trans[params.row.question.type])
                }
            },
            {
                title: '操作',
                align: 'center',
                key: 'address',
                width: 200,
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
                                        console.log(params.row)
                                        this.handelCategoryStatus(params.row.questionValueObject);
                                    }
                                }
                            },
                            '删除'
                        )
                    ]);
                }
            }
        ]
    };
  },
  methods: {
        getList() {
            retrieveStudentApply(this.userId, this.courseId).then(res => {
                if (res.data.data) {
                   this.tableData = res.data.data;
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
            this.newData = { ...row.question, ...row.questionValueObject };
            this.isCreate = false;
        },
        handleSubmit() {
            this.$refs.newData.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.newData.chapterId = this.chapterId
                    if (this.newData.parsing) delete this.newData.parsing
                    this.isCreate &&
                        addQuestion(this.userId,this.courseId,this.newData).then(
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
                        updateQuestion(this.userId,this.courseId,this.newData).then(
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
        handelCategoryStatus(questionValueObject) {
            let {chapterId, questionId} = questionValueObject
            deleteQuestion(this.userId,this.courseId, {chapterId, questionId}).then(
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
    mounted() {
        this.userId = JSON.parse(localStorage.userInfo).userId
        this.courseId = this.$route.params.id
        this.getList()
        
    }
};
</script>

<style lang="less" scoped>
.subject-con {
  margin: 20px;
}

.sub-answer-tips {
  width: 130px !important;
  height: 30px;
  background: #eeeeee;
  border-radius: 8px 8px 0px 0px;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  margin-left: 36px;
  display: block;
  i {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
  .right {
    background: #eaefe4;
  }
  .wrong {
    background: #ffe7e7;
  }
}

.sub-answer dd.right-this i,
.sub-answer dd.cho-this i {
  width: 26px !important;
  height: 26px !important;
  position: absolute;
  left: 2px !important;
  top: 5px !important;
  //   background: url(pra_icon.png) no-repeat !important;
}
.sub-answer dd.right-this i {
  background-position: -6px -124px !important;
}
.sub-answer dd.cho-this i {
  background-position: -40px -59px !important;
  left: 3px !important;
}
.sub-answer dd.right-this.cho-this i {
  background-position: -6px -124px !important;
}
.sub-answer dd.wrong-this.cho-this i {
  background-position: -33px -804px !important;
}
.sub-answer.sub-answer-double dd.right-this i {
  background-position: -32px -598px !important;
}
.sub-answer.sub-answer-double dd.cho-this i {
  background-position: 2px -587px !important;
}
.sub-answer.sub-answer-double dd.right-this.cho-this i {
  background-position: -32px -598px !important;
}
.sub-answer.sub-answer-double dd.wrong-this.cho-this i {
  background-position: -32px -556px !important;
}

.sub-answer {
  padding: 15px 50px 25px 65px;
  clear: both;
//   background: url(https://img2.233.com/wx/tiku/v201811/skin/images/logo_bg.png)
    // no-repeat center;
  position: relative;
}
.sub-answer img {
  max-width: 100%;
  height: auto;
}
.sub-answer dd {
  display: block;
  padding: 6px 0 6px 45px;
  margin-left: -20px; /* font-size:14px;*/
  line-height: 24px;
  color: #151515;
  position: relative;
  cursor: pointer;
}
.sub-answer-no dd {
  margin-bottom: 3px;
}
.sub-answer dd:hover {
  background: #f8f8f8;
  border: none;
}
.sub-answer-no dd:hover {
  background: none;
  cursor: text;
}
.sub-answer dd span {
  color: #999;
  margin-right: 5px;
  top: 7px;
  left: 40px;
}
.sub-answer dd i {
  width: 21px;
  height: 21px;
  display: block;
  background-position: -19px -62px;
  position: absolute;
  top: 8px;
  left: 5px;
}

.sub-dotitle { display: inline-block;}
.sub-dotitle .cha-cail a { position: absolute; top: 0; right: 0; color: #e45c40; display: block; padding: 0 20px 0 40px; font-size: 14px; height: 100%; line-height: 42px; }
.sub-dotitle .cha-cail a:hover { background: #f5f5f5; }
.sub-dotitle .cha-cail i { width: 13px; height: 13px; position: absolute; top: 15px; right: 85px; display: block; background-position: 0 -678px; }
.sub-dotitle img { max-width: 100%;height: auto;}
.sub-dotitle em { font-size: 20px; color: #333;font-weight: 900; margin-right: 10px; float: left; }
.sub-dotitle i { color: #333;font-weight: 900; }
.sub-dotitle-img { float: left; overflow: hidden; width: 853px; word-break: break-all; word-wrap: break-word; }
.sub-dotitle-img img { max-width: 800px; float: left; clear: both; margin-top: 10px; }

.ivu-radio-group {
    display: block;
}

.refer-answer {
    background: #f9f9f9;
    border-top: 1px dashed #d8d8d8;
    padding: 30px 12px 30px;
    display: block;
    position: relative;
    margin-right: 30px;
    .reck {
        color: #999;
        .right { color: #47ad76; }
        .wrong { color: #ee491f; }
    }
    .refer-right {
        float: right;
    }
    .answer-desc {
        margin-top: 30px;
    }
    .ask-btn-new {
        width: 56px;
        height: 56px;
        position: absolute;
        background: #facd38;
        z-index: 9;
        right: 5px;
        color: #e13b29 !important;
        top: -62px;
        text-align: center;
        font-size: 14px;
        border-radius: 52px;
        box-shadow: 0px 10px 10px rgb(0,0, 0, .2);
    }
}

.subbottom {
    width: 100%;
    height: 50px;
    position: relative;
    margin-top: 50px;
    font-size: 18px;

    ul {
    width: 100%;
    height: 50px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 -2px 5px #eee;
    margin-right: 278px;
        li {
                float: left;
                position: relative;
                a {
                    color: #333;
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    display: block;
                    text-align: center;
                }
                a:hover {
                    color: #e45c40;
                }
        }
        .ckdan {
            width: 40%;
        }
        .pre,.next {
            width: 30%;
        }
    }
}
</style>