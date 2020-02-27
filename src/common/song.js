//获取歌词
import { getLyrics } from 'api/player'

export class Song {
  constructor({mid, singer, songname, albumname, image, duration, url}) {
    this.mid = mid
    this.singer = singer
    this.songname = songname
    this.albumname = albumname
    this.image = image
    this.duration = duration
    this.url = url
  }
  ObtainLyrics(song) {
    if(this.lyrics) {
      return  Promise.resolve(this.lyrics)
    }else{
      return new Promise( resolve => {
        getLyrics(song).then( res => {
          this.lyrics = res.data
          resolve(this.lyrics)
        }).catch(err => {
          console.log(err)
        })

      })
    }  
  } 
}

//创建song实例
export function createSong(musicData) {
  return new Song({
            mid: musicData.songmid || musicData.mid || musicData.id,
            singer: singerName(musicData.singer),
            songname: musicData.songname || musicData.name ,
            albumname: musicData.albumname || musicData.album && musicData.album.name ||musicData.name,
            image: `https://v1.itooi.cn/tencent/pic?id=${musicData.songmid || musicData.mid || musicData.id}`,
            duration: musicData.interval || musicData.time,
            url:`https://v1.itooi.cn/tencent/url?id=${musicData.songmid || musicData.mid || musicData.id}`
          }) 
}
//对singer的名字进行处理，名字可能有好几个
function singerName(singer) {
  if(typeof(singer) === 'string'){
    return singer
  }else if(singer) {
    let arr = []
    singer.forEach( item => {
      arr.push(item.name)
    })
    return arr.join('/')
  } 
}