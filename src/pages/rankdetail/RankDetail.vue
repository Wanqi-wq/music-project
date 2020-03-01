<template>
  <music-list :rank="rank" :songs="rankList" :isRank="true"/>
</template>

<script>
import MusicList from 'components/content/MusicList'

import { mapGetters } from 'vuex'
import {createSong } from 'common/song'
export default {
  name: 'rankDetail',
  data() {
    return {
      rank: {},
      rankList: []
    }
  },
  components: {
    MusicList
  },
  created() {
    this.rank = this.getRank
    this._getRank()
  },
  computed: {
    ...mapGetters(['getRank'])
  },
  methods: {
    _getRank() {
      //获取指定格式的歌曲
      if(this.rank.list) {
        this.rankList = this.getRank.list.map( item => createSong(item))
      }
    }
  }
}
</script>

<style>

</style>