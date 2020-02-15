<template>
  
      <ul v-if="shortcutList.length" 
      class="list-shortcut"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      ref="parent">
        <li v-for="(item, index) in shortcutList"  
        class="item" :key="index"
        @click="alphabetClick(index)"
        :class="{'current': currentAlphabet === index}"
        >
          {{item.name.substr(0,1)}}
        </li>
      </ul>
    
</template>

<script>
export default {
  name: 'SingerAlphabet',
  data() {
    return {
      current: 0,
      //标志是否触摸
      isTouch: false
    } 
  },
  props: {
    shortcutList: {
      type: Array,
      default() {
        return []
      }
    },
    currentAlphabet: {
      type: Number,
      default :0
    }
  },
  methods: {
    alphabetClick(index) {
      this.current = index
      this.$emit('alphabetClick',index)
    },
    touchStart() {
      this.isTouch = true
    },
    touchMove(e) {
      if(this.isTouch) {
        let index = Math.floor((e.touches[0].clientY - this.parentY)/18)
        const length = this.shortcutList.length - 1
        //让滑动的index不超过范围
        index = index < 0 ? 0 : index
        index = index > length ? length : index
        this.current = index
        this.$emit('alphabetClick',index)
      }
    },
    touchEnd() {
      this.isTouch = false
    }
  },
  computed: {
    parentY() {
      return this.$refs.parent.getBoundingClientRect().top
    }
  },
  watch: {
    currentAlphabet(index) {
      this.current = index
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
  .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
      .current
        color: $color-theme
</style>