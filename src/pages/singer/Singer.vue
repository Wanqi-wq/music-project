<template>
  <div>
    <singer-list :singers="singers" :currentAlphabet="currentAlphabet"
    @changePage="changePage"/>
    <singer-alphabet :shortcutList="singerCategory" @alphabetClick="alphabetClick" :currentAlphabet="currentAlphabet2"/>
    <router-view></router-view>
  </div>
  
</template>

<script>
import SingerList from './childComps/List'
import SingerAlphabet from './childComps/Alphabet'

//导入方法
import { getSingerCategory, getSingers } from 'api/singer'
export default {
  name: 'Singer',
  data() {
    return {
      singers: [],
      singerCategory: [],
      currentAlphabet: 0,
      currentAlphabet2: 0
    } 
  },
  components: {
    SingerList,
    SingerAlphabet
  },
  created() {
    this._getSingerCategory()
  },
  methods: {
    alphabetClick(index) {
      //记录点击了哪个字母
      this.currentAlphabet = index
      this.currentAlphabet2 = index
    },
    changePage(index) {
      this.currentAlphabet2 = index
    },
    //获取歌手的分类
    _getSingerCategory() {
      getSingerCategory().then(res => {
        if(res.data.code === 200) {
          this.singerCategory = res.data.data.index
          this._initSingers()     
        }       
      }).catch(err =>{console.log(err)}) 
    },
    //对请求到的数据进行重组
    _initSingers() {
      this.singerCategory.forEach( (item,index) => {
        this.singers.push({
            name:item.name,
            id: item.id,
            list:[]
          })
        })
      //获取按要求歌手的信息
      for(let i in this.singers) {
        getSingers(this.singerCategory[i].id).then(res => {
          if(res.data.code === 200)
        this.singers[i].list = res.data.data;
      }) 
      }
    }
  }
}
</script>

<style>

</style>