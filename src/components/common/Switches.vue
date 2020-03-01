<template>
  <div class="switches">
    <li class="switch-item" v-for="(item, index) in switchList" 
    :class="{'active':currentIndex === index}"
    @click="switchItem(index)"
    :key="index">
       <span>{{item.name}}</span>
    </li>
  </div>
</template>

<script>
export default {
  name: 'Switches',
  props: {
    switchList: {
      type: Array,
      default() {
        return [{name:'我喜欢的'},{name:'最近听的'}]
      }
    },
    currentIndex:{
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem(index) {
      this.$emit('switches',index)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~assets/stylus/variable"
  .switches
    display: flex
    align-items: center
    width: 240px
    margin: 0 auto
    border: 1px solid $color-highlight-background
    border-radius: 5px
    .switch-item
      flex: 1
      padding: 8px
      text-align: center
      font-size: $font-size-medium
      color: $color-text-d
      &.active
        background: $color-highlight-background
        color: $color-text
</style>