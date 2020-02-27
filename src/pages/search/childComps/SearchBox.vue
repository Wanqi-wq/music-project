<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" class="box" :placeholder="placeholder" v-model="query"/>
    <i class="icon-dismiss" @click="clear" v-show="query"></i>
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      query:''
    }
  },
  props: {
    placeholder:{
      type: String,
      default: '请输入歌曲或歌手名称'
    }
  },
  watch: {
    query(newQuery) {
      this.$emit('query', newQuery)
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 16px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background

</style>