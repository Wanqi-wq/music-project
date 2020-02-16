export class Song {
  constructor({mid, singer, songname, albumname, image, lyrics, duration, url}) {
    this.mid = mid
    this.singer = singer
    this.songname = songname
    this.albumname = albumname
    this.image = image
    this.lyrics = lyrics
    this.duration = duration
    this.url = url
  }
}

//创建song实例
export function createSong(musicData) {
  return new Song({
            mid: musicData.songmid,
            singer: singerName(musicData.singer),
            songname: musicData.songname ,
            albumname: musicData.albumname,
            image: `https://v1.itooi.cn/tencent/pic?id=${musicData.songmid}`,
            lyrics:`https://v1.itooi.cn/tencent/lrc?id=${musicData.songmid}`,
            duration: 133,
            url:`https://v1.itooi.cn/tencent/url?id=${musicData.songmid}`
          }) 
}
//对singer的名字进行处理，名字可能有好几个
function singerName(singer) {
  if(singer) {
    let arr = []
    singer.forEach( item => {
      arr.push(item.name)
    })
    return arr.join('/')
  } 
}