<template>
  <div class="user-center">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <switches class="switches" :currentIndex="currentIndex" @switches="switches"/>
    <scroll class="song-list-wrapper" :data="getFavoriteList" ref="list">
      <songList :songs="getFavoriteList" v-if="this.currentIndex === 0" @select="selectSong"/>
      <songList :songs="['']" v-if="this.currentIndex === 1" @select="selectSong"/>
    </scroll>
  </div>
</template>

<script>
import Switches from 'components/common/Switches'
import SongList from 'components/common/SongList'
import Scroll from 'components/common/Scroll'
import { playListMixin } from 'common/mixins'
import { mapGetters,mapActions } from 'vuex'
import { createSong } from 'common/song'
export default {
  name: 'UserCenter',
  mixins:[playListMixin],
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters(['getFavoriteList'])
  },
  components: {
    Switches,
    SongList,
    Scroll
  },
  methods: {
    back() {
      this.$router.back()
    },
    switches(index) {
      this.currentIndex = index
    },
    selectSong({songs,index}) {
      //将选中的歌曲插入到播放列表中
      this.insertSong(createSong(songs[index]))
    },
    handleBottom(playList) {
      let bottom = playList && playList.length > 0 ? 60 : 0
        this.$refs.list.$el.style.bottom = bottom + 'px'
        this.$refs.list.refresh()
    },
    ...mapActions(['insertSong'])
  }
}
</script>

<style lang="stylus" scoped>
@import "~assets/stylus/variable"
  .user-center
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 150
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches
      margin-top 7px
    .song-list-wrapper
      position fixed
      top 50px
      bottom 0
      left 0
      right 0
      padding 30px
      overflow hidden
</style>