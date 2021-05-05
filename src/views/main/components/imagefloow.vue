<template>
<div class="listContent"> 
  <div class="list clearfix show" v-for="item in data" :key="item.courseId">
      <img
        class="img"
        :src="`http://123.57.32.244/${item.courseCoverPic}`"
      />

      <p class="title ellipsis2">{{item.courseName}}</p>
      <a class="course-detail" @click='courseDetail(item)'>查看</a>
      <a class="course-manage" @click='courseManage(item)' v-if="!$route.name.includes('student')">管理</a>
  </div>
</div>
</template>
<script>
import { getAllCategories, getArticle, editArticle, delArticle, updateAllArticle } from '@/libs/api';
export default {
    name: 'imageflow-list',
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
        }
    },
    created() {
        
    },
    mounted() {
       
    },
    methods: {
        courseDetail(item) {
            if (this.$route.name.includes('student')) {
                this.$router.push({ name: 'course_detail_student', params: {id: item.courseId}});
            } else {
                this.$router.push({ name: 'course_detail', params: {id: item.courseId}});
            }
        },
        courseManage(item) {
            if (this.$route.name.includes('assistant')) {
                this.$router.push({ name: 'course_manage_assistant', params: {id: item.courseId}});
            } else{
                this.$router.push({ name: 'course_manage_teacher', params: {id: item.courseId}});
            }
        }
    }
};
</script>
<style lang="less">
 .listContent {
   width: 100%;
   height: 80%;
   margin: 0 auto;
   margin-top: 50px;
   overflow-y: auto;
   .list {
        position: relative;
        width: 260px;
        height: 262px;
        margin: 0 24px 24px 14px;
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 #ccc;
        border-radius: 8px;
        float: left;
        transition: all .2s;
        .ellipsis2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .img {
            width: 100%;
            height: 152px;
            margin-bottom: 8px;
            border-radius: 8px 8px 0 0;
        }
        .title {
            color: #545C63;
            line-height: 20px;
            height: 40px;
            margin-bottom: 8px;
            padding: 0 8px;
        }
   }

 }

</style>