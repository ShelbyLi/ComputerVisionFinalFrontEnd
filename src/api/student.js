import request from '@/utils/request'
export function fetchStudentList(query) {
    return request({
      url: '/student/list',
      method: 'get',
      params: query
    })
  }
export function fetchStudentInfoList(query) {
  return request({
    url: '/student/info',
    method: 'get',
    params: query
  })
}
export function informStudent(data) {
    return request({
      url: '/student/inform',
      method: 'post',
      params: data
    })
  }

export function fetchOption(query) {
  return request({
    url: '/student/chart',
    method: 'get',
    params: query
  })
}

export function postStudentGroup(data) {
  return request({
    url: '/student/postgroup',
    method: 'post',
    params: data
  })
}