const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    courseId: '@id',
    totalDuration: '@datetime',
    videoNum: '@integer(1, 30)',
    totalPeopleNum: '@integer(300, 5000)',
    currentPeopleNum: '@integer(300, 1000)',
  }]
})

const data1 = Mock.mock({
    'items|30': [{
      videoId: '@id',
      videoName: '@sentence(1, 3)',
      videoDuration: '@datetime',
      avgWatchingDuration: '@datetime',
      ctr: '@integer(800, 6000)',
      dropNum: '@integer(300, 1000)',
    }]
  })

module.exports = [
  {
    url: '/course/list',
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
    url: '/course/video/list',
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
  }
]

