import request from '@/utils/request'
export function FetchtFruitList(query) {
    return request({
      url: '/fruit/list',
      method: 'get',
      params: query
    })
}

export function FetchtScore(query) {
    return request({
      url: '/fruit/score',
      method: 'get',
      params: query
    })
}