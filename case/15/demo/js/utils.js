//绑定事件处理函数
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

// 解除绑定
function removeEvent(el, type, fn){
  if(el.addEventListener){
    el.removeEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.dettachEvent('on' + type, function(){
      fn.call(el);
    });
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

// 阻止默认行为
function preventDefaultEvent(){
  var e = e || window.event;
  if(e.preventDefault){
    e.preventDefault();
  }else if(e.returnValue){
    e.returnValue = false;
  }else{
    return false;
  }
}
