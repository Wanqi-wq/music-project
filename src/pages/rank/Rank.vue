<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li  class="item" v-for="(item,index) in topList" :key="index" @click="selectRank(item)">
          <div class="icon">
            <img width="100" height="100" class="img" v-lazy="item.list[0].pic"/>
            <span class="rankname">{{item.name}}</span>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(inneritem,innerIndex) in sliceList(index)" :key="innerIndex">
              <span>{{innerIndex+1+' '}}</span>
              <span>{{inneritem.name+'-'+inneritem.singer}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'components/common/Scroll'

import { getRank } from 'api/rank'
import { rankIndex } from 'api/config'
import { mapMutations } from 'vuex'
export default {
  name: 'Rank',
  data() {
    return {
      topList:[]
    }
  },
  created() {
    //跳转到榜单详情页
    this._getRank()
  },
  computed: {
    
  },
  methods: {
    //获取不同的排行榜
    _getRank() {
      for(let i in rankIndex) {
        let index = rankIndex[i]
        getRank(index).then(res => {
          if(res.data.code === 200) {
            //获得排行榜的数组用于遍历
            this.topList.push({name:i,list:res.data.data})
            console.log(this.topList)
          }
        }).catch(err => {
          console.log(err)
        })
      }  
    },
    sliceList(index) {
      //得到排行榜前三名的歌曲
      
      return this.topList[index].list.slice(0,3)
    },
    selectRank(item) {
      //将当前榜单设置为显示
      this.setRank(item)
      //跳转到榜单详情页
      this.$router.push('/rank/' + item.name) 
      
      
    },
    ...mapMutations(['setRank'])
  },
  components:{
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
          text-align center
          .rankname 
            position relative
            top -60%
            text-align center
            font-size 20px
          .img 
            opacity .3
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>