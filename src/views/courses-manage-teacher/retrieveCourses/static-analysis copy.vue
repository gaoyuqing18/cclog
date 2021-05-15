<template>
    <div>
    <div class="bar" id="chart1" :style="{width: '700px', height: '400px'}" ></div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

import { getStatic } from '@/libs/api'
export default {
    data () {
      return {
        userId: '',
        courseId: '',
        chapterId: '',
        items2: {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      }
    },
    methods: {
      init() {
        this.chart1 = echarts.init(document.getElementById("chart1"));
        this.chart1.setOption(this.items2);
      },
      getList() {
            getStatic(this.userId, this.courseId, {chapterId: this.chapterId}).then(res => {
                if (res.data.data) {
                  //  this.tableData = res.data.data.chapters;
                }
            });
        }
    },
    mounted() {
      this.userId = JSON.parse(localStorage.userInfo).userId
      this.courseId = this.$route.params.courseId
      this.chapterId = this.$route.params.chapterId
      this.init()
      this.getList()
    }
  }
</script>