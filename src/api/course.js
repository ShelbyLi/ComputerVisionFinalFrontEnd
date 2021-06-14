import request from '@/utils/request'

export function fetchCourseList(query) {
  return request({
    url: '/course/list',
    method: 'get',
    params: query
  })
}

export function deleteCourse(data) {
  return request({
    url: '/course/remove',
    method: 'delete',
    // data
    params: data
  })
}

export function fetchVideoList(query) {
  return request({
    url: '/course/video/list',
    method: 'get',
    params: query
  })
}

export function deleteVideo(data) {
  return request({
    url: '/course/video/remove',
    method: 'delete',
    // data
    params: data
  })
}