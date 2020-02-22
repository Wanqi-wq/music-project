//获取player页的歌词
import axios from './axios'

export function getLyrics(song) {
  return axios({
    method: 'get',
    url: '/lrc',
    params: {
      id:song.mid
    }
  })
}