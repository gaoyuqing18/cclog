<template>
  <div>
       <Button @click="applyForTeacherfn"
        style="float:right;margin-bottom:10px;"
        icon="ios-plus-outline"
        type="primary">申请教师资格
        </Button>

    <image-floow :data="tableData"> 
    </image-floow>

  </div>
</template>
<script>
import { retrieveAllCourses, applyForTeacher} from '@/libs/api';
import imageFloow from '~cpmponents/imagefloow.vue';

export default {
    components: {
       imageFloow
    },
    data() {
        return {
            tableData: [],
            userId: ''
        };
    },
    methods: {
        
        getList() {
            retrieveAllCourses().then(
                res => {
                this.tableData = res.data.data;
                },
                err => {
                this.$Message.error('暂无权限！！！！！！');
                }
            )
        },
        applyForTeacherfn() {
            applyForTeacher().then(
                res => {
                    if (res.data.code == 200) {
                        this.$Message.success('申请成功！！！！！！');
                    } else {
                        this.$Message.error(res.data.desc);
                    }
                },
                err => {
                this.$Message.error('申请失败！！！！！！');
                }
            )

        }
    },
    created() {
        this.getList();
    },
    mounted() {
        this.userId = JSON.parse(localStorage.userInfo).userId
    },
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


