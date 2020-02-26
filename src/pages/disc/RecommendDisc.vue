<template>
  <div class="discDetail" >
    <music-list :disc="disc" :songs="songs"/>
  </div>

</template>

<script>
import MusicList from 'components/content/MusicList'

import { getRecommendDisc } from 'api/recommendDisc'
import {createSong } from 'common/song'
export default {
  name: 'RecommendDisc',
  data() {
    return {
      disc:{
        title:'',
        image:''
      },
      songs:[]
    }
  },
  components: {
    MusicList

  },
  created() {
    this._getRecommendDisc()
    this._getDiscSongs()
  },
  methods: {
    //获取音乐歌单以及此歌单中的歌曲
    _getRecommendDisc() {
      console.log(this.$route.params.id)
      getRecommendDisc(this.$route.params.id).then( res => {
        if(res.data.code === 200) {
          //请求成功
          this.disc.title = res.data.data[0].dissname
          this.disc.image = res.data.data[0].logo
          console.log(res.data.data[0])
          res.data.data[0].songlist.forEach(item => {
            //记录每个歌单的歌曲
            this.songs.push(createSong(item))
          })
          /* console.log(this.disc.title, this.disc.image)
          console.log(this.songs) */
        } 
      }).catch(err =>{
        console.log(err)
      })
    },
    //获取歌单中的音乐
    _getDiscSongs() {

    }
  }
}
</script>

<style lang="stylus" scoped>

</style>