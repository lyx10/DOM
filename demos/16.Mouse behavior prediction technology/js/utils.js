// 获取元素样式属性
function getStyle(el, prop){
  if(window.getComputedStyle){
    if(prop){
      return parseInt(window.getComputedStyle(el, null)[prop]);
    }else{
      return window.getComputedStyle(el, null);
    }
  }else{
    if(prop){
      return parseInt(el.currentStyle[prop]);
    }else{
      return el.currentStyle;
    }
  }
}

// 获取滚动距离
function getScrollOffset(){
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

// 获取鼠标相对于整个文档的坐标（e.pageX/e.pageY兼容写法）
function pagePos(e){
  var e = e || window.event,
      sLeft = getScrollOffset().left,
      sTop = getScrollOffset().top,
      cLeft = document.documentElement.clientLeft,
      cTop = document.documentElement.clientTop;
  return {
    x: e.clientX + sLeft - cLeft,
    y: e.clientY + sTop - cTop
  }
}

// 绑定事件处理函数
function addEvent(el, type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type, function(){
      fn.call(el);
    });
  }else{
    el['on' + type] = null;
  }
}

// 阻止冒泡
function cancelBubble(e){
  var e = e || window.event;
  if(e.stopProppagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}

// 阻止默认行为
function preventDefaultEvent(e){
  var e = e || window.event;
  if(e.preventDefault){
    e.preventDefault();
  }else{
    e.returnValue = false;
  }
}

// 解除事件绑定
function removeEvent(el, type, fn){
  if(el.addEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.detachEvent('on' + type, fn);
  }else{
    el['on' + type] = null;
  }
}

function getTargetElem(el, tagName){
  var target = el;
  while(target.tagName.toLowerCase() !== tagName){
    target = target.parentNode;
  }
  return target;
}

// 判断点是否在三角形之内
var pointInTriangle = (function(){
  function vec(a, b){
    return {
      x: b.x - a.x,
      y: b.y - a.y
    }
  }

  function vecProduct(v1, v2){
    return v1.x * v2.y - v2.x * v1.y;
  }

  function sameSymbols(a, b){
    return (a ^ b) >= 0;
  }

  return function(opt){
    var PA = vec(opt.curPos, opt.lastPos),
        PB = vec(opt.curPos, opt.topLeft),
        PC = vec(opt.curPos, opt.bottomLeft),
        R1 = vecProduct(PA, PB),
        R2 = vecProduct(PB, PC),
        R3 = vecProduct(PC, PA);

    return sameSymbols(R1, R2) && sameSymbols(R2, R3);
  }
})();

