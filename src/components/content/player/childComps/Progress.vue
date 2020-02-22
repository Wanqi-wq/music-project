<template>
  <div class="progress-bar" ref="progressBar" @click.stop="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.stop.prevent="touchStart"
      @touchmove.stop.prevent="touchMove"
      @touchend.stop.prevent="touchEnd">
        <div class="progress-btn" ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  data() {
    return {
      isTouch: false,
      //拖动按钮的位置
      position: 0
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    } 
  },
  computed: {
    progressWidth() {
      return this.$refs.progressBar.clientWidth
    },
    rec() {
      return this.$refs.progressBar.getBoundingClientRect()
    }
  },
 
  watch: {
    //当歌曲播放进度发生改变时
      percent(newPercent) {
        //1.进度条长度发生改变
        this.$refs.progress.style.width = this.progressWidth * newPercent + 'px'
        //2.进度条按钮移动
        this.$refs.progressBtn.style['transform'] = `translate(${this.progressWidth *newPercent}px ,0)`

      }
  },
  methods: {
    touchStart() {
      this.isTouch = true

    },
    touchMove(e) {
      if(this.isTouch) {
        //拖动进度按钮的位置
        this.position = e.touches[0].pageX - this.rec.left
        this.$emit('touchSong',this.position/ 240) 
      }
    },
    touchEnd() {
      this.isTouch = false 
    },
    //点击进度条时
    progressClick(e) {
      this.position = e.clientX- this.rec.left
      this.$emit('touchSong',this.position/ 240) 
    }
  }
}
</script>

<style lang="stylus" scoped>
   @import "~assets/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>