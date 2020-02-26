import axios from './axios'
//获取歌单的有关数据
export function getRecommendDisc(mid) {
  return axios({
    url: '/songList' ,
    method: 'get',
    params: {
      id:mid
    }
  })
}
