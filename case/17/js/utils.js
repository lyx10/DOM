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

function removeEvent(el, type, fn){
  if(el.addEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.detachEvent('on' + type, fn)
  }else{
    el['on' + type] = null;
  }
}

function getStyle(el, prop){
  if(window.getComputedStyle){
    if(prop){
      return window.getComputedStyle(el, null)[prop];
    }else{
      if(prop){
        return el.currentStyle[prop];
      }else{
        return el.currentStyle;
      }
    }
  }
}

function getScroll(){
  if(window.pageXOffset){
    return {
      left: pageXOffset,
      top: pageYOffset
    }
  }else{
    return{
      left: document.documentElement.scrollLeft + document.body.scrollLeft,
      top: document.documentElement.scrollTop + document.body.scrollTop
    }
  }
}

function  pagePos(e){
  var sLeft = getScroll().left,
      sTop = getScroll().top,
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0;

  return {
    x: e.clientX + sLeft - cLeft,
    y: e.clientY + sTop - cTop
  }
}