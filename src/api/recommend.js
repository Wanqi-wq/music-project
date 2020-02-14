import axios from './axios'

export function getBanner() {
  return axios({
    method: 'get',
    url: '/banner'
  })
}
export function getHot(page=1, pageSize=30) {
  return axios({
    method: 'get',
    url: '/songList/hot',
    params:{
      categoryId:10000000,
      sortId:5,
      pageSize,
      page
    }
  })
}  
