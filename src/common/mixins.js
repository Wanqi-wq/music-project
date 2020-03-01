import { mapGetters,mapActions } from 'vuex'

export  const playListMixin = {
  computed: {
    ...mapGetters(['getSongList'])
  },
  mounted() {
    this.handleBottom(this.getSongList)
  },
  activated() {
    this.handleBottom(this.getSongList)
  },
  watch: {
    getSongList(newList) {
    this.handleBottom(newList)
    }
  },
  methods: {
    handleBottom() {
      throw new Error('please add handleBottom into this component')
    }
  }
}

//收藏的操作
export const favourite = {
  computed:{
    ...mapGetters(['getFavoriteList'])
  },
  methods: {
    getFavorite(song) {
      if(!this.getFavoriteList) {
        return 'icon-not-favorite'
      }
      let index =  this.getFavoriteList.findIndex(item => item.mid === song.mid)
      if(index > -1) {
        return 'icon-favorite'
      }else{
        return 'icon-not-favorite'
      }
    },
    toggleFavourite(song) {
      if(!this.getFavoriteList) {
        this.addFavorite(song)
        return
      }
    let index =  this.getFavoriteList.findIndex(item => item.mid === song.mid)
      if(index > -1) {

        //将这首歌从收藏歌单中移除
        this.deleteFavorite(song)
        
      }else{
        //将这首歌添加到收藏数组中
        this.addFavorite(song)
        
      }
    },
    ...mapActions(['deleteFavorite','addFavorite']) 
  }
}