//设置rem函数
function setRem() {
  //获取页面的宽度
  let width = document.documentElement.clientWidth || document.body.clientWidth;
  //获取根元素
  const html = document.getElementsByTagName('html')
  html[0].style.fontSize = width / 375 * 16 + 'px'
}

//监听页面改变
window.addEventListener('resize',setRem)