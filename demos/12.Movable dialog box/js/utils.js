// 获取窗口宽高
function getViewportSize(){
  if(window.innerWidth){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }else if(document.compatMode === 'BackCompat'){
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

// 获取页面滚动距离
function getScroll(){
  if(window.pageXOffset !== undefined){
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  }else{
    return {
      left: document.documentElement.scrollLeft + document.body.scrollLeft,
      top: document.documentElement.scrollTop + document.body.scrollTop
    }
  }
}

// 获取样式属性
function getStyle(el, prop){
  if(window.getComputedStyle){
    if(prop){
      return window.getComputedStyle(el, null)[prop];
    }else{
      return window.getComputedStyle(el, null);
    }
  }else{
    if(prop){
      return el.currentStyle[prop];
    }else{
      return el.currentStyle;
    }
  }
}

// e.pageX/Y兼容写法
function pagePos(e){
  var e = e || window.event,
      sLeft = getScroll().left,
      sTop = getScroll().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0;
  return {
    x: sLeft + e.clientX - cLeft,
    y: sTop + e.clientY - cTop
  }
}

// 绑定事件处理函数
function addEvent(el, type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type, function(){
      fn.call(el);
    })
  }else{
    el['on' + type] = fn;
  }
}

// 解除事件绑定
function removeEvent(el, type, fn){
  if(el.addEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.detachEvent('on' + type, function(){
      fn.call(el);
    })
  }else{
    el['on' + type] = null;
  }
}

// 阻止冒泡
function cancelBubble(e){
  var e = e || window.event;
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}

// 阻止默认事件
function preventDefaultEvent(e){
  var e = e || window.event;
  if(e.preventDefault){
    e.preventDefault();
  }else{
    e.returnValue = false;
  }
}


