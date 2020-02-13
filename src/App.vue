<template>
  <div id="app">
    <m-header/>
    <m-tab/>
    <router-view></router-view>  
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import MTab from './components/m-tab/m-tab'

export default {
  name: 'App',
  components: {
    MHeader,
    MTab
  }
}
</script>

<style>
</style>
