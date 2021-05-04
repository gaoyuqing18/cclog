<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                <div class="left-class-name">课程名</div>
                <div class="left-class-desc">课程描述</div>
                <img src="/static/course2.png" />
            </div>
            <div slot="right" class="demo-split-pane">
                <chapter-manage> </chapter-manage>
            </div>
        </Split>
    </div>
</template>
<script>
   import { getAllChapters, editChaters, delChaters, addChaters} from '@/libs/api';
   import chapterManage from './chapter-manage.vue';
    export default {
        components: {
            chapterManage
        },
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
                loading: false
            }     
        },
        methods: {
        },
    created() {
        this.courseId = this.$route.params.id
        this.teacherId = JSON.parse(localStorage.userInfo).userId
    },
    mounted() {
    },
    watch: {}
    }
</script>
<style  lang="less">
    .demo-split{
        height: 500px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
        .left-class-name {
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 28px;
            font-weight: 700px;
            margin-top: 20px;
        }
        .left-class-desc {
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 20px;
            font-weight: 400px;
            margin-top: 20px;
        }
        .left-class-img {
            height: 100px;
            width: 80px;
            margin: 0 auto;
            margin-top: 20px;
        }
    }
</style>
