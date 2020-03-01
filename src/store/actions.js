import { RandomArr } from 'common/utils'
import { loadFavorite } from 'common/cache'

export default   {
  selectSongs({ commit, state}, {songs, index }) {
    commit('changeSong',{ songs, index})
  },
  setPlaying({commit}) {
    commit('setPlaying')
  },
  deleteSong({commit, state},song) {
    let playList = state.songList.slice()
    let sequenceList = state.sequenceList.slice()
    let indexP = state.songList.findIndex(item => item.mid === song.mid)
    let indexS = state.sequenceList.findIndex(item => item.mid === song.mid)
    let currentIndex = state.currentIndex
    if(state.currentMode == 1 || state.currentMode == 0) {
      playList = sequenceList
    }else if(state.currentMode == 2){
      playList = RandomArr(playList)
      playList.splice(indexP, 1)
      
    }
    sequenceList.splice(indexS, 1)
    
    if(indexP < currentIndex || currentIndex === playList.length ){
      //如果当前播放的歌在被删歌的后面或删除最后一首歌
      currentIndex--
      console.log(playList[currentIndex],'sdf')
    }
    commit('setCurrentIndex',currentIndex)  
    commit('setCurrentSong',playList[currentIndex])
    commit('setSongList', playList)
    commit('setSequenceList',sequenceList)
    sequenceList.length > 0 ? commit('setPlaying',true) : commit('setPlaying',false)
  },
  clearSongs({commit}) {
    commit('setCurrentIndex',-1)
    commit('setSongList', [])
    commit('setSequenceList', [])
    commit('setCurrentSong', null)
    commit('setPlaying',false)
  }, 
  deleteFavorite({commit,state},song) {
    let favourite = state.favouriteList.slice()
    let index = favourite.findIndex(item => item.mid === song.mid)
    favourite.splice(index,1)
    commit('setFavouriteList',favourite)

  },
  addFavorite({commit,state},song) {
    //歌曲添加到收藏歌单中
    let favourite = state.favouriteList ? state.favouriteList.slice() : []
    favourite.unshift(song)
    commit('setFavouriteList',favourite)
  },
  async loadFavorite({commit}) {
    //读取本地储存的收藏歌单
    commit('setFavouriteList',await loadFavorite())
  },
  insertSong({commit,state},song) {
    let sequenceList = state.sequenceList.slice()
    let playList = state.songList.slice()
    let index = sequenceList.findIndex(item => item.mid ===song.mid) 
    if(state.currentMode == 1 || state.currentMode == 0) {
      playList = sequenceList
    }else if(state.currentMode == 2){
      playList = RandomArr(playList)
    }
      if(index > -1) {
        //播放列表中存在
      
      }else {
        //播放列表中不存在这首歌
        index = 0
        sequenceList.unshift(song)
      }

      if(state.currentMode == 1) {
        playList = sequenceList
      }else if(state.currentMode == 2){
        playList = RandomArr(sequenceList)
      }
      commit('setSequenceList',)
      commit('setSequenceList',sequenceList)
      commit('setCurrentSong',song) 
      commit('setCurrentIndex',index)
      commit('setPlaying',true)
      commit('setSongList',playList)
      commit('openScreen',true)
  }
}