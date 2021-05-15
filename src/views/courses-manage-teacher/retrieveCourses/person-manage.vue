<template>
    <div>
       <Table stripe
            :columns="columns"
            :data="tableData"
            :height="600">
             <h3 slot="header"
                style="text-align:center; color:#495060">人员列表</h3>
        </Table>
    </div>
</template>

<script>
   import { allStudentAndAssistant} from '@/libs/api';

export default {
    data() {
        return {
            courseId: '',
            tableData: [],
            columns: [
                {
                    title: 'id',
                    align: 'center',
                    // key: 'id',
                    width: 300,
                    render: (h, params) => {
                        return h ('span', params.row.studentId || params.row.id)
                    }
                },
                {
                    title: '角色',
                    align: 'center',
                    // key: 'studentId',
                    width: 300,
                    render: (h, params) => {
                        let role = params.row.studentId? '学生' : '助教'
                        return h ('span', role)
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'address',
                    width: 300,
                    render: (h, params) => {
                        return h('div', [
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
            allStudentAndAssistant(this.courseId).then(res => {
                if (res.data.data) {
                   this.tableData = [...res.data.data.assistant, ...res.data.data.student];
                }
            });
        }
        
    },
    mounted() {
        this.courseId = this.$route.params.id
        this.getList()
        
    }
}
</script>

<style lang="less" scoped>

</style>