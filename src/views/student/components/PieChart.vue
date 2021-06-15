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
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(data) {
      this.chart = echarts.init(this.$el, 'macarons')

      // fetchOption('pie').then((response) => {
        // const data = response.data.pie
        this.chart.setOption({
          // title: {
          //     text: '退课原因预测',
          //     subtext: '虚构数据',
          //     left: 'center'
          // },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
            textStyle: {
              color: "white" //设置文字颜色
            },
          },
          legend: {
            left: 'center',
            bottom: '10',
            // data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
            data: data.legendData
          },
          series: [
            {
              name: '退课原因',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 95],
              center: ['50%', '38%'],
              // data: [
              //   { value: 320, name: 'Industries' },
              //   { value: 240, name: 'Technology' },
              //   { value: 149, name: 'Forex' },
              //   { value: 100, name: 'Gold' },
              //   { value: 59, name: 'Forecasts' }
              // ],
              data: data.seriesData,
              animationEasing: 'cubicInOut',
              animationDuration: 1000
            }
          ]
        })
      // })

    }
  }
}
</script>
