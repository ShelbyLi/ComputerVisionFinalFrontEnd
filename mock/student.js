const Mock = require('mockjs')

const data1 = Mock.mock({
  'items|30': [{
    courseId: '@id',
    lastVideoName: '@id',
    courseStatus: '@integer(0, 3)',
    dropReason: '@sentence(0, 2)',
  }]
})

const data = Mock.mock({
  'items|30': [{
    studentId: '@id',
    totalCourseNum: '@id',
    inClassNum: '@integer(0, 3)',
    dropRate: '@integer(0, 100)'
  }]
})

module.exports = [
    {
      url: '/student/list',
      type: 'get',
      response: config => {
        const items = data.items
        return {
          code: 20000,
          data: {
            total: items.length,
            records: items
          }
        }
      }
    },
    {
      url: '/student/info',
      type: 'get',
      response: config => {
        const items = data1.items
        return {
          code: 20000,
          data: {
            total: items.length,
            records: items
          }
        }
      }
    },
    {
      url: '/student/inform',
      type: 'post',
      response: config => {
        return {
            code: 20000,
            msg: "ok"
        }
      }
    },
    {
      url: '/student/chart',
      type: 'get',
      response: config => {
        const items = data1.items
        return {
          code: 20000,
          data: {
            // indicator: [
            //   { name: '学生课程总数', max: 10000 },
            //   { name: '学生视频总数', max: 20000 },
            //   { name: '学生个人退课率', max: 20000 },
            //   { name: 'Customer Support', max: 20000 },
            //   { name: 'Development', max: 20000 },
            //   { name: 'Marketing', max: 20000 }
            // ],
            // data: [
            //   {
            //     value: [5000, 7000, 12000, 11000, 15000, 14000],
            //     name: 'Allocated Budget'
            //   },
            //   {
            //     value: [4000, 9000, 15000, 15000, 13000, 11000],
            //     name: 'Expected Spending'
            //   },
            //   {
            //     value: [5500, 11000, 12000, 15000, 12000, 12000],
            //     name: 'Actual Spending'
            //   }
            // ],
            // *************************
            // legendData: ['学生意志力低', '学生学习课程多', '课程内容多', '课程难度大', '观看视频数量少', '观看视频次数少', '观看视频时长少'],
            // seriesData: [
            //     { value: 220, name: '学生意志力低' },
            //     { value: 240, name: '学生学习课程多' },
            //     { value: 149, name: '课程内容多' },
            //     { value: 149, name: '课程难度大' },
            //     { value: 100, name: '观看视频数量少' },
            //     { value: 59, name: '观看视频次数少' },
            //     { value: 70, name: '观看视频时长少' }
            //   ],
            // ****************************
            xAxisData: ['学生课程总数', '学生视频总数', '学生个人退课率'],
            legendData: ['最大值', '最小值', '平均值'],
            seriesData: [
              [100, 120, 161, 134, 105, 160, 165],
              [120, 82, 91, 154, 162, 140, 145],
              [180, 160, 151, 106, 145, 150, 130]
            ]
          }
        }
      }
    },
    {
      url: '/student/postgroup',
      type: 'post',
      response: config => {
        return {
            code: 20000,
            msg: "ok"
        }
      }
    }
]