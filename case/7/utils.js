// 查看滚动距离

function getScrollOffset(){
  if(window.pageXOffset){
    return {
      letf: window.pageXOffset,
      top: window.pageYOffset
    }
  }else{
    return {
      letf: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}


// 浏览器的可视区域(窗口宽高)

function getViewportSize(){
  // window.innerWidth存在，就没有解析模式问题
  if(window.innerWidth){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else{
    // 如果window.innerWidth不存在，就要考虑解析模式问题
    if(document.compatMode === 'BackCompat'){
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
    }else{
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    }
    }
  }
}


// 文档可视区域

function getDocScrollSize(){
  if(document.body.scrollWidth){
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }else{
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}


// 求元素左上角距离文档内边距的距离
function getElemDocPosition(el) {
  var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop;
  
  while(parent){
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }

}
