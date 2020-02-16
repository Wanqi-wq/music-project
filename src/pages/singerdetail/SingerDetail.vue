<template>
  <transition name="slide">
    
      <music-list :singer="singer" :songs="songs"/>
   
  </transition>
</template>

<script>
import MusicList from 'components/content/MusicList'

import { getSingerDetail,getSongs } from 'api/singerdetail'
import { createSong } from 'common/song'
export default {
  name: 'SingerDetail',
  data() {
    return {
      singer: {
        name: '',
        mid: '',
        img: ''
      },
      songs:[]
    }
  },
  components: {
    MusicList
  },
  created() {
    this._getSingerDetail()
    this._getSongs()
  },
  methods: {
    //获取歌手信息
    _getSingerDetail() {
      console.log(this.$router)
      getSingerDetail(this.$route.params.id).then(res => {
        if(res.data.code == 200)
        this.singer.name = res.data.data.singer_info.name
        this.singer.mid = res.data.data.singer_info.mid
        this.singer.img = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.mid}.webp`
      }).catch(e => {
        console.log(e)
      })
    },
    //获取此歌手歌曲信息，createSong方法获取了每首歌的完整信息
    _getSongs() {
      getSongs(this.$route.params.id).then(res => {
        if(res.data.code == 200){
          res.data.data.forEach(item => {
            this.songs.push(createSong(item.musicData))  
          })
        }
      }).catch( err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
  .singerDetail 
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background: $color-background

.slide-enter, .slide-leave-to
  transform: translate(100%, 0)
.slide-enter-active, .slide-leave-active
  transition: all .3s
</style>