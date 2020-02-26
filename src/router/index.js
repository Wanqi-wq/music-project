import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'pages/recommend/Recommend'
import Singer from 'pages/singer/Singer'
import Search from 'pages/search/Search'
import Rank from 'pages/rank/Rank'
import SingerDetail from 'pages/singerdetail/SingerDetail'
import RecommendDisc from 'pages/disc/RecommendDisc'

Vue.use( VueRouter )

export default new VueRouter({
  mode: 'history',
  routes:[{
    path: '/',
    redirect: '/recommend'
  },{
    path: '/recommend',
    component: Recommend,
    children:[{
      path:":id",
      component: RecommendDisc
    }
    
    ]
  },{
    path: '/singer',
    component: Singer,
    children:[
      {
      path: ':id',
      component: SingerDetail
      }
    ]
  },{
    path: '/search',
    component: Search
  },{
    path: '/rank',
    component: Rank
  },{
    path: '*',
    redirect: '/recommend'
  }]
})