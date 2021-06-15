<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
// import echarts from 'echarts'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import {fetchOption} from "@/api/student"

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    // chartData: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
      // this.setOptions(this.chartData)
      fetchOption('line').then((response) => {
        const data = response.data
              this.chart.setOption({
        xAxis: {
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: data.xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10],
          textStyle: {
            color: "white" //设置文字颜色
          },
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          // data: ['expected', 'actual']
          data: data.legendData
        },
        series: [{
          name: '最大值', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          smooth: true,
          type: 'line',
          // data: expectedData,
          data: data.seriesData[0],
          animationDuration: 1000,
          animationEasing: 'cubicInOut'
        },
        {
          name: '平均值',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            }
          },
          // data: actualData,
          data: data.seriesData[1],
          animationDuration: 1000,
          animationEasing: 'quadraticOut'
        },
        {
          name: '最小值',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#2EC7C9',
              lineStyle: {
                color: '#2EC7C9',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          // data: actualData,
          data: data.seriesData[2],
          animationDuration: 1000,
          animationEasing: 'quadraticOut'
        }]
      })
      })
    }
  }
}
</script>
