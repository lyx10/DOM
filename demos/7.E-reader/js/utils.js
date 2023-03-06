// 绑定事件处理函数

function addEvent(el,type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type, fn);
  }else{
    el['on' + type] = fn;
  }
}


// 获取滚动条的距离
function getScrollOffset(){
  if(window.pageXOffset){
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  }else{
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top:  document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

// 获取窗口高度
function getViewportSize(){
  // W3C规范
  if(window.innerWidth){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
    // IE9以下怪异模式
  }else if(document.compatMode === 'BackCompat'){
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
    // IE9以下标准模式
  }else{
    return {
      width: document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
    }
  }
}

// 获取文档高度
function getScrollSize(){
  if(document.body.scrollHeight){
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