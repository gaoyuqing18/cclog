<template>
    <div>
       <Table stripe
            :columns="columns"
            :data="tableData"
            :height="500">
             <h3 slot="header"
                style="text-align:center; color:#495060">学生列表</h3>
        </Table>
    </div>
</template>

<script>
   import { getAllStudents} from '@/libs/api';

export default {
    props: {
        courseId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            tableData: [],
            columns: [
                {
                    title: 'id',
                    align: 'center',
                    key: 'id',
                    width: 250
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'studentId',
                    width: 250
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'address',
                    width: 250,
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
            getAllStudents(this.courseId).then(res => {
                if (res.data.data) {
                   this.tableData = res.data.data;
                }
            });
        }
        
    },
    mounted() {
        this.getList()
        
    }
}
</script>

<style lang="less" scoped>

</style>