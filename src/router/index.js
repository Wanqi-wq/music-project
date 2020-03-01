import Vue from 'vue'
import VueRouter from 'vue-router'
const Recommend = () => import('pages/recommend/Recommend')
const Singer = () => import('pages/singer/Singer')
const Search = () => import('pages/search/Search')
const Rank = () => import('pages/rank/Rank')
const SingerDetail = () => import('pages/singerdetail/SingerDetail')
const RecommendDisc = () => import('pages/disc/RecommendDisc')
const RankDetail = () => import('pages/rankdetail/RankDetail')
const UserCenter = () => import('pages/usercenter/UserCenter')

Vue.use( VueRouter )

export default new VueRouter({
  mode: 'history',
  routes:[{
    path: '/',
    redirect: '/recommend'
  },{
    path: '/recommend',
    component: Recommend,
    children:[
      {
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
    component: Rank,
    children: [
      {
        path:':id',
        component: RankDetail
      }
    ]
  },{
    path: '/user',
    component: UserCenter
  },{
    path: '*',
    redirect: '/recommend'
  }]
})