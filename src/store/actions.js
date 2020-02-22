export default   {
  selectSongs({ commit, state}, {songs, index }) {
    commit('changeSong',{ songs, index})
  },
  setPlaying({commit}) {
    commit('setPlaying')
  }
}