//防抖函数
export function debounce(fn, time) {
  let timer = null
  return function(){
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn() 
    },time)
  }
}
//将一组数组随机打乱
export function RandomArr(arr) {
  let newArr = arr.slice()
  for(let i=0; i<arr.length; i++) {
    let index = Math.floor(Math.random() *newArr.length)
    let t = newArr[i]
    newArr[i] = newArr[index]
    newArr[index] = t
  }
  return newArr
}

