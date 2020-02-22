<template>
  <div class="player" >
    <transition name="normal">
      <div class="normal-player" v-show="getFullScreen" v-if="getSong.mid">
        <div class="background">
          <img width="100%" height="100%" :src="getSong.image">
        </div>
        <div class="top">
          <div class="back" @click="close">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" >{{getSong.songname}}</h1>
          <h2 class="subtitle">{{getSong.singer}}</h2>
        </div>
        <div class="middle"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="isRotate">
                <img class="image" :src="getSong.image" >
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric" >{{playingLyric}}</div>
            </div>
          </div>
           <!-- 歌词部分 -->
          <transition>
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div>
                <p ref="lyricLine"
                   class="text"
                   :class="{'current':currentlineNum === index}"
                  v-for="(item, index) in (currentLyric && currentLyric.lines)" :key="index">{{item.txt}}</p>
              </div>
            </div>
          </scroll>
          </transition>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
          </div>
          <!-- 进度条 -->
          <div class="progress-wrapper">
            <span class="time time-l">{{progressTime}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @touchSong="touchSong"/>
            </div>
            <span class="time time-r">{{endTime}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" >
              <!-- 播放模式 -->
              <i :class="modeStyle" @click="changeMode"></i>
            </div>
            <div class="icon i-left" >
              <i  class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" >
              <i  class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i  class="icon"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 底部的小播放器 -->
    <transition name="mini">
      <div class="mini-player" v-if="getSong.mid" v-show="!getFullScreen" @click.stop="open">
        <div class="icon" >
          <img  width="40" height="40" :src="getSong.image" :class="isRotate">
        </div>
        <div class="text">
          <h2 class="name">{{getSong.songname}}</h2>
          <p class="desc" >{{getSong.singer}}</p>
        </div>
        <div class="control"> 
          <i @click.stop="togglePlaying" class="icon-mini" :class="playIconMini"></i>
        </div>
        <div class="control">
          <i class="icon-playlist" ></i>
        </div>
      </div>
    </transition>

    <!-- h5播放器 -->
    <audio ref="audio" :src="getSong.url" @canplay="play" 
    @timeupdate="timeChange"
    @ended="songEnd"></audio>
  </div>
</template>

<script>
import ProgressBar from './childComps/Progress'
import Lyric from 'lyric-parser'
import Scroll from 'components/common/Scroll'

import { RandomArr } from 'common/utils'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'player',
  data() {
    return {
      //记录歌曲是否是第一次加载
       isLoaded: false,
       duration: 0,
       currentTime: 0,
       percent: 0,
       isTouch: false,
       currentLyric: null,
       currentlineNum: 0,
       currentShow: 'cd',
       playingLyric: ''

    }
   
  },
  computed: {
     ...mapGetters(['getSong', 'getFullScreen',
      'getPlaying','getCurrentIndex','getSongList','getCurrentMode','getSequenceList']),
     //根据是否播放决定播放按钮
     playIcon() {
       return this.getPlaying ?  'icon-pause' : 'icon-play'
     },
     playIconMini(){
       return this.getPlaying ? 'icon-pause-mini' : 'icon-play-mini'
     },
     isRotate() {
       return this.getPlaying ? 'play' : 'play pause'
     },
     progressTime() {
       return this._format(this.currentTime)
     },
     endTime() {
       return this._format(this.duration)
     },
     modeStyle() {
       return this.getCurrentMode == 0 ? 'icon-loop' : (this.getCurrentMode == 1 ? 'icon-sequence' : 'icon-random')
     }
  },
  created() {
    //记录touch事件
    this.touch = []
  },
  activated() {
  },
  methods: {
    //点击关闭按钮时，收起播放器
    close() {
      this.closeScreen()
    },
    open() {
      this.openScreen()
    },
    togglePlaying() {
      //切换是否播放
      this.setPlaying(!this.getPlaying)
      if(this.currentLyric) {
        this.currentLyric.togglePlay()
      }

    },
    //上一首播放按钮
    prev() {
      let list = []
      //如果是单曲循环
      if(this.getCurrentMode == 0) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        //将歌词的时间置为0
        if(this.currentLyric) {
          this.currentLyric.seek(0)
        }
      }
      //顺序播放
      if(this.getCurrentMode == 1) {
        list = this.getSequenceList
        this.setSongList(list)
        let index = list.findIndex(item => item.mid == this.getSong.mid) - 1

        if(index == -1) {
          index = list.length - 1
        }
        //将currentIndex和currentSong都设置为下一首
        this.setCurrentIndex(index)
        this.setCurrentSong(list[index])
        this.play()
        this.setPlaying(true)
      }
      //随机播放
      if(this.getCurrentMode == 2) {
        list = RandomArr(this.getSequenceList)
        this.setSongList(list)
        let index = list.findIndex( item => item.mid == this.getSong.mid) - 1
        if(index == -1) {
          index = list.length - 1
        }
        //将currentIndex和currentSong都设置为下一首
        this.setCurrentIndex(index)
        this.setCurrentSong(list[index])
        this.play()
        this.setPlaying(true)
      }
    },
    //下一首播放按钮
    next() {
      let list = []
      //如果是单曲循环
      if(this.getCurrentMode == 0) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlaying(true)
        //将歌词的时间置为0
        if(this.currentLyric) {
          this.currentLyric.seek(0)
        }
        
      }else {
        //顺序播放
        if(this.getCurrentMode == 1) {
        list = this.getSequenceList
        this.setSongList(list)
        let index = list.findIndex(item => item.mid == this.getSong.mid) + 1
        if(index == list.length) {
          index = 0
        }
        //将currentIndex和currentSong都设置为下一首
          this.setCurrentIndex(index)
          this.setCurrentSong(list[index])
          this.setPlaying(true)
          this.play()
      }
      //随机播放
      if(this.getCurrentMode == 2) {
          list = RandomArr(this.getSequenceList)
          this.setSongList(list)
          let index = list.findIndex( item => item.mid == this.getSong.mid) + 1
          if(index == list.length) {
            index = 0
            }
          //将currentIndex和currentSong都设置为下一首
          this.setCurrentIndex(index)
          this.setCurrentSong(list[index])
          this.setPlaying(true)
          this.play()
         }      
       }    
    },
    play() {
      this.$refs.audio && this.$refs.audio.play()
    },
    //当歌曲进度发生变化时,获取歌曲播放的点前时间
    timeChange(e) {
      //获取歌曲播放的点前时间
      this.currentTime = e.target.currentTime
      //获取歌曲播放的总时间
      this.duration = e.target.duration  
      //歌曲播放的百分比
      this.percent = this.currentTime / this.duration

    },
    //时间格式化
    _format(time) {
      if(isNaN(time))  return
     
      let min = Math.floor(time/60).toString()
      let sec = Math.floor((time % 60)).toString()
      min = this._padding(min)
      sec = this._padding(sec)
      return min + ":" + sec
      
    },
    //对歌曲时间进行补0
    _padding(time, num=2) {
       while(time.length < num) {
          time = '0' + time
       }
       return time
    },
    //拖动进度条时，播放器的currentTime随之变化
    touchSong(percent) {

      this.$refs.audio.currentTime = percent * this.duration
      this.setPlaying(true)
      if(this.currentLyric) {
        if(this.getPlaying) {
          this.currentLyric.seek(percent * this.getSong.duration * 1000)
        }  
      }
    },
    //改变播放模式
    changeMode() {
      let index = this.getCurrentMode + 1
      if(index == 3) {
        index = 0
      }
      this.setCurrentMode(index)
    },
    //歌曲播放结束时触发的函数
    songEnd() {
      this.next()  
    },
    //每一行歌词发生变化时的回调函数
    handlerLyric({lineNum, txt}) {
       this.currentlineNum = lineNum
      if(lineNum < 5) {
        this.$refs.lyricList.scroll.scrollTo(0, 0, 1000) 
      }else{
        let line = lineNum - 5
        let dom = this.$refs.lyricLine[line]
        this.$refs.lyricList.scrollToElement(dom,1000)
      }
      //记录当前播放的这句歌词
      this.playingLyric = txt
    },

    //歌词左右滑动
    touchStart(e) {
      this.touch.isTouch = true
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
    },
    touchMove(e) {
      if(this.touch.isTouch) {
        //滑动的距离deltaX，deltaY
        let deltaX = e.touches[0].pageX - this.touch.startX
        let deltaY = e.touches[0].pageY - this.touch.startY
        
        if(Math.abs(deltaX) < Math.abs(deltaY)) {
          return
        }
        let left = this.currentShow == 'cd' ?  0 : -window.innerWidth
        let offsetWidth =Math.min(0,Math.max(left + deltaX, -window.innerWidth)) 
        //滑动的百分比
        this.touch.percent = Math.abs(offsetWidth/window.innerWidth)
        this.$refs.lyricList.$el.style['transform'] = `translate(${offsetWidth}px,0)`
        //透明度的变化
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        //动画延时
        this.$refs.lyricList.$el.style['transitionDuration'] = 0 + 'ms'
      }
    },
    touchEnd(e) {
      let offsetWidth
      let opacity
      this.touch.isTouch = false
      if(this.currentShow === 'cd') {
        //从左向右滑
        if(this.touch.percent > .3) {
          this.currentShow = 'lyric'
          offsetWidth = -window.innerWidth
          opacity = 0
        }else {
          offsetWidth = 0
          opacity = 1
        }

      }else {
        //从右向左滑
        if(this.touch.percent < .7) {
          this.currentShow = 'cd'
          offsetWidth = 0
          opacity = 1
        }else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      this.$refs.lyricList.$el.style['transform'] = `translate(${offsetWidth}px,0)`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.lyricList.$el.style['transitionDuration'] = 300 + 'ms'
    },
    ...mapMutations(['closeScreen','setPlaying','openScreen',
                    'setCurrentIndex','setCurrentMode','setSongList','setCurrentSong']),
    ...mapActions(['selectSongs'])
  },
  watch: {
    getPlaying(newPlaying) {
      /* if(newPlaying) {
        this.$refs.audio.play()
      }else {
        this.$refs.audio.pause() 
      } */
     let loading = () => {
        if(newPlaying) {
          this.$refs.audio.play()
        }else {
          this.$refs.audio.pause()  
        } 
      }
      //如果歌曲第一次加载，则用调用canplay api
      if(!this.isLoaded) {
        this.$refs.audio.oncanplay = () => {
          loading()
        }
       this.isLoaded = true
      }else {
        loading()
      }
        
    },

    //如果index改变，则歌曲也要播放
    getCurrentIndex() {
      this.$refs.audio.play()
    },
    //如果歌曲发生变化，调用获取歌词的函数
    getSong(newSong) {
      //如果当前歌词有的话，当前歌曲发生变化时，则停掉上一个
      console.log('变化')
      if(this.currentLyric) {
        this.currentLyric.stop()
      }
       
      //使用Lyric插件进行歌词解析
      newSong.ObtainLyrics(newSong).then( lyric => {
        this.currentLyric = new Lyric(lyric, this.handlerLyric)
        if(this.getPlaying) {
          this.currentLyric.play()
        }
        console.log(this.currentLyric)
      }).catch(() => {
        this.currentLyric = null
        this.playingLyric = '',
        this.currentlineNum = 0

      })
    }
  },
  components: {
    ProgressBar,
    Scroll
  }
}
</script>
<style  lang="stylus" scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state : paused 
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          right: 50px
          top: 15px

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
