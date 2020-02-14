<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div> 
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'BetterScroll',
  mounted() {
    this._initScroll(),
    this._pulling()
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    //初始化scroll
    _initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        //让浏览器不阻止点击事件
        click: true,
        pullUpLoad: this.pullUpLoad
      })
    },
    //重新获取better-scroll的高度,使页面能够正常滚动
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    _pulling() {
      //开启加载更多
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pulingUp')
        })
      }
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  watch: {
      //监听数据的变化，如果数据发生变化，自动刷新
      data() {
        this.refresh()
      }
    } 
}
</script>

<style>

</style>