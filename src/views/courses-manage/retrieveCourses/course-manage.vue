<template>
    <div>
        <ul class="manage-left">
            <li v-for="(item, index) in courseTag" :key="index" @click="changeManage(index)"> {{item}}</li>
        </ul>

       <div class="manage-right">
           <div v-if="courseTagIndex==0"> 
              <div> 课程名 {{courseTagIndex}}</div>
           </div>
       </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            courseTag:['课程描述', '题目管理', '人员管理', '资源管理', '作业管理', '数据统计'],
            courseTagIndex: 0
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
    }
}
</script>

<style lang="less" scoped>
.manage-left{
    width: 300px;
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
    left: 350px;
}
</style>