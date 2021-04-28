<template>
 <div>
      题目列表
 </div>
  
</template>

<script>

export default {
    props: {
        courseId: {
            type: String,
            default: ''
        }
    },
    data() {
         return {
         }
    },
    methods: {
        
    },
    created() {
    //     this.teacherId = JSON.parse(localStorage.userInfo).userId
    //     this.getList();
    }
}
</script>

<style lang="less" scoped>
.demo-split-pane {
    margin-top: 15px;

}

</style>