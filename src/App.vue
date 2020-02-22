<template>
  <div id="app">
    <m-header/>
    <m-tab/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player/>  
  </div>
</template>

<script>
import MHeader from './components/content/m-header/m-header'
import MTab from './components/content/m-tab/m-tab'
import Player from './components/content/player/Player'

export default {
  name: 'App',
  components: {
    MHeader,
    MTab,
    Player
  }
}
</script>

<style>
</style>
