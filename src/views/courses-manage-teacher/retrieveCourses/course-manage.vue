<template>
    <div>
        <ul class="manage-left">
            <li v-for="(item, index) in courseTag" :key="index" @click="changeManage(index)"> {{item}}</li>
        </ul>

       <div class="manage-right">
           <div v-if="courseTagIndex==0"> 
              <apply-course-manage> </apply-course-manage>
           </div>

           <div v-if="courseTagIndex==1"> 
               <chapter-manage> </chapter-manage>
           </div>

           <div v-if="courseTagIndex==2"> 
              <person-manage> </person-manage>
           </div>
           <div v-if="courseTagIndex==3"> 
              <comment-manage> </comment-manage>
           </div>
           <div v-if="courseTagIndex==4"> 
              <recycle-manage> </recycle-manage>
           </div>
       </div>
        
    </div>
</template>

<script>
import personManage from './person-manage.vue';
import chapterManage from './chapter-manage.vue';
import recycleManage from './recycle-manage.vue';
import commentManage from './comment-manage.vue';
import applyCourseManage from './apply-course-manage.vue';
    
export default {
    components: {
       personManage,
       chapterManage,
       recycleManage,
       commentManage,
       applyCourseManage
    },
    data() {
        return {
            courseTag:['上课申请管理', '题目管理', '人员管理', '评论管理', '回收站管理'],
            courseTagIndex: 1,
            courseId: ''
        }
    },
    methods: {
        changeManage(index) {
            this.courseTagIndex = index
           let liTags = Array.from(document.querySelectorAll('.manage-left>li'))
            liTags[index].classList.add('active')
            for(let i in liTags) {
                if (i != index) {
                    liTags[i].classList= []
                }
            }
        }  
    },
    mounted() {
        this.courseId = this.$route.params.id
        this.changeManage(1)
    }
}
</script>

<style lang="less" scoped>
.manage-left{
    width: 200px;
    height: 500px;
    padding: 40px;
    display: inline-block;
    border-right: 1px solid #e8eaec;
    li{
        float: left;
        width: 90px;
        height: 90px;
        text-align: center;
        margin-bottom: 15px;
        margin-right: 15px;
        line-height: 90px;
        border-radius: 50px;
        background-color: #e8eaec;
    }
    .active {
        background-color: aqua;
    }
}
.manage-right {
    position: absolute;
    top: 0;
    left: 250px;
}
</style>