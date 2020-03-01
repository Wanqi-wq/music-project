import { setFavorite } from 'common/cache'

export default  {
  changeSong(state, {songs, index }) {
    state.currentIndex = index,
    state.songList = songs,
    state.currentSong = songs[index],
    state.sequenceList = songs,
    state.fullScreen = true,
    state.playing = true
  },
  setSongList(state,list) {
    state.songList = list
  },
  closeScreen(state) {
    state.fullScreen = false
  },
  openScreen(state) {
    state.fullScreen = true
  },
  setPlaying(state,playing) {
    state.playing = playing
  },
  setCurrentIndex(state,index) {
    state.currentIndex = index
  },
  setCurrentSong(state, song) {
    state.currentSong = song
  },
  setCurrentMode(state, index) {
    state.currentMode = index
  },
  setSequenceList(state, list) {
    state.sequenceList = list
  },
  //设置当前的榜单
  setRank(state,item) {
    state.currentRank = item
  },
  //设置收藏歌单
  setFavouriteList(state,list) {
    state.favouriteList = list
    setFavorite(list)
  }
}