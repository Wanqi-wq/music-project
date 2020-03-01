<template>
  <transition name="list-fade" >
    <div class="playlist" v-show="openFlag && getSequenceList.length" @click.stop="hide">
      <div class="list-wrapper" @click.stop >
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="getModeCls" @click="toggleMode"></i>
            <span class="text"><!-- {{modeText}} --></span>
            <span class="clear" @click="openDelete"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="listContent"  class="list-content">
          <transition-group ref="list" name="list" tag="ul">
            <li  class="item" v-for="(item,index) in getSequenceList" :key="item.mid" @click="selectSong(item, index)"
            ref="itemList">
              <i class="current" :class="getClassCls(item)"></i>
              <div class="text">{{item.songname}}</div>
              <span  class="like" @click.stop="toggleFavourite(item)">
                <i :class="getFavorite(item)" ></i>
              </span>
              <span  class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div  class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div  class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" text='清空' title="是否清空播放列表" @confirm="clearSongsList"/>
    </div>
  </transition>
</template>

<script>
import Scroll from 'components/common/Scroll'
import Confirm from './Confirm'
import { favourite } from 'common/mixins'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  mixins:[favourite],
  name: 'PlayList',
  data() {
    return {
      openFlag: false
    }   
  },
  components: {
    Scroll,
    Confirm
  },
  computed:{
    getModeCls() {
      //不同播放模式显示不同的图标
      return this.getCurrentMode == 0 ? 'icon-loop': this.getCurrentMode == 1 ? 'icon-sequence':'icon-random'
    },
    ...mapGetters(['getSequenceList','getSong','getCurrentMode','getSongList'])
  },
  watch: {
    getSong(newSong, oldSong) {
      if(!newSong) {
        return
      }
      if(newSong.mid === oldSong && oldSong.mid || this.openFlag == false){
        return
      }
      this.scrollToCurrent()
    }
  },  
  methods: {
    hide() {
      this.openFlag = false
    },
    open() {
      this.openFlag = true
    },
    getClassCls(item) {
      return item.mid === this.getSong.mid ? 'icon-play': ''
    },
    selectSong(song, index) {
      //点击哪首歌，哪首歌就播放，同时index改变
      console.log(this.getCurrentMode)
      if(this.getCurrentMode === 2){
        //如果是随机播放模式，index改变 
        index = this.getSongList.find(item => item.mid === this.getSong.mid)
      }
      this.setCurrentIndex(index)
      this.setCurrentSong(song)
      this.setPlaying(true)
    },
    scrollToCurrent() {
      //滚动到当前播放的歌曲的位置
      let index = this.getSequenceList.findIndex(item => item.mid === this.getSong.mid)
      this.$refs.listContent.scrollToElement(this.$refs.itemList[index],300)
    },
    deleteOne(song) {
      //将当前歌曲从播放列表中删除
    this.deleteSong(song)
    },
    toggleMode() {
      //切换播放模式
        let currentMode = this.getCurrentMode
        currentMode == 2 ? currentMode = 0 : currentMode++ 
      this.setCurrentMode(currentMode)
    },
    openDelete() {
      this.$refs.confirm.show()
    },
    clearSongsList() {
      //将歌曲列表清空
      
      this.clearSongs(this.openFlag)
      this.hide()
    },
    ...mapMutations(['setCurrentSong', 'setCurrentIndex','setPlaying','setCurrentMode']),
    ...mapActions(['deleteSong','clearSongs'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            padding 2px
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>