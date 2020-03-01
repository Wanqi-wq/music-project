import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    currentSong: {},
    songList:[],
    sequenceList: [],
    currentIndex: 0,
    playing: false,
    fullScreen: false,
    currentMode: 0,
    currentRank: {},
    favouriteList:[]
  },
  mutations,
  actions,
  getters
})

export default store