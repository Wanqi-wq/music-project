<template>
  <ul>
    <li v-for="(item,index) in discList" class="item" :key="index">
      <div class="icon">
        <img class="icon-img" v-lazy="item.imgurl">
      </div>
      <div class="text">
        <h2 class="name">{{item.creator.name}}</h2>
        <p class="desc">{{item.dissname}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RecommendDiscList',
  props: {
    discList:{
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
 @import "~assets/stylus/variable"
.item
  display: flex
  box-sizing: border-box
  align-items: center
  padding: 0 20px 20px 20px
  .icon
    flex: 0 0 60px
    width: 60px
    padding-right: 20px
    .icon-img
      width 60px
      height 60px
  .text
    display: flex
    flex-direction: column
    justify-content: center
    flex: 1
    line-height: 20px
    overflow: hidden
    font-size: $font-size-medium
    .name
      margin-bottom: 10px
      color: $color-text
    .desc
      color: $color-text-d
</style>