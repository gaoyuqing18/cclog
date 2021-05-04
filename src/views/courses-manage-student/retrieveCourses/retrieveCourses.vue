<template>
  <div>
    <image-floow :data="tableData"> 
    </image-floow>

  </div>
</template>

<script>
import { getAllCourse} from '@/libs/api';
import imageFloow from '~cpmponents/imagefloow.vue';

export default {
    components: {
       imageFloow
    },
    data() {
        return {
            tableData: [],
            teacherId: ''
        };
    },
    methods: {
        
        getList() {
            getAllCourse(this.teacherId).then(res => {
                this.tableData = res.data.data;
            });
        }
    },
    created() {
        this.teacherId = JSON.parse(localStorage.userInfo).userId
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


