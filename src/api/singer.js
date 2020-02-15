import axios from './axios'

export function getSingers(index, page=1, pageSize=30) {
  return axios({
    url: '/artist/list',
    method: 'get',
    params: {
      sexId: -100,
      areaId: -100,
      genre: -100,
      index,
      page,
      pageSize
    }
  })
}

export function getSingerCategory() {
  return axios({
    url: '/artist/category',
    method: 'get'
  }) 
}

