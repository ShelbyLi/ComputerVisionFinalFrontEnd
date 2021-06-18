<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
// import echarts from 'echarts'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 1000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '650px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

    // ref: https://blog.csdn.net/weixin_43254169/article/details/111290641
      this.chart.setOption({
    // title: {
    //     text: 'Multiple Categories',
    //     left: 'center'
    // },
    // dataset: [{
    //     // source: [[1, 4, 6, 9, 136]]
    //     source: [[136, 1, 6, 4, 9]]
    // }, 
    // {
    //     source: [[2741, 4, 65, 30, 139]]
    // }, 
    // {
    //     source: [[1, 0, 0.25, 0.153846154, 0.416666667]]
    // },  
    // {
    //     source: [[510, 5, 89, 57, 116]]
    // },  
    // {
    //     source: [[1, 0, 0.235078937, 0.187584345, 0.348837209]]
    // },

    // {
    //     fromDatasetIndex: 0,
    //     transform: { type: 'boxplot', }
    // }, 
    // {
    //     fromDatasetIndex: 1,
    //     transform: { type: 'boxplot' }
    // }, 
    // {
    //     fromDatasetIndex: 2,
    //     transform: { type: 'boxplot' }
    // }, 
    // {
    //     fromDatasetIndex: 3,
    //     transform: { type: 'boxplot' }
    // }, 
    // {
    //     fromDatasetIndex: 4,
    //     transform: { type: 'boxplot' }
    // }
    // ],
    legend: {
        top: '10%'
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        },
        // axisPointer: {
        //     type: 'cross'
        // },
    },
    grid: {
        left: '10%',
        top: '20%',
        right: '10%',
        bottom: '15%'
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
            show: true
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        name: 'Value',
        // min: -400,
        // max: 600,
        splitArea: {
            show: false
        }
    },
    // dataZoom: [{
    //     type: 'inside',
    //     start: 0,
    //     end: 20
    // }, {
    //     show: true,
    //     type: 'slider',
    //     top: '90%',
    //     xAxisIndex: [0],
    //     // yAxisIndex: [0],
    //     start: 0,
    //     end: 20
    // }],
  //     dataZoom: [
  //     {
  //         type: 'slider',
  //         show: true,
  //         yAxisIndex: [0],
  //         left: '0%'
  //     },
  //     {
  //         type: 'slider',
  //         show: true,
  //         yAxisIndex: [1],
  //         left: '98%'
  //     }
  // ],
  dataZoom: [
    {
         type: 'slider',
         show: true,
         yAxisIndex: [0],
         left: '0%'
     }
 ],
    series: [
      {
            name: '学生课程总数',
            type: 'boxplot',
            // datasetIndex: 1
            // boxWith: [30, 80],
            // itemStyle:{
            //     color: "#ffc000"
            // },
            tooltip: {
                textStyle: {
                color: "white" //设置文字颜色
              },
                formatter: function(param){
                    return [
                        // 'Experiment: ' + param.name + ': ',
                        'upper: ' + param.data[5],
                        'Q3: ' + param.data[4],
                        'median: ' + param.data[3],
                        'Q1: ' + param.data[2],
                        'lower: ' + param.data[1]
                    ].join('<br/>');
                }
            },
            data: [
                [1, 4, 6, 9, 136]
            ]
        },
      {
            name: '学生视频总数',
            type: 'boxplot',
            // datasetIndex: 1
            // boxWith: [30, 80],
            // itemStyle:{
            //     color: "#ffc000"
            // },
            tooltip: {
                textStyle: {
                color: "white" //设置文字颜色
              },
                formatter: function(param){
                    return [
                        // 'Experiment: ' + param.name + ': ',
                        'upper: ' + param.data[5],
                        'Q3: ' + param.data[4],
                        'median: ' + param.data[3],
                        'Q1: ' + param.data[2],
                        'lower: ' + param.data[1]
                    ].join('<br/>');
                }
            },
            data: [
                [4, 30, 65, 139, 2741]
            ]
        },
      {
            name: '学生个人退课率',
            type: 'boxplot',
            // datasetIndex: 1
            // boxWith: [30, 80],
            // itemStyle:{
            //     color: "#ffc000"
            // },
            tooltip: {
                textStyle: {
                color: "white" //设置文字颜色
              },
                formatter: function(param){
                    return [
                        // 'Experiment: ' + param.name + ': ',
                        'upper: ' + param.data[5],
                        'Q3: ' + param.data[4],
                        'median: ' + param.data[3],
                        'Q1: ' + param.data[2],
                        'lower: ' + param.data[1]
                    ].join('<br/>');
                }
            },
            data: [
                [0, 15.38, 25, 41.67, 100]
            ]
        },
      {
            name: '课程所有视频数',
            type: 'boxplot',
            // datasetIndex: 1
            // boxWith: [30, 80],
            // itemStyle:{
            //     color: "#ffc000"
            // },
            tooltip: {
                textStyle: {
                color: "white" //设置文字颜色
              },
                formatter: function(param){
                    return [
                        // 'Experiment: ' + param.name + ': ',
                        'upper: ' + param.data[5],
                        'Q3: ' + param.data[4],
                        'median: ' + param.data[3],
                        'Q1: ' + param.data[2],
                        'lower: ' + param.data[1]
                    ].join('<br/>');
                }
            },
            data: [
                [5, 57, 89, 116, 510]
            ]
        },
      {
            name: '课程退课率',
            type: 'boxplot',
            // datasetIndex: 1
            // boxWith: [30, 80],
            // itemStyle:{
            //     color: "#ffc000"
            // },
            tooltip: {
                textStyle: {
                color: "white" //设置文字颜色
              },
                formatter: function(param){
                    return [
                        // 'Experiment: ' + param.name + ': ',
                        'upper: ' + param.data[5],
                        'Q3: ' + param.data[4],
                        'median: ' + param.data[3],
                        'Q1: ' + param.data[2],
                        'lower: ' + param.data[1]
                    ].join('<br/>');
                }
            },
            data: [
                [0, 18.76, 23.51, 34.88, 100]
            ]
        },
      // {
      //     name: '学生课程总数',
      //     type: 'boxplot',
      //     datasetIndex: 5
      // }, 
      // {
      //     name: '学生视频总数',
      //     type: 'boxplot',
      //     datasetIndex: 6
      // }, 
      // {
      //     name: '学生个人退课率',
      //     type: 'boxplot',
      //     datasetIndex: 7
      // }, 
      // {
      //     name: '课程所有视频数',
      //     type: 'boxplot',
      //     datasetIndex: 8
      // }, 
      // {
      //     name: '课程退课率',
      //     type: 'boxplot',
      //     datasetIndex: 9
      // }
    ]
})



    }
  }
}
</script>
