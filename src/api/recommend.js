import axios from './axios'

export function getBanner() {
  return axios({
    method: 'get',
    url: '/banner'
  })
} 