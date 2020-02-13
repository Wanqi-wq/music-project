import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'pages/recommend/Recommend'
import Singer from 'pages/singer/Singer'
import Search from 'pages/search/Search'
import Rank from 'pages/rank/Rank'

Vue.use( VueRouter )

export default new VueRouter({
  routes:[{
    path: '/',
    redirect: '/recommend'
  },{
    path: '/recommend',
    component: Recommend
  },{
    path: '/singer',
    component: Singer
  },{
    path: '/search',
    component: Search
  },{
    path: '/rank',
    component: Rank
  }]
})