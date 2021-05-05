<template>
  <div>
    <image-floow :data="tableData"> 
    </image-floow>

  </div>
</template>

<script>
import { getAllCourseStu} from '@/libs/api';
import imageFloow from '~cpmponents/imagefloow.vue';

export default {
    components: {
       imageFloow
    },
    data() {
        return {
            tableData: [],
            studentId: ''
        };
    },
    methods: {
        
        getList() {
            getAllCourseStu(this.studentId).then(
                res => {
                this.tableData = res.data.data;
                },
                err => {
                this.$Message.error('暂无权限！！！！！！');
                }
            )
        }
    },
    created() {
        this.studentId = JSON.parse(localStorage.userInfo).userId
        console.log()
        this.getList();
    },
    mounted() {},
    watch: {}
};
</script>

<style lang="less">
.ivu-upload{
    width: 80%;
    margin-top: 30px;
    margin-left: 30px;
}
</style>


