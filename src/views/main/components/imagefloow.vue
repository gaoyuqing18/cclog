<template>
<div class="listContent"> 
  <div class="list clearfix show" v-for="item in imageflowData" :key="item.courseId">
      <img
        class="img"
        src=""
        data-src="holder.js/260x152"
      />

      <p class="title ellipsis2">{{item.courseName}}</p>
      <a class="course-detail" @click='courseDetail(item)'>查看</a>
      <a class="course-manage" @click='courseManage(item)'>管理</a>
  </div>
</div>
</template>
<script>
import { getAllCategories, getArticle, editArticle, delArticle, updateAllArticle } from '@/libs/api';
export default {
    name: 'imageflow-list',
    data() {
        return {
            imageflowData: [
                {
                courseCoverPic: "ass",
                courseId: "18",
                courseInfo: "123",
                courseName: "1",
                courseState: "0"
                },
                {
                courseCoverPic: "spoc-beijing.oss-cn-beijing.aliyuncs.com/2021-03-24/ef5904ce6cb440028b139f1535e57081-bg3.jpg",
                courseId: "2",
                courseInfo: "shasha",
                courseName: "c",
                courseState: "0"
                },
                {
                courseCoverPic: "ass",
                courseId: "3",
                courseInfo: "123",
                courseName: "1",
                courseState: "0"
                },
                {
                courseCoverPic: "spoc-beijing.oss-cn-beijing.aliyuncs.com/2021-03-24/ef5904ce6cb440028b139f1535e57081-bg3.jpg",
                courseId: "4",
                courseInfo: "shasha",
                courseName: "c",
                courseState: "0"
                },
                {
                courseCoverPic: "ass",
                courseId: "5",
                courseInfo: "123",
                courseName: "1",
                courseState: "0"
                },
                {
                courseCoverPic: "spoc-beijing.oss-cn-beijing.aliyuncs.com/2021-03-24/ef5904ce6cb440028b139f1535e57081-bg3.jpg",
                courseId: "6",
                courseInfo: "shasha",
                courseName: "c",
                courseState: "0"
                }
            ]
        }
    },
    created() {
        // this.getList();
        // this.getAllCategories();
    },
    mounted() {
        // window.onresize = () => {
        //     this.tableHeight = window.innerHeight - 210;
        // };
    },
    methods: {
        courseDetail(item) {
            this.$router.push({ name: 'course_detail', params: {id: item.courseId}});
        },
        courseManage(item) {
            this.$router.push({ name: 'course_manage', params: {id: item.courseId}});

        }
        // getList() {
        //     const params = { ...this.searchParams, page: this.page, pageSize: this.pageSize };
        //     !params.category && delete params.category;
        //     getArticle(params).then(
        //         res => {
        //             this.tableData = res.data.data;
        //             this.total = res.data.count;
        //         },
        //         err => {
        //             this.tableData = [];
        //             this.total = 0;
        //             this.$Message.error(res.data.desc);
        //         }
        //     );
        // },
        // getAllCategories() {
        //     getAllCategories().then(res => {
        //         this.categoryOptions = res.data.map(val => {
        //             return { label: val.name, value: val._id };
        //         });
        //     });
        // },
        // submitSearch() {
        //     this.page = 1;
        //     this.getList();
        // },
        // clearSearch() {
        //     this.searchParams = { status: 1 };
        // },
        // async updateAll() {
        //     const res = await updateAllArticle();
        //     this.$Message.success(res.data.desc);
        // },
        // toEditor(data) {
        //     this.$router.push({ path: `article-publish?_id=${data._id}` });
        // },
        // handelArticleStatus(id, status) {
        //     if (this.canDel && status === 0) {
        //         delArticle({ _id: id }).then(res => {
        //             this.$Message.success('文章删除成功！');
        //             this.getList();
        //         });
        //     } else {
        //         editArticle({ _id: id, status: status }).then(res => {
        //             if (res.data.code !== 0) {
        //                 this.$Message.error(res.data.desc);
        //                 return;
        //             }
        //             status === 0 && this.$Message.success('文章隐藏成功！');
        //             status === 1 && this.$Message.success('文章恢复成功！');
        //             this.getList();
        //         });
        //     }
        // },
        // pageChange(page) {
        //     this.getList();
        // }
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