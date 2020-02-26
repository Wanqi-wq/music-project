<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{disc.title || singer.name }}</h1>
    <div class="bg-image"  ref="bgImage" :style="{'background-image':bgStyle}">
      <div class="play-wrapper">
        <div ref="playBtn"  class="play" v-show="songs.length">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" :listen-scroll="true" 
    class="list" ref="list" :probeType="3" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectSong"></song-list>
      </div>
    </scroll>
    
  </div>
</template>

<script>
  import SongList from '../common/SongList'
  import Scroll from '../common/Scroll'
  import { playListMixin } from 'common/mixins'

  import { mapActions } from 'vuex'
  const RESERVED_HEIGHT = 40
  /* const transform = prefixStyle('transform') */

  export default {
    mixins:[playListMixin],
    name: 'MusicList',
    components: {
      SongList,
      Scroll
    },
    props: {
      singer: {
        type: Object,
        default() {
          return {}
        }
      },
      songs: {
        type: Array,
        default() {
          return []
        }
      },
      disc: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    created() {
      console.log(this.disc.title,this.disc)
    },
    computed: {
      bgStyle() {
        return `url(${this.disc.image || this.singer.img})`
      }
    },
    mounted() {
     //获取list距顶部的距离
      this.height = this.$refs.bgImage.clientHeight
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    },
    methods: {
      scroll(pos) {
            //图片的放大比例
            let scale = 1
            //对dom进行操作，让属性随着scroll的变化而发生改变
           if(pos.y < 0) {
             if((this.height - RESERVED_HEIGHT) < -pos.y) {
                this.$refs.bgImage.style.zIndex = 100
                this.$refs.bgImage.style.paddingTop = 0
                this.$refs.bgImage.style.height = RESERVED_HEIGHT + 'px'
                this.$refs.playBtn.style.display = 'none'
             }else{
                this.$refs.bgImage.style.paddingTop = this.height + pos.y+ 'px'
                this.$refs.bgImage.style.height = 0
                this.$refs.bgImage.style.zIndex = 0
                this.$refs.playBtn.style.display = ''
             }   
           }
           //向下滚动
           if(pos.y > 0) {
             scale = (pos.y/this.height) + 1
            this.$refs.bgImage.style['transform'] = `scale(${scale})`
            this.$refs.bgImage.style.zIndex = 100
          }         
      },
      //根据不同的url返回不同的页面
      back() {
        if(this.$route.path.includes('singer')) {
          this.$router.push('/singer')
        }else if(this.$route.path.includes('recommend')) {
          this.$router.push('/recommend')
        }
        
      },
      //修改vuex中修改的歌曲信息
      selectSong({songs,index}) {
        console.log(index)
        this.selectSongs({songs,index})
      },
      //让列表距底部的宽度根据有无播放器自适应
      handleBottom(playList) {
        let bottom = playList && playList.length > 0 ? 60 : 0
      
        this.$refs.list.$el.style.bottom = bottom + 'px'
        this.$refs.list.refresh()

      },
      ...mapActions(['selectSongs'])
    },
    
  }
</script>

<style scoped lang="stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 150
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 150
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        top: 200px
        width: 100%
        z-index 20
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      z-index: 50
      .song-list-wrapper
        padding: 20px 30px
      
</style>