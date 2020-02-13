<template>
  <div class="wrapper">
    <swiper :options="swiperOption" class="swiper" ref="mySwiper" v-if="swiperList.length">
    <!-- slides -->
    <swiper-slide class="swiper-slide"
    v-for="item in swiperList" :key="item.id">
      <a class="swiper-link" :href="item.jump_info.url">
        <img class="swiper-img" :src="item.pic_info.url" alt=""
        >
       </a> 
    </swiper-slide>
    
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
  </div>
  
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'RecommendSwiper',
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {  
          delay: 2000,  
          disableOnInteraction: false,     
        } ,
        loop: true    
      }
    }
  },
  components:{
    swiper,
    swiperSlide
  },
  props: {
    swiperList: {
    type: Array,
    default() {
      return []
     }
   }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    imgLoad() {
      console.log('shsfhsf')
      this.swiper.update()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~swiper/dist/css/swiper.css'
 .wrapper >>>  .swiper-pagination-bullet-active
   background rgba(255, 255, 255, .7)
  .swiper
    width 100%
    .swiper-img
      width 100%
</style>