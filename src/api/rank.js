import axios from './axios'



export function getRank(index) {
  return axios({
    url:'/topList',
    params:{
      id:index,
      pageSize:100,
      page:0,
      format:1,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    }
  })
}