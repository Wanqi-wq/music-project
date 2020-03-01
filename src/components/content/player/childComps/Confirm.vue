<template>
  <div class="mask" @click.stop="hide" v-show="isShow">
    <transition >
      <div class="confirm" ref="confirm"  @click.stop v-show="isShow">
        <div class="header">{{title}}</div>
        <div class="footer">
          <div ref="left" class="left" @touchstart="touchStart"
          @touchend="touchEnd" @click.stop="cancel">取消</div>
          <div class="right" @touchstart="touchStart"
          @touchend="touchEnd" @click.stop="confirm">{{text}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Confirm',
  data() {
    return {
      isShow: false
    }
  },
  created() {
    this.touch = {}
  },
  props: {
    text: {
      type: String,
      default: '确认'
    },
    title: {
      type: String,
      default : ''
    }
  },
  methods: {
    touchStart(e) {  
      e.target.style.backgroundColor = '#333'
    },
    touchEnd(e) {
      e.target.style.backgroundColor = '#666'
    },
    cancel() {
      this.$emit('cancel')
      this.hide()
    },
    confirm() {
      this.hide()
      this.$emit('confirm')
    },
    hide() {
      this.isShow = false
    },
    show() {
      this.isShow = true
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
  .v-enter, .v-leave-to 
    transform scale(0, 0)
  .v-enter-active
    transition 100ms
  .mask 
    position fixed
    width 100%
    height 100%
    background $color-background-d
    .confirm
      box-sizing border-box
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      margin auto 
      width 250px
      height 90px
      z-index 500
      background $color-dialog-background
      text-align center
      border-radius 10px
      overflow hidden
      color rgba(255,255,255,0.7)
      .header
        border-bottom 1px solid $color-highlight-background
        height 50px
        line-height 50px
        font-size 16px
      .footer
        height 40px
        line-height 40px
        overflow hidden
        font-size 15px
        .left 
          box-sizing border-box
          width 50% 
          float left
          border-right 1px solid $color-highlight-background
        .right
          box-sizing border-box
          width 50% 
          float left
        

</style>