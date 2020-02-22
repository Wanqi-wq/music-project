import { mapGetters } from 'vuex'
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