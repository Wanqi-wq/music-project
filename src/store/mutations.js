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
  }
}