<template>
  <scroll 
          :data="singers"
          class="listview"
          ref="scroll"
         :probeType="3">
    <ul  @touchmove='scrollMove'>
      <li v-for="(group, index) in singers" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title">{{group.name}}</h2>
        <ul>
        
            <router-link :to="'/singer/'+item.singer_mid" tag="li" 
            v-for="item in group.list" 
            class="list-group-item" 
            :key="item.singer_mid">
              
                <img class="avatar" v-lazy="item.singer_pic">
                <span class="name">{{item.singer_name}}</span>
            </router-link>
          
        </ul>
      </li>
    </ul>
    <div class="fixed-list" v-if="fixedTitle" ref="fixed">
         <h2 class="list-group-title fixed" >{{fixedTitle}}</h2>
    </div>  
  </scroll>
</template>

<script>
import Scroll from 'components/common/Scroll'
import { debounce } from 'common/utils'
import { playListMixin } from 'common/mixins'
//标题的宽度
const TITLE_HEIGHT = 30
export default {
  mixins:[playListMixin],
  name: 'SingerList',
  data() {
    return {
      timer: null,
      isGetOffsetTop: false,
      offsetList: [],
      timer2: null,
      currentGroup: 0,
      diff : 0
    }
  },
  components: {
    Scroll
  },
  props: {
    singers: {
      type: Array,
      default() {
        return []
      }
    },
    currentAlphabet:{
      type:Number,
      default:0
    }
  },
  computed:{
    //固定标题要显示地内容
    fixedTitle() {
      return this.singers[this.currentGroup] ? this.singers[this.currentGroup].name : ''
    }
  },
  methods: {
    Scroll(pos) { 
      //如果已经获得了各组距顶部的高度，就不用重复获取 
      /* console.log('ddd') */
        if(!this.isGetOffsetTop) {
        this.offsetTop()
      }
        for(let i = 0; i< this.offsetList.length; i++){
          //-pos.y < 0
          if(-pos.y < 0) {
            this.currentGroup = -1
          }
          if( -pos.y >= this.offsetList[i] && -pos.y < this.offsetList[i+1]){
             //记录距下一次标题切换时要滚过的y值，滚动时再实时变化
             this.diff = this.offsetList[i+1]+pos.y

            //如果滑动的组未发生改变,则直接返回
            if(this.currentGroup == i){
              return          
            }else{  
              this.currentGroup = i      
                  this.$emit('changePage', i)
            }    
            
          }
        }
    },
    scrollMove() {
      //监听better-scroll的滚动scroll事件
      if(this.timer2) {
        clearTimeout(this.timer2)
      }
      this.timer2 = setTimeout(() => {
        this.$refs.scroll.scroll.on('scroll',this.Scroll)
      },100)
     /*  debounce( ()=> {
          
        },100)()  */
             
    },
    //获取各组距顶部的高度
    offsetTop() {
      this.isGetOffsetTop = true
      this.$refs.listGroup.forEach( item => {
        this.offsetList.push(item.offsetTop)
      })
    },
    //让列表距底部的宽度根据有无播放器自适应
      handleBottom(playList) {
        let bottom = playList && playList.length > 0 ? 60 : 0
      
        this.$refs.scroll.$el.style.bottom = bottom + 'px'
        this.$refs.scroll.refresh()

      }
  },
  watch: {
    currentAlphabet(index) {
      //滚动到所点击字母对应的位置
    //防抖，优化性能
        if(this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          
             this.$refs.scroll.scrollToElement(this.$refs.listGroup[index])
              
        },100)  
    },
    diff(diff) {
      //每组的标题会有顶的效果，30为标题的宽度
      let fixtop = diff > 0 && diff < TITLE_HEIGHT ? diff - TITLE_HEIGHT : 0
      
      if(this.fixtop === fixtop) {
        return 
      }
        this.$refs.fixed.style.transform = `translate(0, ${fixtop}px)`
      this.fixtop = fixtop
     
       
      
      
      
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
  .listview
    position fixed
    top 88px
    bottom 0
    width: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .fixed-list
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
   
</style>


/* .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%) */