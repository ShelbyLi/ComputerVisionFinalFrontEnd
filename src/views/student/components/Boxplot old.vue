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
      default: '300px'
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
    title: [
        {
            text: 'Michelson-Morley Experiment',
            left: 'center'
        },
        // {
        //     text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
        //     borderColor: '#999',
        //     borderWidth: 1,
        //     textStyle: {
        //         fontWeight: 'normal',
        //         fontSize: 14,
        //         lineHeight: 20
        //     },
        //     left: '10%',
        //     top: '90%'
        // }
    ],
    // dataset: [{
    //     // source: [
    //     //     [1, 136, 6, 4, 9],
    //     //     [65, 30, 139, 2741, 4],
    //     //     [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
    //     //     [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
    //     //     [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
    //     // ]
    //     source: [
    //         [136, 1, 6,	4, 9],
    //         [2741, 4, 65, 30, 139],
    //         [1, 0, 0.25, 0.153846154, 0.416666667],
    //         [510, 5, 89, 57, 116],
    //         [1, 0, 0.235078937, 0.187584345, 0.348837209],
    //         [1.6, 0.001960784, 0.071428571, 0.026785714, 0.194444444],
    //         [775, 1, 3, 1.8, 5.5],
    //         [426.1111111, 0, 0.740472933, 0.422418179, 1.032289541]]
    // }, 
    // {
    //     transform: {
    //         type: 'boxplot',
    //         config: { itemNameFormatter: 'expr {value}' }
    //     }
    // }, {
    //     fromDatasetIndex: 1,
    //     fromTransformResult: 1
    // }],
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        name: 'km/s minus 299,000',
        splitArea: {
            show: true
        }
    },
    series: [
        {
            name: 'boxplot',
            type: 'boxplot',
            // datasetIndex: 1
            // boxWith: [30, 80],
            itemStyle:{
                color: "#ffc000"
            },
            tooltip: {
                formatter: function(param){
                    return [
                        'Experiment' + param.name + ': ',
                        'upper' + param.data[5],
                        'Q3' + param.data[4],
                        'median' + param.data[3],
                        'Q1' + param.data[2],
                        'lower' + param.data[1]
                    ].join('<br/>');
                }
            },
            data: [
                [136, 1, 6,	4, 9],
                // [2741, 4, 65, 30, 139],
                // [1, 0, 0.25, 0.153846154, 0.416666667],
                // [510, 5, 89, 57, 116],
                // [1, 0, 0.235078937, 0.187584345, 0.348837209],
                // [1.6, 0.001960784, 0.071428571, 0.026785714, 0.194444444],
                // [775, 1, 3, 1.8, 5.5],
                // [426.1111111, 0, 0.740472933, 0.422418179, 1.032289541]
            ]
        },
        // {
        //     name: 'outlier',
        //     type: 'scatter',
        //     datasetIndex: 2
        // }
    ]
})



    }
  }
}
</script>
