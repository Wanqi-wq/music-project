<template>
  <div class="recommend">
    <recommend-scroll class="recommend-content" :data="discList.list"
    :pullUpLoad="true"
    @pulingUp="pulingUp"
    ref="scroll">
      <div>
        <recommend-swiper :swiperList="swiperList" @loadImage="loadImage"/>
        <div class="slider-wrapper"></div>
        <div class="recommend-list"> 
          <h1 class="list-title">热门歌单推荐</h1>
          <recommend-disc-list :discList="discList.list"/>
        </div>
      </div>
    </recommend-scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import RecommendSwiper from './childComps/Swiper'
import RecommendDiscList from './childComps/DiscList'
//公共组件
import RecommendScroll from 'components/common/Scroll'
//方法
import { getBanner, getHot } from 'api/recommend'
import { ERR_OK} from 'api/config'
export default {
  name: 'Recommend',
  data() {
    return {
      swiperList: [],
      discList: {page:0,list:[]}
    } 
  },
  components: {
    RecommendSwiper,
    RecommendScroll,
    RecommendDiscList
  },
  created() {
    this._getBanner(),
    this._getHot()
  },
  methods: {
    //获取banner图数据
    _getBanner() {
      getBanner().then(res => {
        if(res.data.code == ERR_OK)
          this.swiperList = res.data.data;     
      }).catch(err => console.log(err))
    },
    //获取热门歌单数据
    _getHot(page,pageSize) {
      getHot(page,pageSize).then(res => {
        if(res.data.code == ERR_OK) {  
            this.discList.list.push(...res.data.data.list); 
            this.discList.page += 1
            //告诉better-scroll这次数据加载完成
            this.$refs.scroll.finishPullUp()  
        }
      }).catch(err => console.log(err))
    },
    //banner图加载完成后，调用better-scroll的refresh
    loadImage() {
      console.log('refresh')
      this.$refs.scroll.refresh()
    },
    //每下拉一次，都刷新一次数据
    pulingUp() {
      let page = this.discList.page + 1
      this._getHot(page)
    }
  }
}
</script>
  
<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
  
</style>








  


  