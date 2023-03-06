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

function removeEvent(el, type, fn){
  if(el.addEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.detachEvent('on' + type, fn);
  }else{
    el['on' + type] = null;
  }
}

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