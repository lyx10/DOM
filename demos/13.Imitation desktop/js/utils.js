// 兼容封装，添加事件绑定
function addEvent(el, type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type, function(){
      fn.call(el);
    });
  }else{
    el['on' + type] = fn;
  }
}


// 兼容封装，解除事件绑定
function removeEvent(el, type, fn){
  if(el.addEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.detachEvent('on' + type, fn);
  }else{
    el['on' + type] = null;
  }
}


// 兼容封装，阻止冒泡
function cancelBubble(e){
  var e = e || window.event;
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}


// 兼容封装，阻止默认事件
function preventDefaultEvent(e){
  var e = e || window.event;
  if(e.preventDefault){
    e.preventDefault();
  }else{
    e.returnValue = false;
  }
}


// 兼容封装，e.pageX/Y封装，鼠标相对当前文档的坐标，包含滚动条
function pagePos(e){
  var e = e || window.event,
      sLeft = getScrollOffset().left,
      sTop = getScrollOffset().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0;
  return {
    x: e.clientX + sLeft - cLeft,
    y: e.clientY + sTop - cTop
  }

}


// 兼容封装，获取滚动距离兼容封装
function getScrollOffset(){
  if(window.pageXOffset !== undefined){
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  }else{
    return {
      left: document.documentElement.scrollLeft + document.body.scrollLeft,
      top: document.documentElement.scrollTop + document.bodyt.scrollTop,
    }
    
  }
}


// 兼容封装，获取元素样式属性
function getStyle(el, prop){
  if(window.getComputedStyle !== undefined){
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


// 兼容封装，获取窗口宽高
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

Date.prototype.clock = function(){
  var year = this.getFullYear(),
      month = this.getMonth() + 1,
      date = this.getDate(),
      hours = this.getHours(),
      minutes = this.getMinutes(),
      seconds = this.getSeconds();
  return (year + '-' + setZero(month) + '-' + setZero(date) + ' ' + setZero(hours) + ':' + setZero(minutes) + ':' + setZero(seconds))
  
  function setZero(value){
      return value < 10 ? ('0' + value) :value ;
  }
}

function elemParent(el, n){
  var parent = el.parentNode;
  if(parent){
    while(n && typeof(n) === 'number'){
      if(parent.nodeName === 'HTML'){
        return null;
      }
      parent = parent.parentNode;
      n--
    }
    return parent
  }else{
    return null
  }
}

function elemChildren(el, index){
  var children = el.childNodes,
      len = children.length,
      temp = {
        "length": 0,
        "splice": Array.prototype.splice
      },
      item;
  
  for(var i = 0; i < len; i++){
    item = children[i];
    if(item.nodeType === 1){
      temp[temp['length']] = item;
      temp['length']++;
    }
  }

  if(index !== undefined && typeof(index) === 'number'){
    return temp[index];
  }
  return index === undefined ? temp: temp[index]
}
