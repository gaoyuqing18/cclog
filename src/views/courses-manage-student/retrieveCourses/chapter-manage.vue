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
      import { getAllChapters} from '@/libs/api';

export default {
    data() {
         return {
                split1: 0.3,
                tableData: [],
                courseId: '',
                teacherId: '',
                loading: false,
                columns: [
                {
                    title: '章节名称',
                    align: 'center',
                    key: 'chapterName'
                },
                {
                    title: '去做题',
                    align: 'center',
                    render: (h, params) => {
                        const courseId = params.row['courseId'] || '-'
                        const chapterId = params.row['chapterId'] || '-'
                        return h('router-link', {
                        props: {
                            to: {
                            name: 'question-manage-student',
                            params: { courseId, chapterId}
                            }
                        }
                        }, [
                        h('span', '去做题')
                        ])
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
        }
    },
    created() {
        this.teacherId = JSON.parse(localStorage.userInfo).userId
        this.courseId = this.$route.params.id
        this.getList();
    },
}
</script>

<style lang="less" scoped>
.demo-split-pane {
    margin-top: 15px;

}

</style>