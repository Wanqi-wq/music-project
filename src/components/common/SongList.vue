<template>
  <div class="song-list">
    <ul v-for="(song,index) in songs" :key="song.mid">
      <li  class="item" >
        <div class="rank" v-if="rank">
          <span :class="getClassCls(index)" class="text">{{getTextCls(index)}}</span>
        </div>
        <div tag="div" class="content" @click="getSong(songs,index)">
          <h2 class="name">{{song.songname}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
  export default {
    name: 'SongList',
    props: {
        songs: {
        type: Array,
        default() {
          return []
        }
      },
      rank: {
        type:Boolean,
        default: false
      }
    },
    methods:{
      getDesc(song) {
        return `${song.singer}·${song.albumname}`
      },
      getSong(songs,index) {
        this.$emit('select',{songs,index})
      },
      //用来判断是否应该设置前三名的标志
      getClassCls(index) {
        if(index < 3){
          return `icon icon${index}`
        }
      },
      //从第四名开始设置文案
      getTextCls(index) {
        return index > 2 ? index + 1 : ''
      }
    },
   
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('~assets/image/first')
          &.icon1
            bg-image('~assets/image/second')
          &.icon2
            bg-image('~assets/image/third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>