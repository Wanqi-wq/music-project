<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box class="searchbox" @query="inputChange" ref="searchbox"/>
    </div>
    
    <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="(item,index) in hotList" @click="setQuery(item)" :key="index">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
  </div>
</template>

<script>
import SearchBox from './childComps/SearchBox'
import { hotList } from 'common/config'
export default {
  name: 'Search',
  data() {
    return {
      hotList,
    }
    
  },
  components: {
    SearchBox
  },
  methods: {
    inputChange() {
      //当搜索框发生改变时，进行数据请求
    },
    setQuery(item) {
      this.$refs.searchbox.setQuery(item)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
.search
  .search-box-wrapper
    margin 20px
  .hot-key
    margin: 0 20px 20px 20px
    .title
      margin-bottom: 20px
      font-size: $font-size-medium
      color: $color-text-l
    .item
      display: inline-block
      padding: 5px 10px
      margin: 0 20px 10px 0
      border-radius: 6px
      background: $color-highlight-background
      font-size: $font-size-medium
      color: $color-text-d


</style>